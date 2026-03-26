// @TASK P3-R1-T1 - JOIN 관련 개념 데이터
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'

export const joinConcepts: Concept[] = [
  {
    id: 'inner-join',
    name: 'INNER JOIN',
    difficulty: 'beginner',
    category: 'JOIN',
    shortDescription: '두 테이블에서 조인 조건이 일치하는 행만 반환',
    fullDescription:
      'INNER JOIN은 두 테이블에서 공통된 값이 있는 행만 결합합니다.\n' +
      '벤 다이어그램으로 표현하면 두 원이 겹치는 교집합 부분에 해당합니다.\n' +
      '조인 조건(ON 절)을 만족하지 않는 행은 결과에 포함되지 않습니다.\n' +
      'SQLD 시험에서 가장 자주 출제되는 JOIN 유형이므로 반드시 익혀두세요.',
    visualizationType: 'venn',
    visualizationData: { type: 'inner' },
    sqlExample: `-- 사원과 부서명을 함께 조회 (일치하는 행만)
SELECT E.EMP_NAME, D.DEPT_NAME, E.SALARY
FROM EMPLOYEES E
INNER JOIN DEPARTMENTS D
  ON E.DEPT_ID = D.DEPT_ID;

-- 부서가 없는 사원은 결과에서 제외됨
-- 사원이 없는 부서도 결과에서 제외됨`,
    useCases: [
      '두 테이블에서 관련된 데이터를 함께 조회할 때',
      '외래키로 연결된 테이블을 결합할 때',
      '공통 데이터만 필요할 때',
    ],
    relatedConcepts: ['left-join', 'right-join', 'full-outer-join'],
    notes: 'JOIN만 쓰면 INNER JOIN과 동일합니다. ON 조건의 컬럼 데이터 타입이 일치해야 합니다.',
  },
  {
    id: 'left-join',
    name: 'LEFT JOIN',
    difficulty: 'beginner',
    category: 'JOIN',
    shortDescription: '왼쪽 테이블 전체 + 오른쪽 테이블 일치하는 행 반환',
    fullDescription:
      'LEFT JOIN(LEFT OUTER JOIN)은 왼쪽 테이블의 모든 행을 유지하면서 오른쪽 테이블과 결합합니다.\n' +
      '오른쪽 테이블에 일치하는 값이 없으면 NULL로 채워집니다.\n' +
      '실무에서 "기준 테이블의 데이터를 모두 보여주면서 관련 정보를 추가"할 때 가장 많이 사용합니다.\n' +
      'LEFT OUTER JOIN과 LEFT JOIN은 동일한 결과를 반환합니다.',
    visualizationType: 'venn',
    visualizationData: { type: 'left' },
    sqlExample: `-- 모든 사원 조회 (부서 없어도 포함)
SELECT E.EMP_NAME, D.DEPT_NAME
FROM EMPLOYEES E
LEFT JOIN DEPARTMENTS D
  ON E.DEPT_ID = D.DEPT_ID;

-- 부서가 배정되지 않은 사원 찾기
SELECT E.EMP_NAME
FROM EMPLOYEES E
LEFT JOIN DEPARTMENTS D
  ON E.DEPT_ID = D.DEPT_ID
WHERE D.DEPT_ID IS NULL;`,
    useCases: [
      '부서가 없는 사원도 포함해서 전체 목록이 필요할 때',
      '짝이 없는(매칭 안 된) 데이터를 찾을 때',
      '기준 테이블의 모든 행을 유지해야 할 때',
    ],
    relatedConcepts: ['inner-join', 'right-join', 'full-outer-join'],
    notes: 'WHERE절에서 오른쪽 테이블 컬럼 IS NULL 조건을 쓰면 "짝이 없는 행"만 추출할 수 있습니다.',
  },
  {
    id: 'right-join',
    name: 'RIGHT JOIN',
    difficulty: 'beginner',
    category: 'JOIN',
    shortDescription: '오른쪽 테이블 전체 + 왼쪽 테이블 일치하는 행 반환',
    fullDescription:
      'RIGHT JOIN(RIGHT OUTER JOIN)은 오른쪽 테이블의 모든 행을 유지하면서 왼쪽 테이블과 결합합니다.\n' +
      '왼쪽 테이블에 일치하는 값이 없으면 NULL로 채워집니다.\n' +
      'LEFT JOIN의 테이블 순서를 바꾼 것과 동일한 결과를 얻을 수 있습니다.\n' +
      '실무에서는 LEFT JOIN이 더 직관적이어서 RIGHT JOIN보다 자주 사용됩니다.',
    visualizationType: 'venn',
    visualizationData: { type: 'right' },
    sqlExample: `-- 모든 부서 조회 (사원 없는 부서도 포함)
SELECT E.EMP_NAME, D.DEPT_NAME
FROM EMPLOYEES E
RIGHT JOIN DEPARTMENTS D
  ON E.DEPT_ID = D.DEPT_ID;

-- 사원이 없는 부서 찾기
SELECT D.DEPT_NAME
FROM EMPLOYEES E
RIGHT JOIN DEPARTMENTS D
  ON E.DEPT_ID = D.DEPT_ID
WHERE E.EMP_ID IS NULL;`,
    useCases: [
      '사원이 없는 빈 부서도 목록에 포함할 때',
      '오른쪽 테이블을 기준으로 전체 결과가 필요할 때',
    ],
    relatedConcepts: ['inner-join', 'left-join', 'full-outer-join'],
    notes: 'RIGHT JOIN은 LEFT JOIN으로 테이블 순서를 바꿔 대체할 수 있습니다.',
  },
  {
    id: 'full-outer-join',
    name: 'FULL OUTER JOIN',
    difficulty: 'beginner',
    category: 'JOIN',
    shortDescription: '두 테이블의 모든 행을 반환하고 일치하지 않으면 NULL',
    fullDescription:
      'FULL OUTER JOIN은 LEFT JOIN과 RIGHT JOIN을 합친 것으로, 양쪽 테이블의 모든 행을 반환합니다.\n' +
      '한쪽 테이블에만 있는 행은 다른 쪽 컬럼이 NULL로 채워집니다.\n' +
      '두 테이블에서 어느 쪽에도 매칭되지 않는 행을 모두 찾을 때 유용합니다.\n' +
      'SQLite(실습 환경)는 FULL OUTER JOIN을 직접 지원하지 않아 LEFT JOIN UNION RIGHT JOIN으로 대체합니다.',
    visualizationType: 'venn',
    visualizationData: { type: 'full' },
    sqlExample: `-- 모든 사원 + 모든 부서 (일치하지 않으면 NULL)
-- (SQLite에서는 UNION으로 대체)
SELECT E.EMP_NAME, D.DEPT_NAME
FROM EMPLOYEES E
LEFT JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID
UNION
SELECT E.EMP_NAME, D.DEPT_NAME
FROM EMPLOYEES E
RIGHT JOIN DEPARTMENTS D ON E.DEPT_ID = D.DEPT_ID;`,
    useCases: [
      '두 테이블 전체를 비교하고 싶을 때',
      '어느 쪽에든 매칭이 안 된 행을 모두 찾을 때',
    ],
    relatedConcepts: ['inner-join', 'left-join', 'right-join'],
    notes: 'SQLD 시험에서 FULL OUTER JOIN 결과 행 수 계산 문제가 자주 출제됩니다.',
  },
]
