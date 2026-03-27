// @TASK P0-T2 - GROUP BY 및 집계 예제
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { SQLExample } from '@/types'

export const aggregateExamples: SQLExample[] = [
  {
    id: 'AGG-001',
    title: '전체 사원 수',
    description: 'COUNT 함수를 사용하여 행의 개수를 계산합니다.',
    category: 'GROUP BY',
    difficulty: 'beginner',
    dataset: 'employees',
    sql: 'SELECT COUNT(*) FROM EMPLOYEES;',
    expectedDescription: '전체 사원의 총 개수가 하나의 숫자로 반환됩니다.'
  },
  {
    id: 'AGG-002',
    title: '부서별 평균 급여',
    description: 'GROUP BY로 부서별로 그룹화한 후 AVG 함수로 평균을 계산합니다.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, AVG(SALARY) AS AVG_SAL FROM EMPLOYEES GROUP BY DEPT_ID;',
    expectedDescription: '각 부서별 평균 급여가 부서ID와 함께 표시됩니다.'
  },
  {
    id: 'AGG-003',
    title: '부서별 최고/최저 급여',
    description: 'GROUP BY와 MAX, MIN 함수를 함께 사용합니다.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, MAX(SALARY) AS MAX_SAL, MIN(SALARY) AS MIN_SAL FROM EMPLOYEES GROUP BY DEPT_ID;',
    expectedDescription: '각 부서의 최고 급여와 최저 급여가 함께 표시됩니다.'
  },
  {
    id: 'AGG-004',
    title: '평균 급여 5000 이상인 부서 (HAVING)',
    description: 'HAVING을 사용하여 그룹화된 결과에 조건을 적용합니다.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, AVG(SALARY) AS AVG_SAL FROM EMPLOYEES GROUP BY DEPT_ID HAVING AVG(SALARY) >= 5000;',
    expectedDescription: '평균 급여가 5000 이상인 부서들만 표시됩니다.'
  },
  {
    id: 'AGG-005',
    title: '직급별 사원 수와 총 급여',
    description: 'GROUP BY로 여러 집계 함수를 동시에 계산합니다.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT POSITION, COUNT(*) AS CNT, SUM(SALARY) AS TOTAL FROM EMPLOYEES GROUP BY POSITION;',
    expectedDescription: '각 직급별로 사원 수와 총 급여액이 표시됩니다.'
  },
  {
    id: 'AGG-006',
    title: '부서별 사원 수 (정렬 포함)',
    description: 'GROUP BY 결과를 정렬하여 가독성을 높입니다.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, COUNT(*) AS CNT FROM EMPLOYEES GROUP BY DEPT_ID ORDER BY CNT DESC;',
    expectedDescription: '부서별 사원 수가 많은 순서대로 정렬되어 표시됩니다.'
  },
  {
    id: 'AGG-007',
    title: '부서별 사원 수 필터링 (HAVING with JOIN)',
    description: 'JOIN과 HAVING을 함께 사용하여 복합 조건을 처리합니다.',
    category: 'GROUP BY',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT D.DEPT_NAME, COUNT(E.EMP_ID) AS CNT FROM EMPLOYEES E JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID GROUP BY D.DEPT_NAME HAVING COUNT(E.EMP_ID) > 3;',
    expectedDescription: '사원이 3명 이상인 부서들만 부서명과 함께 표시됩니다.'
  },
  {
    id: 'AGG-008',
    title: '월별 입사 사원 수',
    description: 'DATE 함수로 날짜를 추출한 후 GROUP BY를 적용합니다.',
    category: 'GROUP BY',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT DATE_TRUNC(\'month\', HIRE_DATE) AS MONTH, COUNT(*) AS CNT FROM EMPLOYEES GROUP BY DATE_TRUNC(\'month\', HIRE_DATE) ORDER BY MONTH;',
    expectedDescription: '월별로 입사한 사원의 수가 표시됩니다.'
  },
  {
    id: 'AGG-009',
    title: '다중 그룹 집계',
    description: '여러 컬럼으로 그룹화하여 세분화된 분석을 수행합니다.',
    category: 'GROUP BY',
    difficulty: 'advanced',
    dataset: 'employees',
    sql: 'SELECT DEPT_ID, POSITION, COUNT(*) AS CNT, AVG(SALARY) AS AVG_SAL FROM EMPLOYEES GROUP BY DEPT_ID, POSITION ORDER BY DEPT_ID;',
    expectedDescription: '부서와 직급 조합별로 사원 수와 평균 급여가 표시됩니다.'
  }
]
