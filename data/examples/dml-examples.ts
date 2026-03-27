// @TASK P0-T2 - DML 예제
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { SQLExample } from '@/types'

export const dmlExamples: SQLExample[] = [
  {
    id: 'DML-001',
    title: '새 사원 추가 (INSERT)',
    description: '새로운 사원 정보를 EMPLOYEES 테이블에 추가합니다.',
    category: 'DML',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: "INSERT INTO EMPLOYEES (EMP_ID, EMP_NAME, DEPT_ID, POSITION, SALARY, HIRE_DATE, MANAGER_ID) VALUES (1021, '신입사원', 20, '사원', 3000, '2026-03-01', 1005);",
    expectedDescription: '새로운 사원 1명이 EMPLOYEES 테이블에 추가됩니다.'
  },
  {
    id: 'DML-002',
    title: '급여 인상 (UPDATE)',
    description: '사원급의 급여를 10% 인상합니다.',
    category: 'DML',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: "UPDATE EMPLOYEES SET SALARY = SALARY * 1.1 WHERE POSITION = '사원';",
    expectedDescription: '직급이 사원인 모든 직원의 급여가 10% 인상됩니다.'
  },
  {
    id: 'DML-003',
    title: '퇴사자 삭제 (DELETE)',
    description: '특정 사원의 정보를 삭제합니다.',
    category: 'DML',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'DELETE FROM EMPLOYEES WHERE EMP_ID = 1021;',
    expectedDescription: 'EMP_ID가 1021인 사원의 정보가 EMPLOYEES 테이블에서 삭제됩니다.'
  },
  {
    id: 'DML-004',
    title: '다중 행 INSERT',
    description: '여러 사원을 한 번에 추가합니다.',
    category: 'DML',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: "INSERT INTO EMPLOYEES (EMP_ID, EMP_NAME, DEPT_ID, POSITION, SALARY, HIRE_DATE) VALUES (1022, '김신입', 10, '사원', 3200, '2026-03-01'), (1023, '이신입', 20, '사원', 3100, '2026-03-02');",
    expectedDescription: '2명의 새로운 사원이 한 번의 INSERT 문으로 추가됩니다.'
  },
  {
    id: 'DML-005',
    title: '조건부 UPDATE',
    description: '특정 부서의 모든 사원 급여를 인상합니다.',
    category: 'DML',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'UPDATE EMPLOYEES SET SALARY = SALARY + 500 WHERE DEPT_ID = 20;',
    expectedDescription: '부서ID가 20인 개발팀 모든 사원의 급여가 500 인상됩니다.'
  },
  {
    id: 'DML-006',
    title: '조건부 DELETE',
    description: '특정 기간 이전에 입사한 사원을 삭제합니다.',
    category: 'DML',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: "DELETE FROM EMPLOYEES WHERE HIRE_DATE < '2015-01-01';",
    expectedDescription: '2015년 1월 1일 이전에 입사한 모든 사원이 삭제됩니다.'
  },
  {
    id: 'DML-007',
    title: '부서별 일괄 승진',
    description: '부서별로 다른 급여 인상을 적용합니다.',
    category: 'DML',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'UPDATE EMPLOYEES SET POSITION = \'과장\' WHERE DEPT_ID = 20 AND POSITION = \'사원\';',
    expectedDescription: '개발팀의 사원급 직원들이 일괄적으로 과장으로 승진합니다.'
  },
  {
    id: 'DML-008',
    title: 'UPDATE with JOIN',
    description: 'JOIN을 사용한 조건부 UPDATE입니다.',
    category: 'DML',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'UPDATE EMPLOYEES SET SALARY = SALARY * 1.15 FROM EMPLOYEES E JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID WHERE D.DEPT_NAME = \'개발팀\';',
    expectedDescription: '개발팀의 모든 사원 급여가 15% 인상됩니다.'
  }
]
