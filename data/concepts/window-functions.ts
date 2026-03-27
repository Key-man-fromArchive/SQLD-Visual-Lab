// @TASK P3-R1-T2 - 윈도우 함수 개념 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'

export const windowFunctionConcepts: Concept[] = [
  {
    id: 'row-number',
    name: 'ROW_NUMBER',
    difficulty: 'intermediate',
    category: 'WINDOW',
    shortDescription: '조건에 따라 각 행에 유일한 순번을 부여하는 함수',
    fullDescription:
      'ROW_NUMBER 함수는 OVER 절과 함께 사용되는 윈도우 함수로, 조건에 따라 각 행에 고유한 순번을 부여합니다.\n' +
      'PARTITION BY로 그룹을 나누고 ORDER BY로 정렬 순서를 지정합니다.\n' +
      '같은 값을 가져도 다른 순번을 부여하므로, 중복이 없는 순번이 필요할 때 유용합니다.\n' +
      'SQLD 시험에서 윈도우 함수가 점차 출제 비중이 높아지고 있습니다.',
    visualizationType: 'table-structure',
    visualizationData: {
      tableName: 'EMPLOYEES',
      columns: [
        { name: 'EMP_NAME', type: 'VARCHAR(50)' },
        { name: 'DEPT_ID', type: 'INTEGER' },
        { name: 'SALARY', type: 'INTEGER' },
        { name: 'ROW_NUMBER', type: 'INTEGER', highlighted: true },
      ],
      sampleRows: [
        ['김철수', 10, 8000, 1],
        ['이영희', 10, 6000, 2],
        ['박민수', 20, 4500, 1],
        ['정수현', 20, 4000, 2],
      ],
      highlightColumns: ['ROW_NUMBER'],
    },
    sqlExample: `-- 전체 사원에 순번 부여 (급여 높은 순)
SELECT EMP_NAME, SALARY,
       ROW_NUMBER() OVER (ORDER BY SALARY DESC) AS RN
FROM EMPLOYEES;

-- 부서별로 급여 높은 순 순번 부여
SELECT EMP_NAME, DEPT_ID, SALARY,
       ROW_NUMBER() OVER (PARTITION BY DEPT_ID ORDER BY SALARY DESC) AS DEPT_RN
FROM EMPLOYEES;

-- 급여 상위 3명 추출 (서브쿼리 활용)
SELECT EMP_NAME, SALARY, RN
FROM (
  SELECT EMP_NAME, SALARY,
         ROW_NUMBER() OVER (ORDER BY SALARY DESC) AS RN
  FROM EMPLOYEES
)
WHERE RN <= 3;`,
    useCases: [
      '순위 매기기 (중복 없음)',
      '상위 N개 데이터만 추출할 때',
      '부서별 순번 부여가 필요할 때',
    ],
    relatedConcepts: ['rank-dense-rank', 'lag-lead', 'window-aggregate'],
    notes: 'ROW_NUMBER는 중복값도 다른 순번을 부여합니다. RANK나 DENSE_RANK와 차이를 이해해야 합니다.',
  },
  {
    id: 'rank-dense-rank',
    name: 'RANK / DENSE_RANK',
    difficulty: 'intermediate',
    category: 'WINDOW',
    shortDescription: '동점을 처리하는 방식이 다른 순위 함수',
    fullDescription:
      'RANK와 DENSE_RANK는 모두 윈도우 함수로 순위를 매기지만, 동점 처리가 다릅니다.\n' +
      'RANK는 동점이면 같은 순위를 주고 다음 순위를 건너뜁니다 (1, 2, 2, 4).\n' +
      'DENSE_RANK는 동점이면 같은 순위를 주지만 다음 순위를 건너뛰지 않습니다 (1, 2, 2, 3).\n' +
      'SQLD 시험에서 두 함수의 차이점과 사용 상황을 구분하는 문제가 자주 출제됩니다.',
    visualizationType: 'table-structure',
    visualizationData: {
      tableName: 'SCORE',
      columns: [
        { name: 'NAME', type: 'VARCHAR(50)' },
        { name: 'SCORE', type: 'INTEGER' },
        { name: 'RANK', type: 'INTEGER', highlighted: true },
        { name: 'DENSE_RANK', type: 'INTEGER', highlighted: true },
      ],
      sampleRows: [
        ['A', 100, 1, 1],
        ['B', 100, 1, 1],
        ['C', 80, 3, 2],
        ['D', 70, 4, 3],
      ],
      highlightColumns: ['RANK', 'DENSE_RANK'],
    },
    sqlExample: `-- RANK와 DENSE_RANK 비교
SELECT NAME, SCORE,
       RANK() OVER (ORDER BY SCORE DESC) AS RANK,
       DENSE_RANK() OVER (ORDER BY SCORE DESC) AS DENSE_RANK
FROM SCORES;

-- 부서별 급여 순위 (RANK 사용)
SELECT EMP_NAME, DEPT_ID, SALARY,
       RANK() OVER (PARTITION BY DEPT_ID ORDER BY SALARY DESC) AS SALARY_RANK
FROM EMPLOYEES;

-- 성적 상위 3등까지 추출 (DENSE_RANK 사용)
SELECT NAME, SCORE, DR
FROM (
  SELECT NAME, SCORE,
         DENSE_RANK() OVER (ORDER BY SCORE DESC) AS DR
  FROM STUDENTS
)
WHERE DR <= 3;`,
    useCases: [
      '순위를 매길 때 (동점 처리 필요)',
      '상위 N등까지의 사람을 찾을 때',
      '상여금이나 보상 대상 결정 시',
    ],
    relatedConcepts: ['row-number', 'lag-lead'],
    notes: 'RANK의 1, 1, 3, 4와 DENSE_RANK의 1, 1, 2, 3 차이를 명확히 이해해야 SQLD 시험에서 실수하지 않습니다.',
  },
  {
    id: 'lag-lead',
    name: 'LAG / LEAD',
    difficulty: 'advanced',
    category: 'WINDOW',
    shortDescription: '현재 행에서 이전/다음 행의 값을 참조하는 함수',
    fullDescription:
      'LAG 함수는 현재 행에서 이전 행의 값을 참조하고, LEAD 함수는 다음 행의 값을 참조합니다.\n' +
      'OFFSET 값으로 몇 줄 앞/뒤를 참조할지 지정할 수 있으며, 기본값은 1입니다.\n' +
      '참조할 행이 없으면 NULL을 반환하며, 세 번째 인자로 기본값을 지정할 수 있습니다.\n' +
      '전월 대비 매출 증감, 일별 주식 가격 변화 등을 계산할 때 매우 유용합니다.',
    visualizationType: 'table-structure',
    visualizationData: {
      tableName: 'SALES_DAILY',
      columns: [
        { name: 'DATE', type: 'DATE' },
        { name: 'SALES', type: 'INTEGER' },
        { name: 'PREV_SALES', type: 'INTEGER', highlighted: true },
        { name: 'NEXT_SALES', type: 'INTEGER', highlighted: true },
      ],
      sampleRows: [
        ['2024-01-01', 1000, null, 1200],
        ['2024-01-02', 1200, 1000, 950],
        ['2024-01-03', 950, 1200, 1100],
      ],
      highlightColumns: ['PREV_SALES', 'NEXT_SALES'],
    },
    sqlExample: `-- 전일 매출과 비교하여 증감 계산
SELECT DATE, SALES,
       LAG(SALES) OVER (ORDER BY DATE) AS PREV_SALES,
       SALES - LAG(SALES) OVER (ORDER BY DATE) AS SALES_DIFF
FROM SALES_DAILY;

-- 다음 달 목표와 비교
SELECT MONTH, ACTUAL_SALES,
       LEAD(ACTUAL_SALES) OVER (ORDER BY MONTH) AS NEXT_MONTH_SALES
FROM MONTHLY_SALES;

-- 부서별 이전 사원의 급여와 비교
SELECT EMP_NAME, DEPT_ID, SALARY,
       LAG(SALARY, 1, 0) OVER (PARTITION BY DEPT_ID ORDER BY SALARY) AS PREV_SALARY
FROM EMPLOYEES;`,
    useCases: [
      '시계열 데이터에서 증감 계산할 때',
      '연속된 데이터의 변화를 추적할 때',
      '전월/전일 대비 비교 분석이 필요할 때',
    ],
    relatedConcepts: ['row-number', 'rank-dense-rank', 'window-aggregate'],
    notes: 'LAG/LEAD는 ORDER BY가 필수이며, PARTITION BY로 그룹별 분석도 가능합니다. NULL 처리가 중요합니다.',
  },
  {
    id: 'window-aggregate',
    name: 'SUM/AVG OVER (윈도우 집계)',
    difficulty: 'intermediate',
    category: 'WINDOW',
    shortDescription: '그룹별 또는 누적 집계를 행 단위로 표현하는 함수',
    fullDescription:
      '윈도우 함수로 SUM, AVG, COUNT, MIN, MAX 등의 집계 함수를 사용하면, 그룹별 집계 결과를 각 행에 표시할 수 있습니다.\n' +
      'PARTITION BY로 그룹을 나누고, ROWS BETWEEN으로 누적 범위를 지정할 수 있습니다.\n' +
      'ROWS UNBOUNDED PRECEDING은 첫 행부터 현재 행까지, ROWS BETWEEN 3 PRECEDING AND CURRENT ROW는 최근 4행까지를 의미합니다.\n' +
      '그룹별 합계를 개별 행에 표시하거나, 누적 합계를 계산할 때 매우 유용합니다.',
    visualizationType: 'table-structure',
    visualizationData: {
      tableName: 'DAILY_SALES',
      columns: [
        { name: 'DATE', type: 'DATE' },
        { name: 'SALES', type: 'INTEGER' },
        { name: 'DEPT_TOTAL', type: 'INTEGER', highlighted: true },
        { name: 'RUNNING_SUM', type: 'INTEGER', highlighted: true },
      ],
      sampleRows: [
        ['2024-01-01', 1000, 5200, 1000],
        ['2024-01-02', 1200, 5200, 2200],
        ['2024-01-03', 3000, 5200, 5200],
      ],
      highlightColumns: ['DEPT_TOTAL', 'RUNNING_SUM'],
    },
    sqlExample: `-- 부서별 총 매출을 각 행에 표시
SELECT DATE, SALES, DEPT_ID,
       SUM(SALES) OVER (PARTITION BY DEPT_ID) AS DEPT_TOTAL
FROM SALES;

-- 누적 매출 계산 (날짜 기준)
SELECT DATE, SALES,
       SUM(SALES) OVER (ORDER BY DATE ROWS UNBOUNDED PRECEDING) AS CUMULATIVE_SUM
FROM DAILY_SALES;

-- 부서별 평균 급여를 각 사원의 급여와 함께 표시
SELECT EMP_NAME, DEPT_ID, SALARY,
       AVG(SALARY) OVER (PARTITION BY DEPT_ID) AS DEPT_AVG_SALARY
FROM EMPLOYEES;

-- 최근 7일 이동 평균 (7일 윈도우)
SELECT DATE, SALES,
       AVG(SALES) OVER (ORDER BY DATE ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS MA_7DAY
FROM DAILY_SALES;`,
    useCases: [
      '부서별/팀별 합계를 개별 행에 표시할 때',
      '누적 합계나 누적 개수 계산이 필요할 때',
      '이동 평균(Moving Average)을 계산할 때',
    ],
    relatedConcepts: ['row-number', 'lag-lead', 'group-by'],
    notes: 'PARTITION BY 없이 ORDER BY만 사용하면 자동으로 ROWS UNBOUNDED PRECEDING이 적용됩니다.',
  },
]
