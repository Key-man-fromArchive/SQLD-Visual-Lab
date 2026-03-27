'use client'

// @TASK P2-S1-T4 - 예제 탐색기 컴포넌트
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useState } from 'react'
import { SQLExample } from '@/types'

interface ExampleBrowserProps {
  onSelectExample: (sql: string) => void
  isOpen: boolean
  onToggle: () => void
}

type Category = SQLExample['category']

const DIFFICULTY_LABEL: Record<SQLExample['difficulty'], string> = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
}

const DIFFICULTY_COLOR: Record<SQLExample['difficulty'], string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
}

// 내장 예제 데이터 (data/examples/index.ts 생성 전 임시 하드코딩)
const BUILT_IN_EXAMPLES: SQLExample[] = [
  // SELECT 기초 (8개)
  {
    id: 'SELECT-001',
    title: '전체 사원 조회',
    description: '모든 사원의 정보를 조회합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES;',
    expectedDescription: 'EMPLOYEES 테이블의 모든 사원 정보가 반환됩니다.',
  },
  {
    id: 'SELECT-002',
    title: '사원 이름과 급여만 조회',
    description: '특정 컬럼만 선택하여 조회합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME, SALARY FROM EMPLOYEES;',
    expectedDescription: '사원의 이름(EMP_NAME)과 급여(SALARY) 두 개 컬럼만 반환됩니다.',
  },
  {
    id: 'SELECT-003',
    title: '급여가 5000 이상인 사원',
    description: 'WHERE 조건으로 급여 기준 필터링합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE SALARY >= 5000;',
    expectedDescription: '급여가 5000 이상인 사원들의 모든 정보가 반환됩니다.',
  },
  {
    id: 'SELECT-004',
    title: '개발팀(부서ID 20) 사원만 조회',
    description: '특정 부서의 사원만 조회합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE DEPT_ID = 20;',
    expectedDescription: '부서ID가 20인 개발팀 사원들의 정보가 반환됩니다.',
  },
  {
    id: 'SELECT-005',
    title: '사원을 급여 높은 순으로 정렬',
    description: 'ORDER BY로 결과를 내림차순 정렬합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES ORDER BY SALARY DESC;',
    expectedDescription: '모든 사원이 급여가 높은 순서대로 정렬되어 반환됩니다.',
  },
  {
    id: 'SELECT-006',
    title: '급여 상위 5명',
    description: 'LIMIT으로 상위 n개 행만 조회합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES ORDER BY SALARY DESC LIMIT 5;',
    expectedDescription: '급여가 높은 상위 5명의 사원 정보가 반환됩니다.',
  },
  {
    id: 'SELECT-007',
    title: '중복 없는 부서 목록',
    description: 'DISTINCT로 중복을 제거합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT DISTINCT DEPT_ID FROM EMPLOYEES;',
    expectedDescription: '각 부서ID가 한 번씩만 나타나는 고유한 부서 목록이 반환됩니다.',
  },
  {
    id: 'SELECT-008',
    title: "이름에 '김'이 포함된 사원",
    description: 'LIKE 패턴으로 부분 문자열 검색합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: "SELECT * FROM EMPLOYEES WHERE EMP_NAME LIKE '김%';",
    expectedDescription: "이름이 '김'으로 시작하는 모든 사원의 정보가 반환됩니다.",
  },
  // WHERE 조건 (6개)
  {
    id: 'WHERE-001',
    title: '급여 4000~6000 사이 (BETWEEN)',
    description: 'BETWEEN 연산자로 범위 조건을 지정합니다.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE SALARY BETWEEN 4000 AND 6000;',
    expectedDescription: '급여가 4000 이상 6000 이하인 사원들의 정보가 반환됩니다.',
  },
  {
    id: 'WHERE-002',
    title: '부서가 10, 20, 30인 사원 (IN)',
    description: 'IN 연산자로 여러 값 중 하나에 해당하는 행을 찾습니다.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE DEPT_ID IN (10, 20, 30);',
    expectedDescription: '부서ID가 10, 20, 또는 30인 사원들의 정보가 반환됩니다.',
  },
  {
    id: 'WHERE-003',
    title: '매니저가 없는 사원 (IS NULL)',
    description: 'IS NULL로 NULL 값을 확인합니다.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE MANAGER_ID IS NULL;',
    expectedDescription: '매니저가 지정되지 않은 사원들이 반환됩니다.',
  },
  {
    id: 'WHERE-004',
    title: '2015년 이후 입사자',
    description: '날짜 조건으로 특정 시점 이후 데이터를 조회합니다.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: "SELECT * FROM EMPLOYEES WHERE HIRE_DATE >= '2015-01-01';",
    expectedDescription: '2015년 1월 1일 이후에 입사한 모든 사원의 정보가 반환됩니다.',
  },
  {
    id: 'WHERE-005',
    title: '급여 5000 이상이고 개발팀인 사원 (AND)',
    description: 'AND 연산자로 여러 조건을 모두 만족하는 행을 찾습니다.',
    category: 'WHERE 조건',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE SALARY >= 5000 AND DEPT_ID = 20;',
    expectedDescription: '급여가 5000 이상이면서 개발팀(부서ID 20)인 사원들의 정보가 반환됩니다.',
  },
  {
    id: 'WHERE-006',
    title: '부장 또는 과장인 사원 (OR)',
    description: 'OR 연산자로 여러 조건 중 하나를 만족하는 행을 찾습니다.',
    category: 'WHERE 조건',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: "SELECT * FROM EMPLOYEES WHERE POSITION = '부장' OR POSITION = '과장';",
    expectedDescription: '직급이 부장 또는 과장인 모든 사원의 정보가 반환됩니다.',
  },
  // JOIN (4개)
  {
    id: 'JOIN-001',
    title: '사원과 부서 정보 함께 조회 (INNER JOIN)',
    description: '두 테이블의 공통 값을 기준으로 데이터를 결합합니다.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT E.EMP_NAME, D.DEPT_NAME FROM EMPLOYEES E INNER JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID;',
    expectedDescription: '사원 이름과 해당 부서명이 함께 표시됩니다.',
  },
  {
    id: 'JOIN-002',
    title: '모든 사원 + 부서 (LEFT JOIN)',
    description: 'LEFT 테이블의 모든 행을 포함합니다.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT E.EMP_NAME, D.DEPT_NAME FROM EMPLOYEES E LEFT JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID;',
    expectedDescription: '모든 사원이 표시되며, 부서가 없는 사원의 DEPT_NAME은 NULL입니다.',
  },
  {
    id: 'JOIN-003',
    title: '부서별 사원 수 (JOIN + GROUP BY)',
    description: 'JOIN으로 결합 후 GROUP BY로 집계합니다.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT D.DEPT_NAME, COUNT(*) AS CNT FROM EMPLOYEES E JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID GROUP BY D.DEPT_NAME;',
    expectedDescription: '각 부서별로 소속된 사원의 수가 표시됩니다.',
  },
  {
    id: 'JOIN-004',
    title: '사원과 매니저 이름 (Self JOIN)',
    description: '동일한 테이블을 두 번 조인하여 계층 관계를 표현합니다.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT E.EMP_NAME AS 사원, M.EMP_NAME AS 매니저 FROM EMPLOYEES E LEFT JOIN EMPLOYEES M ON E.MANAGER_ID = M.EMP_ID;',
    expectedDescription: '각 사원과 그의 상사 이름이 함께 표시됩니다.',
  },
  // GROUP BY (5개)
  {
    id: 'GROUPBY-001',
    title: '부서별 평균 급여',
    description: 'GROUP BY와 AVG()로 그룹별 평균을 계산합니다.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, AVG(SALARY) AS AVG_SAL FROM EMPLOYEES GROUP BY DEPT_ID;',
    expectedDescription: '각 부서의 평균 급여가 반환됩니다.',
  },
  {
    id: 'GROUPBY-002',
    title: '부서별 최고 급여',
    description: 'GROUP BY와 MAX()로 그룹별 최대값을 구합니다.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, MAX(SALARY) AS MAX_SAL FROM EMPLOYEES GROUP BY DEPT_ID;',
    expectedDescription: '각 부서에서 가장 높은 급여가 반환됩니다.',
  },
  {
    id: 'GROUPBY-003',
    title: '부서별 사원 수',
    description: 'GROUP BY와 COUNT()로 그룹 내 행 수를 셉니다.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, COUNT(*) AS CNT FROM EMPLOYEES GROUP BY DEPT_ID;',
    expectedDescription: '각 부서의 사원 수가 반환됩니다.',
  },
  {
    id: 'GROUPBY-004',
    title: '평균 급여 5000 이상인 부서 (HAVING)',
    description: 'HAVING 절로 집계 결과를 필터링합니다.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, AVG(SALARY) AS AVG_SAL FROM EMPLOYEES GROUP BY DEPT_ID HAVING AVG(SALARY) >= 5000;',
    expectedDescription: '평균 급여가 5000 이상인 부서만 반환됩니다.',
  },
  {
    id: 'GROUPBY-005',
    title: '직급별 급여 합계',
    description: 'GROUP BY로 직급별 급여 합계를 구합니다.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT POSITION, SUM(SALARY) AS TOTAL_SAL FROM EMPLOYEES GROUP BY POSITION ORDER BY TOTAL_SAL DESC;',
    expectedDescription: '각 직급의 급여 합계가 높은 순으로 반환됩니다.',
  },
  // 서브쿼리 (3개)
  {
    id: 'SUB-001',
    title: '평균 급여보다 높은 사원',
    description: '서브쿼리로 전체 평균 급여를 구한 후 비교합니다.',
    category: '서브쿼리',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEES);',
    expectedDescription: '전체 평균 급여보다 급여가 높은 사원들이 반환됩니다.',
  },
  {
    id: 'SUB-002',
    title: '가장 급여가 높은 사원',
    description: '서브쿼리로 최대값을 구한 후 해당 행을 조회합니다.',
    category: '서브쿼리',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE SALARY = (SELECT MAX(SALARY) FROM EMPLOYEES);',
    expectedDescription: '급여가 가장 높은 사원의 정보가 반환됩니다.',
  },
  {
    id: 'SUB-003',
    title: '개발팀 소속 사원의 평균보다 높은 사원',
    description: '서브쿼리로 특정 그룹의 평균을 구한 후 비교합니다.',
    category: '서브쿼리',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEES WHERE DEPT_ID = 20);',
    expectedDescription: '개발팀 평균 급여보다 급여가 높은 모든 사원이 반환됩니다.',
  },
]

const CATEGORIES: Category[] = [
  'SELECT 기초',
  'WHERE 조건',
  'JOIN',
  'GROUP BY',
  '서브쿼리',
  '윈도우 함수',
  'DML',
  '집합 연산',
]

function groupByCategory(examples: SQLExample[]): Map<Category, SQLExample[]> {
  const map = new Map<Category, SQLExample[]>()
  for (const cat of CATEGORIES) {
    const items = examples.filter((e) => e.category === cat)
    if (items.length > 0) map.set(cat, items)
  }
  return map
}

export default function ExampleBrowser({
  onSelectExample,
  isOpen,
  onToggle,
}: ExampleBrowserProps) {
  const [openCategories, setOpenCategories] = useState<Set<Category>>(
    new Set(['SELECT 기초'])
  )

  const grouped = groupByCategory(BUILT_IN_EXAMPLES)

  function toggleCategory(cat: Category) {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  if (!isOpen) return null

  return (
    <div
      className="border border-gray-200 rounded-lg bg-white overflow-hidden"
      aria-label="예제 탐색기"
    >
      {/* 패널 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700">학습 예제</h2>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
          aria-label="예제 패널 닫기"
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

      {/* 카테고리 아코디언 */}
      <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
        {CATEGORIES.map((cat) => {
          const items = grouped.get(cat)
          if (!items) return null
          const isExpanded = openCategories.has(cat)
          return (
            <div key={cat}>
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={isExpanded}
              >
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {cat}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400">{items.length}개</span>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {isExpanded && (
                <ul role="list">
                  {items.map((example) => (
                    <li key={example.id}>
                      <button
                        onClick={() => onSelectExample(example.sql)}
                        className="w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-blue-50 transition-colors group"
                        title={example.description}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-800 group-hover:text-blue-700 truncate">
                            {example.title}
                          </p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {example.description}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 text-xs px-1.5 py-0.5 rounded font-medium ${DIFFICULTY_COLOR[example.difficulty]}`}
                        >
                          {DIFFICULTY_LABEL[example.difficulty]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
