// @TASK P3-R1-T2 - 고급 SQL 개념 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'

export const advancedConcepts: Concept[] = [
  {
    id: 'case-when',
    name: 'CASE WHEN',
    difficulty: 'intermediate',
    category: 'ADVANCED',
    shortDescription: '조건에 따라 서로 다른 값을 반환하는 조건 분기 함수',
    fullDescription:
      'CASE WHEN은 프로그래밍의 if-else 문처럼 조건에 따라 다른 값을 반환합니다.\n' +
      'SIMPLE CASE(단일 식 비교)와 SEARCHED CASE(여러 조건) 두 가지 형식이 있습니다.\n' +
      'ELSE 절이 없고 조건에 맞지 않으면 NULL을 반환합니다.\n' +
      'SQLD 시험에서 매우 자주 출제되는 함수이며, SELECT, WHERE, ORDER BY 등 다양한 위치에서 사용됩니다.',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: 'CASE WHEN 조건 평가', icon: 'decision' },
        { label: '조건 1 확인', condition: 'SALARY >= 7000', result: '"상위직"', icon: 'check' },
        { label: '조건 2 확인', condition: 'SALARY >= 5000', result: '"중간직"', icon: 'check' },
        { label: 'ELSE', result: '"일반직"', icon: 'result' },
      ],
    },
    sqlExample: `-- SEARCHED CASE (여러 조건)
SELECT EMP_NAME, SALARY,
       CASE WHEN SALARY >= 7000 THEN '상위직'
            WHEN SALARY >= 5000 THEN '중간직'
            ELSE '일반직'
       END AS SALARY_LEVEL
FROM EMPLOYEES;

-- SIMPLE CASE (단일 식 비교)
SELECT ORDER_ID, STATUS,
       CASE STATUS WHEN 'Y' THEN '완료'
                   WHEN 'N' THEN '진행중'
                   ELSE '취소'
       END AS STATUS_KOR
FROM ORDERS;

-- 정렬에 CASE WHEN 활용
SELECT EMP_NAME, DEPT_ID
FROM EMPLOYEES
ORDER BY CASE WHEN DEPT_ID = 10 THEN 1
              WHEN DEPT_ID = 20 THEN 2
              ELSE 3
         END;`,
    useCases: [
      '급여에 따라 직급 분류할 때',
      '코드를 한글로 변환할 때',
      '조건에 따라 다른 값을 계산할 때',
    ],
    relatedConcepts: ['exists-not-exists', 'subquery-basic'],
    notes: 'CASE WHEN END를 생략하면 문법 에러가 발생합니다. SQLD 시험에서 CASE 문법 오류가 자주 출제됩니다.',
  },
  {
    id: 'exists-not-exists',
    name: 'EXISTS / NOT EXISTS',
    difficulty: 'intermediate',
    category: 'ADVANCED',
    shortDescription: '서브쿼리 결과가 존재하는지 여부를 판단하는 함수',
    fullDescription:
      'EXISTS는 서브쿼리가 한 개 이상의 행을 반환하면 TRUE, 반환하지 않으면 FALSE입니다.\n' +
      'NOT EXISTS는 그 반대로 동작합니다.\n' +
      '서브쿼리에서 * 또는 상수를 사용할 수 있으며, 실제 값이 중요하지 않고 행의 존재 여부만 확인합니다.\n' +
      'IN 연산자보다 성능이 좋은 경우가 많아, 대용량 데이터 처리에서 자주 사용됩니다.',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '부서별 사원 확인', icon: 'table' },
        { label: '사원이 1명 이상?', icon: 'check', branches: [
          { condition: 'YES', result: 'EXISTS = TRUE' },
          { condition: 'NO', result: 'EXISTS = FALSE' }
        ]},
      ],
    },
    sqlExample: `-- 사원이 있는 부서만 조회
SELECT D.DEPT_ID, D.DEPT_NAME
FROM DEPARTMENTS D
WHERE EXISTS (
  SELECT 1
  FROM EMPLOYEES E
  WHERE E.DEPT_ID = D.DEPT_ID
);

-- 주문이 없는 고객 찾기
SELECT CUSTOMER_ID, CUSTOMER_NAME
FROM CUSTOMERS C
WHERE NOT EXISTS (
  SELECT 1
  FROM ORDERS O
  WHERE O.CUSTOMER_ID = C.CUSTOMER_ID
);

-- 2024년 매출이 있는 사원만 보너스 대상
SELECT EMP_NAME, SALARY
FROM EMPLOYEES E
WHERE EXISTS (
  SELECT 1
  FROM SALES S
  WHERE S.EMP_ID = E.EMP_ID
    AND YEAR(S.SALES_DATE) = 2024
);`,
    useCases: [
      '특정 조건의 관련 데이터가 있는지 확인할 때',
      '짝이 있는 데이터만 추출할 때',
      '상관 서브쿼리를 사용한 조회',
    ],
    relatedConcepts: ['subquery-correlated', 'case-when'],
    notes: 'EXISTS는 IN이나 LEFT JOIN으로도 표현할 수 있지만, 대용량 데이터에서는 EXISTS가 더 효율적입니다.',
  },
  {
    id: 'self-join',
    name: '자기 조인 (Self JOIN)',
    difficulty: 'advanced',
    category: 'ADVANCED',
    shortDescription: '같은 테이블을 두 번 조인하여 행끼리 비교하는 기법',
    fullDescription:
      '자기 조인은 동일한 테이블을 별칭을 사용하여 여러 번 조인하는 기법입니다.\n' +
      '테이블 내의 행끼리 관계를 비교해야 할 때 사용합니다. 예: 직원과 그 상급자 정보 함께 조회.\n' +
      '테이블 별칭(Alias)을 반드시 사용하여 어느 테이블의 컬럼인지 명확히 해야 합니다.\n' +
      '계층 구조를 가진 데이터(조직도, 게시판 댓글의 답글 등)를 처리할 때 매우 유용합니다.',
    visualizationType: 'table-structure',
    visualizationData: {
      tableName: 'EMPLOYEES',
      columns: [
        { name: 'EMP_ID', type: 'INTEGER' },
        { name: 'EMP_NAME', type: 'VARCHAR(50)' },
        { name: 'MANAGER_ID', type: 'INTEGER' },
      ],
      selfJoinExample: [
        { emp: 'A (직원)', manager: 'B (상급자)' },
        { emp: 'C (직원)', manager: 'A (상급자)' },
      ],
    },
    sqlExample: `-- 직원과 그 상급자 정보를 함께 조회
SELECT E.EMP_NAME AS EMPLOYEE,
       M.EMP_NAME AS MANAGER,
       E.SALARY AS EMP_SALARY,
       M.SALARY AS MANAGER_SALARY
FROM EMPLOYEES E
LEFT JOIN EMPLOYEES M
  ON E.MANAGER_ID = M.EMP_ID;

-- 같은 부서의 다른 사원과 급여 비교
SELECT E1.EMP_NAME, E1.SALARY,
       E2.EMP_NAME AS COLLEAGUE,
       E2.SALARY AS COLLEAGUE_SALARY
FROM EMPLOYEES E1
JOIN EMPLOYEES E2
  ON E1.DEPT_ID = E2.DEPT_ID
  AND E1.EMP_ID < E2.EMP_ID;  -- 중복 제거

-- 같은 급여를 받는 다른 사원 찾기
SELECT DISTINCT E1.EMP_NAME, E1.SALARY,
       E2.EMP_NAME AS OTHER_EMPLOYEE
FROM EMPLOYEES E1
JOIN EMPLOYEES E2
  ON E1.SALARY = E2.SALARY
  AND E1.EMP_ID != E2.EMP_ID;`,
    useCases: [
      '직원과 상급자 정보를 함께 조회할 때',
      '같은 속성의 다른 행끼리 비교할 때',
      '계층 구조를 표현할 때',
    ],
    relatedConcepts: ['inner-join', 'left-join'],
    notes: '자기 조인은 조인 조건을 정확히 설정하지 않으면 카르테시안 곱이 발생할 수 있으므로 주의가 필요합니다.',
  },
  {
    id: 'subquery-correlated',
    name: '상관 서브쿼리 (Correlated Subquery)',
    difficulty: 'advanced',
    category: 'ADVANCED',
    shortDescription: '바깥쪽 쿼리의 행마다 서브쿼리가 실행되는 서브쿼리',
    fullDescription:
      '상관 서브쿼리는 서브쿼리에서 바깥쪽 쿼리의 컬럼을 참조합니다.\n' +
      '바깥쪽 쿼리의 각 행마다 서브쿼리가 반복 실행되므로 성능이 중요한 고려 사항입니다.\n' +
      'WHERE, SELECT, FROM 등 다양한 위치에서 사용될 수 있습니다.\n' +
      'SQLD 시험의 고급 문제로 자주 출제되며, 개념 이해가 매우 중요합니다.',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '외부 쿼리: EMPLOYEES 각 행 처리', icon: 'loop' },
        { label: '각 행의 DEPT_ID로 서브쿼리 실행', icon: 'execute' },
        { label: '부서별 평균 급여와 비교', icon: 'compare' },
        { label: '조건 만족 행만 반환', icon: 'result' },
      ],
    },
    sqlExample: `-- 부서 평균 급여보다 높은 급여를 받는 사원
SELECT EMP_NAME, DEPT_ID, SALARY
FROM EMPLOYEES E
WHERE SALARY > (
  SELECT AVG(SALARY)
  FROM EMPLOYEES E2
  WHERE E2.DEPT_ID = E.DEPT_ID  -- 상관 조건: 바깥쪽 E.DEPT_ID 참조
);

-- SELECT에서 사용하는 상관 서브쿼리
SELECT EMP_NAME, SALARY,
       (SELECT AVG(SALARY)
        FROM EMPLOYEES E2
        WHERE E2.DEPT_ID = E.DEPT_ID) AS DEPT_AVG
FROM EMPLOYEES E;

-- EXISTS와 함께 사용
SELECT CUSTOMER_ID, CUSTOMER_NAME
FROM CUSTOMERS C
WHERE EXISTS (
  SELECT 1
  FROM ORDERS O
  WHERE O.CUSTOMER_ID = C.CUSTOMER_ID
    AND O.ORDER_DATE >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
);`,
    useCases: [
      '행별로 동적인 비교 조건이 필요할 때',
      '각 행의 컨텍스트에서 집계 함수를 적용할 때',
      'EXISTS와 함께 사용하여 조건부 데이터 추출',
    ],
    relatedConcepts: ['exists-not-exists', 'subquery-basic'],
    notes: '상관 서브쿼리는 성능 최적화가 중요합니다. 가능하면 JOIN이나 윈도우 함수로 변경하는 것이 권장됩니다.',
  },
  {
    id: 'distinct',
    name: 'DISTINCT',
    difficulty: 'beginner',
    category: 'ADVANCED',
    shortDescription: '조회 결과에서 중복 행을 제거하는 키워드',
    fullDescription:
      'DISTINCT는 SELECT 문의 결과에서 중복되는 행을 하나로 통합합니다.\n' +
      'SELECT 바로 뒤에 위치하며, 여러 컬럼을 지정하면 그 컬럼들의 조합이 중복인 행을 제거합니다.\n' +
      'GROUP BY 없이 고유한 값들만 조회할 때 간단하게 사용할 수 있습니다.\n' +
      'COUNT(DISTINCT 컬럼)으로 중복을 제외한 개수를 셀 수도 있습니다.',
    visualizationType: 'table-structure',
    visualizationData: {
      tableName: 'SALES',
      columns: [
        { name: 'PRODUCT_ID', type: 'INTEGER' },
        { name: 'CUSTOMER_ID', type: 'INTEGER' },
      ],
      sampleRows: [
        [101, 1001],
        [101, 1001],
        [102, 1002],
        [101, 1003],
      ],
      highlightColumns: ['PRODUCT_ID'],
      afterDistinct: [
        [101],
        [102],
      ],
    },
    sqlExample: `-- 매출이 있는 제품 목록 (중복 제거)
SELECT DISTINCT PRODUCT_ID
FROM SALES;

-- 고객과 제품의 조합 (중복 제거)
SELECT DISTINCT CUSTOMER_ID, PRODUCT_ID
FROM SALES;

-- 다양한 제품을 구매한 고객 수
SELECT COUNT(DISTINCT CUSTOMER_ID) AS UNIQUE_CUSTOMERS
FROM SALES;

-- 부서별로 다양한 직급 개수
SELECT DEPT_ID, COUNT(DISTINCT POSITION) AS POSITION_COUNT
FROM EMPLOYEES
GROUP BY DEPT_ID;`,
    useCases: [
      '중복 없는 고유 목록이 필요할 때',
      '특정 데이터의 종류를 파악할 때',
      '고유한 항목의 개수를 셀 때',
    ],
    relatedConcepts: ['select-basic', 'group-by'],
    notes: 'DISTINCT ALL(중복 포함)과의 차이를 이해하고, NULL도 DISTINCT로 처리된다는 것을 기억해야 합니다.',
  },
  {
    id: 'null-handling',
    name: 'NULL 처리 (NVL, COALESCE, IS NULL)',
    difficulty: 'beginner',
    category: 'ADVANCED',
    shortDescription: 'NULL 값을 처리하고 비교하는 함수와 연산자',
    fullDescription:
      'NULL은 "알려지지 않은 값" 또는 "값이 없음"을 의미하며, 일반 비교 연산자(=, <>)로는 비교할 수 없습니다.\n' +
      'NVL 함수는 NULL을 다른 값으로 대체하고, COALESCE는 여러 값 중 첫 번째 NULL이 아닌 값을 반환합니다.\n' +
      'IS NULL과 IS NOT NULL로 NULL 여부를 판단합니다.\n' +
      'SQLD 시험에서 빈출되는 포인트이므로 반드시 정확히 이해해야 합니다.',
    visualizationType: 'table-structure',
    visualizationData: {
      tableName: 'EMPLOYEES',
      columns: [
        { name: 'EMP_NAME', type: 'VARCHAR(50)' },
        { name: 'BONUS', type: 'INTEGER' },
        { name: 'NVL(BONUS, 0)', type: 'INTEGER', highlighted: true },
      ],
      sampleRows: [
        ['김철수', 500, 500],
        ['이영희', null, 0],
        ['박민수', 300, 300],
      ],
      highlightColumns: ['NVL(BONUS, 0)'],
    },
    sqlExample: `-- NVL: NULL을 0으로 대체
SELECT EMP_NAME, SALARY,
       NVL(BONUS, 0) AS BONUS
FROM EMPLOYEES;

-- COALESCE: 첫 번째 NULL이 아닌 값 선택
SELECT EMP_NAME,
       COALESCE(PHONE, MOBILE, 'NO_CONTACT') AS CONTACT
FROM EMPLOYEES;

-- IS NULL로 보너스가 없는 사원 찾기
SELECT EMP_NAME
FROM EMPLOYEES
WHERE BONUS IS NULL;

-- NULL 비교는 =이 아닌 IS NULL 사용
SELECT EMP_NAME
FROM EMPLOYEES
WHERE MANAGER_ID IS NOT NULL;  -- 상급자가 있는 사원`,
    useCases: [
      '빈 값을 기본값으로 처리할 때',
      '여러 컬럼 중 가장 먼저 값이 있는 것을 선택할 때',
      'NULL인 행과 아닌 행을 구분할 때',
    ],
    relatedConcepts: ['select-basic', 'where-clause'],
    notes: 'NULL은 = NULL이 아닌 IS NULL로 비교해야 합니다. 이것은 SQLD 시험에서 매우 자주 출제되는 함정입니다!',
  },
]
