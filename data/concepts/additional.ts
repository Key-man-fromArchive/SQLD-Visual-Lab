// @TASK P3-R1-T2 - 추가 SQL 개념 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'

export const additionalConcepts: Concept[] = [
  {
    id: 'group-by',
    name: 'GROUP BY',
    difficulty: 'intermediate',
    category: 'AGGREGATE',
    shortDescription: '같은 값을 가진 행들을 그룹화하여 집계하는 절',
    fullDescription:
      'GROUP BY 절은 지정한 컬럼 값이 같은 행들을 그룹으로 묶고, 각 그룹에 대해 집계 함수를 적용합니다.\n' +
      'SELECT 절에는 GROUP BY 컬럼이거나 집계 함수만 올 수 있습니다.\n' +
      'HAVING 절로 그룹 단위의 조건을 필터링할 수 있으며, WHERE 절은 그룹핑 전에, HAVING은 그룹핑 후에 적용됩니다.\n' +
      'SQLD 시험에서 WHERE vs HAVING 차이와 GROUP BY 문법이 자주 출제되는 핵심 개념입니다.',
    visualizationType: 'table-structure',
    visualizationData: {
      tableName: 'SALES',
      columns: [
        { name: 'DEPT_ID', type: 'INTEGER' },
        { name: 'SALES_AMOUNT', type: 'INTEGER' },
      ],
      sampleRows: [
        ['10', 1000],
        ['10', 2000],
        ['20', 1500],
        ['20', 2500],
      ],
      afterGroupBy: [
        { dept: '10', total: 3000, count: 2 },
        { dept: '20', total: 4000, count: 2 },
      ],
    },
    sqlExample: `-- 부서별 총 급여와 사원 수
SELECT DEPT_ID, SUM(SALARY) AS TOTAL_SALARY, COUNT(*) AS EMP_COUNT
FROM EMPLOYEES
GROUP BY DEPT_ID;

-- 부서별 평균 급여 (부서별 평균이 5000 이상)
SELECT DEPT_ID, AVG(SALARY) AS AVG_SALARY
FROM EMPLOYEES
GROUP BY DEPT_ID
HAVING AVG(SALARY) >= 5000;

-- 2024년 고객별 매출액 합계
SELECT CUSTOMER_ID, SUM(ORDER_AMOUNT) AS TOTAL_SALES
FROM ORDERS
WHERE YEAR(ORDER_DATE) = 2024
GROUP BY CUSTOMER_ID
ORDER BY TOTAL_SALES DESC;

-- 복수 컬럼 GROUP BY (부서 및 직급별)
SELECT DEPT_ID, POSITION, COUNT(*) AS EMP_COUNT, AVG(SALARY) AS AVG_SALARY
FROM EMPLOYEES
GROUP BY DEPT_ID, POSITION
ORDER BY DEPT_ID, AVG_SALARY DESC;`,
    useCases: [
      '부서별 집계 (합계, 평균, 개수)',
      '시간별/날짜별 통계 집계',
      '카테고리별 판매 현황 파악',
    ],
    relatedConcepts: ['select-basic', 'where-clause', 'window-aggregate'],
    notes: 'WHERE는 GROUP BY 전에 적용되고, HAVING은 그룹화 후에 적용됩니다. 이 차이가 SQLD 시험에 자주 출제됩니다.',
  },
  {
    id: 'having-clause',
    name: 'HAVING',
    difficulty: 'intermediate',
    category: 'AGGREGATE',
    shortDescription: '그룹화 후 조건을 필터링하는 절',
    fullDescription:
      'HAVING 절은 GROUP BY로 만든 그룹 중에서 특정 조건을 만족하는 그룹만 반환합니다.\n' +
      'WHERE 절과 다르게 집계 함수를 HAVING 조건에서 사용할 수 있습니다.\n' +
      'SQL 실행 순서: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY 입니다.\n' +
      '따라서 HAVING은 GROUP BY 이후에 적용되며, WHERE보다 나중에 실행됩니다.',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '1. FROM: 전체 행', count: 20, icon: 'table' },
        { label: '2. WHERE: 조건 필터링', count: 15, icon: 'filter' },
        { label: '3. GROUP BY: 그룹화', count: 5, icon: 'group' },
        { label: '4. HAVING: 그룹 필터링', count: 3, icon: 'filter-group' },
        { label: '5. 최종 결과', count: 3, icon: 'result' },
      ],
    },
    sqlExample: `-- 평균 급여가 5000 이상인 부서만
SELECT DEPT_ID, AVG(SALARY) AS AVG_SALARY
FROM EMPLOYEES
GROUP BY DEPT_ID
HAVING AVG(SALARY) >= 5000;

-- 사원이 3명 이상인 부서만
SELECT DEPT_ID, COUNT(*) AS EMP_COUNT
FROM EMPLOYEES
GROUP BY DEPT_ID
HAVING COUNT(*) >= 3;

-- WHERE와 HAVING 함께 사용
SELECT DEPT_ID, POSITION, COUNT(*) AS EMP_COUNT
FROM EMPLOYEES
WHERE SALARY >= 4000  -- 급여 4000 이상 사원 먼저 필터링
GROUP BY DEPT_ID, POSITION
HAVING COUNT(*) >= 2;  -- 그 중에서 2명 이상인 직급만

-- 복합 HAVING 조건
SELECT CUSTOMER_ID, COUNT(*) AS ORDER_COUNT, SUM(ORDER_AMOUNT) AS TOTAL
FROM ORDERS
GROUP BY CUSTOMER_ID
HAVING COUNT(*) >= 5 AND SUM(ORDER_AMOUNT) > 100000;`,
    useCases: [
      '특정 기준을 초과하는 그룹만 추출할 때',
      '집계 함수 결과로 필터링할 때',
      '일정 규모 이상의 그룹만 분석할 때',
    ],
    relatedConcepts: ['group-by', 'where-clause'],
    notes: 'WHERE는 개별 행 기준, HAVING은 그룹 기준입니다. 이 차이를 정확히 이해해야 합니다.',
  },
  {
    id: 'in-operator',
    name: 'IN / NOT IN',
    difficulty: 'intermediate',
    category: 'SELECT',
    shortDescription: '여러 값 중 일치하는 것을 찾는 조건 연산자',
    fullDescription:
      'IN 연산자는 지정한 목록의 값 중 하나와 일치하는 행을 반환합니다.\n' +
      'NOT IN은 목록에 없는 값을 찾습니다.\n' +
      '서브쿼리와 함께 사용하여 동적인 값 목록을 구성할 수 있습니다.\n' +
      'NULL을 포함한 NOT IN은 예상치 못한 결과를 줄 수 있으므로 주의가 필요합니다.',
    visualizationType: 'table-structure',
    visualizationData: {
      example: 'WHERE DEPT_ID IN (10, 20, 30)',
      matchingValues: [10, 20, 30],
      resultMessage: '부서 10, 20, 30에 속하는 행만 반환',
    },
    sqlExample: `-- 부서 10, 20, 30에 속하는 사원만 조회
SELECT EMP_NAME, DEPT_ID
FROM EMPLOYEES
WHERE DEPT_ID IN (10, 20, 30);

-- 주요 제품에 속하지 않는 판매 조회
SELECT ORDER_ID, PRODUCT_ID
FROM ORDERS
WHERE PRODUCT_ID NOT IN (101, 102, 103);

-- 판매 이력이 있는 고객만
SELECT CUSTOMER_ID, CUSTOMER_NAME
FROM CUSTOMERS
WHERE CUSTOMER_ID IN (
  SELECT DISTINCT CUSTOMER_ID
  FROM ORDERS
);

-- 여러 값 비교 (BETWEEN 대신 IN)
SELECT ORDER_ID, AMOUNT
FROM ORDERS
WHERE AMOUNT IN (1000, 5000, 10000);`,
    useCases: [
      '여러 값 중 일치하는 것을 찾을 때',
      '특정 목록에 속하는 데이터 필터링',
      '서브쿼리 결과 목록으로 필터링',
    ],
    relatedConcepts: ['where-clause', 'between'],
    notes: 'NOT IN에 NULL이 포함되면 결과가 모두 NULL이 되므로, NOT IN 대신 NOT EXISTS를 사용하는 것이 안전합니다.',
  },
  {
    id: 'between',
    name: 'BETWEEN',
    difficulty: 'intermediate',
    category: 'SELECT',
    shortDescription: '범위 내의 값을 찾는 조건 연산자',
    fullDescription:
      'BETWEEN은 두 값 사이의 범위에 포함되는 행을 반환합니다.\n' +
      '포함 범위입니다: BETWEEN A AND B는 A >= x <= B를 의미합니다.\n' +
      '주로 숫자나 날짜 범위를 조회할 때 사용하며, 가독성이 좋습니다.\n' +
      'IN (a, b, c) 목록으로도 표현 가능하지만, 범위가 많으면 BETWEEN이 더 효율적입니다.',
    visualizationType: 'flow',
    visualizationData: {
      rangeExample: 'BETWEEN 5000 AND 8000',
      description: '5000 이상 8000 이하의 값',
    },
    sqlExample: `-- 급여가 5000 이상 8000 이하인 사원
SELECT EMP_NAME, SALARY
FROM EMPLOYEES
WHERE SALARY BETWEEN 5000 AND 8000;

-- 날짜 범위로 주문 조회 (2024년 1월)
SELECT ORDER_ID, ORDER_DATE, AMOUNT
FROM ORDERS
WHERE ORDER_DATE BETWEEN '2024-01-01' AND '2024-01-31';

-- NOT BETWEEN (범위 밖)
SELECT EMP_NAME, SALARY
FROM EMPLOYEES
WHERE SALARY NOT BETWEEN 5000 AND 8000;

-- CASE와 BETWEEN 결합
SELECT EMP_NAME, SALARY,
       CASE WHEN SALARY BETWEEN 7000 AND 10000 THEN '상위'
            WHEN SALARY BETWEEN 5000 AND 6999 THEN '중간'
            ELSE '하위'
       END AS SALARY_LEVEL
FROM EMPLOYEES;`,
    useCases: [
      '급여나 가격 범위 검색',
      '기간 내 데이터 조회 (시작일~종료일)',
      '나이, 점수 등 범위 검색',
    ],
    relatedConcepts: ['where-clause', 'in-operator'],
    notes: 'BETWEEN은 포함 범위입니다. A BETWEEN 10 AND 20은 A >= 10 AND A <= 20과 동일합니다.',
  },
  {
    id: 'like-operator',
    name: 'LIKE (패턴 검색)',
    difficulty: 'beginner',
    category: 'SELECT',
    shortDescription: '문자열 패턴으로 데이터를 검색하는 연산자',
    fullDescription:
      'LIKE 연산자는 문자열 패턴 매칭을 사용하여 행을 검색합니다.\n' +
      '%는 0개 이상의 임의 문자, _는 정확히 1개의 임의 문자를 의미합니다.\n' +
      '대소문자 구분은 데이터베이스 설정에 따라 다릅니다.\n' +
      '와일드카드를 효율적으로 사용하지 않으면 성능이 저하될 수 있으므로 주의가 필요합니다.',
    visualizationType: 'table-structure',
    visualizationData: {
      examples: [
        { pattern: '%수%', description: '"수"가 포함된 모든 이름' },
        { pattern: '김%', description: '"김"으로 시작하는 이름' },
        { pattern: '%희', description: '"희"로 끝나는 이름' },
        { pattern: '김_수', description: '"김"과 "수" 사이에 정확히 1글자' },
      ],
    },
    sqlExample: `-- 이름에 '수'가 포함된 사원
SELECT EMP_NAME
FROM EMPLOYEES
WHERE EMP_NAME LIKE '%수%';

-- '김'으로 시작하는 사원
SELECT EMP_NAME
FROM EMPLOYEES
WHERE EMP_NAME LIKE '김%';

-- 3글자 이름 (첫 글자는 '이', 나머지 임의)
SELECT EMP_NAME
FROM EMPLOYEES
WHERE EMP_NAME LIKE '이__';

-- 이메일 주소가 '@gmail.com'인 사용자
SELECT USER_NAME, EMAIL
FROM USERS
WHERE EMAIL LIKE '%@gmail.com';

-- NOT LIKE (패턴 미일치)
SELECT EMP_NAME
FROM EMPLOYEES
WHERE EMP_NAME NOT LIKE '김%';`,
    useCases: [
      '이름으로 검색할 때',
      '이메일 도메인별 필터링',
      '전화번호 특정 패턴 검색',
    ],
    relatedConcepts: ['where-clause'],
    notes: '%를 앞에만 붙이면 인덱스를 활용하지 못하므로, 가능하면 %데이터보다 데이터% 형태로 작성하는 것이 성능상 유리합니다.',
  },
  {
    id: 'union-join-difference',
    name: 'UNION vs JOIN 차이',
    difficulty: 'intermediate',
    category: 'ADVANCED',
    shortDescription: 'UNION(세로 합) vs JOIN(가로 합)의 개념과 활용 구분',
    fullDescription:
      'UNION은 여러 SELECT 문의 결과를 세로로 합치며, 같은 구조의 결과 집합이 필요합니다.\n' +
      'JOIN은 두 테이블을 공통 컬럼 기준으로 가로로 결합합니다.\n' +
      'UNION은 집합 연산이고 JOIN은 관계 연산입니다.\n' +
      'SQLD 시험에서 두 개념의 차이를 이해하고 상황에 맞게 선택하는 문제가 자주 출제됩니다.',
    visualizationType: 'venn',
    visualizationData: {
      comparison: {
        union: { description: '세로 결합(행 추가)', example: '2 테이블 = 더 많은 행' },
        join: { description: '가로 결합(컬럼 추가)', example: '2 테이블 = 더 많은 컬럼' },
      },
    },
    sqlExample: `-- UNION: 세로 합 (행 증가)
-- 정직원 + 계약직 모두 조회
SELECT EMP_ID, EMP_NAME, 'FULL_TIME' AS TYPE
FROM FULL_TIME_EMPLOYEES
UNION
SELECT EMP_ID, EMP_NAME, 'CONTRACT' AS TYPE
FROM CONTRACT_EMPLOYEES;

-- JOIN: 가로 합 (컬럼 증가)
-- 사원과 부서 정보를 함께 조회
SELECT E.EMP_ID, E.EMP_NAME, D.DEPT_NAME, D.LOCATION
FROM EMPLOYEES E
JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID;

-- UNION의 행 수: FULL_TIME + CONTRACT 행의 합
-- JOIN의 행 수: EMPLOYEES의 일치하는 행 수
-- JOIN의 컬럼 수: EMPLOYEES의 컬럼 + DEPARTMENTS의 컬럼`,
    useCases: [
      '언제 UNION을, 언제 JOIN을 사용할지 판단',
      '성능 최적화를 위한 올바른 연산자 선택',
      '복합 쿼리에서 여러 연산자 조합',
    ],
    relatedConcepts: ['union-all', 'inner-join', 'left-join'],
    notes: 'UNION은 집합 개념(중복 제거)이고 JOIN은 관계 개념입니다. 결과 행 수가 어떻게 변하는지 이해하면 구분이 쉬워집니다.',
  },
]
