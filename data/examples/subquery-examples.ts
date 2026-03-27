// @TASK P0-T2 - 서브쿼리 예제
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { SQLExample } from '@/types'

export const subqueryExamples: SQLExample[] = [
  {
    id: 'SUBQ-001',
    title: '평균 급여보다 많이 받는 사원',
    description: '서브쿼리로 평균값을 계산한 후 이를 WHERE 조건으로 사용합니다.',
    category: '서브쿼리',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEES);',
    expectedDescription: '전체 평균 급여보다 많이 받는 모든 사원의 정보가 반환됩니다.'
  },
  {
    id: 'SUBQ-002',
    title: '개발팀 사원 목록 (서브쿼리)',
    description: '서브쿼리로 특정 부서ID를 찾아 WHERE 조건에 사용합니다.',
    category: '서브쿼리',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: "SELECT * FROM EMPLOYEES WHERE DEPT_ID = (SELECT DEPT_ID FROM DEPARTMENTS WHERE DEPT_NAME = '개발팀');",
    expectedDescription: '개발팀에 속한 모든 사원의 정보가 반환됩니다.'
  },
  {
    id: 'SUBQ-003',
    title: '부서별 최고 급여 사원',
    description: '다중값 서브쿼리를 사용하여 각 부서의 최고 급여자를 찾습니다.',
    category: '서브쿼리',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE (DEPT_ID, SALARY) IN (SELECT DEPT_ID, MAX(SALARY) FROM EMPLOYEES GROUP BY DEPT_ID);',
    expectedDescription: '각 부서에서 급여가 가장 높은 사원들이 반환됩니다.'
  },
  {
    id: 'SUBQ-004',
    title: '사원보다 급여가 높은 매니저',
    description: '상관 서브쿼리를 사용하여 각 사원과 비교합니다.',
    category: '서브쿼리',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES E WHERE SALARY < (SELECT SALARY FROM EMPLOYEES M WHERE M.EMP_ID = E.MANAGER_ID);',
    expectedDescription: '자신의 상사보다 급여가 낮은 사원들이 반환됩니다.'
  },
  {
    id: 'SUBQ-005',
    title: 'FROM절 서브쿼리 (Derived Table)',
    description: '서브쿼리 결과를 마치 테이블처럼 사용합니다.',
    category: '서브쿼리',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, AVG_SAL FROM (SELECT DEPT_ID, AVG(SALARY) AS AVG_SAL FROM EMPLOYEES GROUP BY DEPT_ID) AS DEPT_STATS WHERE AVG_SAL > 4500;',
    expectedDescription: '평균 급여가 4500 이상인 부서들의 부서ID와 평균 급여가 반환됩니다.'
  },
  {
    id: 'SUBQ-006',
    title: 'EXISTS를 사용한 존재 여부 확인',
    description: 'EXISTS로 조건을 만족하는 행이 존재하는지 확인합니다.',
    category: '서브쿼리',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES E WHERE EXISTS (SELECT 1 FROM DEPARTMENTS D WHERE D.DEPT_ID = E.DEPT_ID);',
    expectedDescription: '대응하는 부서가 존재하는 모든 사원이 반환됩니다.'
  },
  {
    id: 'SUBQ-007',
    title: 'NOT IN과 서브쿼리',
    description: '서브쿼리 결과에 포함되지 않는 행을 조회합니다.',
    category: '서브쿼리',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES WHERE DEPT_ID NOT IN (SELECT DEPT_ID FROM DEPARTMENTS);',
    expectedDescription: '부서가 정의되지 않은 사원들이 반환됩니다.'
  },
  {
    id: 'SUBQ-008',
    title: 'SELECT절 스칼라 서브쿼리',
    description: '각 행에 대해 서브쿼리를 실행하는 스칼라 서브쿼리입니다.',
    category: '서브쿼리',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME, SALARY, (SELECT AVG(SALARY) FROM EMPLOYEES) AS AVG_SALARY FROM EMPLOYEES;',
    expectedDescription: '각 사원의 급여와 함께 전체 평균 급여가 모든 행에 표시됩니다.'
  }
]
