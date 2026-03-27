// @TASK P4-R1-T2 - DCL 용어 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Term } from '@/types'

export const dclTerms: Term[] = [
  {
    id: 'grant',
    name: 'GRANT',
    category: 'DCL',
    definition: '데이터베이스 객체(테이블, 뷰, 프로시저 등)에 대한 권한을 사용자에게 부여합니다. SELECT, INSERT, UPDATE, DELETE 등 특정 권한만 선택적으로 부여할 수 있습니다.',
    syntax: 'GRANT 권한 [,권한...]\nON 객체 [스키마.]객체명\nTO 사용자 [IDENTIFIED BY 암호];',
    exampleSQL: 'GRANT SELECT, INSERT, UPDATE\nON students\nTO user1;\n\nGRANT ALL PRIVILEGES\nON employees\nTO admin;',
    exampleResult: 'user1은 students 테이블에 대해 SELECT, INSERT, UPDATE 권한을 가지게 됩니다. admin은 employees 테이블에 대한 모든 권한을 가집니다.',
    relatedTerms: ['revoke'],
  },
  {
    id: 'revoke',
    name: 'REVOKE',
    category: 'DCL',
    definition: '사용자에게 부여된 권한을 회수합니다. GRANT로 부여한 권한을 취소할 때 사용하며, 특정 권한만 선택적으로 회수할 수 있습니다.',
    syntax: 'REVOKE 권한 [,권한...]\nON [스키마.]객체명\nFROM 사용자;',
    exampleSQL: 'REVOKE INSERT, UPDATE\nON students\nFROM user1;\n\nREVOKE ALL PRIVILEGES\nON employees\nFROM admin;',
    exampleResult: 'user1의 students 테이블에 대한 INSERT, UPDATE 권한이 취소되고, admin의 employees 테이블 모든 권한이 회수됩니다.',
    relatedTerms: ['grant'],
  },
]
