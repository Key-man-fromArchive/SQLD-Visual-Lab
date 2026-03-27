'use client'

// @TASK P2-S1-T3 - SQL 실행기 페이지 (조립)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Suspense } from 'react'
import { useSQLPlayground } from '@/hooks/useSQLPlayground'
import SampleDataSelector from '@/components/features/playground/SampleDataSelector'
import SQLEditor from '@/components/features/playground/SQLEditor'
import SQLControls from '@/components/features/playground/SQLControls'
import QueryHistory from '@/components/features/playground/QueryHistory'
import ResultTable from '@/components/features/playground/ResultTable'
import ErrorDisplay from '@/components/features/playground/ErrorDisplay'
import EmptyState from '@/components/features/playground/EmptyState'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

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

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* 페이지 제목 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">SQL 실행기</h1>
        <p className="text-sm text-gray-500 mt-1">
          SQL 쿼리를 직접 작성하고 실행해보세요. 결과를 즉시 확인할 수 있습니다.
        </p>
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
