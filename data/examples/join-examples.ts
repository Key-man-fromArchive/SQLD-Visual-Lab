// @TASK P0-T2 - JOIN 예제
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { SQLExample } from '@/types'

export const joinExamples: SQLExample[] = [
  {
    id: 'JOIN-001',
    title: '사원과 부서 정보 함께 조회 (INNER JOIN)',
    description: '두 테이블의 공통 값을 기준으로 데이터를 결합합니다.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT E.EMP_NAME, D.DEPT_NAME FROM EMPLOYEES E INNER JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID;',
    expectedDescription: '사원 이름과 해당 부서명이 함께 표시됩니다. 부서가 없는 사원은 제외됩니다.'
  },
  {
    id: 'JOIN-002',
    title: '모든 사원 + 부서 (LEFT JOIN)',
    description: 'LEFT 테이블의 모든 행을 포함하고, RIGHT 테이블은 매칭되는 행만 포함합니다.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT E.EMP_NAME, D.DEPT_NAME FROM EMPLOYEES E LEFT JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID;',
    expectedDescription: '모든 사원이 표시되며, 부서가 없는 사원의 DEPT_NAME은 NULL입니다.'
  },
  {
    id: 'JOIN-003',
    title: '부서별 사원 수 (JOIN + GROUP BY)',
    description: 'JOIN으로 데이터를 결합한 후 GROUP BY로 집계합니다.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT D.DEPT_NAME, COUNT(*) AS CNT FROM EMPLOYEES E JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID GROUP BY D.DEPT_NAME;',
    expectedDescription: '각 부서별로 소속된 사원의 수가 표시됩니다.'
  },
  {
    id: 'JOIN-004',
    title: '사원과 매니저 이름 (Self JOIN)',
    description: '동일한 테이블을 두 번 조인하여 계층 관계를 표현합니다.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT E.EMP_NAME AS 사원, M.EMP_NAME AS 매니저 FROM EMPLOYEES E LEFT JOIN EMPLOYEES M ON E.MANAGER_ID = M.EMP_ID;',
    expectedDescription: '각 사원과 그의 상사 이름이 함께 표시됩니다. 상사가 없으면 NULL입니다.'
  },
  {
    id: 'JOIN-005',
    title: '사원, 부서, 급여 등급 조회 (Multiple JOIN)',
    description: '여러 테이블을 JOIN하여 복합 정보를 조회합니다.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT E.EMP_NAME, D.DEPT_NAME, E.SALARY FROM EMPLOYEES E INNER JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID;',
    expectedDescription: '사원 이름, 부서명, 급여 정보가 함께 표시됩니다.'
  },
  {
    id: 'JOIN-006',
    title: '모든 부서와 해당 사원 수 (RIGHT JOIN)',
    description: 'RIGHT 테이블의 모든 행을 포함하고, LEFT 테이블은 매칭되는 행만 포함합니다.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT D.DEPT_NAME, COUNT(E.EMP_ID) AS CNT FROM EMPLOYEES E RIGHT JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID GROUP BY D.DEPT_NAME;',
    expectedDescription: '모든 부서가 표시되며, 사원이 없는 부서는 0으로 표시됩니다.'
  },
  {
    id: 'JOIN-007',
    title: '양쪽 모두 매칭되는 데이터만 (INNER JOIN)',
    description: '두 테이블 모두에 존재하는 데이터만 조회합니다.',
    category: 'JOIN',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT * FROM EMPLOYEES INNER JOIN DEPARTMENTS USING (DEPT_ID);',
    expectedDescription: '사원과 부서 정보가 모두 존재하는 행만 반환됩니다.'
  },
  {
    id: 'JOIN-008',
    title: '사원의 직속상사와 함께 조회 (Self JOIN with Filter)',
    description: 'Self JOIN을 사용하여 특정 조건의 계층 관계를 조회합니다.',
    category: 'JOIN',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT E.EMP_NAME, M.EMP_NAME AS MANAGER, M.SALARY AS MANAGER_SAL FROM EMPLOYEES E LEFT JOIN EMPLOYEES M ON E.MANAGER_ID = M.EMP_ID WHERE M.SALARY > 5000;',
    expectedDescription: '급여가 5000 이상인 상사를 가진 사원들이 표시됩니다.'
  }
]
