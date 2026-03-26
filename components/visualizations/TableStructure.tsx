'use client'

// @TASK P3-R1-T2 - 테이블 구조 시각화
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { motion } from 'framer-motion'

interface ColumnDef {
  name: string
  type: string
}

interface TableStructureProps {
  tableName: string
  columns: ColumnDef[]
  sampleRows: (string | number | null)[][]
  highlightColumns?: string[]
}

export default function TableStructure({
  tableName,
  columns,
  sampleRows,
  highlightColumns = [],
}: TableStructureProps) {
  const isHighlighted = (colName: string) => highlightColumns.includes(colName)

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* 테이블 이름 헤더 */}
        <div className="bg-blue-600 text-white text-center text-sm font-bold py-2 px-4 rounded-t-lg">
          {tableName}
        </div>

        <div className="border border-gray-200 rounded-b-lg overflow-hidden">
          {/* 컬럼 헤더 */}
          <div className="flex bg-gray-50 border-b border-gray-200">
            {columns.map((col) => (
              <motion.div
                key={col.name}
                className={`flex-1 min-w-0 px-3 py-2 text-xs font-semibold border-r border-gray-200 last:border-r-0 ${
                  isHighlighted(col.name)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700'
                }`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="truncate">{col.name}</div>
                <div
                  className={`text-xs font-normal mt-0.5 ${
                    isHighlighted(col.name) ? 'text-blue-500' : 'text-gray-400'
                  }`}
                >
                  {col.type}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 샘플 데이터 행 */}
          {sampleRows.map((row, rowIdx) => (
            <motion.div
              key={rowIdx}
              className="flex border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: rowIdx * 0.08 }}
            >
              {columns.map((col, colIdx) => (
                <div
                  key={col.name}
                  className={`flex-1 min-w-0 px-3 py-2 text-xs border-r border-gray-100 last:border-r-0 truncate ${
                    isHighlighted(col.name)
                      ? 'bg-blue-50 text-blue-800 font-medium'
                      : 'text-gray-600'
                  }`}
                >
                  {row[colIdx] === null ? (
                    <span className="text-gray-300 italic">NULL</span>
                  ) : (
                    String(row[colIdx])
                  )}
                </div>
              ))}
            </motion.div>
          ))}

          {/* 더 있음 표시 */}
          <div className="flex bg-gray-50 py-1">
            {columns.map((col) => (
              <div
                key={col.name}
                className="flex-1 px-3 text-center text-gray-300 text-xs"
              >
                ...
              </div>
            ))}
          </div>
        </div>

        {/* 하이라이트 설명 */}
        {highlightColumns.length > 0 && (
          <div className="mt-2 flex items-center gap-2 text-xs text-blue-600">
            <span className="inline-block w-3 h-3 bg-blue-100 border border-blue-300 rounded" />
            <span>파란색 컬럼이 SELECT에서 선택된 컬럼입니다</span>
          </div>
        )}
      </div>
    </div>
  )
}
