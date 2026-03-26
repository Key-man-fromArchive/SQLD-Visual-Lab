// @TASK P4-R1-T1 - DML 용어 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Term } from '@/types'

export const dmlTerms: Term[] = [
  {
    id: 'select',
    name: 'SELECT',
    category: 'DML',
    definition: '테이블에서 데이터를 조회합니다. SQL에서 가장 많이 사용되는 명령어로, WHERE 조건, ORDER BY 정렬, GROUP BY 그룹화 등 다양한 절과 함께 사용됩니다.',
    syntax: 'SELECT 컬럼명1, 컬럼명2, ...\nFROM 테이블명\n[WHERE 조건]\n[GROUP BY 컬럼명]\n[HAVING 조건]\n[ORDER BY 컬럼명 [ASC|DESC]];',
    exampleSQL: 'SELECT name, grade\nFROM students\nWHERE grade >= 2\nORDER BY name ASC;',
    exampleResult: 'grade가 2 이상인 학생의 이름과 학년이 이름 오름차순으로 조회됩니다.',
    relatedTerms: ['insert', 'update', 'delete'],
  },
  {
    id: 'insert',
    name: 'INSERT',
    category: 'DML',
    definition: '테이블에 새로운 행(row)을 추가합니다. 특정 컬럼만 지정하거나, 전체 컬럼에 값을 삽입할 수 있습니다.',
    syntax: '-- 전체 컬럼\nINSERT INTO 테이블명 VALUES (값1, 값2, ...);\n\n-- 특정 컬럼 지정\nINSERT INTO 테이블명 (컬럼1, 컬럼2)\nVALUES (값1, 값2);',
    exampleSQL: 'INSERT INTO students (id, name, grade)\nVALUES (1, \'홍길동\', 3);',
    exampleResult: 'students 테이블에 id=1, name=홍길동, grade=3인 새 행이 추가됩니다.',
    relatedTerms: ['select', 'update', 'delete'],
  },
  {
    id: 'update',
    name: 'UPDATE',
    category: 'DML',
    definition: '테이블의 기존 데이터를 수정합니다. WHERE 조건 없이 실행하면 모든 행이 변경되므로 주의가 필요합니다.',
    syntax: 'UPDATE 테이블명\nSET 컬럼명1 = 값1, 컬럼명2 = 값2\n[WHERE 조건];',
    exampleSQL: 'UPDATE students\nSET grade = 4\nWHERE name = \'홍길동\';',
    exampleResult: 'name이 홍길동인 학생의 grade가 4로 수정됩니다. WHERE 조건에 맞는 모든 행이 변경됩니다.',
    relatedTerms: ['select', 'insert', 'delete'],
  },
  {
    id: 'delete',
    name: 'DELETE',
    category: 'DML',
    definition: '테이블에서 조건에 맞는 행을 삭제합니다. TRUNCATE와 달리 WHERE 조건으로 특정 행만 삭제할 수 있고, ROLLBACK으로 복구 가능합니다.',
    syntax: 'DELETE FROM 테이블명\n[WHERE 조건];',
    exampleSQL: 'DELETE FROM students\nWHERE grade = 1;',
    exampleResult: 'grade가 1인 모든 학생 행이 삭제됩니다. WHERE 조건이 없으면 전체 데이터가 삭제됩니다.',
    relatedTerms: ['select', 'insert', 'update', 'truncate-table'],
  },
  {
    id: 'merge',
    name: 'MERGE',
    category: 'DML',
    definition: '조건에 따라 INSERT, UPDATE, DELETE를 하나의 구문으로 처리합니다. 원본 테이블과 대상 테이블을 비교하여 일치하면 UPDATE, 없으면 INSERT를 수행합니다.',
    syntax: 'MERGE INTO 대상테이블 AS target\nUSING 원본테이블 AS source\nON 조건\nWHEN MATCHED THEN\n  UPDATE SET ...\nWHEN NOT MATCHED THEN\n  INSERT (컬럼) VALUES (값);',
    exampleSQL: 'MERGE INTO students AS target\nUSING new_data AS source\nON target.id = source.id\nWHEN MATCHED THEN\n  UPDATE SET target.grade = source.grade\nWHEN NOT MATCHED THEN\n  INSERT (id, name, grade)\n  VALUES (source.id, source.name, source.grade);',
    exampleResult: '같은 id가 있으면 grade를 업데이트하고, 없으면 새로운 행을 삽입합니다. UPSERT(update + insert) 기능입니다.',
    relatedTerms: ['insert', 'update', 'delete'],
  },
]
