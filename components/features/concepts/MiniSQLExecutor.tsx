'use client'

// @TASK P3-S1-T1 - 미니 SQL 실행기 (개념 페이지 내 인라인 실습)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useState, useEffect, useRef } from 'react'
import { initDatabase, executeQuery } from '@/lib/sql-engine'
import { employeesDataset } from '@/data/datasets/employees'

interface MiniSQLExecutorProps {
  initialSQL: string
}

interface QueryResult {
  columns: string[]
  rows: (string | number | null)[][]
  rowCount: number
  executionTime: number
  error: string | null
}

// 개념 페이지 전용 DB 인스턴스를 위해 별도 초기화 플래그 사용
let conceptsDbReady = false

export default function MiniSQLExecutor({ initialSQL }: MiniSQLExecutorProps) {
  const [sql, setSql] = useState(initialSQL)
  const [result, setResult] = useState<QueryResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dbReady, setDbReady] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // DB 초기화 (employees 데이터셋)
  useEffect(() => {
    if (conceptsDbReady) {
      setDbReady(true)
      return
    }
    initDatabase(employeesDataset.initSQL).then(() => {
      conceptsDbReady = true
      setDbReady(true)
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
      const res = executeQuery(sql)
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
      {/* 헤더 */}
      <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-600">SQL 직접 실행해보기</span>
          {!dbReady && (
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
