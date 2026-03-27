// @TASK P0-T2 - 집합 연산 예제
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { SQLExample } from '@/types'

export const setOperationExamples: SQLExample[] = [
  {
    id: 'SET-001',
    title: '두 쿼리 결합 (UNION)',
    description: '두 SELECT의 결과를 합치되 중복은 제거합니다.',
    category: '집합 연산',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME FROM EMPLOYEES WHERE SALARY > 5000 UNION SELECT EMP_NAME FROM EMPLOYEES WHERE POSITION = \'부장\';',
    expectedDescription: '급여가 5000 이상이거나 부장인 사원들의 이름이 중복 없이 반환됩니다.'
  },
  {
    id: 'SET-002',
    title: '중복 포함 결합 (UNION ALL)',
    description: '두 SELECT의 결과를 합치며 중복을 포함합니다.',
    category: '집합 연산',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME FROM EMPLOYEES WHERE SALARY > 5000 UNION ALL SELECT EMP_NAME FROM EMPLOYEES WHERE POSITION = \'부장\';',
    expectedDescription: '급여가 5000 이상이거나 부장인 사원들의 이름이 중복을 포함하여 반환됩니다.'
  },
  {
    id: 'SET-003',
    title: '교집합 (INTERSECT)',
    description: '두 쿼리의 공통 결과만 반환합니다.',
    category: '집합 연산',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME FROM EMPLOYEES WHERE SALARY > 5000 INTERSECT SELECT EMP_NAME FROM EMPLOYEES WHERE POSITION = \'부장\';',
    expectedDescription: '급여가 5000 이상이면서 동시에 부장인 사원들의 이름만 반환됩니다.'
  },
  {
    id: 'SET-004',
    title: '차집합 (EXCEPT)',
    description: '첫 번째 쿼리 결과에서 두 번째 쿼리 결과를 뺍니다.',
    category: '집합 연산',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME FROM EMPLOYEES WHERE SALARY > 5000 EXCEPT SELECT EMP_NAME FROM EMPLOYEES WHERE POSITION = \'부장\';',
    expectedDescription: '급여가 5000 이상이지만 부장이 아닌 사원들의 이름이 반환됩니다.'
  },
  {
    id: 'SET-005',
    title: '여러 UNION 조합',
    description: '3개 이상의 SELECT 결과를 조합합니다.',
    category: '집합 연산',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME, \'높은급여\' AS CATEGORY FROM EMPLOYEES WHERE SALARY > 6000 UNION SELECT EMP_NAME, \'중간급여\' FROM EMPLOYEES WHERE SALARY BETWEEN 4000 AND 6000 UNION SELECT EMP_NAME, \'낮은급여\' FROM EMPLOYEES WHERE SALARY < 4000;',
    expectedDescription: '모든 사원이 급여 수준별로 분류되어 표시됩니다.'
  },
  {
    id: 'SET-006',
    title: 'UNION with ORDER BY',
    description: 'UNION 결과를 정렬합니다.',
    category: '집합 연산',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME, SALARY FROM EMPLOYEES WHERE DEPT_ID = 10 UNION SELECT EMP_NAME, SALARY FROM EMPLOYEES WHERE DEPT_ID = 20 ORDER BY SALARY DESC;',
    expectedDescription: '부서 10과 20의 사원들이 급여 높은 순서대로 정렬되어 반환됩니다.'
  },
  {
    id: 'SET-007',
    title: '부서별 최고 급여 비교 (INTERSECT)',
    description: '여러 부서의 공통 급여 수준을 찾습니다.',
    category: '집합 연산',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT DISTINCT SALARY FROM EMPLOYEES WHERE DEPT_ID = 10 INTERSECT SELECT DISTINCT SALARY FROM EMPLOYEES WHERE DEPT_ID = 20;',
    expectedDescription: '부서 10과 20에 모두 존재하는 급여 수준들이 반환됩니다.'
  },
  {
    id: 'SET-008',
    title: '특정 조건의 데이터 분리 (EXCEPT)',
    description: 'EXCEPT를 사용하여 조건에 맞지 않는 데이터를 제외합니다.',
    category: '집합 연산',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT EMP_ID FROM EMPLOYEES EXCEPT SELECT MANAGER_ID FROM EMPLOYEES WHERE MANAGER_ID IS NOT NULL;',
    expectedDescription: '부하직원이 없는 사원들의 ID만 반환됩니다.'
  }
]
