// @TASK P0-T2 - 윈도우 함수 예제
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { SQLExample } from '@/types'

export const windowExamples: SQLExample[] = [
  {
    id: 'WIN-001',
    title: '사원 급여 순위 (ROW_NUMBER)',
    description: 'ROW_NUMBER로 중복 없는 순위를 매깁니다.',
    category: '윈도우 함수',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME, SALARY, ROW_NUMBER() OVER (ORDER BY SALARY DESC) AS RANK FROM EMPLOYEES;',
    expectedDescription: '모든 사원이 급여 높은 순서대로 1부터 시작하는 순위를 부여받습니다.'
  },
  {
    id: 'WIN-002',
    title: '급여 동점 처리 순위 (RANK)',
    description: 'RANK로 동일한 값은 같은 순위를 부여합니다.',
    category: '윈도우 함수',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME, SALARY, RANK() OVER (ORDER BY SALARY DESC) AS RANK FROM EMPLOYEES;',
    expectedDescription: '같은 급여의 사원은 같은 순위를 가지며, 다음 순위는 건너뜁니다.'
  },
  {
    id: 'WIN-003',
    title: '급여 백분율 순위 (PERCENT_RANK)',
    description: 'PERCENT_RANK로 백분율 기반 순위를 매깁니다.',
    category: '윈도우 함수',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME, SALARY, PERCENT_RANK() OVER (ORDER BY SALARY DESC) AS PCT_RANK FROM EMPLOYEES;',
    expectedDescription: '각 사원의 백분율 기반 순위(0~1 사이의 값)가 표시됩니다.'
  },
  {
    id: 'WIN-004',
    title: '부서별 급여 순위 (PARTITION BY)',
    description: 'PARTITION BY로 부서별로 개별 순위를 매깁니다.',
    category: '윈도우 함수',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, EMP_NAME, SALARY, RANK() OVER (PARTITION BY DEPT_ID ORDER BY SALARY DESC) AS DEPT_RANK FROM EMPLOYEES;',
    expectedDescription: '각 부서 내에서 급여 높은 순서대로 순위가 매겨집니다.'
  },
  {
    id: 'WIN-005',
    title: '누적 급여 합계 (SUM OVER)',
    description: 'SUM과 윈도우 함수로 누적 합계를 계산합니다.',
    category: '윈도우 함수',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME, SALARY, SUM(SALARY) OVER (ORDER BY EMP_ID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS CUM_SALARY FROM EMPLOYEES;',
    expectedDescription: '입사 순서대로 누적된 급여 합계가 표시됩니다.'
  },
  {
    id: 'WIN-006',
    title: '이전/다음 행 데이터 조회 (LAG/LEAD)',
    description: 'LAG/LEAD로 이전/다음 행의 데이터를 가져옵니다.',
    category: '윈도우 함수',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME, SALARY, LAG(SALARY) OVER (ORDER BY SALARY) AS PREV_SAL, LEAD(SALARY) OVER (ORDER BY SALARY) AS NEXT_SAL FROM EMPLOYEES;',
    expectedDescription: '각 사원의 급여와 함께 급여순 이전/다음 사원의 급여가 표시됩니다.'
  },
  {
    id: 'WIN-007',
    title: '급여 분위 구분 (NTILE)',
    description: 'NTILE로 전체 데이터를 n개 그룹으로 나눕니다.',
    category: '윈도우 함수',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT EMP_NAME, SALARY, NTILE(4) OVER (ORDER BY SALARY DESC) AS QUARTILE FROM EMPLOYEES;',
    expectedDescription: '모든 사원이 급여에 따라 4개 분위로 구분됩니다.'
  },
  {
    id: 'WIN-008',
    title: '부서별 평균 대비 비율 (AVG OVER)',
    description: '윈도우 함수로 부서별 평균을 계산하여 비교합니다.',
    category: '윈도우 함수',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, EMP_NAME, SALARY, AVG(SALARY) OVER (PARTITION BY DEPT_ID) AS DEPT_AVG FROM EMPLOYEES;',
    expectedDescription: '각 사원의 급여와 함께 해당 부서의 평균 급여가 표시됩니다.'
  }
]
