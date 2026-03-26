# SQLD Visual Lab - Tasks

## 메타 정보

- **프로젝트명**: SQLD Visual Lab
- **기술 스택**: Next.js 14+ (App Router) + React 18+ + TypeScript + TailwindCSS + sql.js (SQLite WASM) + Vercel
- **생성일**: 2026-03-26
- **총 Phase**: 5개
- **총 Task**: 50+개

---

## Phase 0: 프로젝트 셋업 & 계약 정의

### [ ] P0-T0.1: Next.js 프로젝트 초기화

**담당**: backend-specialist (프로젝트 초기 구조)
**의존**: 없음

**파일**:
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `tailwind.config.ts`
- `.eslintrc.json`
- `.prettierrc.json`

**완료 조건**:
- [ ] Next.js 14+ 프로젝트 생성 (App Router 활성화)
- [ ] TypeScript 설정 완료
- [ ] TailwindCSS 통합 완료
- [ ] ESLint + Prettier 설정 완료
- [ ] 폴더 구조 생성: `app/`, `components/`, `lib/`, `data/`, `types/`, `hooks/`, `public/`
- [ ] pnpm 패키지 매니저 설정
- [ ] 프로젝트 시작 명령어 테스트 성공: `pnpm dev`

---

### [ ] P0-T0.2: 핵심 의존성 설치

**담당**: backend-specialist
**의존**: P0-T0.1

**파일**:
- `package.json` (의존성 추가)

**설치할 패키지**:
- sql.js (SQLite WASM)
- @monaco-editor/react (SQL 에디터)
- fuse.js (퍼지 검색)
- framer-motion (애니메이션)
- react-table (테이블 렌더링)
- clsx (클래스명 유틸)

**완료 조건**:
- [ ] sql.js 설치 및 WASM 파일 public/ 디렉터리에 복사
- [ ] Monaco Editor 설치 및 테스트
- [ ] fuse.js 설치
- [ ] 추가 의존성 설치
- [ ] `pnpm install` 성공

---

### [ ] P0-T0.3: 기본 설정 파일 작성

**담당**: backend-specialist
**의존**: P0-T0.2

**파일**:
- `types/index.ts`
- `lib/constants.ts`
- `styles/globals.css`
- `tailwind.config.ts` (커스텀 설정)

**완료 조건**:
- [ ] TypeScript 타입 정의 (SQLResult, Query, Term, Concept 등)
- [ ] 전역 스타일 설정 (리셋, 기본 스타일)
- [ ] Tailwind 색상/폰트 커스텀 설정
- [ ] 상수 정의 (페이지 경로, 샘플 데이터 이름 등)
- [ ] 타입 검증 성공: `pnpm tsc --noEmit`

---

## Phase 1: 공통 리소스 & 레이아웃

### [ ] P1-R1-T1: sql.js 엔진 래퍼

**담당**: backend-specialist
**의존**: P0-T0.2

**파일**:
- `lib/sql-engine.ts`
- `lib/sql-engine.test.ts`

**완료 조건**:
- [ ] sql.js 라이브러리 초기화 함수 작성 (`initDatabase()`)
- [ ] `executeQuery(sql: string)` 함수 구현 (SELECT, INSERT, UPDATE, DELETE, CREATE TABLE 지원)
- [ ] `resetDatabase()` 함수 구현
- [ ] SQL 구문 에러 핸들링 (사용자 친화적 에러 메시지)
- [ ] 테스트: 기본 SELECT, INSERT, 에러 케이스
- [ ] 테스트 커버리지 80% 이상

**병렬**: P1-R2-T1과 병렬 가능

---

### [ ] P1-R2-T1: 샘플 데이터셋 정의

**담당**: database-specialist
**의존**: P0-T0.1

**파일**:
- `data/datasets/index.ts`
- `data/datasets/employees.ts`
- `data/datasets/orders.ts`
- `data/datasets/sample-init.sql` (모든 데이터셋 한 번에 초기화)

**완료 조건**:
- [ ] EMPLOYEES 테이블 정의 (emp_id, emp_name, dept_id, salary, hire_date 등)
  - CREATE TABLE + INSERT 50행
  - SQLD 교재 예제와 동일한 스키마
- [ ] DEPARTMENTS 테이블 정의 (dept_id, dept_name, manager_id 등)
  - CREATE TABLE + INSERT 10행
- [ ] ORDERS 테이블 정의 (order_id, emp_id, order_date, amount 등)
  - CREATE TABLE + INSERT 100행
- [ ] 데이터셋 export 함수: `getDatasetSQL(name: 'employees' | 'orders')`
- [ ] 모든 데이터셋이 SQLD 시험 범위와 일치
- [ ] 데이터 일관성 검증 (외래키 관계 등)

**병렬**: P1-R1-T1과 병렬 가능

---

### [ ] P1-S0-T1: 공통 레이아웃 구성

**담당**: frontend-specialist
**의존**: P0-T0.1

**파일**:
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/layout/Navbar.tsx`
- `app/layout.tsx`

**완료 조건**:
- [ ] Header 컴포넌트: 로고 + 프로젝트명
- [ ] Navbar 컴포넌트: 4개 메뉴 (홈, SQL 실행기, 개념 설명, 용어 사전)
  - `usePathname` 사용해서 현재 페이지 활성 표시
  - 반응형 네비게이션 (모바일 해머버거 메뉴)
- [ ] Footer 컴포넌트: 저작권 + 링크
- [ ] RootLayout: Header + children + Footer 구성
- [ ] 반응형 CSS 작성
- [ ] 모든 페이지에서 레이아웃 적용 확인

---

### [ ] P1-S0-T2: 공통 UI 컴포넌트

**담당**: frontend-specialist
**의존**: P1-S0-T1

**파일**:
- `components/shared/SQLCodeBlock.tsx`
- `components/shared/PracticeButton.tsx`
- `components/shared/LoadingSpinner.tsx`
- `components/shared/ErrorAlert.tsx`

**완료 조건**:
- [ ] SQLCodeBlock: Syntax 하이라이팅 + 복사 버튼
- [ ] PracticeButton: "실습해보기" 버튼 (onClick으로 /playground?sql=... 이동)
- [ ] LoadingSpinner: 로딩 중 표시
- [ ] ErrorAlert: 에러 메시지 표시 + 아이콘
- [ ] 모든 컴포넌트 Storybook 또는 샘플 페이지에서 테스트
- [ ] 타입 안전성 확인 (TypeScript strict 모드)

---

## Phase 2: SQL 실행 엔진 & SQL 실행기 화면

### [ ] P2-R1-T1: SQL 실행 서비스

**담당**: backend-specialist
**의존**: P1-R1-T1

**파일**:
- `lib/sql-service.ts`
- `lib/sql-service.test.ts`

**완료 조건**:
- [ ] `executeQuery(sql)` 래퍼 함수 (sql-engine 호출)
- [ ] 쿼리 히스토리 관리 (localStorage 사용, 최근 10개)
  - `addToHistory(sql: string)`
  - `getHistory(): string[]`
  - `clearHistory()`
- [ ] CSV 내보내기 유틸리티
  - `exportToCSV(data: any[], filename: string)`
- [ ] 테스트: 쿼리 실행, 히스토리 저장/로드, CSV 생성
- [ ] 테스트 커버리지 80% 이상

---

### [ ] P2-R1-T2: SQL 실행기 상태 관리 훅

**담당**: frontend-specialist
**의존**: P2-R1-T1, P1-R2-T1

**파일**:
- `hooks/useSQLPlayground.ts`

**완료 조건**:
- [ ] 상태 정의:
  - `sql`: 현재 SQL 텍스트
  - `results`: 쿼리 결과 배열
  - `error`: 에러 메시지
  - `loading`: 실행 중 표시
  - `selectedDataset`: 선택된 샘플 데이터
  - `queryHistory`: 최근 쿼리 배열
- [ ] URL 파라미터 처리: `?sql=...` 읽기 및 자동 입력
- [ ] 함수:
  - `executeQuery(sql: string)`
  - `selectDataset(name: string)`
  - `clearEditor()`
  - `addToHistory(sql: string)`
- [ ] useEffect로 URL 모니터링
- [ ] 테스트: 상태 변경, URL 파라미터 읽기

---

### [ ] P2-S1-T1: SQL 실행기 UI - 에디터 영역

**담당**: frontend-specialist
**의존**: P2-R1-T2

**파일**:
- `components/features/playground/SQLEditor.tsx`
- `components/features/playground/SQLControls.tsx`
- `components/features/playground/SampleDataSelector.tsx`
- `components/features/playground/QueryHistory.tsx`

**완료 조건**:
- [ ] SQLEditor: Monaco Editor 래퍼 (SQL 문법 강조, 자동 포맷팅)
- [ ] SQLControls: 버튼 그룹
  - "실행" (Ctrl+Enter 단축키 지원)
  - "지우기" (에디터 리셋)
  - "저장" (히스토리 강제 저장)
- [ ] SampleDataSelector: 드롭다운
  - "EMPLOYEES (사원)"
  - "ORDERS (주문)"
  - "CUSTOM (새로 생성)"
  - 선택 시 자동으로 데이터셋 로드
- [ ] QueryHistory: 최근 쿼리 목록 (펼치기/접기)
  - 클릭 시 에디터에 쿼리 입력
  - 삭제 버튼
- [ ] 반응형 CSS
- [ ] Ctrl+Enter로 쿼리 실행 가능

---

### [ ] P2-S1-T2: SQL 실행기 UI - 결과 영역

**담당**: frontend-specialist
**의존**: P2-R1-T2

**파일**:
- `components/features/playground/ResultTable.tsx`
- `components/features/playground/ErrorDisplay.tsx`
- `components/features/playground/EmptyState.tsx`

**완료 조건**:
- [ ] ResultTable: 결과 테이블 렌더링
  - 컬럼 헤더 표시
  - 페이지네이션 (20행/페이지)
  - 정렬 기능 (컬럼 클릭)
  - CSV 다운로드 버튼
  - 행 개수 표시 (예: "5행 / 100행 조회됨")
- [ ] ErrorDisplay: SQL 구문 에러 표시
  - 에러 메시지
  - 초보자 친화적 도움말
  - "예제 보기" 버튼
- [ ] EmptyState: 빈 결과 표시
  - "조회된 행이 없습니다" 메시지
  - "WHERE 조건 확인" 제안
- [ ] 로딩 중 스피너 표시
- [ ] 타입 안전성 확인

---

### [ ] P2-S1-T3: SQL 실행기 페이지 조립

**담당**: frontend-specialist
**의존**: P2-S1-T1, P2-S1-T2

**파일**:
- `app/playground/page.tsx`
- `components/features/playground/PlaygroundLayout.tsx`

**완료 조건**:
- [ ] 상하 분할 레이아웃 (50% : 50%)
- [ ] 상단: SampleDataSelector + SQLEditor + SQLControls + QueryHistory
- [ ] 하단: ResultTable / ErrorDisplay / EmptyState (조건에 따라 표시)
- [ ] Ctrl+Enter 단축키로 쿼리 실행
- [ ] URL ?sql= 파라미터로 자동 입력
  - 예: `/playground?sql=SELECT%20*%20FROM%20employees`
- [ ] 반응형 CSS (모바일에서 전체 높이 조정)
- [ ] 모든 상태 (로딩, 에러, 성공, 빈 결과) 표시

---

### [ ] P2-S1-V: SQL 실행기 검증

**담당**: test-specialist
**의존**: P2-S1-T3

**파일**:
- `tests/playground.integration.test.ts`
- `tests/e2e/playground.e2e.test.ts`

**테스트 시나리오**:
- [ ] SQL 실행 → 결과 테이블 표시
  - `SELECT * FROM employees` → 테이블 표시
  - 행 개수 정확성 확인
- [ ] SQL 구문 에러 → 에러 메시지 + 도움말 표시
  - `SELECT FORM employees` → 에러 메시지 표시
- [ ] 샘플 데이터 전환 동작
  - "EMPLOYEES" → "ORDERS" → 테이블 전환 확인
- [ ] 쿼리 히스토리 저장/로드
  - 쿼리 실행 → 히스토리 목록에 나타남
  - 히스토리 클릭 → 에디터에 입력됨
- [ ] ?sql= 파라미터 연계
  - `/playground?sql=SELECT*FROM employees` → 에디터에 입력됨
- [ ] Ctrl+Enter 단축키 동작
- [ ] CSV 다운로드 기능
- [ ] 페이지네이션 동작 확인

**완료 조건**: 모든 테스트 통과, 예상 동작 확인

---

## Phase 3: 시각적 개념 설명 & 개념 설명 화면

### [ ] P3-R1-T1: 개념 데이터 정의

**담당**: database-specialist
**의존**: P0-T0.1

**파일**:
- `data/concepts/index.ts`
- `data/concepts/select.ts`
- `data/concepts/where.ts`
- `data/concepts/order-by.ts`
- `data/concepts/join.ts`
- `data/concepts/aggregate.ts`
- `data/concepts/subquery.ts`

**각 개념 데이터 구조**:
```typescript
interface ConceptDetail {
  id: string
  name: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: 'SELECT' | 'JOIN' | 'AGGREGATE' | 'SUBQUERY' | 'NORMALIZATION'
  shortDescription: string
  fullDescription: string
  svgDiagram: string  // SVG 코드
  sqlExample: string
  useCases: string[]
  relatedConcepts: string[]
  notes: string
}
```

**완료 조건**:
- [ ] SELECT 개념 (SELECT, WHERE, ORDER BY 포함)
- [ ] JOIN 개념들 (INNER, LEFT, RIGHT, FULL OUTER)
- [ ] 집계 개념 (GROUP BY, HAVING, 집계함수)
- [ ] 서브쿼리 개념
- [ ] 정규화 개념 (1NF, 2NF, 3NF)
- [ ] 총 20개 이상의 개념
- [ ] 각 개념에 SQL 예제 포함
- [ ] 각 개념에 쉬운 설명 포함 (초보자 눈높이)

---

### [ ] P3-R1-T2: SVG 시각화 컴포넌트

**담당**: frontend-specialist
**의존**: P3-R1-T1

**파일**:
- `components/visualizations/VennDiagram.tsx`
- `components/visualizations/TableStructure.tsx`
- `components/visualizations/DataFlow.tsx`
- `components/visualizations/ConceptVisualizer.tsx`

**완료 조건**:
- [ ] VennDiagram: JOIN 벤 다이어그램
  - INNER JOIN: 교집합 강조
  - LEFT JOIN: 좌측 전체 + 교집합
  - RIGHT JOIN: 우측 전체 + 교집합
  - FULL OUTER JOIN: 전체 합집합
  - Framer Motion으로 애니메이션 추가
- [ ] TableStructure: 테이블 구조 시각화
  - 컬럼과 데이터 타입 표시
  - 행 예시 표시
- [ ] DataFlow: 데이터 필터링 흐름
  - WHERE 필터 과정
  - GROUP BY 묶음 과정
  - 단계별로 표시
- [ ] CSS 애니메이션 (fade-in, highlight)
- [ ] 반응형 SVG (모바일 대응)

---

### [ ] P3-S1-T1: 개념 설명 UI

**담당**: frontend-specialist
**의존**: P3-R1-T2, P1-R1-T1

**파일**:
- `components/features/concepts/ConceptList.tsx`
- `components/features/concepts/ConceptPanel.tsx`
- `components/features/concepts/MiniSQLExecutor.tsx`

**완료 조건**:
- [ ] ConceptList: 좌측 개념 목록
  - 카테고리별로 그룹핑 (SELECT, JOIN, AGGREGATE 등)
  - 개념 선택 가능 (클릭)
  - 스크롤 가능
  - 현재 선택된 개념 하이라이트
- [ ] ConceptPanel: 우측 설명 패널
  - 시각화 (SVG)
  - 설명 텍스트
  - SQL 예제
  - "실습해보기" 버튼
  - 관련 개념 링크
- [ ] MiniSQLExecutor: 미니 SQL 실행기 (개념 화면 내)
  - "실습해보기" 클릭 시 예제 SQL 실행
  - 결과를 팝업이나 탭으로 표시
- [ ] 개념 전환 애니메이션
- [ ] 모바일 반응형 (스택 레이아웃)

---

### [ ] P3-S1-T2: 개념 설명 페이지 조립

**담당**: frontend-specialist
**의존**: P3-S1-T1

**파일**:
- `app/concepts/page.tsx`

**완료 조건**:
- [ ] Sidebar + Main 레이아웃
  - 좌측: ConceptList (300px 고정 너비, 스크롤 가능)
  - 우측: ConceptPanel (나머지 영역)
- [ ] 개념 전환 시 부드러운 애니메이션
- [ ] "SQL 실행기에서 실습" 버튼
  - `/playground?sql=...` 이동
  - 예제 SQL 자동 입력
- [ ] 모바일에서 스택 레이아웃 (좌→우 순서)
- [ ] 페이지 로드 시 첫 번째 개념 (SELECT) 선택

---

### [ ] P3-S1-V: 개념 설명 검증

**담당**: test-specialist
**의존**: P3-S1-T2

**파일**:
- `tests/concepts.integration.test.ts`

**테스트 시나리오**:
- [ ] 개념 선택 → 시각화 + 설명 전환 확인
  - [SELECT] → 설명 업데이트
  - [INNER JOIN] → 벤 다이어그램 표시
- [ ] 미니 SQL 실행기 동작 확인
  - "실습해보기" → 결과 표시
- [ ] "SQL 실행기에서 실습" 버튼 동작
  - `/playground?sql=...` 이동
  - URL 파라미터 확인
- [ ] JOIN 벤 다이어그램 4종 표시
  - INNER: 교집합만
  - LEFT: 좌측 + 교집합
  - RIGHT: 우측 + 교집합
  - FULL: 전체
- [ ] 애니메이션 부드럽게 재생됨
- [ ] 모바일 레이아웃 확인

**완료 조건**: 모든 테스트 통과, 예상 동작 확인

---

## Phase 4: 용어 사전 & 용어 사전 화면

### [ ] P4-R1-T1: SQLD 용어 데이터 정의

**담당**: database-specialist
**의존**: P0-T0.1

**파일**:
- `data/terms/index.ts`
- `data/terms/ddl.ts`
- `data/terms/dml.ts`
- `data/terms/tcl.ts`
- `data/terms/normalization.ts`
- `data/terms/other.ts`

**각 용어 데이터 구조**:
```typescript
interface Term {
  id: string
  name: string
  category: 'DDL' | 'DML' | 'TCL' | 'NORMALIZATION' | 'OTHER'
  definition: string
  usage: string
  exampleSQL: string
  exampleResult: string
  relatedTerms: string[]
  notes: string
}
```

**완료 조건**:
- [ ] DDL 용어: CREATE, ALTER, DROP, TRUNCATE, RENAME (5개+)
- [ ] DML 용어: SELECT, INSERT, UPDATE, DELETE, MERGE (5개+)
- [ ] TCL 용어: COMMIT, ROLLBACK, SAVEPOINT (3개+)
- [ ] 정규화 용어: 1NF, 2NF, 3NF, BCNF (4개+)
- [ ] 기타: 인덱스, 뷰, 트리거, 프로시저, 제약조건 (10개+)
- [ ] 총 50개 이상의 용어
- [ ] 각 용어에 정의 + 구문 + SQL 예제 + 예제 결과 포함
- [ ] 각 용어에 관련 용어 링크 포함

---

### [ ] P4-S1-T1: 용어 사전 UI

**담당**: frontend-specialist
**의존**: P4-R1-T1

**파일**:
- `components/features/glossary/SearchBar.tsx`
- `components/features/glossary/CategoryTabs.tsx`
- `components/features/glossary/TermCard.tsx`
- `components/features/glossary/TermDetailModal.tsx`

**완료 조건**:
- [ ] SearchBar: 퍼지 검색 입력 (fuse.js 사용)
  - 실시간 필터링
  - 자동완성 제안
- [ ] CategoryTabs: 카테고리 탭 필터
  - "전체", "DDL", "DML", "TCL", "정규화", "기타"
  - 탭 클릭 시 필터링
  - 선택된 탭 하이라이트
- [ ] TermCard: 용어 카드 (3열 그리드)
  - 용어명
  - 카테고리 배지
  - 정의 요약 (한 줄)
  - "보기" 버튼 (모달 열기)
  - "실습" 버튼 (/playground?sql=... 이동)
- [ ] TermDetailModal: 용어 상세 모달
  - 전체 정의
  - 구문
  - SQL 예제
  - 예제 결과
  - 관련 용어 링크
  - 모달 닫기 버튼
- [ ] 3열 그리드 레이아웃 (모바일 반응형)

---

### [ ] P4-S1-T2: 용어 사전 페이지 조립

**담당**: frontend-specialist
**의존**: P4-S1-T1

**파일**:
- `app/glossary/page.tsx`

**완료 조건**:
- [ ] Full-width 레이아웃
- [ ] 상단: SearchBar + CategoryTabs
- [ ] 본문: TermCard 3열 그리드
  - 12개/페이지 (3열 × 4행)
  - 페이지네이션 (다음/이전)
- [ ] TermDetailModal (용어 상세보기)
- [ ] "실습" 버튼 동작 확인
  - `/playground?sql=...` 이동
- [ ] 검색 + 카테고리 동시 필터링
  - 검색어 입력 후 카테고리 선택 → 둘 다 적용
- [ ] 검색 결과 없을 때 Empty State 표시
- [ ] 모바일 반응형 (1열 또는 2열)

---

### [ ] P4-S1-V: 용어 사전 검증

**담당**: test-specialist
**의존**: P4-S1-T2

**파일**:
- `tests/glossary.integration.test.ts`

**테스트 시나리오**:
- [ ] 검색 필터링 동작
  - "INSERT" 검색 → INSERT 용어만 표시
  - "JO" 검색 → JOIN 관련 용어 표시
- [ ] 카테고리 탭 전환 동작
  - "DDL" 클릭 → DDL 용어만 표시
  - "DML" 클릭 → DML 용어로 전환
- [ ] 용어 상세 모달 열기/닫기
  - "보기" 버튼 → 모달 열림
  - X 버튼 또는 바깥쪽 클릭 → 모달 닫힘
- [ ] "실습" 버튼 동작
  - `/playground?sql=...` 이동 확인
  - 예제 SQL 정확성 확인
- [ ] 페이지네이션 동작
  - 다음 페이지 → 새로운 용어 12개 표시
  - 이전 페이지 → 이전 용어로 돌아감
- [ ] 검색 결과 없을 때 Empty State 표시
- [ ] 모바일 레이아웃 확인

**완료 조건**: 모든 테스트 통과, 예상 동작 확인

---

## Phase 5: 대시보드 & 통합 & 배포

### [ ] P5-S1-T1: 메인 대시보드 페이지

**담당**: frontend-specialist
**의존**: P1-S0-T1, P1-S0-T2

**파일**:
- `app/page.tsx`
- `components/features/dashboard/HeroSection.tsx`
- `components/features/dashboard/FeatureCard.tsx`
- `components/features/dashboard/WelcomeBack.tsx`

**완료 조건**:
- [ ] HeroSection: 환영 메시지
  - "🎓 SQLD Visual Lab에 오신 것을 환영합니다"
  - "SQL 개념을 시각적으로 이해하고 브라우저에서 실습하세요"
- [ ] FeatureCard: 3개 기능 카드
  - SQL 실행기 (파란색)
  - 시각적 개념 설명 (초록색)
  - SQLD 용어 사전 (노란색)
  - 각 카드에 설명 + "시작하기" 버튼
- [ ] 첫 방문 / 재방문 분기 (LocalStorage)
  - 첫 방문: 환영 메시지 + 시작 가이드
  - 재방문: "안녕하세요! 마지막 방문: 3일 전"
- [ ] 마지막 방문 페이지 바로가기 버튼
- [ ] 반응형 레이아웃 (모바일 1열)

---

### [ ] P5-T1: 통합 테스트

**담당**: test-specialist
**의존**: P5-S1-T1, P2-S1-V, P3-S1-V, P4-S1-V

**파일**:
- `tests/integration.test.ts`
- `tests/e2e.test.ts`

**테스트 시나리오**:
- [ ] 전체 네비게이션 흐름 테스트
  - 홈 → SQL 실행기 → 개념 설명 → 용어 사전 → 홈 (모두 접근 가능)
  - 현재 페이지 활성 표시 (Navbar)
- [ ] 화면 간 데이터 연계 테스트
  - 개념 설명 → "실습" 클릭 → SQL 실행기 → SQL 자동 입력
  - 용어 사전 → "실습" 클릭 → SQL 실행기 → SQL 자동 입력
- [ ] sql.js WASM 로딩 + 실행 테스트
  - 첫 페이지 로드 시 WASM 파일 로드 완료
  - SQL 쿼리 실행 성공
- [ ] LocalStorage 영속성 테스트
  - 쿼리 히스토리 저장/로드
  - 마지막 방문 페이지 저장/로드
- [ ] 페이지 로드 속도 테스트 (LightHouse)
  - 첫 페이지 로드 < 2초 (3G 기준)
  - 다른 페이지 로드 < 1초
- [ ] 브라우저 호환성 테스트
  - Chrome, Firefox, Safari 최신 버전에서 동작 확인

**완료 조건**: 모든 테스트 통과, 예상 동작 확인

---

### [ ] P5-T2: Vercel 배포

**담당**: backend-specialist
**의존**: P5-T1

**파일**:
- `vercel.json` (배포 설정)
- `.env.example` (환경 변수 템플릿)
- `next.config.js` (WASM 설정)

**완료 조건**:
- [ ] Vercel 프로젝트 생성 및 연결
- [ ] 환경 변수 설정 (필요 시)
  - `.env.local` 작성
  - Vercel 대시보드에서 환경 변수 설정
- [ ] WASM 파일 정적 서빙 설정
  - `public/sql-wasm.wasm` 정적 경로 확인
  - `next.config.js`에서 WASM 로드 설정
- [ ] 빌드 + 배포 테스트
  - `pnpm build` 성공
  - Vercel 배포 성공
- [ ] 프로덕션 URL 확인
  - 모든 페이지 접근 가능
  - SQL 실행기 동작 확인
  - 개념 설명 동작 확인
  - 용어 사전 동작 확인
- [ ] 프로덕션 LightHouse 점수 측정
- [ ] 배포 URL 문서화

---

## 의존성 그래프 요약

```
Phase 0 (기초)
├── P0-T0.1: Next.js 초기화
├── P0-T0.2: 의존성 설치 (P0-T0.1 필요)
└── P0-T0.3: 기본 설정 (P0-T0.2 필요)

Phase 1 (공통)
├── P1-R1-T1: sql.js 래퍼 (P0-T0.2 필요) ┐
├── P1-R2-T1: 샘플 데이터 (P0-T0.1 필요) ┤ 병렬 가능
├── P1-S0-T1: 레이아웃 (P0-T0.1 필요)
└── P1-S0-T2: 공통 컴포넌트 (P1-S0-T1 필요)

Phase 2 (SQL 실행기)
├── P2-R1-T1: SQL 서비스 (P1-R1-T1 필요)
├── P2-R1-T2: SQL 상태 관리 (P2-R1-T1, P1-R2-T1 필요)
├── P2-S1-T1: 에디터 UI (P2-R1-T2 필요)
├── P2-S1-T2: 결과 UI (P2-R1-T2 필요)
├── P2-S1-T3: 페이지 조립 (P2-S1-T1, P2-S1-T2 필요)
└── P2-S1-V: 검증 (P2-S1-T3 필요)

Phase 3 (개념 설명)
├── P3-R1-T1: 개념 데이터 (P0-T0.1 필요)
├── P3-R1-T2: SVG 시각화 (P3-R1-T1 필요)
├── P3-S1-T1: 개념 UI (P3-R1-T2, P1-R1-T1 필요)
├── P3-S1-T2: 페이지 조립 (P3-S1-T1 필요)
└── P3-S1-V: 검증 (P3-S1-T2 필요)

Phase 4 (용어 사전)
├── P4-R1-T1: 용어 데이터 (P0-T0.1 필요)
├── P4-S1-T1: 용어 UI (P4-R1-T1 필요)
├── P4-S1-T2: 페이지 조립 (P4-S1-T1 필요)
└── P4-S1-V: 검증 (P4-S1-T2 필요)

Phase 5 (배포)
├── P5-S1-T1: 대시보드 (P1-S0-T1, P1-S0-T2 필요)
├── P5-T1: 통합 테스트 (P5-S1-T1, P2-S1-V, P3-S1-V, P4-S1-V 필요)
└── P5-T2: Vercel 배포 (P5-T1 필요)
```

---

## 주의사항

### TDD 워크플로우

1. **Phase 1+**: 모든 태스크는 테스트 먼저 작성
   - 테스트 파일: `*.test.ts` 또는 `*.spec.ts`
   - 구현: 테스트 통과할 때까지

2. **Phase 병합**: Orchestrator가 Phase 단위로 수행
   - Specialist는 자신의 태스크만 완료
   - Worktree 및 브랜치 정보는 추가 예정

3. **의존성 확인**:
   - 태스크 시작 전 의존 태스크 완료 확인
   - 병렬 태스크는 동시에 진행 가능

---

**최종 검토자**: 프로젝트 리더
**최종 검토일**: 2026-03-26
**다음 단계**: Phase 0 태스크 시작
