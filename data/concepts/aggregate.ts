// @TASK P3-R1-T1 - 집계 함수 관련 개념 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'

export const aggregateConcepts: Concept[] = [
  {
    id: 'group-by',
    name: 'GROUP BY',
    difficulty: 'beginner',
    category: 'AGGREGATE',
    shortDescription: '특정 컬럼 값이 같은 행들을 묶어 그룹화하는 절',
    fullDescription:
      'GROUP BY 절은 지정한 컬럼의 값이 같은 행들을 하나의 그룹으로 묶습니다.\n' +
      '집계 함수(COUNT, SUM, AVG, MAX, MIN)와 함께 사용하여 그룹별 통계를 구합니다.\n' +
      'SELECT 절에는 GROUP BY에 지정한 컬럼과 집계 함수만 올 수 있습니다.\n' +
      '예를 들어 부서별 평균 급여, 직급별 인원 수 등을 계산할 때 사용합니다.',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '전체 사원 (20명)', count: 20, icon: 'table' },
        { label: 'GROUP BY DEPT_ID', count: null, icon: 'group', condition: '부서별 그룹화' },
        { label: '5개 그룹 생성', count: 5, icon: 'grouped' },
        { label: '각 그룹 집계', count: null, icon: 'aggregate', condition: 'AVG(SALARY)' },
        { label: '부서별 평균 급여', count: 5, icon: 'result' },
      ],
    },
    sqlExample: `-- 부서별 사원 수와 평균 급여
SELECT DEPT_ID,
       COUNT(*) AS 사원수,
       AVG(SALARY) AS 평균급여
FROM EMPLOYEES
GROUP BY DEPT_ID;

-- 직급별 최고/최저 급여
SELECT POSITION,
       MAX(SALARY) AS 최고급여,
       MIN(SALARY) AS 최저급여
FROM EMPLOYEES
GROUP BY POSITION
ORDER BY MAX(SALARY) DESC;`,
    useCases: [
      '부서별, 직급별 통계를 낼 때',
      '카테고리별 합계나 평균을 구할 때',
      '그룹화된 데이터의 집계가 필요할 때',
    ],
    relatedConcepts: ['having-clause', 'count-sum-avg'],
    notes: 'GROUP BY에 없는 일반 컬럼을 SELECT에 쓰면 오류가 납니다. SQLD 빈출 오류 패턴!',
  },
  {
    id: 'having-clause',
    name: 'HAVING',
    difficulty: 'beginner',
    category: 'AGGREGATE',
    shortDescription: 'GROUP BY로 그룹화된 결과에 조건을 거는 절',
    fullDescription:
      'HAVING 절은 GROUP BY로 만들어진 그룹에 조건을 적용합니다.\n' +
      'WHERE가 개별 행(Row)을 필터링한다면, HAVING은 그룹 결과를 필터링합니다.\n' +
      '집계 함수(COUNT, SUM, AVG 등)를 조건에 사용할 수 있다는 점이 WHERE와 다릅니다.\n' +
      'SQL 실행 순서: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '전체 사원 (20명)', count: 20, icon: 'table' },
        { label: 'GROUP BY DEPT_ID', count: null, icon: 'group', condition: '5개 그룹' },
        { label: 'HAVING 조건 적용', count: null, icon: 'filter', condition: 'COUNT(*) >= 4' },
        { label: '조건 만족 그룹', count: 3, icon: 'result' },
      ],
    },
    sqlExample: `-- 사원이 4명 이상인 부서만 조회
SELECT DEPT_ID, COUNT(*) AS 사원수
FROM EMPLOYEES
GROUP BY DEPT_ID
HAVING COUNT(*) >= 4;

-- 평균 급여가 5000 이상인 직급
SELECT POSITION, AVG(SALARY) AS 평균급여
FROM EMPLOYEES
GROUP BY POSITION
HAVING AVG(SALARY) >= 5000
ORDER BY AVG(SALARY) DESC;`,
    useCases: [
      '특정 조건을 만족하는 그룹만 보고 싶을 때',
      '집계 값을 기준으로 필터링할 때',
      'WHERE로 처리할 수 없는 그룹 조건이 있을 때',
    ],
    relatedConcepts: ['group-by', 'where-clause'],
    notes: 'WHERE는 개별 행 필터(집계 함수 불가), HAVING은 그룹 필터(집계 함수 가능). 차이를 반드시 기억하세요!',
  },
  {
    id: 'count-sum-avg',
    name: 'COUNT / SUM / AVG',
    difficulty: 'beginner',
    category: 'AGGREGATE',
    shortDescription: '행 수, 합계, 평균을 계산하는 대표적인 집계 함수',
    fullDescription:
      'COUNT는 행의 수를 셉니다. COUNT(*)는 NULL 포함 전체 행, COUNT(컬럼)은 NULL 제외 행 수입니다.\n' +
      'SUM은 숫자 컬럼의 합계를 계산하며 NULL은 무시합니다.\n' +
      'AVG는 숫자 컬럼의 평균을 계산하며 NULL은 제외하고 계산합니다.\n' +
      'MAX와 MIN은 각각 최댓값과 최솟값을 반환하며, 문자형 컬럼에도 사용 가능합니다.',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '사원 데이터 (20행)', count: 20, icon: 'table' },
        { label: '집계 함수 적용', count: null, icon: 'aggregate', condition: 'COUNT / SUM / AVG' },
        { label: '단일 결과값 반환', count: 1, icon: 'result' },
      ],
    },
    sqlExample: `-- 전체 사원 수
SELECT COUNT(*) AS 전체사원수
FROM EMPLOYEES;

-- 부서별 급여 합계와 평균
SELECT DEPT_ID,
       SUM(SALARY) AS 급여합계,
       AVG(SALARY) AS 평균급여,
       MAX(SALARY) AS 최고급여,
       MIN(SALARY) AS 최저급여
FROM EMPLOYEES
GROUP BY DEPT_ID;

-- NULL 포함 주의: COUNT(*) vs COUNT(컬럼)
SELECT COUNT(*) AS 전체행수,
       COUNT(MANAGER_ID) AS 매니저있는사원수
FROM EMPLOYEES;`,
    useCases: [
      '전체 데이터 건수를 확인할 때',
      '매출 합계, 총 급여를 계산할 때',
      '평균 성적, 평균 급여를 구할 때',
    ],
    relatedConcepts: ['group-by', 'having-clause'],
    notes: 'AVG는 NULL을 제외하고 계산합니다. NULL이 많으면 평균값이 예상과 다를 수 있습니다.',
  },
]
