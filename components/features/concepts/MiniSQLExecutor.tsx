'use client'

// @TASK P3-S1-T1 - 미니 SQL 실행기 (개념 페이지 내 인라인 실습)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useState, useEffect, useRef } from 'react'
import { employeesDataset } from '@/data/datasets/employees'
import type { SqlCellValue } from '@/types'

interface MiniSQLExecutorProps {
  initialSQL: string
}

interface QueryResult {
  columns: string[]
  rows: SqlCellValue[][]
  rowCount: number
  executionTime: number
  error: string | null
}

// Issue 2: playground 싱글톤과 격리된 별도 DB 인스턴스
let miniDb: any = null
let miniDbReady = false
let miniDbInitPromise: Promise<void> | null = null

async function initMiniDb(initSQL: string): Promise<void> {
  const initSqlJs = (await import('sql.js')).default
  const SQL = await initSqlJs({
    locateFile: () => 'https://cdn.jsdelivr.net/npm/sql.js@1.14.1/dist/sql-wasm.wasm',
  })
  miniDb = new SQL.Database()
  if (initSQL) miniDb.run(initSQL)
  miniDbReady = true
}

function miniExecuteQuery(sql: string): QueryResult {
  if (!miniDb) {
    return { columns: [], rows: [], rowCount: 0, executionTime: 0, error: 'DB not ready' }
  }
  const startTime = performance.now()
  try {
    const results = miniDb.exec(sql)
    const executionTime = performance.now() - startTime
    if (results.length === 0) return { columns: [], rows: [], rowCount: 0, executionTime, error: null }
    const last = results[results.length - 1]
    return { columns: last.columns, rows: last.values as SqlCellValue[][], rowCount: last.values.length, executionTime, error: null }
  } catch (err: any) {
    return { columns: [], rows: [], rowCount: 0, executionTime: performance.now() - startTime, error: err.message }
  }
}

export default function MiniSQLExecutor({ initialSQL }: MiniSQLExecutorProps) {
  const [sql, setSql] = useState(initialSQL)
  const [result, setResult] = useState<QueryResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dbReady, setDbReady] = useState(false)
  const [dbError, setDbError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // DB 초기화 (employees 데이터셋) - Issue 2: 별도 인스턴스, Issue 3: .catch() 추가
  useEffect(() => {
    if (miniDbReady) {
      setDbReady(true)
      return
    }
    if (!miniDbInitPromise) {
      miniDbInitPromise = initMiniDb(employeesDataset.initSQL)
    }
    miniDbInitPromise
      .then(() => {
        setDbReady(true)
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err)
        setDbError(`DB 초기화 실패: ${msg}`)
        miniDbInitPromise = null
      })
  }, [])

  // initialSQL 변경 시 SQL 동기화
  useEffect(() => {
    setSql(initialSQL)
    setResult(null)
  }, [initialSQL])

  const handleRun = () => {
    if (!dbReady || !sql.trim()) return
    setIsLoading(true)
    // 비동기 느낌 (UI 반응성)
    setTimeout(() => {
      const res = miniExecuteQuery(sql)
      setResult(res)
      setIsLoading(false)
    }, 50)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter 또는 Cmd+Enter로 실행
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleRun()
    }
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* DB 초기화 에러 표시 (Issue 3) */}
      {dbError && (
        <div className="px-4 py-2 bg-red-50 text-red-600 text-xs border-b border-red-200">
          {dbError}
        </div>
      )}
      {/* 헤더 */}
      <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-600">SQL 직접 실행해보기</span>
          {!dbReady && !dbError && (
            <span className="text-xs text-gray-400 animate-pulse">DB 준비 중...</span>
          )}
        </div>
        <button
          onClick={handleRun}
          disabled={!dbReady || isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="SQL 실행 (Ctrl+Enter)"
        >
          {isLoading ? (
            <span className="animate-spin text-xs">⟳</span>
          ) : (
            <span aria-hidden="true">▶</span>
          )}
          실행
        </button>
      </div>

      {/* SQL 편집기 */}
      <textarea
        ref={textareaRef}
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-gray-900 text-green-400 font-mono text-sm p-4 resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        rows={6}
        spellCheck={false}
        aria-label="SQL 입력"
        placeholder="SELECT * FROM EMPLOYEES;"
      />

      {/* 결과 영역 */}
      {result && (
        <div className="border-t border-gray-200">
          {result.error ? (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-mono">
              {result.error}
            </div>
          ) : result.columns.length === 0 ? (
            <div className="p-3 text-gray-400 text-sm text-center">
              실행 완료 (결과 없음)
            </div>
          ) : (
            <>
              {/* 결과 메타 */}
              <div className="px-4 py-1.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">{result.rowCount}행 조회됨</span>
                <span className="text-xs text-gray-400">{result.executionTime.toFixed(1)}ms</span>
              </div>
              {/* 결과 테이블 */}
              <div className="overflow-x-auto max-h-52">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {result.columns.map((col) => (
                        <th
                          key={col}
                          className="px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.slice(0, 10).map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className="px-3 py-1.5 text-gray-700 whitespace-nowrap"
                          >
                            {cell === null ? (
                              <span className="text-gray-300 italic">NULL</span>
                            ) : (
                              String(cell)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {result.rowCount > 10 && (
                  <div className="px-4 py-2 text-xs text-gray-400 text-center bg-gray-50">
                    전체 {result.rowCount}행 중 10행 표시
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* 단축키 안내 */}
      <div className="px-4 py-1.5 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
        Ctrl+Enter로 실행 | employees / departments 테이블 사용 가능
      </div>
    </div>
  )
}
