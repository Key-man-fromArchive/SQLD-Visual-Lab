// @TASK P0-T2 - SQL 연습 문제
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { SQLExercise } from '@/types'

export const sqlExercises: SQLExercise[] = [
  {
    id: 'EX-001',
    title: '전체 부서 목록 조회',
    description: '모든 부서의 정보를 조회하세요.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    hint: 'DEPARTMENTS 테이블을 사용하세요.',
    answer: 'SELECT * FROM DEPARTMENTS;',
    expectedDescription: 'DEPARTMENTS 테이블의 모든 부서 정보가 반환됩니다.'
  },
  {
    id: 'EX-002',
    title: '급여가 7000 이상인 사원의 이름과 급여',
    description: '급여가 7000 이상인 사원의 이름과 급여를 조회하세요.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    hint: 'WHERE절과 >= 연산자를 사용하세요.',
    answer: 'SELECT EMP_NAME, SALARY FROM EMPLOYEES WHERE SALARY >= 7000;',
    expectedDescription: '급여가 7000 이상인 사원들의 이름과 급여가 반환됩니다.'
  },
  {
    id: 'EX-003',
    title: '사원을 입사일 순으로 정렬',
    description: '모든 사원을 입사일 순으로 정렬하여 조회하세요.',
    category: 'SELECT 기초',
    difficulty: 'beginner',
    dataset: 'employees',
    hint: 'ORDER BY를 사용하여 HIRE_DATE로 정렬하세요.',
    answer: 'SELECT * FROM EMPLOYEES ORDER BY HIRE_DATE ASC;',
    expectedDescription: '입사일이 빠른 순서대로 사원들이 정렬되어 반환됩니다.'
  },
  {
    id: 'EX-004',
    title: '각 부서의 사원 수 계산',
    description: '각 부서별로 몇 명의 사원이 있는지 계산하세요.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'GROUP BY와 COUNT 함수를 사용하세요.',
    answer: 'SELECT DEPT_ID, COUNT(*) AS EMP_COUNT FROM EMPLOYEES GROUP BY DEPT_ID;',
    expectedDescription: '각 부서별로 사원의 수가 집계되어 반환됩니다.'
  },
  {
    id: 'EX-005',
    title: '사원과 부서명을 함께 조회',
    description: '사원의 이름과 해당 부서명을 조회하세요.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'EMPLOYEES와 DEPARTMENTS 테이블을 JOIN하세요.',
    answer: 'SELECT E.EMP_NAME, D.DEPT_NAME FROM EMPLOYEES E JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID;',
    expectedDescription: '사원 이름과 해당 부서명이 함께 표시됩니다.'
  },
  {
    id: 'EX-006',
    title: '평균 급여보다 많이 받는 사원 찾기',
    description: '평균 급여보다 많이 받는 사원들을 조회하세요.',
    category: '서브쿼리',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: '서브쿼리로 평균 급여를 계산한 후 WHERE 조건에 사용하세요.',
    answer: 'SELECT * FROM EMPLOYEES WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEES);',
    expectedDescription: '전체 평균 급여보다 많이 받는 사원들이 반환됩니다.'
  },
  {
    id: 'EX-007',
    title: '평균 급여 5000 이상인 부서 찾기',
    description: '평균 급여가 5000 이상인 부서를 찾으세요.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'HAVING을 사용하여 그룹 조건을 적용하세요.',
    answer: 'SELECT DEPT_ID, AVG(SALARY) FROM EMPLOYEES GROUP BY DEPT_ID HAVING AVG(SALARY) >= 5000;',
    expectedDescription: '평균 급여가 5000 이상인 부서들만 표시됩니다.'
  },
  {
    id: 'EX-008',
    title: '각 부서에서 급여가 가장 높은 사원',
    description: '각 부서별로 급여가 가장 높은 사원을 찾으세요.',
    category: '서브쿼리',
    difficulty: 'advanced',
    dataset: 'employees',
    hint: '서브쿼리로 부서별 최고 급여를 구하거나 윈도우 함수를 사용할 수 있습니다.',
    answer: 'SELECT * FROM EMPLOYEES WHERE (DEPT_ID, SALARY) IN (SELECT DEPT_ID, MAX(SALARY) FROM EMPLOYEES GROUP BY DEPT_ID);',
    expectedDescription: '각 부서에서 급여가 가장 높은 사원들이 반환됩니다.'
  },
  {
    id: 'EX-009',
    title: '사원과 그 사원의 매니저 이름 함께 조회',
    description: '사원과 해당 사원의 직속상사 이름을 함께 조회하세요.',
    category: 'JOIN',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'Self JOIN을 사용하여 EMPLOYEES 테이블을 자신과 조인하세요.',
    answer: 'SELECT E.EMP_NAME AS 사원, M.EMP_NAME AS 매니저 FROM EMPLOYEES E LEFT JOIN EMPLOYEES M ON E.MANAGER_ID = M.EMP_ID;',
    expectedDescription: '각 사원과 그의 상사 이름이 함께 표시됩니다.'
  },
  {
    id: 'EX-010',
    title: '급여 순위 매기기 (동점 처리)',
    description: '사원들의 급여 순위를 매기되, 같은 급여는 같은 순위를 주세요.',
    category: '윈도우 함수',
    difficulty: 'advanced',
    dataset: 'employees',
    hint: 'RANK() 함수를 사용하세요.',
    answer: 'SELECT EMP_NAME, SALARY, RANK() OVER (ORDER BY SALARY DESC) AS RANK FROM EMPLOYEES;',
    expectedDescription: '급여 순으로 순위가 매겨지며, 같은 급여는 같은 순위를 받습니다.'
  },
  {
    id: 'EX-011',
    title: '부서별 사원 수가 3명 이상인 부서',
    description: '사원이 3명 이상 있는 부서를 찾으세요.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'GROUP BY와 HAVING을 사용하여 COUNT(*) >= 3 조건을 적용하세요.',
    answer: 'SELECT DEPT_ID, COUNT(*) FROM EMPLOYEES GROUP BY DEPT_ID HAVING COUNT(*) >= 3;',
    expectedDescription: '3명 이상의 사원을 가진 부서들이 표시됩니다.'
  },
  {
    id: 'EX-012',
    title: '2015년 이후 입사자 중 급여 5000 이상',
    description: '2015년 이후에 입사하고 급여가 5000 이상인 사원을 찾으세요.',
    category: 'WHERE 조건',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'AND로 두 조건을 결합하고 HIRE_DATE와 SALARY를 비교하세요.',
    answer: "SELECT * FROM EMPLOYEES WHERE HIRE_DATE >= '2015-01-01' AND SALARY >= 5000;",
    expectedDescription: '입사일과 급여 조건을 모두 만족하는 사원들이 반환됩니다.'
  },
  {
    id: 'EX-013',
    title: '부서별 최고 급여와 최저 급여',
    description: '각 부서의 최고 급여와 최저 급여를 계산하세요.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'MAX와 MIN 함수를 GROUP BY와 함께 사용하세요.',
    answer: 'SELECT DEPT_ID, MAX(SALARY) AS MAX_SAL, MIN(SALARY) AS MIN_SAL FROM EMPLOYEES GROUP BY DEPT_ID;',
    expectedDescription: '각 부서의 최고 급여와 최저 급여가 표시됩니다.'
  },
  {
    id: 'EX-014',
    title: '직급별 사원 수와 평균 급여',
    description: '각 직급별로 사원 수와 평균 급여를 계산하세요.',
    category: 'GROUP BY',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'COUNT와 AVG 함수를 POSITION별로 GROUP BY하세요.',
    answer: 'SELECT POSITION, COUNT(*) AS CNT, AVG(SALARY) AS AVG_SAL FROM EMPLOYEES GROUP BY POSITION;',
    expectedDescription: '직급별 사원 수와 평균 급여가 함께 표시됩니다.'
  },
  {
    id: 'EX-015',
    title: '이름에 특정 문자 포함된 사원',
    description: "이름에 '이'가 포함된 사원을 찾으세요.",
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    hint: "LIKE 연산자와 '%' 와일드카드를 사용하세요.",
    answer: "SELECT * FROM EMPLOYEES WHERE EMP_NAME LIKE '%이%';",
    expectedDescription: "이름에 '이'가 포함된 모든 사원이 반환됩니다."
  },
  {
    id: 'EX-016',
    title: '두 부서 사원 합치기 (UNION)',
    description: '부서 10과 20의 사원들을 합쳐서 조회하세요.',
    category: '집합 연산',
    difficulty: 'intermediate',
    dataset: 'employees',
    hint: 'UNION을 사용하여 두 SELECT 문을 합치세요.',
    answer: 'SELECT * FROM EMPLOYEES WHERE DEPT_ID = 10 UNION SELECT * FROM EMPLOYEES WHERE DEPT_ID = 20;',
    expectedDescription: '부서 10과 20의 사원들이 중복 없이 결합되어 표시됩니다.'
  },
  {
    id: 'EX-017',
    title: '상사보다 급여가 높은 사원',
    description: '직속상사보다 급여가 높은 사원을 찾으세요.',
    category: 'JOIN',
    difficulty: 'advanced',
    dataset: 'employees',
    hint: 'Self JOIN을 사용하여 사원과 매니저의 급여를 비교하세요.',
    answer: 'SELECT E.EMP_NAME FROM EMPLOYEES E LEFT JOIN EMPLOYEES M ON E.MANAGER_ID = M.EMP_ID WHERE E.SALARY > M.SALARY;',
    expectedDescription: '자신의 상사보다 급여가 높은 사원들이 반환됩니다.'
  },
  {
    id: 'EX-018',
    title: '급여 4000~6000 범위의 사원',
    description: '급여가 4000 이상 6000 이하인 사원을 조회하세요.',
    category: 'WHERE 조건',
    difficulty: 'beginner',
    dataset: 'employees',
    hint: 'BETWEEN 연산자를 사용하세요.',
    answer: 'SELECT * FROM EMPLOYEES WHERE SALARY BETWEEN 4000 AND 6000;',
    expectedDescription: '급여가 4000에서 6000 사이인 모든 사원이 반환됩니다.'
  },
  {
    id: 'EX-019',
    title: '부서별 사원을 입사일로 정렬',
    description: '각 부서의 사원들을 부서별로 그룹화하고 입사일 순으로 정렬하세요.',
    category: 'GROUP BY',
    difficulty: 'advanced',
    dataset: 'employees',
    hint: 'GROUP BY와 ORDER BY를 함께 사용하세요.',
    answer: 'SELECT DEPT_ID, EMP_NAME, HIRE_DATE FROM EMPLOYEES ORDER BY DEPT_ID, HIRE_DATE;',
    expectedDescription: '부서별로 입사일이 빠른 순서대로 정렬된 사원들이 표시됩니다.'
  },
  {
    id: 'EX-020',
    title: '급여 상위 10% 사원',
    description: '급여 상위 10%에 해당하는 사원을 찾으세요.',
    category: '윈도우 함수',
    difficulty: 'advanced',
    dataset: 'employees',
    hint: 'PERCENT_RANK() 윈도우 함수를 사용하세요.',
    answer: 'SELECT * FROM (SELECT *, PERCENT_RANK() OVER (ORDER BY SALARY DESC) AS PCT FROM EMPLOYEES) T WHERE PCT <= 0.1;',
    expectedDescription: '급여가 상위 10%에 해당하는 사원들이 반환됩니다.'
  }
]
