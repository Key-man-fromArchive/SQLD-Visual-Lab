// @TASK P0-T2 - SQL 예제 및 연습 문제 통합
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { selectBasicsExamples } from './select-basics'
import { whereConditionsExamples } from './where-conditions'
import { joinExamples } from './join-examples'
import { aggregateExamples } from './aggregate-examples'
import { subqueryExamples } from './subquery-examples'
import { windowExamples } from './window-examples'
import { dmlExamples } from './dml-examples'
import { setOperationExamples } from './set-operations'
import { sqlExercises } from './exercises'
import type { SQLExample, SQLExercise } from '@/types'

// 모든 학습 예제 통합
export const allExamples: SQLExample[] = [
  ...selectBasicsExamples,
  ...whereConditionsExamples,
  ...joinExamples,
  ...aggregateExamples,
  ...subqueryExamples,
  ...windowExamples,
  ...dmlExamples,
  ...setOperationExamples
]

// 카테고리별 예제 분류
export const examplesByCategory = {
  '선택 기초': selectBasicsExamples,
  'WHERE 조건': whereConditionsExamples,
  'JOIN': joinExamples,
  'GROUP BY': aggregateExamples,
  '서브쿼리': subqueryExamples,
  '윈도우 함수': windowExamples,
  'DML': dmlExamples,
  '집합 연산': setOperationExamples
}

// 난이도별 예제 분류
export const examplesByDifficulty = {
  beginner: allExamples.filter(e => e.difficulty === 'beginner'),
  intermediate: allExamples.filter(e => e.difficulty === 'intermediate'),
  advanced: allExamples.filter(e => e.difficulty === 'advanced')
}

// 데이터셋별 예제 분류
export const examplesByDataset = {
  employees: allExamples.filter(e => e.dataset === 'employees'),
  orders: allExamples.filter(e => e.dataset === 'orders'),
  school: allExamples.filter(e => e.dataset === 'school')
}

// 연습 문제 분류
export const exercisesByDifficulty = {
  beginner: sqlExercises.filter(e => e.difficulty === 'beginner'),
  intermediate: sqlExercises.filter(e => e.difficulty === 'intermediate'),
  advanced: sqlExercises.filter(e => e.difficulty === 'advanced')
}

export const exercisesByCategory = {
  '선택 기초': sqlExercises.filter(e => e.category === 'SELECT 기초'),
  'WHERE 조건': sqlExercises.filter(e => e.category === 'WHERE 조건'),
  'JOIN': sqlExercises.filter(e => e.category === 'JOIN'),
  'GROUP BY': sqlExercises.filter(e => e.category === 'GROUP BY'),
  '서브쿼리': sqlExercises.filter(e => e.category === '서브쿼리'),
  '윈도우 함수': sqlExercises.filter(e => e.category === '윈도우 함수'),
  'DML': sqlExercises.filter(e => e.category === 'DML'),
  '집합 연산': sqlExercises.filter(e => e.category === '집합 연산')
}

// 예제 개수 통계
export const exampleStats = {
  totalExamples: allExamples.length,
  totalExercises: sqlExercises.length,
  categories: Object.keys(examplesByCategory).length,
  beginnerCount: examplesByDifficulty.beginner.length,
  intermediateCount: examplesByDifficulty.intermediate.length,
  advancedCount: examplesByDifficulty.advanced.length,
  beginnerExercises: exercisesByDifficulty.beginner.length,
  intermediateExercises: exercisesByDifficulty.intermediate.length,
  advancedExercises: exercisesByDifficulty.advanced.length
}

// ID로 예제 검색
export function getExampleById(id: string): SQLExample | undefined {
  return allExamples.find(e => e.id === id)
}

// ID로 연습 문제 검색
export function getExerciseById(id: string): SQLExercise | undefined {
  return sqlExercises.find(e => e.id === id)
}

// 랜덤 예제 가져오기
export function getRandomExample(): SQLExample {
  return allExamples[Math.floor(Math.random() * allExamples.length)]
}

// 랜덤 연습 문제 가져오기
export function getRandomExercise(): SQLExercise {
  return sqlExercises[Math.floor(Math.random() * sqlExercises.length)]
}

// 특정 난이도 랜덤 예제
export function getRandomExampleByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): SQLExample {
  const examples = examplesByDifficulty[difficulty]
  return examples[Math.floor(Math.random() * examples.length)]
}

// 특정 난이도 랜덤 연습 문제
export function getRandomExerciseByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): SQLExercise {
  const exercises = exercisesByDifficulty[difficulty]
  return exercises[Math.floor(Math.random() * exercises.length)]
}

export { selectBasicsExamples, whereConditionsExamples, joinExamples, aggregateExamples, subqueryExamples, windowExamples, dmlExamples, setOperationExamples, sqlExercises }
