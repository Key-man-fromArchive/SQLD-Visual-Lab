'use client'

// @TASK P2-R1-T1 - SQL 실행 서비스 (초기화, 쿼리 실행, 히스토리, CSV 내보내기)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { initDatabase, executeQuery as rawExecuteQuery, resetDatabase } from './sql-engine'
import { MAX_QUERY_HISTORY } from './constants'
import type { SQLResult, QueryHistoryItem } from '@/types'

let initialized = false

export async function initSQLService(initSQL?: string): Promise<void> {
  if (!initialized) {
    await initDatabase(initSQL)
    initialized = true
  }
}

export async function switchDataset(initSQL: string): Promise<void> {
  resetDatabase()
  initialized = false
  await initDatabase(initSQL)
  initialized = true
}

export function runQuery(sql: string): SQLResult {
  const result = rawExecuteQuery(sql)
  return {
    columns: result.columns,
    rows: result.rows,
    rowCount: result.rowCount,
    executionTime: result.executionTime,
    error: result.error,
  }
}

// localStorage 기반 쿼리 히스토리
const HISTORY_KEY = 'sqld-query-history'

export function getQueryHistory(): QueryHistoryItem[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(HISTORY_KEY)
  return stored ? JSON.parse(stored) : []
}

export function addToHistory(item: QueryHistoryItem): void {
  const history = getQueryHistory()
  history.unshift(item)
  if (history.length > MAX_QUERY_HISTORY) history.pop()
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY)
}

// CSV 내보내기
export function exportToCSV(
  columns: string[],
  rows: any[][],
  filename: string = 'query-results.csv'
): void {
  const header = columns.join(',')
  const body = rows
    .map((row) =>
      row
        .map((cell) => {
          const str = String(cell ?? '')
          return str.includes(',') || str.includes('"')
            ? `"${str.replace(/"/g, '""')}"`
            : str
        })
        .join(',')
    )
    .join('\n')

  const csv = `${header}\n${body}`
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
