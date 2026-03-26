// @TASK P4-R1-T1 - DDL 용어 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Term } from '@/types'

export const ddlTerms: Term[] = [
  {
    id: 'create-table',
    name: 'CREATE TABLE',
    category: 'DDL',
    definition: '새로운 테이블을 생성합니다. 컬럼명, 데이터 타입, 제약조건을 함께 정의하며 데이터베이스 구조를 설계하는 핵심 명령어입니다.',
    syntax: 'CREATE TABLE 테이블명 (\n  컬럼명 데이터타입 [제약조건],\n  ...\n);',
    exampleSQL: 'CREATE TABLE students (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(50) NOT NULL,\n  grade INTEGER DEFAULT 1\n);',
    exampleResult: '테이블 "students"가 생성됩니다. id, name, grade 3개의 컬럼을 가지며, id는 기본키, name은 NULL 불가, grade의 기본값은 1입니다.',
    relatedTerms: ['alter-table', 'drop-table', 'primary-key'],
  },
  {
    id: 'alter-table',
    name: 'ALTER TABLE',
    category: 'DDL',
    definition: '기존 테이블의 구조를 변경합니다. 컬럼 추가(ADD), 컬럼 수정(MODIFY), 컬럼 삭제(DROP), 제약조건 추가/삭제 등이 가능합니다.',
    syntax: 'ALTER TABLE 테이블명\n  ADD 컬럼명 데이터타입;\n\nALTER TABLE 테이블명\n  MODIFY 컬럼명 새데이터타입;\n\nALTER TABLE 테이블명\n  DROP COLUMN 컬럼명;',
    exampleSQL: '-- 컬럼 추가\nALTER TABLE students ADD email VARCHAR(100);\n\n-- 컬럼 수정\nALTER TABLE students MODIFY name VARCHAR(100);\n\n-- 컬럼 삭제\nALTER TABLE students DROP COLUMN email;',
    exampleResult: 'students 테이블에 email 컬럼이 추가되고, name 컬럼의 길이가 50에서 100으로 늘어나며, 이후 email 컬럼이 삭제됩니다.',
    relatedTerms: ['create-table', 'drop-table', 'constraint'],
  },
  {
    id: 'drop-table',
    name: 'DROP TABLE',
    category: 'DDL',
    definition: '테이블과 테이블에 포함된 모든 데이터를 영구적으로 삭제합니다. ROLLBACK으로 복구가 불가능하므로 주의가 필요합니다.',
    syntax: 'DROP TABLE 테이블명;',
    exampleSQL: 'DROP TABLE students;',
    exampleResult: 'students 테이블과 그 안의 모든 데이터가 영구 삭제됩니다. 이 작업은 되돌릴 수 없습니다.',
    relatedTerms: ['create-table', 'truncate-table'],
  },
  {
    id: 'truncate-table',
    name: 'TRUNCATE TABLE',
    category: 'DDL',
    definition: '테이블 구조는 유지하면서 모든 데이터를 한 번에 삭제합니다. DELETE와 달리 WHERE 조건을 사용할 수 없고, ROLLBACK이 불가능합니다.',
    syntax: 'TRUNCATE TABLE 테이블명;',
    exampleSQL: 'TRUNCATE TABLE students;',
    exampleResult: 'students 테이블의 모든 행이 삭제되지만 테이블 구조(컬럼, 제약조건)는 그대로 남습니다. DELETE보다 훨씬 빠르게 동작합니다.',
    relatedTerms: ['drop-table', 'delete'],
  },
  {
    id: 'rename',
    name: 'RENAME',
    category: 'DDL',
    definition: '테이블 이름을 변경합니다. Oracle에서는 RENAME 문을 사용하고, 다른 DBMS에서는 ALTER TABLE ... RENAME TO 구문을 주로 사용합니다.',
    syntax: '-- Oracle\nRENAME 기존테이블명 TO 새테이블명;\n\n-- 일반 SQL\nALTER TABLE 기존테이블명 RENAME TO 새테이블명;',
    exampleSQL: '-- Oracle\nRENAME students TO learners;\n\n-- MySQL / PostgreSQL\nALTER TABLE students RENAME TO learners;',
    exampleResult: 'students 테이블이 learners로 이름이 변경됩니다. 기존 데이터와 구조는 그대로 유지됩니다.',
    relatedTerms: ['alter-table'],
  },
]
