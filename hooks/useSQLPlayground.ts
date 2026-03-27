'use client'

// @TASK P2-R1-T2 - SQL 실행기 상태 관리 훅
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  initSQLService,
  switchDataset,
  runQuery,
  getQueryHistory,
  addToHistory,
  clearHistory,
} from '@/lib/sql-service'
import { datasets } from '@/data/datasets'
import type { SQLResult, QueryHistoryItem } from '@/types'

export function useSQLPlayground() {
  const searchParams = useSearchParams()
  const [sql, setSql] = useState('')
  const [results, setResults] = useState<SQLResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedDataset, setSelectedDataset] = useState('custom')
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([])
  const [dbReady, setDbReady] = useState(false)
  const [initError, setInitError] = useState<string | null>(null)

  // DB 초기화 — 빈 DB로 시작 (사용자가 데이터셋을 선택하면 로드)
  useEffect(() => {
    const init = async () => {
      try {
        await initSQLService()
        setSql('-- SQLD Visual Lab에 오신 것을 환영합니다!\n-- 아래에서 데이터셋을 선택하거나, 직접 테이블을 만들어보세요.\n\n-- 예시: 테이블 만들기\n-- CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, score INTEGER);\n-- INSERT INTO students VALUES (1, \'홍길동\', 85);\n-- SELECT * FROM students;\n')
        setDbReady(true)
      } catch (err) {
        console.error('DB 초기화 실패:', err)
        setInitError(err instanceof Error ? err.message : 'DB 초기화에 실패했습니다.')
      }
    }
    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // URL ?sql= 파라미터 처리
  useEffect(() => {
    const sqlParam = searchParams.get('sql')
    if (sqlParam) {
      setSql(decodeURIComponent(sqlParam))
    }
  }, [searchParams])

  // 히스토리 로드
  useEffect(() => {
    setQueryHistory(getQueryHistory())
  }, [])

  const executeQuery = useCallback(
    async (querySQL?: string) => {
      const targetSQL = querySQL || sql
      if (!targetSQL.trim() || !dbReady) return

      setLoading(true)
      // setTimeout으로 UI가 먼저 업데이트되도록
      await new Promise((resolve) => setTimeout(resolve, 10))

      const result = runQuery(targetSQL)
      setResults(result)
      setLoading(false)

      const historyItem: QueryHistoryItem = {
        sql: targetSQL,
        timestamp: Date.now(),
        rowCount: result.rowCount,
        success: result.error === null,
      }
      addToHistory(historyItem)
      setQueryHistory(getQueryHistory())
    },
    [sql, dbReady]
  )

  const handleSelectDataset = useCallback(async (datasetId: string) => {
    setSelectedDataset(datasetId)
    setResults(null)

    if (datasetId === 'custom') {
      await switchDataset('')
      setSql('CREATE TABLE my_table (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(50)\n);')
    } else {
      const dataset = datasets[datasetId]
      if (dataset) {
        await switchDataset(dataset.initSQL)
        setSql(dataset.sampleQuery)
      }
    }
  }, [])

  const handleClear = useCallback(() => {
    setSql('')
    setResults(null)
  }, [])

  const handleClearHistory = useCallback(() => {
    clearHistory()
    setQueryHistory([])
  }, [])

  return {
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
  }
}
