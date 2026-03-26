'use client'

// @TASK P2-S1-T2 - 쿼리 결과 테이블 (페이지네이션 + CSV 내보내기)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useState } from 'react'
import { exportToCSV } from '@/lib/sql-service'

const ROWS_PER_PAGE = 20

interface ResultTableProps {
  columns: string[]
  rows: any[][]
  executionTime: number
}

export default function ResultTable({ columns, rows, executionTime }: ResultTableProps) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE))
  const startIndex = (page - 1) * ROWS_PER_PAGE
  const pageRows = rows.slice(startIndex, startIndex + ROWS_PER_PAGE)

  const handlePrev = () => setPage((p) => Math.max(1, p - 1))
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1))

  const handleExport = () => {
    exportToCSV(columns, rows)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 상단 요약 + CSV 버튼 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{rows.length}</span>행
          {' '}·{' '}
          <span className="text-gray-500">{executionTime.toFixed(1)}ms</span>
        </p>
        <button
          onClick={handleExport}
          className="
            flex items-center gap-1.5 px-3 py-1.5
            text-xs font-medium text-gray-600
            border border-gray-300 rounded-lg bg-white
            hover:bg-gray-50 active:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1
            transition-colors
          "
          aria-label="결과를 CSV 파일로 내보내기"
        >
          <span aria-hidden="true">&#8659;</span>
          CSV 내보내기
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm" role="grid">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {pageRows.map((row, rowIdx) => (
              <tr
                key={startIndex + rowIdx}
                className="hover:bg-blue-50 transition-colors"
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-4 py-2 text-gray-800 font-mono text-xs whitespace-nowrap"
                  >
                    {cell === null || cell === undefined ? (
                      <span className="text-gray-400 italic">NULL</span>
                    ) : (
                      String(cell)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between"
          role="navigation"
          aria-label="결과 테이블 페이지 이동"
        >
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="
              px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300
              bg-white text-gray-600
              hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1
              transition-colors
            "
            aria-label="이전 페이지"
          >
            &#8592; 이전
          </button>

          <span className="text-xs text-gray-500">
            {page} / {totalPages} 페이지
            <span className="ml-2 text-gray-400">
              ({startIndex + 1}–{Math.min(startIndex + ROWS_PER_PAGE, rows.length)}행)
            </span>
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="
              px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300
              bg-white text-gray-600
              hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1
              transition-colors
            "
            aria-label="다음 페이지"
          >
            다음 &#8594;
          </button>
        </div>
      )}
    </div>
  )
}
