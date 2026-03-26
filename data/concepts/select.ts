// @TASK P3-R1-T1 - SELECT 관련 개념 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'

export const selectConcepts: Concept[] = [
  {
    id: 'select-basic',
    name: 'SELECT',
    difficulty: 'beginner',
    category: 'SELECT',
    shortDescription: '테이블에서 원하는 컬럼을 조회하는 가장 기본적인 명령어',
    fullDescription:
      'SELECT는 데이터베이스에서 데이터를 읽어오는 명령어입니다.\n' +
      '테이블에서 원하는 컬럼만 골라서 조회할 수 있고, *를 사용하면 모든 컬럼을 가져올 수 있습니다.\n' +
      'SQLD 시험에서 가장 자주 등장하는 기본 명령어이므로 반드시 익혀두세요.\n' +
      '컬럼에 별칭(AS)을 붙여서 결과를 더 알아보기 쉽게 만들 수도 있습니다.',
    visualizationType: 'table-structure',
    visualizationData: {
      tableName: 'EMPLOYEES',
      columns: [
        { name: 'EMP_ID', type: 'INTEGER' },
        { name: 'EMP_NAME', type: 'VARCHAR(50)' },
        { name: 'DEPT_ID', type: 'INTEGER' },
        { name: 'POSITION', type: 'VARCHAR(50)' },
        { name: 'SALARY', type: 'INTEGER' },
      ],
      sampleRows: [
        [1001, '김철수', 10, '부장', 8000],
        [1002, '이영희', 10, '과장', 6000],
        [1003, '박민수', 20, '대리', 4500],
      ],
      highlightColumns: ['EMP_NAME', 'SALARY'],
    },
    sqlExample: `-- 사원 이름과 급여만 조회
SELECT EMP_NAME, SALARY
FROM EMPLOYEES;

-- 모든 컬럼 조회
SELECT *
FROM EMPLOYEES;

-- 별칭(AS) 사용
SELECT EMP_NAME AS 이름, SALARY AS 급여
FROM EMPLOYEES;`,
    useCases: [
      '특정 컬럼의 데이터만 확인할 때',
      '테이블 전체 데이터를 확인할 때',
      '컬럼 이름을 보기 좋게 바꿔서 출력할 때',
    ],
    relatedConcepts: ['where-clause', 'order-by'],
    notes: 'SQLD 시험에서 SELECT 문법 오류(쉼표 위치, 키워드 순서)가 자주 출제됩니다.',
  },
  {
    id: 'where-clause',
    name: 'WHERE',
    difficulty: 'beginner',
    category: 'SELECT',
    shortDescription: '조건을 지정하여 원하는 행(Row)만 필터링하는 절',
    fullDescription:
      'WHERE 절은 테이블에서 특정 조건을 만족하는 행만 가져오는 필터 역할을 합니다.\n' +
      '비교 연산자(=, >, <, >=, <=, <>), BETWEEN, LIKE, IN, IS NULL 등을 사용할 수 있습니다.\n' +
      'AND와 OR로 여러 조건을 결합할 수 있으며, NOT으로 조건을 반전시킬 수도 있습니다.\n' +
      'LIKE는 패턴 매칭에 사용되며, %는 임의의 문자열, _는 임의의 한 문자를 의미합니다.',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '전체 데이터', count: 20, icon: 'table' },
        { label: 'WHERE 조건 적용', count: null, icon: 'filter', condition: 'SALARY >= 5000' },
        { label: '필터링 결과', count: 8, icon: 'result' },
      ],
    },
    sqlExample: `-- 급여가 5000 이상인 사원 조회
SELECT EMP_NAME, SALARY
FROM EMPLOYEES
WHERE SALARY >= 5000;

-- 개발팀(DEPT_ID=20) 사원 중 과장 이상 조회
SELECT EMP_NAME, POSITION
FROM EMPLOYEES
WHERE DEPT_ID = 20 AND POSITION IN ('부장', '과장');

-- 이름에 '수'가 포함된 사원
SELECT EMP_NAME
FROM EMPLOYEES
WHERE EMP_NAME LIKE '%수%';`,
    useCases: [
      '특정 부서나 직급의 사원만 조회할 때',
      '일정 급여 이상의 데이터를 찾을 때',
      '이름이나 내용으로 검색할 때',
    ],
    relatedConcepts: ['select-basic', 'order-by'],
    notes: 'NULL 비교는 = NULL이 아닌 IS NULL을 사용해야 합니다. SQLD 빈출 포인트!',
  },
  {
    id: 'order-by',
    name: 'ORDER BY',
    difficulty: 'beginner',
    category: 'SELECT',
    shortDescription: '조회 결과를 특정 컬럼 기준으로 정렬하는 절',
    fullDescription:
      'ORDER BY 절은 SELECT 문의 결과를 특정 컬럼 기준으로 정렬합니다.\n' +
      'ASC(오름차순, 기본값)와 DESC(내림차순)로 정렬 방향을 지정할 수 있습니다.\n' +
      '여러 컬럼을 기준으로 정렬할 수 있으며, 컬럼 번호(1, 2, 3...)로도 지정 가능합니다.\n' +
      'NULL 값은 오름차순 정렬 시 마지막에, 내림차순 시 처음에 위치합니다(DBMS마다 다를 수 있음).',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '조회된 데이터', count: 20, icon: 'table' },
        { label: 'ORDER BY 적용', count: null, icon: 'sort', condition: 'SALARY DESC' },
        { label: '정렬된 결과', count: 20, icon: 'result' },
      ],
    },
    sqlExample: `-- 급여 높은 순으로 정렬
SELECT EMP_NAME, SALARY
FROM EMPLOYEES
ORDER BY SALARY DESC;

-- 부서 오름차순, 같은 부서 내 급여 내림차순
SELECT EMP_NAME, DEPT_ID, SALARY
FROM EMPLOYEES
ORDER BY DEPT_ID ASC, SALARY DESC;

-- 컬럼 번호로 정렬 (2번째 컬럼 기준)
SELECT EMP_NAME, SALARY
FROM EMPLOYEES
ORDER BY 2 DESC;`,
    useCases: [
      '급여 순위를 확인할 때',
      '최신 데이터나 가장 오래된 데이터를 먼저 볼 때',
      '이름 순으로 정렬된 목록이 필요할 때',
    ],
    relatedConcepts: ['select-basic', 'where-clause'],
    notes: 'ORDER BY는 SQL 실행 순서에서 가장 마지막에 수행됩니다.',
  },
]
