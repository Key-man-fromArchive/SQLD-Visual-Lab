// @TASK P3-R1-T1 - 서브쿼리 관련 개념 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'

export const subqueryConcepts: Concept[] = [
  {
    id: 'subquery',
    name: '서브쿼리',
    difficulty: 'beginner',
    category: 'SUBQUERY',
    shortDescription: 'SELECT 문 안에 또 다른 SELECT 문을 중첩해서 사용하는 기법',
    fullDescription:
      '서브쿼리(Subquery)는 SQL 문 안에 괄호로 감싼 또 다른 SELECT 문을 넣는 기법입니다.\n' +
      'WHERE 절에 사용하면 동적 조건으로 활용할 수 있고, FROM 절에 쓰면 임시 테이블처럼 사용합니다.\n' +
      '단일행 서브쿼리(결과가 1행)는 =, >, < 사용, 다중행 서브쿼리(결과가 여러 행)는 IN, ANY, ALL을 사용합니다.\n' +
      '복잡한 조건을 간결하게 표현할 수 있지만, 성능을 고려해 JOIN으로 대체하는 경우도 많습니다.',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '내부 쿼리 실행', count: null, icon: 'query', condition: '평균 급여 계산' },
        { label: '내부 쿼리 결과', count: 1, icon: 'value', condition: '5,150 (평균)' },
        { label: '외부 쿼리에 조건 적용', count: null, icon: 'filter', condition: 'SALARY > 5150' },
        { label: '최종 결과', count: 7, icon: 'result' },
      ],
    },
    sqlExample: `-- 평균 급여보다 높은 급여를 받는 사원
SELECT EMP_NAME, SALARY
FROM EMPLOYEES
WHERE SALARY > (
  SELECT AVG(SALARY)
  FROM EMPLOYEES
);

-- 개발팀(20번) 사원들과 같은 직급의 모든 사원
SELECT EMP_NAME, POSITION
FROM EMPLOYEES
WHERE POSITION IN (
  SELECT DISTINCT POSITION
  FROM EMPLOYEES
  WHERE DEPT_ID = 20
);

-- FROM 절 서브쿼리 (인라인 뷰)
SELECT DEPT_ID, 평균급여
FROM (
  SELECT DEPT_ID, AVG(SALARY) AS 평균급여
  FROM EMPLOYEES
  GROUP BY DEPT_ID
) AS DEPT_AVG
WHERE 평균급여 >= 5000;`,
    useCases: [
      '평균, 최댓값 등 집계값을 조건으로 쓸 때',
      '다른 테이블의 특정 값 목록으로 필터링할 때',
      '복잡한 조건을 단계별로 쪼개서 처리할 때',
    ],
    relatedConcepts: ['select-basic', 'where-clause', 'inner-join'],
    notes: '단일행 서브쿼리에 IN을 쓰거나 다중행 서브쿼리에 =를 쓰면 오류가 납니다. 자주 출제되는 함정!',
  },
]
