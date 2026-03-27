'use client'

// @TASK P2-S1-T4 - 연습 문제 모드 컴포넌트
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useState } from 'react'
import { SQLExercise } from '@/types'

interface ExerciseModeProps {
  onLoadSQL: (sql: string) => void
  isOpen: boolean
  onToggle: () => void
}

const DIFFICULTY_LABEL: Record<SQLExercise['difficulty'], string> = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
}

const DIFFICULTY_COLOR: Record<SQLExercise['difficulty'], string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
}

// 내장 연습 문제 데이터 (data/exercises 생성 전 임시 하드코딩)
const BUILT_IN_EXERCISES: SQLExercise[] = [
  {
    id: 'EX-001',
    title: 'HR 팀 전체 사원 조회',
    description: 'DEPT_ID가 10인 HR 팀 사원들을 모두 조회하세요.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    hint: 'WHERE 절을 사용하고, DEPT_ID = 10 조건을 추가해보세요.',
    answer: 'SELECT * FROM EMPLOYEES WHERE DEPT_ID = 10;',
    expectedDescription: '부서ID가 10인 HR 팀 사원들의 전체 정보가 반환됩니다.',
  },
  {
    id: 'EX-002',
    title: '사원 이름과 직급만 조회',
    description: 'EMPLOYEES 테이블에서 EMP_NAME과 POSITION 두 컬럼만 조회하세요.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    hint: 'SELECT 다음에 원하는 컬럼명을 콤마(,)로 구분하여 나열하세요.',
    answer: 'SELECT EMP_NAME, POSITION FROM EMPLOYEES;',
    expectedDescription: '사원의 이름과 직급 두 가지 정보만 반환됩니다.',
  },
  {
    id: 'EX-003',
    title: '급여 기준 오름차순 정렬',
    description: '모든 사원을 급여가 낮은 순서부터 높은 순서로 조회하세요.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    hint: 'ORDER BY 절을 사용하고, ASC (오름차순)를 적용해보세요.',
    answer: 'SELECT * FROM EMPLOYEES ORDER BY SALARY ASC;',
    expectedDescription: '급여가 낮은 사원부터 순서대로 조회됩니다.',
  },
  {
    id: 'EX-004',
    title: 'BETWEEN으로 급여 범위 조회',
    description: '급여가 3000 이상 5000 이하인 사원들을 조회하세요.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    hint: 'WHERE SALARY BETWEEN ... AND ... 형식을 사용하세요.',
    answer: 'SELECT * FROM EMPLOYEES WHERE SALARY BETWEEN 3000 AND 5000;',
    expectedDescription: '급여가 3000 이상 5000 이하인 사원 목록이 반환됩니다.',
  },
  {
    id: 'EX-005',
    title: 'NULL 체크 (IS NULL)',
    description: 'MANAGER_ID가 없는(NULL인) 사원들을 조회하세요.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    hint: 'NULL 값은 = 연산자가 아닌 IS NULL로 확인해야 합니다.',
    answer: 'SELECT * FROM EMPLOYEES WHERE MANAGER_ID IS NULL;',
    expectedDescription: '상위 관리자가 없는 최상위 직급 사원들이 반환됩니다.',
  },
  {
    id: 'EX-006',
    title: '부서별 사원 수 집계',
    description: '각 부서(DEPT_ID)별로 사원이 몇 명인지 COUNT하세요.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'GROUP BY DEPT_ID를 사용하고, COUNT(*)로 행 수를 집계하세요.',
    answer: 'SELECT DEPT_ID, COUNT(*) AS EMP_COUNT FROM EMPLOYEES GROUP BY DEPT_ID ORDER BY DEPT_ID;',
    expectedDescription: '각 부서의 사원 수가 부서ID와 함께 반환됩니다.',
  },
  {
    id: 'EX-007',
    title: 'HAVING으로 인원 많은 부서 필터',
    description: '사원이 3명 이상인 부서만 조회하세요.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'GROUP BY 후 HAVING COUNT(*) >= 3 으로 필터링하세요.',
    answer: 'SELECT DEPT_ID, COUNT(*) AS CNT FROM EMPLOYEES GROUP BY DEPT_ID HAVING COUNT(*) >= 3;',
    expectedDescription: '사원이 3명 이상인 부서 목록과 사원 수가 반환됩니다.',
  },
  {
    id: 'EX-008',
    title: 'INNER JOIN으로 부서명 조회',
    description: '사원 이름과 해당 사원이 속한 부서명(DEPT_NAME)을 함께 조회하세요.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'EMPLOYEES와 DEPARTMENTS를 INNER JOIN하고, DEPT_ID로 연결하세요.',
    answer: 'SELECT E.EMP_NAME, D.DEPT_NAME FROM EMPLOYEES E INNER JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID;',
    expectedDescription: '각 사원의 이름과 소속 부서명이 함께 반환됩니다.',
  },
  {
    id: 'EX-009',
    title: '서브쿼리 - 평균 이상 급여',
    description: '전체 사원의 평균 급여보다 급여가 높은 사원들을 조회하세요.',
    category: '서브쿼리',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEES) 형식을 사용하세요.',
    answer: 'SELECT EMP_NAME, SALARY FROM EMPLOYEES WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEES) ORDER BY SALARY DESC;',
    expectedDescription: '전체 평균보다 급여가 높은 사원들이 이름과 급여와 함께 반환됩니다.',
  },
  {
    id: 'EX-010',
    title: 'LEFT JOIN으로 부서 없는 사원 찾기',
    description: '부서에 배정되지 않은 사원(DEPT_NAME이 NULL)을 찾으세요.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'LEFT JOIN 후 WHERE D.DEPT_ID IS NULL 조건을 추가하세요.',
    answer: 'SELECT E.EMP_NAME, E.DEPT_ID FROM EMPLOYEES E LEFT JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID WHERE D.DEPT_ID IS NULL;',
    expectedDescription: '부서 테이블에 매칭되는 부서가 없는 사원들이 반환됩니다.',
  },
]

export default function ExerciseMode({
  onLoadSQL,
  isOpen,
  onToggle,
}: ExerciseModeProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  const selected = BUILT_IN_EXERCISES.find((e) => e.id === selectedId) ?? null

  function handleSelect(id: string) {
    setSelectedId(id)
    setShowHint(false)
    setShowAnswer(false)
  }

  function handleTrySelf() {
    onLoadSQL('')
    if (selectedId) {
      setCompletedIds((prev) => new Set([...prev, selectedId]))
    }
  }

  function handleLoadAnswer() {
    if (selected) {
      onLoadSQL(selected.answer)
      setCompletedIds((prev) => new Set([...prev, selected.id]))
    }
  }

  if (!isOpen) return null

  const total = BUILT_IN_EXERCISES.length
  const done = completedIds.size

  return (
    <div
      className="border border-gray-200 rounded-lg bg-white overflow-hidden"
      aria-label="연습 문제 모드"
    >
      {/* 패널 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-gray-700">연습 문제</h2>
          {/* 진행 상태 */}
          <div className="flex items-center gap-1.5">
            <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">
              {done}/{total} 완료
            </span>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
          aria-label="연습 문제 패널 닫기"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* 문제 목록 */}
        <div className="sm:w-56 border-b sm:border-b-0 sm:border-r border-gray-100 max-h-64 sm:max-h-72 overflow-y-auto">
          <ul role="list" className="divide-y divide-gray-50">
            {BUILT_IN_EXERCISES.map((ex, idx) => {
              const isSelected = selectedId === ex.id
              const isDone = completedIds.has(ex.id)
              return (
                <li key={ex.id}>
                  <button
                    onClick={() => handleSelect(ex.id)}
                    className={`w-full flex items-start gap-2 px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? 'bg-blue-50 border-r-2 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 ${
                        isDone
                          ? 'bg-green-100 text-green-700'
                          : isSelected
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                      aria-label={isDone ? '완료' : `문제 ${idx + 1}`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-medium truncate ${
                          isSelected ? 'text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {ex.title}
                      </p>
                      <span
                        className={`inline-block text-xs px-1 py-0.5 rounded mt-0.5 font-medium ${DIFFICULTY_COLOR[ex.difficulty]}`}
                      >
                        {DIFFICULTY_LABEL[ex.difficulty]}
                      </span>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* 문제 상세 */}
        <div className="flex-1 p-4 min-h-0">
          {selected ? (
            <div className="flex flex-col gap-3">
              {/* 문제 설명 */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded font-medium ${DIFFICULTY_COLOR[selected.difficulty]}`}
                  >
                    {DIFFICULTY_LABEL[selected.difficulty]}
                  </span>
                  <span className="text-xs text-gray-400">{selected.category}</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {selected.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selected.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  데이터셋: <span className="font-medium text-gray-500">{selected.dataset.toUpperCase()}</span>
                </p>
              </div>

              {/* 힌트 토글 */}
              <div>
                <button
                  onClick={() => setShowHint((v) => !v)}
                  className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors"
                  aria-expanded={showHint}
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${showHint ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  힌트 {showHint ? '숨기기' : '보기'}
                </button>
                {showHint && (
                  <p className="mt-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2 leading-relaxed">
                    {selected.hint}
                  </p>
                )}
              </div>

              {/* 정답 토글 */}
              <div>
                <button
                  onClick={() => setShowAnswer((v) => !v)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors"
                  aria-expanded={showAnswer}
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${showAnswer ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  정답 {showAnswer ? '숨기기' : '보기'}
                </button>
                {showAnswer && (
                  <pre className="mt-1.5 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded px-3 py-2 overflow-x-auto whitespace-pre-wrap">
                    {selected.answer}
                  </pre>
                )}
              </div>

              {/* 액션 버튼 */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={handleTrySelf}
                  className="flex-1 min-w-0 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                >
                  직접 풀어보기
                </button>
                <button
                  onClick={handleLoadAnswer}
                  className="flex-1 min-w-0 px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                >
                  정답을 에디터에 입력
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <svg
                className="w-8 h-8 text-gray-300 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-xs text-gray-400">왼쪽에서 문제를 선택하세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
