'use client'

// @TASK P2-S1-T2 - 쿼리 히스토리 패널
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useState } from 'react'
import type { QueryHistoryItem } from '@/types'

interface QueryHistoryProps {
  history: QueryHistoryItem[]
  onSelect: (sql: string) => void
  onClear: () => void
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export default function QueryHistory({ history, onSelect, onClear }: QueryHistoryProps) {
  const [expanded, setExpanded] = useState(true)

  if (history.length === 0) {
    return (
      <div className="text-xs text-gray-400 px-1 py-2">
        실행한 쿼리가 없습니다.
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-expanded={expanded}
          aria-controls="query-history-list"
        >
          <span
            aria-hidden="true"
            className={`inline-block transition-transform text-xs ${expanded ? 'rotate-90' : ''}`}
          >
            &#9654;
          </span>
          쿼리 히스토리 ({history.length})
        </button>

        <button
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-red-500 focus:outline-none transition-colors"
          aria-label="쿼리 히스토리 전체 삭제"
        >
          전체 삭제
        </button>
      </div>

      {/* 목록 */}
      {expanded && (
        <ul
          id="query-history-list"
          className="max-h-48 overflow-y-auto divide-y divide-gray-100"
          role="listbox"
          aria-label="쿼리 히스토리 목록"
        >
          {history.map((item, index) => (
            <li key={`${item.timestamp}-${index}`}>
              <button
                onClick={() => onSelect(item.sql)}
                className="w-full text-left px-3 py-2 hover:bg-blue-50 focus:outline-none focus:bg-blue-50 transition-colors group"
                role="option"
                aria-selected={false}
                title={item.sql}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${
                      item.success ? 'bg-green-400' : 'bg-red-400'
                    }`}
                    aria-label={item.success ? '성공' : '실패'}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 font-mono truncate group-hover:text-blue-700">
                      {item.sql.replace(/\s+/g, ' ').trim()}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatTime(item.timestamp)}
                      {item.success && ` · ${item.rowCount}행`}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
