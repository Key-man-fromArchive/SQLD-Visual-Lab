// @TASK P0-T2 - WHERE 조건 예제
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { SQLExample } from '@/types'

export const whereConditionsExamples: SQLExample[] = [
  {
    id: 'WHERE-001',
    title: '급여 4000~6000 사이 (BETWEEN)',
    description: 'BETWEEN 연산자를 사용하여 범위 조건을 지정합니다.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE SALARY BETWEEN 4000 AND 6000;',
    expectedDescription: '급여가 4000 이상 6000 이하인 사원들의 정보가 반환됩니다.'
  },
  {
    id: 'WHERE-002',
    title: '부서가 10, 20, 30인 사원 (IN)',
    description: 'IN 연산자를 사용하여 여러 값 중 하나에 해당하는 행을 찾습니다.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE DEPT_ID IN (10, 20, 30);',
    expectedDescription: '부서ID가 10, 20, 또는 30인 사원들의 정보가 반환됩니다.'
  },
  {
    id: 'WHERE-003',
    title: '매니저가 없는 사원 (IS NULL)',
    description: 'IS NULL을 사용하여 NULL 값을 확인합니다.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE MANAGER_ID IS NULL;',
    expectedDescription: '매니저가 지정되지 않은 (MANAGER_ID가 NULL인) 사원들이 반환됩니다.'
  },
  {
    id: 'WHERE-004',
    title: '2015년 이후 입사자',
    description: '날짜 조건을 사용하여 특정 시점 이후의 데이터를 조회합니다.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: "SELECT * FROM EMPLOYEES WHERE HIRE_DATE >= '2015-01-01';",
    expectedDescription: '2015년 1월 1일 이후에 입사한 모든 사원의 정보가 반환됩니다.'
  },
  {
    id: 'WHERE-005',
    title: '급여 5000 이상이고 개발팀인 사원 (AND)',
    description: 'AND 연산자를 사용하여 여러 조건을 모두 만족하는 행을 찾습니다.',
    category: 'WHERE 조건',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE SALARY >= 5000 AND DEPT_ID = 20;',
    expectedDescription: '급여가 5000 이상이면서 개발팀(부서ID 20)인 사원들의 정보가 반환됩니다.'
  },
  {
    id: 'WHERE-006',
    title: '부장 또는 과장인 사원 (OR)',
    description: 'OR 연산자를 사용하여 여러 조건 중 하나를 만족하는 행을 찾습니다.',
    category: 'WHERE 조건',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: "SELECT * FROM EMPLOYEES WHERE POSITION = '부장' OR POSITION = '과장';",
    expectedDescription: '직급이 부장 또는 과장인 모든 사원의 정보가 반환됩니다.'
  },
  {
    id: 'WHERE-007',
    title: '숫자가 아닌 부서 조회 (NOT IN)',
    description: 'NOT IN을 사용하여 특정 값들을 제외합니다.',
    category: 'WHERE 조건',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE DEPT_ID NOT IN (10, 20);',
    expectedDescription: '부서ID가 10과 20이 아닌 다른 부서의 모든 사원이 반환됩니다.'
  },
  {
    id: 'WHERE-008',
    title: '매니저가 있는 사원 (IS NOT NULL)',
    description: 'IS NOT NULL을 사용하여 NULL이 아닌 값만 확인합니다.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE MANAGER_ID IS NOT NULL;',
    expectedDescription: '상사가 지정된 (MANAGER_ID가 NULL이 아닌) 모든 사원의 정보가 반환됩니다.'
  }
]
