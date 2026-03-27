// @TASK P0-T0.3 - 공통 타입 정의
// @SPEC docs/planning/sqld-visual-lab-spec.md

export type SqlCellValue = string | number | Uint8Array | null

export interface SQLResult {
  columns: string[]
  rows: SqlCellValue[][]
  rowCount: number
  executionTime: number
  error: string | null
}

export interface SampleDataset {
  id: string
  name: string
  description: string
  tables: string[]
  initSQL: string
  sampleQuery: string
}

export interface Concept {
  id: string
  name: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: 'SELECT' | 'JOIN' | 'AGGREGATE' | 'SUBQUERY' | 'NORMALIZATION' | 'WINDOW' | 'SET' | 'ADVANCED' | 'DML'
  shortDescription: string
  fullDescription: string
  visualizationType: 'venn' | 'flow' | 'table-structure'
  visualizationData: Record<string, any>
  sqlExample: string
  useCases: string[]
  relatedConcepts: string[]
  notes: string
}

export interface Term {
  id: string
  name: string
  category: 'DDL' | 'DML' | 'TCL' | 'DCL' | 'NORMALIZATION' | 'FUNCTION' | 'DATATYPE' | 'OPERATOR' | 'OTHER'
  definition: string
  syntax: string | null
  exampleSQL: string | null
  exampleResult: string | null
  relatedTerms: string[]
}

export interface QueryHistoryItem {
  sql: string
  timestamp: number
  rowCount: number
  success: boolean
}
