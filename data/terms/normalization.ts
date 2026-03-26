// @TASK P4-R1-T1 - 정규화 용어 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Term } from '@/types'

export const normalizationTerms: Term[] = [
  {
    id: '1nf',
    name: '1NF (제1정규형)',
    category: 'NORMALIZATION',
    definition: '모든 컬럼의 값이 원자값(Atomic Value)이어야 합니다. 즉, 하나의 컬럼에 여러 값을 저장하거나 반복 그룹이 있어서는 안 됩니다.',
    syntax: null,
    exampleSQL: '-- 위반 예시 (전화번호 여러 개를 하나의 컬럼에)\n-- student_id | name  | phones\n-- 1          | 홍길동 | 010-1234, 010-5678\n\n-- 1NF 적용 후\nCREATE TABLE student_phones (\n  student_id INTEGER,\n  phone VARCHAR(20),\n  PRIMARY KEY (student_id, phone)\n);',
    exampleResult: '하나의 셀에 여러 전화번호를 저장하는 대신, 각 전화번호를 별도 행으로 분리합니다. 이로써 모든 값이 원자값을 갖게 됩니다.',
    relatedTerms: ['2nf', '3nf', 'bcnf'],
  },
  {
    id: '2nf',
    name: '2NF (제2정규형)',
    category: 'NORMALIZATION',
    definition: '1NF를 만족하면서, 기본키가 복합키일 경우 모든 비키 속성이 기본키 전체에 완전 함수 종속이어야 합니다. 부분 함수 종속을 제거합니다.',
    syntax: null,
    exampleSQL: '-- 위반 예시 (부분 함수 종속: 학생명은 student_id에만 종속)\n-- PK: (student_id, course_id)\n-- student_id | course_id | student_name | score\n\n-- 2NF 적용 후\nCREATE TABLE students (\n  student_id INTEGER PRIMARY KEY,\n  student_name VARCHAR(50)\n);\n\nCREATE TABLE enrollments (\n  student_id INTEGER,\n  course_id INTEGER,\n  score INTEGER,\n  PRIMARY KEY (student_id, course_id)\n);',
    exampleResult: '학생 정보와 수강 정보를 분리합니다. student_name은 student_id에만 종속되므로 students 테이블로 독립시킵니다.',
    relatedTerms: ['1nf', '3nf', 'bcnf'],
  },
  {
    id: '3nf',
    name: '3NF (제3정규형)',
    category: 'NORMALIZATION',
    definition: '2NF를 만족하면서, 이행적 함수 종속(A→B→C)을 제거합니다. 비키 속성은 기본키에만 종속되어야 하고, 다른 비키 속성에 종속되면 안 됩니다.',
    syntax: null,
    exampleSQL: '-- 위반 예시 (이행 종속: student_id → dept_id → dept_name)\n-- student_id | dept_id | dept_name\n\n-- 3NF 적용 후\nCREATE TABLE departments (\n  dept_id INTEGER PRIMARY KEY,\n  dept_name VARCHAR(50)\n);\n\nCREATE TABLE students (\n  student_id INTEGER PRIMARY KEY,\n  dept_id INTEGER REFERENCES departments(dept_id)\n);',
    exampleResult: '학과명(dept_name)은 학과ID(dept_id)에 종속되므로 별도 테이블로 분리합니다. 이로써 이행적 종속이 제거됩니다.',
    relatedTerms: ['1nf', '2nf', 'bcnf'],
  },
  {
    id: 'bcnf',
    name: 'BCNF (보이스-코드 정규형)',
    category: 'NORMALIZATION',
    definition: '3NF를 강화한 형태로, 모든 결정자(Determinant)가 후보키여야 합니다. 3NF를 만족해도 BCNF를 위반할 수 있으며, 이상현상이 발생할 수 있습니다.',
    syntax: null,
    exampleSQL: '-- 위반 예시: 교수가 한 과목만 담당, 학생은 과목당 한 교수에게 배정\n-- (학생, 과목) → 교수  AND  교수 → 과목\n-- 결정자 "교수"가 후보키가 아님\n-- student | course | professor\n\n-- BCNF 적용 후 분해\nCREATE TABLE professor_course (\n  professor VARCHAR(50) PRIMARY KEY,\n  course VARCHAR(50)\n);\n\nCREATE TABLE student_professor (\n  student_id INTEGER,\n  professor VARCHAR(50),\n  PRIMARY KEY (student_id, professor)\n);',
    exampleResult: '결정자인 professor가 후보키가 아닌 경우를 해소하기 위해 테이블을 분리합니다. 이상현상(삽입/삭제/갱신 이상)이 제거됩니다.',
    relatedTerms: ['1nf', '2nf', '3nf'],
  },
]
