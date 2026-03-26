# 05-design-system.md (디자인 시스템)

**프로젝트명**: SQLD Visual Lab
**작성일**: 2026-03-26
**버전**: 1.0
**상태**: 최종 검토 완료

---

## 목차
1. [컬러 팔레트](#컬러-팔레트)
2. [타이포그래피](#타이포그래피)
3. [컴포넌트 목록](#컴포넌트-목록)
4. [레이아웃 그리드](#레이아웃-그리드)
5. [반응형 디자인](#반응형-디자인)
6. [아이콘 & 이모지](#아이콘--이모지)
7. [상태 표시](#상태-표시)

---

## 컬러 팔레트

### 1.1 주요 컬러

학습 도구로서 **집중력**과 **명확성**을 강조하는 컬러 체계

#### 기본 색상 (Core Colors)

```
┌─────────────────────────────────────────────────────┐
│ 색상명      │ HEX       │ RGB            │ 용도     │
├─────────────────────────────────────────────────────┤
│ Primary     │ #3B82F6   │ 59, 130, 246   │ 버튼     │
│ Secondary   │ #10B981   │ 16, 185, 129   │ 강조     │
│ Accent      │ #F59E0B   │ 245, 158, 11   │ 경고     │
│ Danger      │ #EF4444   │ 239, 68, 68    │ 에러     │
│ Success     │ #10B981   │ 16, 185, 129   │ 성공     │
│ Warning     │ #F97316   │ 249, 115, 22   │ 경고     │
│ Info        │ #06B6D4   │ 6, 182, 212    │ 정보     │
└─────────────────────────────────────────────────────┘
```

#### 중립 색상 (Neutral Colors)

```
┌──────────────────────────────────────────────────────┐
│ 색상명      │ HEX       │ RGB            │ 용도     │
├──────────────────────────────────────────────────────┤
│ White       │ #FFFFFF   │ 255, 255, 255  │ 배경     │
│ Gray-50     │ #F9FAFB   │ 249, 250, 251  │ 밝은 배경│
│ Gray-100    │ #F3F4F6   │ 243, 244, 246  │ 분할선   │
│ Gray-300    │ #D1D5DB   │ 209, 213, 219  │ 보더     │
│ Gray-600    │ #4B5563   │ 75, 85, 99     │ 텍스트  │
│ Gray-900    │ #111827   │ 17, 24, 39     │ 본문    │
│ Black       │ #000000   │ 0, 0, 0        │ 강조     │
└──────────────────────────────────────────────────────┘
```

### 1.2 의미별 컬러 매핑

| 시나리오 | 컬러 | 사용처 |
|---------|------|--------|
| **성공** | Green (#10B981) | SQL 실행 성공, 데이터 로드 완료 |
| **에러** | Red (#EF4444) | SQL 문법 오류, 실패 메시지 |
| **경고** | Orange (#F97316) | 데이터 손실 가능, 주의 필요 |
| **진행 중** | Blue (#3B82F6) | 로딩, 데이터 처리 중 |
| **정보** | Cyan (#06B6D4) | 팁, 도움말, 안내 메시지 |
| **비활성** | Gray (#D1D5DB) | 사용 불가 버튼, 비활성 탭 |

### 1.3 다크모드 (향후)

```json
{
  "light": {
    "background": "#FFFFFF",
    "text": "#111827",
    "border": "#D1D5DB"
  },
  "dark": {
    "background": "#0F172A",
    "text": "#F1F5F9",
    "border": "#334155"
  }
}
```

---

## 타이포그래피

### 2.1 폰트 선택

#### 한글 폰트
- **기본**: Pretendard (오픈소스, 한글 최적화)
- **설치**: `npm install next-fonts`

```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css');

body {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

#### 코드/모노스페이스
- **기본**: JetBrains Mono
- **대체**: Courier New

```css
code, pre {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.9em;
  letter-spacing: 0.3px;
}
```

### 2.2 타이포그래피 스케일

| 역할 | 크기 | 무게 | 라인높이 | 용도 |
|------|------|------|---------|------|
| **H1** | 32px | 700 | 1.2 | 페이지 제목 |
| **H2** | 24px | 700 | 1.3 | 섹션 제목 |
| **H3** | 18px | 600 | 1.4 | 소제목 |
| **Body** | 16px | 400 | 1.5 | 본문 텍스트 |
| **Body-sm** | 14px | 400 | 1.5 | 작은 텍스트 |
| **Body-xs** | 12px | 400 | 1.4 | 매우 작은 텍스트 |
| **Code** | 14px | 400 | 1.6 | SQL 코드 |
| **Code-sm** | 12px | 400 | 1.6 | 컴팩트 코드 |

#### TailwindCSS 적용

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    fontSize: {
      'xs': ['12px', { lineHeight: '1.4' }],
      'sm': ['14px', { lineHeight: '1.5' }],
      'base': ['16px', { lineHeight: '1.5' }],
      'lg': ['18px', { lineHeight: '1.4' }],
      'xl': ['20px', { lineHeight: '1.4' }],
      '2xl': ['24px', { lineHeight: '1.3' }],
      '3xl': ['32px', { lineHeight: '1.2' }],
    },
    fontFamily: {
      'sans': ['Pretendard', 'system-ui', 'sans-serif'],
      'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
    },
  }
}
```

### 2.3 텍스트 스타일 예제

```html
<!-- H1: 페이지 제목 -->
<h1 class="text-3xl font-bold text-gray-900">SQLD Visual Lab</h1>

<!-- H2: 섹션 제목 -->
<h2 class="text-2xl font-bold text-gray-800">SQL 실행기</h2>

<!-- Body: 일반 텍스트 -->
<p class="text-base text-gray-600">
  SQLD 시험을 준비하는 학생들이 SQL 개념을 시각적으로 이해합니다.
</p>

<!-- Code: SQL 코드 -->
<code class="font-mono text-sm bg-gray-100 p-2 rounded">
  SELECT * FROM employees
</code>

<!-- Label: 폼 라벨 -->
<label class="text-sm font-medium text-gray-700">쿼리 입력</label>

<!-- Helper: 보조 텍스트 -->
<p class="text-xs text-gray-500">최대 1000자까지 입력 가능합니다</p>
```

---

## 컴포넌트 목록

### 3.1 기본 UI 컴포넌트

#### Button

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

// 사용 예
<Button variant="primary" size="md" onClick={handleClick}>
  실행
</Button>
```

**스타일 가이드**

| Variant | 배경 | 텍스트 | 보더 | 용도 |
|---------|------|--------|------|------|
| primary | #3B82F6 | White | None | 주요 작업 |
| secondary | #10B981 | White | None | 보조 작업 |
| danger | #EF4444 | White | None | 삭제, 리셋 |
| ghost | Transparent | #3B82F6 | #3B82F6 | 링크 스타일 |

#### Card

```typescript
interface CardProps {
  title?: string
  description?: string
  children: React.ReactNode
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

// 사용 예
<Card title="SQL 실행기" shadow="md">
  <SQLEditor />
</Card>
```

**스타일**: 흰 배경, 둥근 모서리 (8px), 옅은 그림자

#### Tabs

```typescript
interface TabsProps {
  tabs: Array<{ label: string; content: React.ReactNode }>
  defaultActive?: number
  onChange?: (index: number) => void
}

// 사용 예
<Tabs tabs={[
  { label: 'DDL', content: <DDLTerms /> },
  { label: 'DML', content: <DMLTerms /> },
]} />
```

**스타일**: 밑줄 하이라이트, 활성 탭 파란색

#### Input & Textarea

```typescript
interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

// 사용 예
<Input
  placeholder="검색어를 입력하세요"
  value={search}
  onChange={setSearch}
/>
```

**스타일**: 보더 1px, 내부 패딩 12px, 포커스 시 파란색 테두리

#### Badge

```typescript
interface BadgeProps {
  label: string
  variant: 'default' | 'success' | 'error' | 'warning'
  size?: 'sm' | 'md'
}

// 사용 예
<Badge label="DML" variant="default" />
<Badge label="완료" variant="success" />
```

**스타일**: 작은 라벨, 배경색 포함, 패딩 4px 8px

### 3.2 SQL 실행기 컴포넌트

#### SQLEditor

```typescript
interface SQLEditorProps {
  value: string
  onChange: (sql: string) => void
  readOnly?: boolean
  theme?: 'light' | 'dark'
  height?: string
}

// 사용 예
<SQLEditor
  value={sql}
  onChange={setSql}
  height="300px"
/>
```

**특징**:
- Monaco Editor 기반
- SQL 신택스 강조
- 자동 들여쓰기
- 라인 번호 표시
- 키보드 단축키 (Ctrl+Enter: 실행)

#### ResultTable

```typescript
interface ResultTableProps {
  data: any[]
  columns?: string[]
  maxRows?: number
  loading?: boolean
}

// 사용 예
<ResultTable
  data={results}
  maxRows={20}
/>
```

**특징**:
- 페이지네이션 (기본 20행)
- 정렬 (컬럼 헤더 클릭)
- 필터링
- CSV 내보내기 (버튼)

#### SampleDataSelector

```typescript
interface SampleDataSelectorProps {
  selectedTable: string
  onSelectTable: (table: string) => void
}

// 사용 예
<SampleDataSelector
  selectedTable="employees"
  onSelectTable={handleSelectTable}
/>
```

**옵션**: EMPLOYEES, DEPARTMENTS, JOBS, ORDERS, CUSTOM

### 3.3 개념 설명 컴포넌트

#### ConceptList

```typescript
interface ConceptListProps {
  concepts: Concept[]
  activeConceptId: string
  onSelectConcept: (id: string) => void
}
```

**스타일**: 좌측 네비게이션, 활성 항목 강조

#### SVGDiagram

```typescript
interface SVGDiagramProps {
  type: 'venn' | 'flowchart' | 'table'
  data: any
  animated?: boolean
}
```

**타입**:
- **venn**: JOIN 다이어그램 (벤 다이어그램)
- **flowchart**: 데이터 흐름
- **table**: 테이블 구조 시각화

### 3.4 용어 사전 컴포넌트

#### SearchBar

```typescript
interface SearchBarProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  suggestions?: string[]
}
```

**특징**:
- 실시간 필터링
- 자동완성 제안
- 검색 이력 (LocalStorage)

#### TermCard

```typescript
interface TermCardProps {
  term: Term
  onViewExample?: () => void
  onPractice?: () => void
}
```

**구성**: 용어명, 정의, 예제, 관련 용어 링크, 버튼 2개

---

## 레이아웃 그리드

### 4.1 그리드 시스템

**12칼럼 그리드, 기본 갭 16px**

```css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
}
```

### 4.2 일반적인 레이아웃

#### 전체 너비 (Full Width)
```
┌─────────────────────────────────┐
│  Header                         │
├─────────────────────────────────┤
│                                 │
│  Main Content (col 1-12)        │
│                                 │
├─────────────────────────────────┤
│  Footer                         │
└─────────────────────────────────┘
```

#### 좌측 네비 + 메인 (Left Sidebar)
```
┌──────────┬──────────────────┐
│ Sidebar  │  Header          │
│ (col 3)  ├──────────────────┤
│          │  Content         │
│          │  (col 9)         │
│          │                  │
└──────────┴──────────────────┘
```

#### 상하 분할 (Top/Bottom Split)
```
┌─────────────────────────────┐
│  Editor                     │
│  (height: 50%)              │
├─────────────────────────────┤
│  Results                    │
│  (height: 50%)              │
└─────────────────────────────┘
```

### 4.3 간격 (Spacing)

| 단위 | 크기 | 용도 |
|------|------|------|
| xs | 4px | 아이콘 간격 |
| sm | 8px | 텍스트 간격 |
| md | 16px | 컴포넌트 간격 |
| lg | 24px | 섹션 간격 |
| xl | 32px | 큰 섹션 간격 |
| 2xl | 48px | 페이지 여백 |

```html
<!-- 예 -->
<div class="p-4">p-4 (16px padding)</div>
<div class="m-6">m-6 (24px margin)</div>
<div class="gap-4">gap-4 (16px flex gap)</div>
```

### 4.4 반경 (Border Radius)

| 값 | 크기 | 용도 |
|-----|------|------|
| xs | 2px | 미묘한 효과 |
| sm | 4px | 버튼, 입력 |
| md | 8px | 카드 |
| lg | 12px | 큰 컴포넌트 |
| full | 9999px | 원형 배지 |

---

## 반응형 디자인

### 5.1 브레이크포인트 (Breakpoints)

| 이름 | 크기 | 기기 |
|------|------|------|
| **xs** | < 640px | 스마트폰 (세로) |
| **sm** | 640px ~ | 스마트폰 (가로) |
| **md** | 768px ~ | 태블릿 (세로) |
| **lg** | 1024px ~ | 태블릿 (가로), 노트북 |
| **xl** | 1280px ~ | 데스크톱 |
| **2xl** | 1536px ~ | 대형 모니터 |

### 5.2 반응형 전략

**PC 우선 (Desktop-First)** - 초기 버전

```css
/* 기본: PC 화면 (1024px+) */
.sidebar {
  width: 25%;
  display: block;
}

.content {
  width: 75%;
}

/* 태블릿 이하: 반응형 */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
  }

  .content {
    width: 100%;
    margin-top: 16px;
  }
}
```

### 5.3 각 화면별 반응형

#### SQL 실행기 (Playground)

```
PC (1024px+):
┌──────────────────────────────┐
│ Header (고정)                │
├──────────────────────────────┤
│                              │
│  SQL Editor (50%)            │
│  (height: 400px)             │
│                              │
├──────────────────────────────┤
│                              │
│  Result Table (50%)          │
│  (height: 400px)             │
│                              │
└──────────────────────────────┘

태블릿 (< 768px):
위아래 비율 조정
- Editor: 300px
- Table: 나머지

모바일 (< 640px):
- 세로 전체 분할
- Editor: 280px (스크롤 가능)
- Table: 280px (스크롤 가능)
```

#### 개념 설명 (Concepts)

```
PC (1024px+):
┌────────────┬──────────────────┐
│  List      │  Visualization   │
│  (25%)     │  (75%)           │
│            │  + Explanation   │
│            │  + Execute       │
└────────────┴──────────────────┘

태블릿 (< 768px):
┌──────────────────────────┐
│  List (선택 가능)        │
├──────────────────────────┤
│  Visualization (100%)    │
├──────────────────────────┤
│  Explanation             │
├──────────────────────────┤
│  Execute Button          │
└──────────────────────────┘

모바일 (< 640px):
- List: 수평 스크롤 또는 드롭다운
- Visualization: 800px 너비로 가로 스크롤 (zoom 필요시)
```

#### 용어 사전 (Glossary)

```
PC (1024px+):
┌────────────────────────────────┐
│ SearchBar                      │
├────────────────────────────────┤
│ CategoryTabs                   │
├────────────────────────────────┤
│ TermCard | TermCard | TermCard │
│ (3 컬럼)                       │
└────────────────────────────────┘

태블릿 (768px ~ 1023px):
- TermCard: 2 컬럼

모바일 (< 768px):
- TermCard: 1 컬럼 (전체 너비)
```

---

## 아이콘 & 이모지

### 6.1 아이콘 라이브러리

**react-icons** 사용

```bash
npm install react-icons
```

### 6.2 자주 사용할 아이콘

| 용도 | 아이콘 | 코드 |
|------|--------|------|
| 실행 | ▶️ | `<FaPlay />` |
| 정지 | ⏹️ | `<FaStop />` |
| 저장 | 💾 | `<FaSave />` |
| 삭제 | 🗑️ | `<FaTrash />` |
| 검색 | 🔍 | `<FaSearch />` |
| 설정 | ⚙️ | `<FaCog />` |
| 에러 | ❌ | `<FaTimes />` |
| 성공 | ✅ | `<FaCheck />` |
| 로딩 | ⏳ | `<FaSpinner />` (회전) |
| 정보 | ℹ️ | `<FaInfo />` |
| 경고 | ⚠️ | `<FaExclamationTriangle />` |
| 화살표 | ➡️ | `<FaArrowRight />` |
| 다운로드 | ⬇️ | `<FaDownload />` |
| 업로드 | ⬆️ | `<FaUpload />` |
| 복사 | 📋 | `<FaCopy />` |
| 외부 링크 | 🔗 | `<FaExternalLink />` |

### 6.3 사용 예제

```typescript
import { FaPlay, FaCheck, FaTimes } from 'react-icons/fa'

export function SQLControls() {
  return (
    <div>
      <button className="flex items-center gap-2">
        <FaPlay /> 실행
      </button>
      <span className="text-green-500">
        <FaCheck /> 성공
      </span>
      <span className="text-red-500">
        <FaTimes /> 에러
      </span>
    </div>
  )
}
```

---

## 상태 표시

### 7.1 로딩 상태

#### 로딩 스피너

```typescript
interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

// 사용
<Loading size="md" text="실행 중..." />
```

**시각**: 회전하는 원형 스피너, 아래 텍스트

#### 스켈레톤 로더 (데이터 로드)

```typescript
<div className="space-y-4">
  <div className="h-12 bg-gray-200 rounded animate-pulse" />
  <div className="h-64 bg-gray-200 rounded animate-pulse" />
</div>
```

### 7.2 에러 상태

#### 에러 메시지

```typescript
interface AlertProps {
  type: 'error' | 'warning' | 'info' | 'success'
  message: string
  onDismiss?: () => void
}

// 사용
<Alert type="error" message="SQL 문법 오류입니다" />
```

**스타일**:
- 배경: 옅은 색상 (예: 에러는 #FEE2E2)
- 왼쪽 보더: 진한 색상 (4px)
- 아이콘 + 메시지 + 닫기 버튼

#### 에러 경계 (Error Boundary)

```typescript
export class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border-l-4 border-red-500">
          <p className="text-red-800">문제가 발생했습니다.</p>
        </div>
      )
    }

    return this.props.children
  }
}
```

### 7.3 빈 상태 (Empty State)

```typescript
interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

// 사용
<EmptyState
  icon={<FaDatabase />}
  title="결과가 없습니다"
  description="다른 쿼리를 시도해보세요"
  action={{
    label: '샘플 데이터 로드',
    onClick: loadSampleData
  }}
/>
```

### 7.4 성공 메시지

```typescript
interface ToastProps {
  type: 'success' | 'error' | 'info'
  message: string
  duration?: number  // 기본 3초
}

// 사용
showToast({ type: 'success', message: '저장되었습니다' })
```

**위치**: 화면 우상단, 자동 사라짐 (3초)

---

## 부록: 컴포넌트 구현 체크리스트

### 기본 UI
- [ ] Button
- [ ] Card
- [ ] Tabs
- [ ] Input
- [ ] Textarea
- [ ] Badge
- [ ] Alert
- [ ] Loading
- [ ] Empty State

### SQL 실행기
- [ ] SQLEditor (Monaco)
- [ ] ResultTable (TanStack Table)
- [ ] SampleDataSelector

### 개념 설명
- [ ] ConceptList
- [ ] SVGDiagram
- [ ] ConceptPanel

### 용어 사전
- [ ] SearchBar
- [ ] TermCard
- [ ] CategoryTabs

### 레이아웃
- [ ] Header/Navbar
- [ ] Footer
- [ ] Container
- [ ] Grid

---

**최종 검토자**: 디자인 리더
**최종 검토일**: 2026-03-26
**다음 문서**: [06-screens.md](06-screens.md)
