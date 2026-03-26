# 06-screens.md (화면 정의)

**프로젝트명**: SQLD Visual Lab
**작성일**: 2026-03-26
**버전**: 1.0
**상태**: 최종 검토 완료

---

## 목차
1. [화면 1: 메인 대시보드](#화면-1-메인-대시보드)
2. [화면 2: SQL 실행기](#화면-2-sql-실행기)
3. [화면 3: 시각적 개념 설명](#화면-3-시각적-개념-설명)
4. [화면 4: SQLD 용어 사전](#화면-4-sqld-용어-사전)
5. [공통 요소](#공통-요소)
6. [상태 관리](#상태-관리)

---

## 화면 1: 메인 대시보드

**경로**: `/`
**컴포넌트**: `app/page.tsx`, `components/Dashboard.tsx`

### 1.1 화면 구성 (와이어프레임)

```
┌─────────────────────────────────────────┐
│  Header                                 │
│  ┌─────────────────────────────────────┐│
│  │ 🎓 SQLD Visual Lab                 │
│  │ SQL 개념 시각화 학습 도구            │
│  └─────────────────────────────────────┘│
├─────────────────────────────────────────┤
│                                         │
│  Welcome Section                        │
│  "안녕하세요, SQLD 준비하고 있으신가요?│
│   우리는 3가지 학습 도구를 제공합니다" │
│                                         │
│  ┌─────────┬─────────┬─────────────┐  │
│  │         │         │             │  │
│  │ 🔧SQL  │ 📊개념  │ 📚용어 사전 │  │
│  │실행기   │설명     │             │  │
│  │         │         │             │  │
│  │[시작]   │[시작]   │[시작]       │  │
│  │         │         │             │  │
│  └─────────┴─────────┴─────────────┘  │
│                                         │
├─────────────────────────────────────────┤
│  Footer                                 │
│  © 2026 SQLD Visual Lab | About | Help │
└─────────────────────────────────────────┘
```

### 1.2 컴포넌트 목록

| 컴포넌트 | 역할 | 상태 |
|---------|------|------|
| **Header** | 로고 + 메뉴 + 로그인 안내 | 정적 |
| **HeroSection** | 환영 메시지 + 설명 | 정적 |
| **FeatureCard** | 기능 카드 (3개) | 클릭 가능 |
| **Footer** | 링크 + 정보 | 정적 |

### 1.3 FeatureCard 상세

```typescript
interface FeatureCard {
  icon: React.ReactNode      // 아이콘
  title: string              // "SQL 실행기"
  description: string        // 설명 텍스트
  link: string               // "/playground"
  color: string              // 배경색 (주제색)
}

const cards: FeatureCard[] = [
  {
    icon: "⚙️",
    title: "SQL 실행기",
    description: "SQL을 직접 작성하고 브라우저에서 실행해보세요",
    link: "/playground",
    color: "bg-blue-50"
  },
  {
    icon: "📊",
    title: "시각적 개념 설명",
    description: "JOIN, GROUP BY 등 핵심 개념을 그림으로 이해합니다",
    link: "/concepts",
    color: "bg-green-50"
  },
  {
    icon: "📚",
    title: "SQLD 용어 사전",
    description: "시험에 자주 나오는 용어를 검색하고 배웁니다",
    link: "/glossary",
    color: "bg-yellow-50"
  }
]
```

### 1.4 카드 UI (HTML)

```html
<div class="bg-blue-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
  <div class="text-4xl mb-4">⚙️</div>
  <h3 class="text-xl font-bold text-gray-900 mb-2">SQL 실행기</h3>
  <p class="text-gray-600 mb-4">
    SQL을 직접 작성하고 브라우저에서 실행해보세요
  </p>
  <a href="/playground" class="inline-block">
    <button class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
      시작하기
    </button>
  </a>
</div>
```

### 1.5 상태 관리

| 상태 | 초기값 | 목적 |
|------|--------|------|
| **firstVisit** | LocalStorage 체크 | 처음 방문 여부 |
| **lastVisitedPage** | `/` | 마지막 페이지 |

### 1.6 상태별 UI

#### 상태 A: 첫 방문 사용자

```
┌──────────────────┐
│ 🎉 환영합니다!   │
│ 시작 가이드 표시 │
└──────────────────┘
(3개 카드 정상 표시)
```

#### 상태 B: 재방문 사용자

```
┌──────────────────────────┐
│ 안녕하세요!              │
│ 마지막 방문: 3일 전      │
│ 마지막 본 페이지:        │
│ [SQL 실행기로 이동]      │
└──────────────────────────┘
(3개 카드 정상 표시)
```

---

## 화면 2: SQL 실행기

**경로**: `/playground`
**컴포넌트**: `app/playground/page.tsx`, `components/features/SQLPlayground.tsx`

### 2.1 화면 구성 (와이어프레임)

```
┌─────────────────────────────────────────┐
│  Header (상단 네비)                     │
│  🏠 | SQL실행기 | 개념설명 | 용어사전   │
├─────────────────────────────────────────┤
│                                         │
│  ▼ 샘플 데이터: [EMPLOYEES ▼]          │
│                                         │
│  ┌─────────────────────────────────────┐
│  │ SELECT * FROM employees             │
│  │ WHERE salary > 50000                │
│  │                                     │
│  │ [실행] [저장] [지우기]              │
│  │ 최근 쿼리: 10개 보기                │
│  └─────────────────────────────────────┘
│                  50% 높이
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────────┐
│  │ 결과 (5행 / 10행)                  │
│  ├─────────────────────────────────────┤
│  │ emp_id │ emp_name │ salary │ ...   │
│  ├────────┼──────────┼────────┼────   │
│  │ 1      │ Alice    │ 75000  │       │
│  │ 3      │ Charlie  │ 70000  │       │
│  │ 5      │ Eve      │ 50000  │       │
│  └─────────────────────────────────────┘
│                  50% 높이
│  [◀ 이전] [다음 ▶] | 페이지 1/2       │
│  [CSV 다운로드]                       │
│                                         │
└─────────────────────────────────────────┘
```

### 2.2 컴포넌트 목록

| 컴포넌트 | 역할 | 속성 |
|---------|------|------|
| **Header** | 네비게이션 | 상단 고정 |
| **SampleDataSelector** | 샘플 테이블 선택 | 드롭다운 |
| **SQLEditor** | SQL 코드 에디터 | Monaco Editor |
| **SQLControls** | 실행/저장/삭제 버튼 | 버튼 그룹 |
| **QueryHistory** | 최근 쿼리 목록 | 펼치기/접기 |
| **ResultTable** | 결과 테이블 표시 | 페이지네이션 |
| **ErrorDisplay** | 에러 메시지 표시 | 컨디셔널 |

### 2.3 SampleDataSelector

```typescript
interface SampleData {
  name: string
  description: string
  tables: string[]
  sampleQuery: string
}

const sampleDataOptions: SampleData[] = [
  {
    name: "EMPLOYEES (사원)",
    description: "사원 정보 테이블",
    tables: ["employees", "departments"],
    sampleQuery: "SELECT * FROM employees LIMIT 10"
  },
  {
    name: "ORDERS (주문)",
    description: "주문 정보 테이블",
    tables: ["orders", "employees"],
    sampleQuery: "SELECT * FROM orders LIMIT 10"
  },
  {
    name: "CUSTOM (새로 생성)",
    description: "직접 CREATE TABLE로 생성",
    tables: [],
    sampleQuery: "CREATE TABLE my_table (id INT, name VARCHAR(50))"
  }
]
```

### 2.4 SQLEditor 설정

```typescript
interface SQLEditorProps {
  value: string
  onChange: (value: string) => void
}

const monacoConfig = {
  language: 'sql',
  theme: 'vs-light',
  fontSize: 14,
  fontFamily: 'JetBrains Mono',
  lineNumbers: 'on',
  minimap: { enabled: false },
  wordWrap: 'on',
  autoClosingQuotes: 'always',
  autoClosingBrackets: 'always',
  formatOnPaste: true,
  tabSize: 2,
}
```

### 2.5 ResultTable 설정

```typescript
interface ResultTableProps {
  data: any[]
  columns: string[]
  rowsPerPage: number  // 기본 20
  maxWidth: string     // 100% 또는 고정값
}

const tableConfig = {
  sortable: true,       // 컬럼 헤더 클릭으로 정렬
  filterable: true,     // 컬럼별 필터
  resizable: true,      // 컬럼 너비 조정
  striped: true,        // 줄무늬
  hover: true,          // 행 호버 강조
  compact: false,       // 여유있는 패딩
}
```

### 2.6 상태 관리

| 상태 | 초기값 | 목적 |
|------|--------|------|
| **sql** | "" | SQL 쿼리 텍스트 |
| **results** | [] | 쿼리 결과 행 배열 |
| **error** | null | 에러 메시지 |
| **loading** | false | 실행 중 표시 |
| **selectedDataset** | "employees" | 선택된 샘플 데이터 |
| **queryHistory** | [] | 최근 쿼리 10개 |

### 2.7 이벤트 핸들러

```typescript
const handleExecuteQuery = async () => {
  setLoading(true)
  setError(null)

  const result = await executeQuery(sql)

  if (result.success) {
    setResults(result.data || [])
    saveQueryToHistory(sql, result.data?.length || 0)
  } else {
    setError(result.error)
  }

  setLoading(false)
}

const handleClearEditor = () => {
  setSql('')
  setResults([])
  setError(null)
}

const handleSelectHistory = (historySql: string) => {
  setSql(historySql)
  // 자동 실행 옵션: handleExecuteQuery()
}

const handleExportCSV = () => {
  const csv = convertToCSV(results)
  downloadCSV(csv, 'query-results.csv')
}
```

### 2.8 상태별 UI

#### 로딩 상태
```
┌─────────────────┐
│ ⏳ 실행 중...   │
│ [실행] (비활성) │
└─────────────────┘
```

#### 에러 상태
```
┌────────────────────────────────────┐
│ ❌ Syntax error near 'FORM'        │
│                                    │
│ 도움말: SELECT 올바른 문법 확인    │
│                                    │
│ [코드 수정] [예제 보기]            │
└────────────────────────────────────┘
```

#### 성공 상태
```
┌────────────────────────────────────┐
│ ✅ 성공 (5행 조회됨)               │
│                                    │
│ [결과 테이블]                      │
└────────────────────────────────────┘
```

#### 빈 결과 상태
```
┌────────────────────────────────────┐
│ 조회된 행이 없습니다.              │
│ WHERE 조건을 확인해주세요.         │
│                                    │
│ [예제 쿼리 보기] [조건 제거]       │
└────────────────────────────────────┘
```

---

## 화면 3: 시각적 개념 설명

**경로**: `/concepts`
**컴포넌트**: `app/concepts/page.tsx`, `components/features/Concepts.tsx`

### 3.1 화면 구성 (와이어프레임)

```
┌─────────────────────────────────────────┐
│  Header                                 │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┬──────────────────┐   │
│  │ 개념 목록    │  설명             │   │
│  │              │                  │   │
│  │ [SELECT]     │  ┌──────────────┐│   │
│  │ [WHERE]      │  │ SELECT       ││   │
│  │ [INNER JOIN] │  │              ││   │
│  │ [LEFT JOIN]  │  │ 설명 텍스트   ││   │
│  │ [GROUP BY]   │  │              ││   │
│  │ [HAVING]     │  │ ┌──────────┐ ││   │
│  │ [서브쿼리]   │  │ │ SVG      │ ││   │
│  │ ...          │  │ │다이어그램│ ││   │
│  │              │  │ └──────────┘ ││   │
│  │              │  │              ││   │
│  │              │  │ SELECT *     ││   │
│  │              │  │ FROM ...     ││   │
│  │              │  │              ││   │
│  │              │  │[실습하기] [≫]││   │
│  │              │  │              ││   │
│  │              │  └──────────────┘│   │
│  │              │                  │   │
│  └──────────────┴──────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### 3.2 컴포넌트 목록

| 컴포넌트 | 역할 | 속성 |
|---------|------|------|
| **ConceptList** | 좌측 개념 목록 | 스크롤 가능 |
| **ConceptPanel** | 우측 설명 패널 | 동적 업데이트 |
| **SVGDiagram** | SVG 다이어그램 | 애니메이션 |
| **ConceptDescription** | 텍스트 설명 | 마크다운 |
| **CodeExample** | SQL 예제 | 신택스 강조 |
| **PracticeButton** | 실습 버튼 | 클릭시 `/playground` 이동 |

### 3.3 ConceptList 구조

```typescript
interface Concept {
  id: string
  name: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: 'SELECT' | 'JOIN' | 'AGGREGATE' | 'SUBQUERY' | 'NORMALIZATION'
}

const concepts: Concept[] = [
  { id: 'select', name: 'SELECT', difficulty: 'beginner', category: 'SELECT' },
  { id: 'where', name: 'WHERE', difficulty: 'beginner', category: 'SELECT' },
  { id: 'order-by', name: 'ORDER BY', difficulty: 'beginner', category: 'SELECT' },
  { id: 'inner-join', name: 'INNER JOIN', difficulty: 'intermediate', category: 'JOIN' },
  { id: 'left-join', name: 'LEFT JOIN', difficulty: 'intermediate', category: 'JOIN' },
  { id: 'group-by', name: 'GROUP BY', difficulty: 'intermediate', category: 'AGGREGATE' },
  { id: 'having', name: 'HAVING', difficulty: 'intermediate', category: 'AGGREGATE' },
  { id: 'subquery', name: '서브쿼리', difficulty: 'advanced', category: 'SUBQUERY' },
]
```

### 3.4 ConceptPanel 데이터 구조

```typescript
interface ConceptDetail {
  id: string
  name: string
  shortDescription: string
  fullDescription: string
  svgDiagram: string  // SVG 코드
  sqlExample: string
  useCases: string[]
  relatedConcepts: string[]
  difficulty: string
  notes: string
}
```

### 3.5 SVG 다이어그램 예제 (INNER JOIN)

```svg
<svg width="400" height="300" viewBox="0 0 400 300">
  <!-- 왼쪽 원 (Employees) -->
  <circle cx="150" cy="150" r="80" fill="rgba(59, 130, 246, 0.3)" stroke="#3B82F6" stroke-width="2"/>

  <!-- 오른쪽 원 (Departments) -->
  <circle cx="250" cy="150" r="80" fill="rgba(59, 130, 246, 0.3)" stroke="#3B82F6" stroke-width="2"/>

  <!-- 교집합 강조 -->
  <ellipse cx="200" cy="150" rx="30" ry="80" fill="#3B82F6" opacity="0.5"/>

  <!-- 라벨 -->
  <text x="120" y="160" font-size="14" font-weight="bold">Employees</text>
  <text x="220" y="160" font-size="14" font-weight="bold">Departments</text>
  <text x="190" y="155" font-size="12" fill="white" text-anchor="middle">공통</text>

  <!-- 설명 텍스트 -->
  <text x="200" y="280" font-size="12" text-anchor="middle">
    공통 데이터만 반환 (ON 조건 일치)
  </text>
</svg>
```

### 3.6 상태 관리

| 상태 | 초기값 | 목적 |
|------|--------|------|
| **activeConceptId** | "select" | 현재 선택된 개념 |
| **animating** | false | 애니메이션 재생 중 |
| **viewHistory** | ["select"] | 본 개념 히스토리 |

### 3.7 이벤트 핸들러

```typescript
const handleSelectConcept = (conceptId: string) => {
  setActiveConceptId(conceptId)
  setViewHistory([...viewHistory, conceptId])
  // 애니메이션 재생
  setAnimating(true)
  setTimeout(() => setAnimating(false), 2000)
}

const handlePractice = (sqlExample: string) => {
  // SQL 실행기로 이동 + SQL 자동 입력
  router.push(`/playground?sql=${encodeURIComponent(sqlExample)}`)
}

const handleNextConcept = () => {
  const currentIndex = concepts.findIndex(c => c.id === activeConceptId)
  if (currentIndex < concepts.length - 1) {
    handleSelectConcept(concepts[currentIndex + 1].id)
  }
}
```

### 3.8 상태별 UI

#### 초기 로드
```
┌──────────────────┐
│ 첫 개념 표시     │
│ (SELECT)         │
│ 애니메이션 재생  │
└──────────────────┘
```

#### 개념 전환
```
┌──────────────────────────┐
│ 이전 개념 → 새 개념      │
│ 다이어그램 페이드 전환   │
│ 설명 텍스트 업데이트     │
└──────────────────────────┘
```

---

## 화면 4: SQLD 용어 사전

**경로**: `/glossary`
**컴포넌트**: `app/glossary/page.tsx`, `components/features/Glossary.tsx`

### 4.1 화면 구성 (와이어프레임)

```
┌─────────────────────────────────────────┐
│  Header                                 │
├─────────────────────────────────────────┤
│                                         │
│  검색: [________________] 🔍            │
│                                         │
│  [DDL] [DML] [TCL] [정규화] [그 외]    │
│                                         │
│  ┌─────────┬─────────┬─────────────┐   │
│  │         │         │             │   │
│  │ 용어    │ 용어    │ 용어        │   │
│  │ [보기]  │ [보기]  │ [보기]      │   │
│  │ [실습]  │ [실습]  │ [실습]      │   │
│  │         │         │             │   │
│  └─────────┴─────────┴─────────────┘   │
│                                         │
│  ┌─────────┬─────────┬─────────────┐   │
│  │ 용어    │ 용어    │ 용어        │   │
│  │ [보기]  │ [보기]  │ [보기]      │   │
│  │ [실습]  │ [실습]  │ [실습]      │   │
│  └─────────┴─────────┴─────────────┘   │
│                                         │
│  페이지: [◀] 1 2 3 [▶]                 │
│                                         │
└─────────────────────────────────────────┘
```

### 4.2 컴포넌트 목록

| 컴포넌트 | 역할 | 속성 |
|---------|------|------|
| **SearchBar** | 검색 입력 | 실시간 필터링 |
| **CategoryTabs** | 카테고리 탭 | 5개 탭 |
| **TermCard** | 용어 카드 | 3열 그리드 |
| **TermDetail** | 용어 상세 | 모달 또는 패널 |

### 4.3 SearchBar 구현

```typescript
interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const handleSearch = (query: string) => {
  setValue(query)
  const filtered = fuzzySearch(allTerms, query, {
    keys: ['name', 'definition', 'relatedTerms'],
    threshold: 0.3,
  })
  setFilteredTerms(filtered)
  setCurrentPage(1)  // 페이지 초기화
}
```

### 4.4 CategoryTabs

```typescript
const categories = [
  { id: 'all', label: '전체' },
  { id: 'ddl', label: 'DDL' },
  { id: 'dml', label: 'DML' },
  { id: 'tcl', label: 'TCL' },
  { id: 'normalization', label: '정규화' },
  { id: 'other', label: '그 외' },
]

const handleSelectCategory = (categoryId: string) => {
  setSelectedCategory(categoryId)
  if (categoryId === 'all') {
    setFilteredTerms(allTerms)
  } else {
    setFilteredTerms(allTerms.filter(t => t.category === categoryId))
  }
  setCurrentPage(1)
}
```

### 4.5 TermCard 구조

```typescript
interface TermCardProps {
  term: Term
  onViewExample: () => void
  onPractice: () => void
}

const TermCard: React.FC<TermCardProps> = ({ term, onViewExample, onPractice }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500">
      <h3 className="text-lg font-bold text-gray-900">{term.name}</h3>
      <p className="text-xs text-gray-500 mb-2">{term.category}</p>
      <p className="text-sm text-gray-700 mb-4">{term.definition}</p>
      <div className="flex gap-2">
        <button onClick={onViewExample} className="flex-1 btn-secondary">
          예제 보기
        </button>
        <button onClick={onPractice} className="flex-1 btn-primary">
          실습하기
        </button>
      </div>
    </div>
  )
}
```

### 4.6 페이지네이션

```typescript
const itemsPerPage = 12  // 3열 × 4행

const handlePageChange = (pageNum: number) => {
  setCurrentPage(pageNum)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const totalPages = Math.ceil(filteredTerms.length / itemsPerPage)
const startIndex = (currentPage - 1) * itemsPerPage
const paginatedTerms = filteredTerms.slice(startIndex, startIndex + itemsPerPage)
```

### 4.7 상태 관리

| 상태 | 초기값 | 목적 |
|------|--------|------|
| **searchQuery** | "" | 검색 쿼리 |
| **selectedCategory** | "all" | 선택된 카테고리 |
| **filteredTerms** | allTerms | 필터된 용어 목록 |
| **currentPage** | 1 | 현재 페이지 |
| **selectedTerm** | null | 상세보기 용어 |

### 4.8 이벤트 핸들러

```typescript
const handleViewExample = (term: Term) => {
  setSelectedTerm(term)
  showModal(true)  // 상세 모달 열기
}

const handlePractice = (term: Term) => {
  // SQL 실행기로 이동 + 예제 SQL 자동 입력
  router.push(`/playground?sql=${encodeURIComponent(term.example)}`)
}

const handleCopyExample = (term: Term) => {
  copyToClipboard(term.example)
  showToast('복사되었습니다')
}
```

### 4.9 상태별 UI

#### 초기 상태
```
┌──────────────────┐
│ 전체 용어 표시   │
│ DDL 12개         │
│ DML 15개         │
│ ...              │
│ 총 50개 용어     │
└──────────────────┘
```

#### 검색 상태
```
┌──────────────────┐
│ "join" 검색      │
│ 결과: 4개        │
│ - INNER JOIN     │
│ - LEFT JOIN      │
│ - RIGHT JOIN     │
│ - FULL OUTER JOIN│
└──────────────────┘
```

#### 카테고리 필터링
```
┌──────────────────┐
│ DDL 선택         │
│ CREATE           │
│ ALTER            │
│ DROP             │
│ RENAME           │
│ ...              │
└──────────────────┘
```

#### 검색 결과 없음
```
┌────────────────────────────────┐
│ 조회된 용어가 없습니다.        │
│                                │
│ 다른 검색어를 시도해보세요.    │
│ [전체 용어 보기]               │
└────────────────────────────────┘
```

---

## 공통 요소

### Header & Navigation

```
┌─────────────────────────────────────────┐
│ 🎓 SQLD Visual Lab                      │
│ [홈] [SQL실행기] [개념설명] [용어사전] │
└─────────────────────────────────────────┘
```

**컴포넌트**: `components/layout/Header.tsx`

```typescript
interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
}

const navItems: NavItem[] = [
  { label: '홈', href: '/', icon: '🏠' },
  { label: 'SQL 실행기', href: '/playground', icon: '⚙️' },
  { label: '개념 설명', href: '/concepts', icon: '📊' },
  { label: '용어 사전', href: '/glossary', icon: '📚' },
]
```

### Footer

```
┌─────────────────────────────────────────┐
│ © 2026 SQLD Visual Lab                  │
│ [소개] [피드백] [GitHub] [라이선스]     │
│ Made with ❤️ for SQLD students          │
└─────────────────────────────────────────┘
```

**컴포넌트**: `components/layout/Footer.tsx`

---

## 상태 관리

### Context 구조

```typescript
// contexts/AppContext.ts
interface AppContextType {
  // 전역 상태
  currentPage: string
  theme: 'light' | 'dark'
  userPreferences: UserPreferences

  // 메서드
  setCurrentPage: (page: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  savePreferences: (prefs: UserPreferences) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('/')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [userPreferences, setUserPreferences] = useState({})

  const value: AppContextType = {
    currentPage,
    theme,
    userPreferences,
    setCurrentPage,
    setTheme,
    savePreferences: (prefs) => setUserPreferences(prefs),
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
```

### LocalStorage 활용

```typescript
// hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
```

---

**최종 검토자**: 개발 리더
**최종 검토일**: 2026-03-26
**다음 문서**: [07-coding-convention.md](07-coding-convention.md)
