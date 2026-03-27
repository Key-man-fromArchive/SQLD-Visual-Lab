'use client'

// @TASK P2-R1-T1 - SQL 실행 서비스 (초기화, 쿼리 실행, 히스토리, CSV 내보내기)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { initDatabase, executeQuery as rawExecuteQuery, resetDatabase } from './sql-engine'
import { MAX_QUERY_HISTORY } from './constants'
import type { SQLResult, QueryHistoryItem, SqlCellValue } from '@/types'

let initialized = false
let initPromise: Promise<void> | null = null

export async function initSQLService(initSQL?: string): Promise<void> {
  if (initPromise) await initPromise
  if (!initialized) {
    try {
      initPromise = initDatabase(initSQL)
      await initPromise
      initialized = true
    } catch (err) {
      initialized = false
      throw err
    } finally {
      initPromise = null
    }
  }
}

export async function switchDataset(initSQL: string): Promise<void> {
  if (initPromise) await initPromise
  resetDatabase()
  initialized = false
  try {
    initPromise = initDatabase(initSQL)
    await initPromise
    initialized = true
  } catch (err) {
    initialized = false
    throw err
  } finally {
    initPromise = null
  }
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
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    localStorage.removeItem(HISTORY_KEY)
    return []
  }
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
  rows: SqlCellValue[][],
  filename: string = 'query-results.csv'
): void {
  const header = columns.join(',')
  const body = rows
    .map((row) =>
      row
        .map((cell) => {
          const str = String(cell ?? '')
          return str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')
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
