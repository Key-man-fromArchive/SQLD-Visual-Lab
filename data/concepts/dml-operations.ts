// @TASK P3-R1-T2 - DML 연산 개념 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'

export const dmlOperationConcepts: Concept[] = [
  {
    id: 'insert',
    name: 'INSERT',
    difficulty: 'beginner',
    category: 'DML',
    shortDescription: '테이블에 새로운 행을 삽입하는 연산',
    fullDescription:
      'INSERT 문은 테이블에 새로운 행(레코드)을 추가합니다.\n' +
      'VALUES 절로 직접 값을 입력하거나, 다른 테이블의 SELECT 결과를 삽입할 수 있습니다.\n' +
      '컬럼을 명시하지 않으면 모든 컬럼에 값을 입력해야 하며, 명시하면 지정한 컬럼만 입력할 수 있습니다.\n' +
      '기본값(DEFAULT)이 설정된 컬럼은 생략 가능하며, NULL을 허용하는 컬럼도 생략 가능합니다.',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '테이블 초기 상태', count: 3, icon: 'table' },
        { label: 'INSERT 실행', icon: 'add', newRow: '새로운 행 추가' },
        { label: '최종 상태', count: 4, icon: 'result' },
      ],
    },
    sqlExample: `-- 모든 컬럼에 값 삽입
INSERT INTO EMPLOYEES (EMP_ID, EMP_NAME, DEPT_ID, SALARY)
VALUES (1004, '최진수', 20, 5500);

-- 특정 컬럼에만 값 삽입 (기본값 사용)
INSERT INTO EMPLOYEES (EMP_ID, EMP_NAME, SALARY)
VALUES (1005, '정은지', 5000);

-- 다른 테이블 데이터로 삽입
INSERT INTO EMPLOYEES_TEMP
SELECT * FROM EMPLOYEES
WHERE DEPT_ID = 10;

-- 여러 행 동시 삽입 (MySQL, SQL Server)
INSERT INTO EMPLOYEES (EMP_ID, EMP_NAME, DEPT_ID, SALARY)
VALUES (1006, '한준호', 10, 6500),
       (1007, '오소영', 20, 4800);`,
    useCases: [
      '새로운 사원 정보를 입력할 때',
      '대량의 데이터를 한 번에 삽입할 때',
      '다른 테이블의 데이터를 복사할 때',
    ],
    relatedConcepts: ['update', 'delete'],
    notes: '기본 키(PRIMARY KEY) 컬럼에 중복된 값을 삽입하면 에러가 발생합니다. 자동 증가(AUTO_INCREMENT) 기능을 활용할 수 있습니다.',
  },
  {
    id: 'update',
    name: 'UPDATE',
    difficulty: 'beginner',
    category: 'DML',
    shortDescription: '테이블의 기존 행 데이터를 수정하는 연산',
    fullDescription:
      'UPDATE 문은 테이블의 기존 데이터를 수정합니다.\n' +
      'WHERE 절을 사용하여 수정할 행을 지정하며, WHERE 절이 없으면 전체 행이 수정됩니다.\n' +
      '한 번에 여러 컬럼을 수정할 수 있으며, 수정 값으로 다른 컬럼의 값이나 함수를 사용할 수 있습니다.\n' +
      'SQLD 시험에서 UPDATE 문법과 WHERE 절 조건 설정이 자주 출제됩니다.',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '수정 전', icon: 'before', sample: 'SALARY: 5000' },
        { label: 'UPDATE 조건 적용', icon: 'check', condition: 'WHERE EMP_ID = 1002' },
        { label: '수정 실행', icon: 'edit', change: 'SALARY: 5500' },
        { label: '수정 후', icon: 'after', sample: 'SALARY: 5500' },
      ],
    },
    sqlExample: `-- 특정 사원의 급여 수정
UPDATE EMPLOYEES
SET SALARY = 5500
WHERE EMP_ID = 1002;

-- 여러 컬럼 동시 수정
UPDATE EMPLOYEES
SET SALARY = 6000, POSITION = '과장'
WHERE EMP_ID = 1003;

-- 조건에 맞는 여러 행 수정
UPDATE EMPLOYEES
SET SALARY = SALARY * 1.1  -- 10% 인상
WHERE DEPT_ID = 20;

-- 다른 테이블의 값으로 수정 (서브쿼리)
UPDATE EMPLOYEES
SET SALARY = (SELECT AVG(SALARY) FROM EMPLOYEES WHERE DEPT_ID = 10)
WHERE DEPT_ID = 10 AND SALARY < 5000;`,
    useCases: [
      '사원 정보(급여, 부서 등)를 수정할 때',
      '대량의 데이터를 일괄 수정할 때 (예: 일괄 인상)',
      '조건에 따라 선택적으로 수정할 때',
    ],
    relatedConcepts: ['insert', 'delete'],
    notes: 'WHERE 절 없이 UPDATE를 실행하면 테이블의 모든 행이 수정되므로 매우 위험합니다. 항상 WHERE 조건을 확인해야 합니다.',
  },
  {
    id: 'delete',
    name: 'DELETE',
    difficulty: 'beginner',
    category: 'DML',
    shortDescription: '테이블에서 행을 삭제하는 연산',
    fullDescription:
      'DELETE 문은 테이블의 행을 제거합니다.\n' +
      'WHERE 절을 사용하여 삭제할 행을 지정하며, WHERE 절이 없으면 전체 행이 삭제됩니다.\n' +
      'DELETE는 행 단위로 삭제하며, 테이블 구조는 남아있습니다. 테이블 전체를 비우려면 TRUNCATE를 사용할 수 있습니다.\n' +
      '외래 키(FOREIGN KEY) 제약조건이 있으면, 참조되는 행은 삭제할 수 없습니다.',
    visualizationType: 'flow',
    visualizationData: {
      steps: [
        { label: '삭제 전', count: 4, icon: 'table' },
        { label: 'DELETE 조건 적용', icon: 'filter', condition: 'WHERE DEPT_ID = 30' },
        { label: '삭제 실행', icon: 'delete', removed: '1행 삭제' },
        { label: '삭제 후', count: 3, icon: 'result' },
      ],
    },
    sqlExample: `-- 특정 행 삭제
DELETE FROM EMPLOYEES
WHERE EMP_ID = 1001;

-- 조건에 맞는 여러 행 삭제
DELETE FROM EMPLOYEES
WHERE DEPT_ID = 30 AND SALARY < 3000;

-- 부서가 없는 사원 삭제 (외래 키 참조 확인)
DELETE FROM EMPLOYEES
WHERE DEPT_ID NOT IN (SELECT DEPT_ID FROM DEPARTMENTS);

-- 서브쿼리를 이용한 삭제
DELETE FROM ORDERS
WHERE CUSTOMER_ID IN (
  SELECT CUSTOMER_ID
  FROM CUSTOMERS
  WHERE STATUS = 'INACTIVE'
);`,
    useCases: [
      '더 이상 필요없는 데이터를 삭제할 때',
      '조건에 맞는 행만 선택적으로 삭제할 때',
      '만료된 기록이나 중복 데이터를 정리할 때',
    ],
    relatedConcepts: ['insert', 'update'],
    notes: 'DELETE와 TRUNCATE의 차이: DELETE는 WHERE로 선택 가능하고 로그가 남지만, TRUNCATE는 전체 삭제만 가능하고 빠릅니다.',
  },
]
