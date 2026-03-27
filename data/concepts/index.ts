// @TASK P3-R1-T1 - 개념 데이터 진입점 및 카테고리별 그룹핑
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'
import { selectConcepts } from './select'
import { joinConcepts } from './join'
import { aggregateConcepts } from './aggregate'
import { subqueryConcepts } from './subquery'
import { windowFunctionConcepts } from './window-functions'
import { setOperationConcepts } from './set-operations'
import { advancedConcepts } from './advanced'
import { dmlOperationConcepts } from './dml-operations'
import { additionalConcepts } from './additional'

export { selectConcepts } from './select'
export { joinConcepts } from './join'
export { aggregateConcepts } from './aggregate'
export { subqueryConcepts } from './subquery'
export { windowFunctionConcepts } from './window-functions'
export { setOperationConcepts } from './set-operations'
export { advancedConcepts } from './advanced'
export { dmlOperationConcepts } from './dml-operations'
export { additionalConcepts } from './additional'

/** 전체 개념 목록 (카테고리 순서 유지) */
export const allConcepts: Concept[] = [
  ...selectConcepts,
  ...additionalConcepts.filter(c => c.category === 'SELECT'),
  ...joinConcepts,
  ...aggregateConcepts,
  ...additionalConcepts.filter(c => c.category === 'AGGREGATE'),
  ...subqueryConcepts,
  ...windowFunctionConcepts,
  ...setOperationConcepts,
  ...advancedConcepts,
  ...additionalConcepts.filter(c => c.category === 'ADVANCED'),
  ...dmlOperationConcepts,
]

/** 카테고리 메타 정보 */
export const CATEGORY_META = {
  SELECT: { label: 'SELECT / 조회', icon: '🔍', order: 1 },
  JOIN: { label: 'JOIN / 결합', icon: '🔗', order: 2 },
  AGGREGATE: { label: '집계 함수', icon: '📊', order: 3 },
  SUBQUERY: { label: '서브쿼리', icon: '🔄', order: 4 },
  WINDOW: { label: '윈도우 함수', icon: '🪟', order: 5 },
  SET: { label: '집합 연산', icon: '∪', order: 6 },
  ADVANCED: { label: '고급 기법', icon: '⚡', order: 7 },
  DML: { label: 'DML 연산', icon: '✏️', order: 8 },
  NORMALIZATION: { label: '정규화', icon: '🗂️', order: 9 },
} as const

/** 카테고리별로 그룹핑된 개념 목록 */
export type ConceptCategory = Concept['category']

export interface ConceptGroup {
  category: ConceptCategory
  label: string
  icon: string
  concepts: Concept[]
}

export function getConceptsByCategory(): ConceptGroup[] {
  const categories = Object.keys(CATEGORY_META) as ConceptCategory[]
  return categories
    .map((category) => {
      const meta = CATEGORY_META[category]
      const concepts = allConcepts.filter((c) => c.category === category)
      return { category, label: meta.label, icon: meta.icon, concepts }
    })
    .filter((g) => g.concepts.length > 0)
    .sort((a, b) => CATEGORY_META[a.category].order - CATEGORY_META[b.category].order)
}

/** ID로 개념 찾기 */
export function findConceptById(id: string): Concept | undefined {
  return allConcepts.find((c) => c.id === id)
}
