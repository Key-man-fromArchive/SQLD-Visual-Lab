// @TASK P3-R1-T2 - 집합 연산자 개념 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'

export const setOperationConcepts: Concept[] = [
  {
    id: 'union-all',
    name: 'UNION / UNION ALL',
    difficulty: 'beginner',
    category: 'SET',
    shortDescription: '두 개 이상의 SELECT 문 결과를 합치는 연산자',
    fullDescription:
      'UNION은 여러 SELECT 문의 결과를 세로로 합쳐줍니다. 중복 행은 자동으로 제거됩니다.\n' +
      'UNION ALL은 중복을 제거하지 않고 모든 행을 반환합니다. 실행 속도가 더 빠릅니다.\n' +
      '각 SELECT 문의 컬럼 수, 순서, 데이터 타입이 동일해야 합니다.\n' +
      '서로 다른 테이블의 데이터를 합치거나, 다른 조건의 데이터를 함께 조회할 때 사용합니다.',
    visualizationType: 'venn',
    visualizationData: {
      type: 'union',
      leftSet: { label: 'Query 1 결과', count: 5, color: '#FF6B6B' },
      rightSet: { label: 'Query 2 결과', count: 7, color: '#4ECDC4' },
      overlap: { count: 2, description: '중복 행 (UNION은 제거, UNION ALL은 유지)' },
      unionResult: 10,
    },
    sqlExample: `-- 정직원과 계약직 사원을 합쳐서 조회 (중복 제거)
SELECT EMP_NAME, POSITION, 'FULL_TIME' AS EMP_TYPE
FROM FULL_TIME_EMPLOYEES
UNION
SELECT EMP_NAME, POSITION, 'CONTRACT' AS EMP_TYPE
FROM CONTRACT_EMPLOYEES;

-- 현재 부서와 과거 부서 목록 (중복 포함)
SELECT DEPT_NAME
FROM DEPARTMENTS
UNION ALL
SELECT DEPT_NAME
FROM DEPARTMENTS_HISTORY;

-- 서울 지점과 부산 지점 매출
SELECT SALES_DATE, AMOUNT, 'SEOUL' AS BRANCH
FROM SEOUL_SALES
WHERE SALES_DATE >= '2024-01-01'
UNION
SELECT SALES_DATE, AMOUNT, 'BUSAN' AS BRANCH
FROM BUSAN_SALES
WHERE SALES_DATE >= '2024-01-01'
ORDER BY SALES_DATE DESC;`,
    useCases: [
      '여러 테이블의 데이터를 합쳐서 조회할 때',
      '서로 다른 조건의 데이터를 통합할 때',
      '정직원과 계약직처럼 다른 테이블의 같은 속성 데이터를 합칠 때',
    ],
    relatedConcepts: ['intersect', 'except'],
    notes: 'UNION은 중복 제거를 위해 정렬이 발생하여 느릴 수 있습니다. 중복이 없다면 UNION ALL을 사용하는 것이 효율적입니다.',
  },
  {
    id: 'intersect',
    name: 'INTERSECT',
    difficulty: 'intermediate',
    category: 'SET',
    shortDescription: '두 SELECT 문의 공통 결과만 반환하는 연산자',
    fullDescription:
      'INTERSECT는 두 SELECT 문의 결과에서 공통되는 행만 반환합니다.\n' +
      '벤 다이어그램의 교집합 부분입니다.\n' +
      '각 SELECT 문의 컬럼 수, 순서, 데이터 타입이 동일해야 합니다.\n' +
      '"양쪽 모두에 존재하는 데이터"를 찾을 때 유용합니다. 예를 들어, 작년과 올해 모두 매출을 기록한 고객 찾기 등에 사용됩니다.',
    visualizationType: 'venn',
    visualizationData: {
      type: 'intersect',
      leftSet: { label: '2023년 매출 고객', count: 8, color: '#FF6B6B' },
      rightSet: { label: '2024년 매출 고객', count: 10, color: '#4ECDC4' },
      overlap: { count: 5, description: '양년도 모두 매출 고객' },
    },
    sqlExample: `-- 2023년과 2024년 모두 매출을 기록한 고객 찾기
SELECT CUSTOMER_ID, CUSTOMER_NAME
FROM CUSTOMERS_2023
INTERSECT
SELECT CUSTOMER_ID, CUSTOMER_NAME
FROM CUSTOMERS_2024;

-- 참여한 직원이 있는 프로젝트만 추출
SELECT PROJECT_ID
FROM PROJECT_MEMBERS
WHERE ROLE = 'LEAD'
INTERSECT
SELECT PROJECT_ID
FROM PROJECTS
WHERE STATUS = 'ACTIVE';

-- 서울과 부산 지점 모두에서 매출이 있는 제품
SELECT PRODUCT_ID
FROM SEOUL_SALES
INTERSECT
SELECT PRODUCT_ID
FROM BUSAN_SALES;`,
    useCases: [
      '양쪽 모두에 공통으로 존재하는 데이터 찾기',
      '연속된 기간에 모두 거래가 있는 고객 확인',
      '여러 조건을 동시에 만족하는 데이터 추출',
    ],
    relatedConcepts: ['union-all', 'except'],
    notes: 'INTERSECT는 INNER JOIN으로도 구현할 수 있지만, 단순 교집합 조회에는 INTERSECT가 더 직관적입니다.',
  },
  {
    id: 'except',
    name: 'EXCEPT (MINUS)',
    difficulty: 'intermediate',
    category: 'SET',
    shortDescription: '첫 번째 SELECT 결과에서 두 번째 결과를 제외한 것을 반환',
    fullDescription:
      'EXCEPT는 첫 번째 SELECT 문의 결과에서 두 번째 SELECT 문의 결과를 빼줍니다.\n' +
      '벤 다이어그램의 차집합 부분입니다. Oracle에서는 MINUS라고 부릅니다.\n' +
      '각 SELECT 문의 컬럼 수, 순서, 데이터 타입이 동일해야 합니다.\n' +
      '"A에는 있지만 B에는 없는 데이터"를 찾을 때 사용합니다. 예를 들어, 올해는 매출이 있지만 작년에는 없던 신규 고객 찾기 등에 사용됩니다.',
    visualizationType: 'venn',
    visualizationData: {
      type: 'except',
      leftSet: { label: '2024년 신규 고객', count: 8, color: '#FF6B6B' },
      rightSet: { label: '2023년 기존 고객', count: 10, color: '#4ECDC4' },
      difference: { count: 3, description: '신규 고객만' },
    },
    sqlExample: `-- 2024년 고객 중 2023년에는 없던 신규 고객 찾기
SELECT CUSTOMER_ID, CUSTOMER_NAME
FROM CUSTOMERS_2024
EXCEPT
SELECT CUSTOMER_ID, CUSTOMER_NAME
FROM CUSTOMERS_2023;

-- 등록되었지만 구매 이력이 없는 제품
SELECT PRODUCT_ID, PRODUCT_NAME
FROM PRODUCTS
EXCEPT
SELECT PRODUCT_ID, PRODUCT_NAME
FROM PURCHASE_HISTORY;

-- 활성화 사원 중 휴직 대상이 아닌 사원
SELECT EMP_ID
FROM EMPLOYEES
WHERE STATUS = 'ACTIVE'
EXCEPT
SELECT EMP_ID
FROM LEAVE_REQUEST
WHERE APPROVED = 'Y';`,
    useCases: [
      '신규 데이터 찾기 (A에만 있고 B에는 없음)',
      '미사용 데이터 찾기 (등록되었으나 사용되지 않은 데이터)',
      '차집합이 필요한 분석',
    ],
    relatedConcepts: ['union-all', 'intersect'],
    notes: 'EXCEPT 결과의 행 순서는 보장되지 않습니다. 필요시 ORDER BY로 명시적으로 정렬해야 합니다.',
  },
]
