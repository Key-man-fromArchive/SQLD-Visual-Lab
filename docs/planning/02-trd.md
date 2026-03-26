# 02-TRD (기술 요구사항 문서)

**프로젝트명**: SQLD Visual Lab
**작성일**: 2026-03-26
**버전**: 1.0
**상태**: 최종 검토 완료

---

## 목차
1. [기술 스택](#기술-스택)
2. [아키텍처 개요](#아키텍처-개요)
3. [sql.js WASM 통합](#sqljs-wasm-통합)
4. [데이터 관리 전략](#데이터-관리-전략)
5. [배포 전략](#배포-전략)
6. [성능 요구사항](#성능-요구사항)
7. [보안 고려사항](#보안-고려사항)
8. [인프라 & 모니터링](#인프라--모니터링)

---

## 기술 스택

### 1.1 프론트엔드 계층

#### 프레임워크 & 언어
| 기술 | 버전 | 역할 | 선택 이유 |
|------|------|------|----------|
| **Next.js** | 14.0+ | React 메타프레임워크, SSR/SSG | 빠른 개발, 기본 최적화 포함, Vercel과 통합 |
| **React** | 18.2+ | UI 라이브러리 | 컴포넌트 기반, 풍부한 생태계 |
| **TypeScript** | 5.0+ | 정적 타입 | 버그 조기 발견, 자동완성 |

#### 스타일링
| 기술 | 버전 | 역할 | 선택 이유 |
|------|------|------|----------|
| **TailwindCSS** | 3.3+ | 유틸리티 CSS | 빠른 UI 개발, 클래스명 구성, 커스텀 가능 |
| **Framer Motion** | 10.0+ | 애니메이션 라이브러리 | 선언적 애니메이션, SVG 애니메이션 지원 |

#### SQL 실행
| 기술 | 버전 | 역할 | 선택 이유 |
|------|------|------|----------|
| **sql.js** | 1.8+ | SQLite in WASM | 브라우저에서 서버 없이 SQL 실행, 가벼움 |

#### 에디터 & UI
| 기술 | 버전 | 역할 | 선택 이유 |
|------|------|------|----------|
| **Monaco Editor** | 0.44+ | SQL 코드 에디터 | VS Code 기반, 신택스 강조, 자동완성 |
| **TanStack Table** (React Table) | 8.0+ | 데이터 테이블 렌더링 | 대용량 데이터 효율적 처리, 정렬/필터링 |
| **Fuse.js** | 7.0+ | 모호 검색 라이브러리 | 용어 사전 검색, 타이핑 오류 허용 |

#### 개발 도구
| 기술 | 버전 | 역할 | 선택 이유 |
|------|------|------|----------|
| **pnpm** | 8.0+ | 패키지 매니저 | npm보다 빠름, 디스크 효율 |
| **ESLint** | 8.0+ | 코드 검사 | 코드 품질 유지 |
| **Prettier** | 3.0+ | 코드 포맷터 | 일관된 스타일 |
| **Vitest** | 1.0+ | 단위 테스트 | Jest 호환, 빠른 실행 |

### 1.2 백엔드
**없음** - 모든 로직이 클라이언트(브라우저)에서 실행됨

### 1.3 데이터 & 저장소
| 기술 | 버전 | 역할 | 용도 |
|------|------|------|------|
| **JSON 파일** | - | 정적 데이터 | 용어 사전, 개념 설명, 샘플 SQL |
| **SQLite (sql.js)** | 3.40+ | 임시 DB | 사용자 쿼리 실행 |
| **LocalStorage** | - | 로컬 저장 | 사용자 쿼리 히스토리, 개인 설정 |

### 1.4 배포 & 호스팅
| 기술 | 역할 | 선택 이유 |
|------|------|----------|
| **Vercel** | 호스팅 | Next.js 최적 지원, 무료 티어, 자동 배포 |
| **GitHub** | 소스 관리 | 버전 관리, 협업 |

### 1.5 모니터링 & 분석
| 기술 | 역할 | 선택 이유 |
|------|------|----------|
| **Vercel Analytics** | 성능 모니터링 | 무료, Next.js 통합 |
| **PostHog** (선택사항) | 사용자 분석 | 오픈소스, 개인정보 보호 |

---

## 아키텍처 개요

### 2.1 전체 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│               User's Browser (Client-Side)              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌───────────────────────────────────────────────────┐ │
│  │         Next.js React Application                 │ │
│  ├───────────────────────────────────────────────────┤ │
│  │                                                    │ │
│  │  ┌──────────────┐  ┌──────────────────────────┐  │ │
│  │  │   Screens    │  │  State Management        │  │ │
│  │  ├──────────────┤  ├──────────────────────────┤  │ │
│  │  │ Dashboard    │  │ useContext + useState    │  │ │
│  │  │ Playground   │  │ React Query (optional)   │  │ │
│  │  │ Concepts     │  │                          │  │ │
│  │  │ Glossary     │  │                          │  │ │
│  │  └──────────────┘  └──────────────────────────┘  │ │
│  │                                                    │ │
│  │  ┌──────────────┐  ┌──────────────────────────┐  │ │
│  │  │  Components  │  │   sql.js (WASM)         │  │ │
│  │  ├──────────────┤  ├──────────────────────────┤  │ │
│  │  │ SQLEditor    │  │ SQLite in Memory         │  │ │
│  │  │ ResultTable  │  │ Query Execution Engine   │  │ │
│  │  │ SVGDiagram   │  │                          │ │ │
│  │  │ TermCard     │  │                          │  │ │
│  │  └──────────────┘  └──────────────────────────┘  │ │
│  │                                                    │ │
│  │  ┌──────────────────────────────────────────┐    │ │
│  │  │      Static Data Loading                 │    │ │
│  │  ├──────────────────────────────────────────┤    │ │
│  │  │ /public/data/glossary.json               │    │ │
│  │  │ /public/data/concepts.json               │    │ │
│  │  │ /public/data/sample-sqls.json            │    │ │
│  │  └──────────────────────────────────────────┘    │ │
│  │                                                    │ │
│  └───────────────────────────────────────────────────┘ │
│                                                          │
│  ┌──────────────────┐  ┌────────────────────────────┐  │
│  │  LocalStorage    │  │  Browser IndexedDB         │  │
│  │  (히스토리, 설정) │  │  (향후 사용 예정)         │  │
│  └──────────────────┘  └────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
         ↓ (빌드 시) ↓              ↓ (실행 시) ↓
┌──────────────────────┐      ┌──────────────────────┐
│   GitHub Repository  │      │   Vercel CDN + Edge  │
│   (소스 코드)        │      │   (정적 호스팅)      │
└──────────────────────┘      └──────────────────────┘
```

### 2.2 SPA (Single Page Application) 구조

```
Next.js App Router
├── app/
│   ├── layout.tsx                      (공통 레이아웃)
│   ├── page.tsx                        (/) Dashboard
│   ├── playground/
│   │   └── page.tsx                    (/playground)
│   ├── concepts/
│   │   └── page.tsx                    (/concepts)
│   └── glossary/
│       └── page.tsx                    (/glossary)
├── components/
│   ├── ui/                             (기본 UI)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Tabs.tsx
│   │   └── ...
│   ├── features/                       (기능별)
│   │   ├── SQLEditor/
│   │   ├── ResultTable/
│   │   ├── Diagram/
│   │   └── GlossarySearch/
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── sql/
│   │   ├── engine.ts                   (sql.js 래퍼)
│   │   └── sample-data.ts              (샘플 데이터 초기화)
│   ├── data/
│   │   ├── glossary-loader.ts
│   │   ├── concepts-loader.ts
│   │   └── types.ts
│   └── utils/
│       ├── formatters.ts
│       └── validators.ts
├── public/
│   ├── data/
│   │   ├── glossary.json
│   │   ├── concepts.json
│   │   └── sample-sqls.json
│   └── assets/
│       └── ...
└── styles/
    ├── globals.css
    └── tailwind.config.ts
```

### 2.3 데이터 흐름

#### 시나리오 1: SQL 실행
```
User Input (SQL Editor)
    ↓
useCallback (handleExecuteQuery)
    ↓
sql.Database.run(queryText)
    ↓
sql.js Engine (WASM 실행)
    ↓
결과 행 배열 반환
    ↓
useState (setResults)
    ↓
ResultTable Component 렌더링
    ↓
화면 출력
```

#### 시나리오 2: 용어 검색
```
User Input (검색창)
    ↓
useState (setSearchQuery)
    ↓
useMemo (필터링 로직)
    ↓
Fuse.js (모호 검색)
    ↓
필터된 용어 배열
    ↓
TermCard 리스트 렌더링
    ↓
화면 출력
```

---

## sql.js WASM 통합

### 3.1 sql.js란?
- **SQLite**를 **WebAssembly**로 컴파일
- 브라우저 메모리에서 직접 SQL 쿼리 실행
- 서버 없이도 SQL 완벽 지원

### 3.2 초기화 프로세스

```typescript
// lib/sql/engine.ts
import initSqlJs, { Database } from 'sql.js'

let db: Database | null = null

export async function initializeDatabase() {
  const SQL = await initSqlJs()
  db = new SQL.Database()

  // 샘플 데이터 로드
  await loadSampleData(db)

  return db
}

async function loadSampleData(db: Database) {
  // EMPLOYEES 테이블
  db.run(`
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      dept_id INTEGER,
      salary INTEGER,
      hire_date TEXT
    )
  `)

  db.run(`
    INSERT INTO employees VALUES
    (1, 'Alice', 10, 60000, '2020-01-15'),
    (2, 'Bob', 10, 55000, '2020-02-20'),
    ...
  `)

  // DEPARTMENTS 테이블
  db.run(`
    CREATE TABLE departments (
      id INTEGER PRIMARY KEY,
      dept_name TEXT NOT NULL
    )
  `)

  db.run(`
    INSERT INTO departments VALUES
    (10, 'Sales'),
    (20, 'Engineering'),
    ...
  `)
}

export function executeQuery(sql: string) {
  if (!db) throw new Error('Database not initialized')

  try {
    const stmt = db.prepare(sql)
    const results: any[] = []

    while (stmt.step()) {
      results.push(stmt.getAsObject())
    }

    stmt.free()
    return { success: true, data: results }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
```

### 3.3 메모리 관리
| 작업 | 방법 | 주의사항 |
|------|------|---------|
| **DB 초기화** | `new SQL.Database()` | 최초 1회만 (useEffect + ref) |
| **쿼리 실행** | `db.prepare(sql).step()` | 각 쿼리 후 `stmt.free()` |
| **메모리 해제** | `db.close()` (페이지 나갈 때) | 웹 워커로 이동 예정 |

### 3.4 성능 최적화

#### 웹 워커 고려
향후 큰 쿼리를 웹 워커로 오프로드:
```typescript
// 초기 버전: 메인 스레드에서 실행 (간단함)
// Phase 2: 웹 워커로 이동 (UI 블로킹 방지)

const worker = new Worker('/workers/sql.worker.ts')

worker.postMessage({ type: 'EXECUTE_QUERY', payload: { sql } })
worker.onmessage = (event) => {
  const { data } = event
  setResults(data)
}
```

---

## 데이터 관리 전략

### 4.1 정적 데이터 구조

#### 용어 사전 (glossary.json)
```json
{
  "version": "1.0",
  "lastUpdated": "2026-03-26",
  "terms": [
    {
      "id": "term-ddl-create",
      "name": "CREATE",
      "category": "DDL",
      "definition": "새로운 테이블, 뷰, 인덱스 등 객체를 생성하는 명령어",
      "usage": "데이터베이스 스키마 정의, 테이블 구조 설계",
      "example": "CREATE TABLE employees (id INT, name VARCHAR(50))",
      "relatedTerms": ["DDL", "ALTER", "DROP"],
      "sqldFrequency": "매우 높음"
    },
    ...
  ]
}
```

#### 개념 설명 (concepts.json)
```json
{
  "version": "1.0",
  "lastUpdated": "2026-03-26",
  "concepts": [
    {
      "id": "concept-inner-join",
      "name": "INNER JOIN",
      "description": "두 테이블의 공통된 행만 반환하는 조인",
      "svgDiagram": "<svg>...</svg>",
      "textExplanation": "...",
      "sqlExample": "SELECT e.name, d.dept_name FROM employees e INNER JOIN departments d ON e.dept_id = d.id",
      "useCases": ["사원과 부서 정보 함께 조회", "..."],
      "relatedConcepts": ["LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"]
    },
    ...
  ]
}
```

#### 샘플 SQL (sample-sqls.json)
```json
{
  "version": "1.0",
  "categories": {
    "SELECT": [
      {
        "id": "sql-select-1",
        "title": "전체 사원 조회",
        "sql": "SELECT * FROM employees",
        "description": "EMPLOYEES 테이블의 모든 행과 컬럼 조회"
      },
      ...
    ],
    "WHERE": [...],
    "JOIN": [...],
    "GROUP_BY": [...]
  }
}
```

### 4.2 데이터 로드 전략

```typescript
// lib/data/glossary-loader.ts
import glossaryData from '@/public/data/glossary.json'

export function getGlossary() {
  return glossaryData.terms
}

export function searchTerms(query: string) {
  const fuse = new Fuse(glossaryData.terms, {
    keys: ['name', 'definition', 'relatedTerms'],
    threshold: 0.3  // 30% 정도의 오류 허용
  })
  return fuse.search(query)
}

export function getTermsByCategory(category: string) {
  return glossaryData.terms.filter(t => t.category === category)
}
```

### 4.3 샘플 데이터 구성

#### EMPLOYEES (사원)
```sql
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  dept_id INTEGER NOT NULL,
  salary INTEGER,
  hire_date TEXT,
  manager_id INTEGER
)
```
- 10행 데이터
- SQLD 시험 빈출 예제 사용

#### DEPARTMENTS (부서)
```sql
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  dept_name TEXT NOT NULL,
  location TEXT
)
```
- 5행 데이터

#### ORDERS (주문)
```sql
CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  order_date TEXT,
  amount DECIMAL(10, 2)
)
```
- 20행 데이터

### 4.4 LocalStorage 활용

#### 용도
- 사용자 쿼리 히스토리
- 개인 설정 (테마, 폰트 크기 등)

#### 구조
```typescript
interface UserPreferences {
  theme: 'light' | 'dark'
  fontSize: 'small' | 'medium' | 'large'
}

interface QueryHistory {
  id: string
  sql: string
  timestamp: number
  resultCount: number
}

// 저장
localStorage.setItem('user-preferences', JSON.stringify(preferences))
localStorage.setItem('query-history', JSON.stringify(history))

// 로드
const prefs = JSON.parse(localStorage.getItem('user-preferences') || '{}')
```

---

## 배포 전략

### 5.1 Vercel 배포

#### 배포 파이프라인
```
GitHub Push
    ↓
Vercel Webhook Trigger
    ↓
Build Process
  - npm install
  - npm run build
  - ESLint / Prettier 체크
    ↓
Deployment
  - Edge Network에 배포
  - 자동 HTTPS
  - CDN 캐싱
    ↓
Preview URL 생성 (PR)
Production URL 배포 (main branch)
```

#### Vercel 설정 파일 (vercel.json)
```json
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install --frozen-lockfile",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_ENVIRONMENT": "production"
  },
  "functions": {
    "api/**": {
      "runtime": "nodejs20.x"
    }
  }
}
```

### 5.2 환경 변수
| 변수 | 값 | 용도 |
|------|-----|------|
| `NEXT_PUBLIC_ENVIRONMENT` | `production` \| `development` | 환경 판단 |
| `NEXT_PUBLIC_SENTRY_DSN` | (선택) Sentry 토큰 | 에러 추적 (향후) |

### 5.3 도메인 & DNS
- Vercel 기본 도메인: `sqld-visual-lab.vercel.app`
- 커스텀 도메인 (선택): `sqldvisuallab.com` (연간 ~$10)

### 5.4 배포 체크리스트

```
[ ] 모든 테스트 통과
[ ] ESLint / Prettier 통과
[ ] 빌드 성공 (npm run build)
[ ] 성능 최적화 (LightHouse > 90)
[ ] 보안 헤더 설정
[ ] CORS 설정 (필요시)
[ ] robots.txt 생성
[ ] sitemap.xml 생성
[ ] 메타데이터 설정 (OG 태그)
[ ] 404 페이지 준비
[ ] 에러 모니터링 설정
[ ] 배포 후 E2E 테스트 실행
```

---

## 성능 요구사항

### 6.1 응답 시간 목표

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| **First Contentful Paint (FCP)** | < 1.5초 | LightHouse, Vercel Analytics |
| **Largest Contentful Paint (LCP)** | < 2.5초 | Core Web Vitals |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Core Web Vitals |
| **SQL 쿼리 실행** | < 0.5초 (평균) | 개발자 도구 |
| **용어 검색** | < 0.1초 | 개발자 도구 |
| **개념 다이어그램 렌더링** | < 1초 | 개발자 도구 |

### 6.2 번들 크기 최적화

| 항목 | 제한 | 전략 |
|------|------|------|
| **메인 JS 번들** | < 200KB | Code splitting, Dynamic import |
| **sql.js WASM** | ~ 600KB | Gzip 압축, 캐싱 |
| **전체 초기 로드** | < 1MB | CDN + 브라우저 캐싱 |

#### 최적화 방안
```typescript
// 동적 import로 번들 크기 감소
const Playground = dynamic(() => import('@/components/features/Playground'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})

export default function PlaygroundPage() {
  return <Playground />
}
```

### 6.3 메모리 사용량

| 항목 | 제한 |
|------|------|
| **sql.js 메모리** | < 100MB (대부분의 브라우저 허용) |
| **React 컴포넌트 상태** | < 10MB |
| **캐시된 데이터** | < 5MB (LocalStorage + 메모리) |
| **총 메모리 사용** | < 200MB |

---

## 보안 고려사항

### 7.1 XSS (Cross-Site Scripting) 방어

#### 위험 시나리오
```javascript
// 위험: SQL 결과에 HTML 포함된 경우
<ResultTable data={results} />  // ❌ 위험

// 예: 사용자가 HTML 삽입
INSERT INTO employees VALUES (1, '<script>alert("XSS")</script>')
```

#### 방어 방법
```typescript
// ✅ 안전: React가 자동으로 이스케이핑
const ResultTable = ({ data }: { data: any[] }) => {
  return (
    <table>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.name}</td>  {/* React가 자동으로 이스케이핑 */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// 명시적 이스케이핑 (필요시)
import { DOMPurify } from 'dompurify'
const sanitized = DOMPurify.sanitize(userInput)
```

### 7.2 SQL Injection 방어

#### 위험 시나리오
```sql
-- sql.js는 매개변수화 쿼리를 지원하므로 기본적으로 안전
-- 하지만 문자열 연결은 피해야 함

// ❌ 위험
const sql = `SELECT * FROM users WHERE id = ${userId}`

// ✅ 안전
const sql = `SELECT * FROM users WHERE id = ?`
db.run(sql, [userId])
```

#### 방어 전략
```typescript
export function executeQuery(sql: string, params: any[] = []) {
  if (!db) throw new Error('Database not initialized')

  try {
    const stmt = db.prepare(sql)

    // 매개변수 바인딩
    if (params.length > 0) {
      stmt.bind(params)
    }

    const results: any[] = []
    while (stmt.step()) {
      results.push(stmt.getAsObject())
    }
    stmt.free()

    return { success: true, data: results }
  } catch (error) {
    // 에러 로그 (상세 정보는 노출 금지)
    console.error('Query execution failed:', error)
    return { success: false, error: 'Query failed' }
  }
}
```

### 7.3 정보 유출 방지

#### 에러 메시지
```typescript
// ❌ 위험: 상세 에러 정보 노출
{
  "success": false,
  "error": "SYNTAX ERROR: near SELECT at position 5"
}

// ✅ 안전: 일반적인 메시지
{
  "success": false,
  "error": "Invalid SQL query. Please check the syntax."
}
```

#### 로깅
```typescript
// 개발 환경: 상세 로그
if (process.env.NODE_ENV === 'development') {
  console.error('Detailed error:', error)
}

// 프로덕션: 일반 에러만
if (process.env.NODE_ENV === 'production') {
  logToMonitoring(error.message)  // 추적용
}
```

### 7.4 CORS & CSP

#### Next.js 보안 헤더 (next.config.ts)
```typescript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'"
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
]

export const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  }
}
```

### 7.5 브라우저 샌드박스

#### sql.js의 보안 모델
- sql.js는 WASM으로 샌드박싱됨
- 사용자 쿼리는 격리된 가상 환경에서만 실행
- 로컬 파일 시스템 접근 불가
- 네트워크 요청 불가

---

## 인프라 & 모니터링

### 8.1 모니터링 전략

#### Vercel Analytics
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### Core Web Vitals 추적
| 지표 | 목표 | 빨강 | 파랑 |
|------|------|------|------|
| **LCP** | < 2.5s | > 4s | < 2.5s |
| **FID** | < 100ms | > 300ms | < 100ms |
| **CLS** | < 0.1 | > 0.25 | < 0.1 |

### 8.2 에러 추적 (향후)

```typescript
// lib/monitoring/sentry.ts (Phase 2)
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
})

export function trackError(error: Error, context?: any) {
  Sentry.captureException(error, { extra: context })
}
```

### 8.3 로깅

```typescript
// lib/logging/logger.ts
const isDev = process.env.NODE_ENV === 'development'

export const logger = {
  info: (msg: string, data?: any) => {
    if (isDev) console.log(`[INFO] ${msg}`, data)
  },
  error: (msg: string, error?: Error) => {
    console.error(`[ERROR] ${msg}`, error)
    // 프로덕션에서는 모니터링 서비스로 전송
  },
  warn: (msg: string, data?: any) => {
    console.warn(`[WARN] ${msg}`, data)
  },
}
```

### 8.4 업타임 모니터링

```bash
# 월 1회 간단한 E2E 테스트 (옵션)
# Vercel Cron Jobs 또는 Uptime Robot 사용

curl -f https://sqld-visual-lab.vercel.app/ || exit 1
curl -f https://sqld-visual-lab.vercel.app/api/health || exit 1
```

---

## 부록: 환경 구성

### A.1 개발 환경 설정

```bash
# .env.local
NEXT_PUBLIC_ENVIRONMENT=development
NODE_ENV=development
```

### A.2 프로덕션 환경 설정

```bash
# .env.production
NEXT_PUBLIC_ENVIRONMENT=production
NODE_ENV=production
```

---

**최종 검토자**: 기술 리더
**최종 검토일**: 2026-03-26
**다음 문서**: [03-user-flow.md](03-user-flow.md)
