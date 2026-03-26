// @TASK P4-R1-T1 - TCL 용어 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Term } from '@/types'

export const tclTerms: Term[] = [
  {
    id: 'commit',
    name: 'COMMIT',
    category: 'TCL',
    definition: '트랜잭션에서 수행한 모든 변경 사항을 데이터베이스에 영구 저장합니다. COMMIT 이후에는 ROLLBACK으로 되돌릴 수 없습니다.',
    syntax: 'COMMIT;',
    exampleSQL: 'BEGIN;\nINSERT INTO students VALUES (1, \'홍길동\', 3);\nUPDATE students SET grade = 4 WHERE id = 2;\nCOMMIT;',
    exampleResult: 'INSERT와 UPDATE 작업이 영구적으로 데이터베이스에 반영됩니다. 다른 사용자도 변경된 데이터를 볼 수 있게 됩니다.',
    relatedTerms: ['rollback', 'savepoint'],
  },
  {
    id: 'rollback',
    name: 'ROLLBACK',
    category: 'TCL',
    definition: '트랜잭션에서 수행한 변경 사항을 취소하고 이전 상태로 되돌립니다. SAVEPOINT를 지정하면 특정 시점까지만 되돌릴 수 있습니다.',
    syntax: '-- 전체 롤백\nROLLBACK;\n\n-- 특정 저장점까지 롤백\nROLLBACK TO SAVEPOINT 저장점명;',
    exampleSQL: 'BEGIN;\nINSERT INTO students VALUES (1, \'홍길동\', 3);\nDELETE FROM students WHERE id = 5;\nROLLBACK;',
    exampleResult: 'INSERT와 DELETE 작업이 모두 취소됩니다. 트랜잭션 시작 전 상태로 완전히 되돌아갑니다.',
    relatedTerms: ['commit', 'savepoint'],
  },
  {
    id: 'savepoint',
    name: 'SAVEPOINT',
    category: 'TCL',
    definition: '트랜잭션 내에서 중간 저장점을 설정합니다. ROLLBACK TO SAVEPOINT를 사용하면 해당 저장점까지만 되돌릴 수 있어 세밀한 트랜잭션 제어가 가능합니다.',
    syntax: 'SAVEPOINT 저장점명;\n-- 작업 수행\nROLLBACK TO SAVEPOINT 저장점명;\n-- 또는\nRELEASE SAVEPOINT 저장점명;',
    exampleSQL: 'BEGIN;\nINSERT INTO students VALUES (1, \'홍길동\', 3);\nSAVEPOINT sp1;\nINSERT INTO students VALUES (2, \'이순신\', 4);\nROLLBACK TO SAVEPOINT sp1;\nCOMMIT;',
    exampleResult: '홍길동은 커밋되고, sp1 이후 작업인 이순신 삽입은 취소됩니다. SAVEPOINT 덕분에 부분적인 롤백이 가능합니다.',
    relatedTerms: ['commit', 'rollback'],
  },
]
