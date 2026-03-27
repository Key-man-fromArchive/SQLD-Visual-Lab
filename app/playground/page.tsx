'use client'

// @TASK P2-S1-T3 - SQL 실행기 페이지 (조립)
// @TASK P2-S1-T4 - 예제 탐색기 + 연습 문제 UI 추가
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Suspense, useState } from 'react'
import { useSQLPlayground } from '@/hooks/useSQLPlayground'
import SampleDataSelector from '@/components/features/playground/SampleDataSelector'
import SQLEditor from '@/components/features/playground/SQLEditor'
import SQLControls from '@/components/features/playground/SQLControls'
import QueryHistory from '@/components/features/playground/QueryHistory'
import ResultTable from '@/components/features/playground/ResultTable'
import ErrorDisplay from '@/components/features/playground/ErrorDisplay'
import EmptyState from '@/components/features/playground/EmptyState'
import ExampleBrowser from '@/components/features/playground/ExampleBrowser'
import ExerciseMode from '@/components/features/playground/ExerciseMode'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

type PanelMode = 'none' | 'examples' | 'exercises'

// useSearchParams를 사용하는 훅이 있으므로 Suspense로 분리
function PlaygroundContent() {
  const {
    sql,
    setSql,
    results,
    loading,
    selectedDataset,
    queryHistory,
    dbReady,
    initError,
    executeQuery,
    handleSelectDataset,
    handleClear,
    handleClearHistory,
  } = useSQLPlayground()

  const [panelMode, setPanelMode] = useState<PanelMode>('none')

  function togglePanel(mode: PanelMode) {
    setPanelMode((prev) => (prev === mode ? 'none' : mode))
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* 페이지 제목 */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">SQL 실행기</h1>
        <p className="text-sm text-gray-500 mt-1">
          SQL 쿼리를 직접 작성하고 실행해보세요. 결과를 즉시 확인할 수 있습니다.
        </p>
      </div>

      {/* 학습 패널 토글 버튼 */}
      <div className="flex items-center gap-2 mb-4" role="group" aria-label="학습 패널 선택">
        <button
          onClick={() => togglePanel('examples')}
          className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
            panelMode === 'examples'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
          aria-pressed={panelMode === 'examples'}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          예제 보기
        </button>
        <button
          onClick={() => togglePanel('exercises')}
          className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
            panelMode === 'exercises'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
          aria-pressed={panelMode === 'exercises'}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          연습 문제
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {/* DB 초기화 에러 */}
        {initError && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <p className="font-medium">데이터베이스 초기화 실패</p>
            <p className="mt-1 text-xs">{initError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
            >
              새로고침
            </button>
          </div>
        )}

        {/* DB 초기화 중 안내 */}
        {!dbReady && !initError && (
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            <LoadingSpinner />
            데이터베이스를 초기화하는 중입니다...
          </div>
        )}

        {/* 예제 탐색기 패널 */}
        <ExampleBrowser
          onSelectExample={(exampleSql) => setSql(exampleSql)}
          isOpen={panelMode === 'examples'}
          onToggle={() => togglePanel('examples')}
        />

        {/* 연습 문제 패널 */}
        <ExerciseMode
          onLoadSQL={(loadSql) => setSql(loadSql)}
          isOpen={panelMode === 'exercises'}
          onToggle={() => togglePanel('exercises')}
        />

        {/* 상단: 데이터셋 선택 */}
        <section aria-label="데이터셋 선택">
          <SampleDataSelector
            selectedDataset={selectedDataset}
            onSelect={handleSelectDataset}
            disabled={!dbReady}
          />
        </section>

        {/* 편집기 + 컨트롤 */}
        <section aria-label="SQL 편집기">
          <SQLEditor
            value={sql}
            onChange={setSql}
            onExecute={() => executeQuery()}
            disabled={!dbReady}
          />
          <div className="mt-3">
            <SQLControls
              onExecute={() => executeQuery()}
              onClear={handleClear}
              loading={loading}
              disabled={!dbReady}
            />
          </div>
        </section>

        {/* 쿼리 히스토리 */}
        <section aria-label="쿼리 히스토리">
          <QueryHistory
            history={queryHistory}
            onSelect={(historySql) => {
              setSql(historySql)
              executeQuery(historySql)
            }}
            onClear={handleClearHistory}
          />
        </section>

        {/* 결과 영역 */}
        <section aria-label="쿼리 결과" aria-live="polite">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
              <span className="ml-3 text-sm text-gray-500">쿼리 실행 중...</span>
            </div>
          ) : results === null ? (
            <EmptyState type="initial" />
          ) : results.error ? (
            <ErrorDisplay message={results.error} />
          ) : results.rowCount === 0 ? (
            <EmptyState type="empty-result" />
          ) : (
            <ResultTable
              columns={results.columns}
              rows={results.rows}
              executionTime={results.executionTime}
            />
          )}
        </section>
      </div>
    </div>
  )
}

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner />
          <span className="ml-3 text-sm text-gray-500">페이지를 불러오는 중...</span>
        </div>
      }
    >
      <PlaygroundContent />
    </Suspense>
  )
}
