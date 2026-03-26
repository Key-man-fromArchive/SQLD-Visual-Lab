// @TASK P3-R1-T1 - 개념 데이터 진입점 및 카테고리별 그룹핑
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'
import { selectConcepts } from './select'
import { joinConcepts } from './join'
import { aggregateConcepts } from './aggregate'
import { subqueryConcepts } from './subquery'

export { selectConcepts } from './select'
export { joinConcepts } from './join'
export { aggregateConcepts } from './aggregate'
export { subqueryConcepts } from './subquery'

/** 전체 개념 목록 (카테고리 순서 유지) */
export const allConcepts: Concept[] = [
  ...selectConcepts,
  ...joinConcepts,
  ...aggregateConcepts,
  ...subqueryConcepts,
]

/** 카테고리 메타 정보 */
export const CATEGORY_META = {
  SELECT: { label: 'SELECT / 조회', icon: '🔍', order: 1 },
  JOIN: { label: 'JOIN / 결합', icon: '🔗', order: 2 },
  AGGREGATE: { label: '집계 함수', icon: '📊', order: 3 },
  SUBQUERY: { label: '서브쿼리', icon: '🔄', order: 4 },
  NORMALIZATION: { label: '정규화', icon: '🗂️', order: 5 },
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
