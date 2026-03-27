// @TASK P0-T2 - SELECT 기초 예제
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { SQLExample } from '@/types'

export const selectBasicsExamples: SQLExample[] = [
  {
    id: 'SELECT-001',
    title: '전체 사원 조회',
    description: '모든 사원의 정보를 조회합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES;',
    expectedDescription: 'EMPLOYEES 테이블의 모든 사원 정보가 반환됩니다.'
  },
  {
    id: 'SELECT-002',
    title: '사원 이름과 급여만 조회',
    description: '사원의 이름과 급여 정보만 필요할 때 특정 컬럼을 선택합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME, SALARY FROM EMPLOYEES;',
    expectedDescription: '사원의 이름(EMP_NAME)과 급여(SALARY) 두 개 컬럼만 반환됩니다.'
  },
  {
    id: 'SELECT-003',
    title: '급여가 5000 이상인 사원',
    description: 'WHERE 조건을 사용하여 급여 기준으로 사원을 필터링합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE SALARY >= 5000;',
    expectedDescription: '급여가 5000 이상인 사원들의 모든 정보가 반환됩니다.'
  },
  {
    id: 'SELECT-004',
    title: '개발팀(부서ID 20) 사원만 조회',
    description: '특정 부서의 사원만 조회합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE DEPT_ID = 20;',
    expectedDescription: '부서ID가 20인 개발팀 사원들의 정보가 반환됩니다.'
  },
  {
    id: 'SELECT-005',
    title: '사원을 급여 높은 순으로 정렬',
    description: 'ORDER BY를 사용하여 결과를 정렬합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES ORDER BY SALARY DESC;',
    expectedDescription: '모든 사원이 급여가 높은 순서대로 정렬되어 반환됩니다.'
  },
  {
    id: 'SELECT-006',
    title: '급여 상위 5명',
    description: 'LIMIT를 사용하여 상위 n개 행만 조회합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES ORDER BY SALARY DESC LIMIT 5;',
    expectedDescription: '급여가 높은 상위 5명의 사원 정보가 반환됩니다.'
  },
  {
    id: 'SELECT-007',
    title: '중복 없는 부서 목록',
    description: 'DISTINCT를 사용하여 중복 제거합니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT DISTINCT DEPT_ID FROM EMPLOYEES;',
    expectedDescription: '각 부서ID가 한 번씩만 나타나는 고유한 부서 목록이 반환됩니다.'
  },
  {
    id: 'SELECT-008',
    title: "이름에 '김'이 포함된 사원",
    description: 'LIKE 패턴을 사용한 부분 문자열 검색입니다.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: "SELECT * FROM EMPLOYEES WHERE EMP_NAME LIKE '김%';",
    expectedDescription: "이름이 '김'으로 시작하는 모든 사원의 정보가 반환됩니다."
  }
]
