# 07-coding-convention.md (코딩 컨벤션)

**프로젝트명**: SQLD Visual Lab
**작성일**: 2026-03-26
**버전**: 1.0
**상태**: 최종 검토 완료

---

## 목차
1. [TypeScript 스타일 가이드](#typescript-스타일-가이드)
2. [React 컴포넌트 구조](#react-컴포넌트-구조)
3. [파일/폴더 구조](#파일폴더-구조)
4. [네이밍 컨벤션](#네이밍-컨벤션)
5. [Git 워크플로우](#git-워크플로우)
6. [ESLint & Prettier 설정](#eslint--prettier-설정)
7. [테스트 작성](#테스트-작성)
8. [문서 작성](#문서-작성)

---

## TypeScript 스타일 가이드

### 1.1 기본 원칙

```typescript
// ✅ Good: 타입 명시
interface User {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
}

// ❌ Bad: 타입 생략
const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
}
```

### 1.2 변수 선언

#### const 우선

```typescript
// ✅ const 사용 (재할당 없음)
const userName: string = 'Alice'
const maxRetries: number = 3

// ✅ let 사용 (재할당 필요)
let retryCount: number = 0
retryCount++

// ❌ var 사용 금지
var oldStyle = 'avoid'
```

#### null/undefined 처리

```typescript
// ✅ 옵셔널 체이닝
const userName = user?.name ?? 'Unknown'

// ✅ Nullish coalescing
const value = config.setting ?? defaultValue

// ❌ 삼항연산자 과다 사용
const userName = user ? (user.name ? user.name : 'Unknown') : 'Unknown'
```

### 1.3 함수 정의

#### 타입 명시

```typescript
// ✅ Good: 매개변수와 반환 타입 명시
function calculateTotal(items: number[], tax: number): number {
  return items.reduce((sum, item) => sum + item, 0) * (1 + tax)
}

// ✅ 화살표 함수
const calculateTotal = (items: number[], tax: number): number => {
  return items.reduce((sum, item) => sum + item, 0) * (1 + tax)
}

// ✅ 복잡한 반환 타입
function getUserProfile(id: string): Promise<{ user: User; posts: Post[] }> {
  return Promise.all([fetchUser(id), fetchPosts(id)]).then(([user, posts]) => ({
    user,
    posts,
  }))
}

// ❌ Bad: 타입 생략
function calculateTotal(items, tax) {
  return items.reduce((sum, item) => sum + item, 0) * (1 + tax)
}
```

#### 기본 매개변수

```typescript
// ✅ Good: 기본값 제공
function paginate(items: any[], pageSize: number = 10): any[][] {
  return Array.from({ length: Math.ceil(items.length / pageSize) }, (_, i) =>
    items.slice(i * pageSize, (i + 1) * pageSize),
  )
}

// ❌ Bad: 기본값 없음
function paginate(items: any[], pageSize?: number) {
  const size = pageSize || 10  // falsy 체크 문제
}
```

### 1.4 인터페이스 & 타입

```typescript
// ✅ 인터페이스: 객체 구조 정의 (확장 용이)
interface User {
  id: number
  name: string
  email: string
}

interface AdminUser extends User {
  role: 'admin'
  permissions: string[]
}

// ✅ 타입: 별칭 (유니온, 교집합)
type UserStatus = 'active' | 'inactive' | 'suspended'
type Result<T> = { success: true; data: T } | { success: false; error: string }

// ✅ 제네릭
interface ApiResponse<T> {
  status: number
  data: T
  timestamp: Date
}

// ❌ Bad: any 사용 (타입 안정성 상실)
function processData(data: any) {
  return data.name.toUpperCase()  // 런타임 에러 가능성
}
```

### 1.5 에러 처리

```typescript
// ✅ 에러 타입 정의
interface AppError extends Error {
  code: string
  status: number
}

class SQLError implements AppError {
  name = 'SQLError'
  message: string
  code: string
  status: number = 400

  constructor(message: string, code: string) {
    this.message = message
    this.code = code
  }
}

// ✅ 타입 가드
function isAppError(error: unknown): error is AppError {
  return error instanceof Error && 'code' in error && 'status' in error
}

// ✅ try-catch
try {
  const result = executeQuery(sql)
} catch (error) {
  if (isAppError(error)) {
    console.error(`[${error.code}] ${error.message}`)
  } else {
    console.error('Unknown error', error)
  }
}

// ❌ Bad: 에러 무시
try {
  const result = executeQuery(sql)
} catch (e) {
  // 에러 처리 안함
}
```

### 1.6 문자열 처리

```typescript
// ✅ 템플릿 리터럴
const greeting = `Hello, ${user.name}!`
const query = `SELECT * FROM users WHERE id = ${userId}`

// ✅ 문자열 치환 (SQL은 매개변수 바인딩)
const query = 'SELECT * FROM users WHERE id = ?'
executeQuery(query, [userId])

// ❌ Bad: 문자열 연결
const greeting = 'Hello, ' + user.name + '!'

// ❌ Bad: SQL 삽입 (보안 문제)
const query = `SELECT * FROM users WHERE id = ${userId}`
```

---

## React 컴포넌트 구조

### 2.1 컴포넌트 기본 형태

#### 함수형 컴포넌트

```typescript
// ✅ Good: 함수형 컴포넌트 + TypeScript
interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

// ❌ Bad: 클래스 컴포넌트 (구식)
class Button extends React.Component {
  render() {
    return <button>{this.props.label}</button>
  }
}
```

#### Props 구조

```typescript
// ✅ Good: 객체 분해, 기본값
interface CardProps {
  title: string
  description?: string
  children: React.ReactNode
  shadow?: 'sm' | 'md' | 'lg'
  padding?: 'sm' | 'md' | 'lg'
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  shadow = 'md',
  padding = 'md',
}) => {
  return (
    <div className={`card shadow-${shadow} p-${padding}`}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </div>
  )
}

// ❌ Bad: Props 비분해
export const Card: React.FC<CardProps> = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>
      {props.children}
    </div>
  )
}
```

### 2.2 Hooks 사용

#### useState

```typescript
// ✅ Good: 상태 명확히
const [count, setCount] = useState<number>(0)
const [isLoading, setIsLoading] = useState<boolean>(false)
const [users, setUsers] = useState<User[]>([])

// ✅ 상태 업데이트
const increment = () => setCount(prev => prev + 1)

// ❌ Bad: 상태 직접 수정
count = count + 1  // React가 감지 못함

// ❌ Bad: 이전 상태 무시
const increment = () => setCount(count + 1)  // 클로저 문제
```

#### useEffect

```typescript
// ✅ Good: 의존성 명시
export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // 마운트 시점 한 번만 실행
  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data)
      setLoading(false)
    })
  }, [])  // 의존성 배열 명시

  return loading ? <div>Loading...</div> : <UserList users={users} />
}

// ✅ 정리 함수 (cleanup)
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick')
  }, 1000)

  return () => clearInterval(timer)  // 언마운트 시 정리
}, [])

// ❌ Bad: 의존성 배열 생략
useEffect(() => {
  fetchUsers()  // 매번 렌더링마다 실행
})

// ❌ Bad: 의존성 배열 잘못됨
useEffect(() => {
  fetchUsers()
}, [userId])  // userId 변경 시만 실행하는 게 맞는지 확인
```

#### useContext & useCallback

```typescript
// ✅ Good: Context 활용
const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

// ✅ useCallback으로 메모이제이션
export const SQLEditor: React.FC<SQLEditorProps> = ({ onExecute }) => {
  const [sql, setSql] = useState('')

  const handleExecute = useCallback(() => {
    onExecute(sql)
  }, [sql, onExecute])  // 의존성 정확히

  return (
    <div>
      <textarea value={sql} onChange={e => setSql(e.target.value)} />
      <button onClick={handleExecute}>실행</button>
    </div>
  )
}

// ❌ Bad: 인라인 함수 (매번 새로 생성)
<button onClick={() => onExecute(sql)}>실행</button>
```

### 2.3 조건부 렌더링

```typescript
// ✅ Good: 명확한 조건부 렌더링
interface ResultProps {
  data: any[] | null
  loading: boolean
  error: string | null
}

export const Result: React.FC<ResultProps> = ({ data, loading, error }) => {
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorAlert message={error} />
  }

  if (!data || data.length === 0) {
    return <EmptyState />
  }

  return <ResultTable data={data} />
}

// ✅ 논리 연산자 (간단한 경우)
{isAdmin && <AdminPanel />}

// ❌ Bad: 복잡한 삼항 연산자
{loading ? <Spinner /> : error ? <Error /> : data ? <Table /> : <Empty />}

// ❌ Bad: 실수하기 쉬운 논리
{users && <UserList users={users} />}  // [] 는 truthy!
// 대신:
{users && users.length > 0 && <UserList users={users} />}
```

### 2.4 성능 최적화

```typescript
// ✅ React.memo (Props 변경 없으면 리렌더링 방지)
interface UserCardProps {
  user: User
  onSelect: (id: number) => void
}

export const UserCard = React.memo(({ user, onSelect }: UserCardProps) => {
  return (
    <div onClick={() => onSelect(user.id)}>
      {user.name}
    </div>
  )
})

// ✅ useMemo (값 메모이제이션)
const expensiveValue = useMemo(() => {
  return complexCalculation(items)
}, [items])

// ❌ Bad: 매번 계산
const expensiveValue = complexCalculation(items)
```

---

## 파일/폴더 구조

### 3.1 프로젝트 레이아웃

```
sqld-visual-lab/
├── .github/
│   └── workflows/           # CI/CD 설정
├── app/                     # Next.js App Router
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈 페이지
│   ├── playground/
│   │   └── page.tsx
│   ├── concepts/
│   │   └── page.tsx
│   ├── glossary/
│   │   └── page.tsx
│   └── api/                 # API 라우트 (필요시)
├── components/              # React 컴포넌트
│   ├── ui/                  # 기본 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── features/            # 기능별 컴포넌트
│   │   ├── SQLPlayground/
│   │   │   ├── SQLEditor.tsx
│   │   │   ├── ResultTable.tsx
│   │   │   └── index.ts
│   │   ├── Concepts/
│   │   │   ├── ConceptList.tsx
│   │   │   ├── SVGDiagram.tsx
│   │   │   └── index.ts
│   │   └── Glossary/
│   │       ├── SearchBar.tsx
│   │       ├── TermCard.tsx
│   │       └── index.ts
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/                     # 유틸리티 & 로직
│   ├── sql/
│   │   ├── engine.ts        # sql.js 래퍼
│   │   └── sample-data.ts
│   ├── data/
│   │   ├── glossary-loader.ts
│   │   ├── concepts-loader.ts
│   │   └── types.ts
│   ├── hooks/               # 커스텀 Hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useSQLExecution.ts
│   │   └── index.ts
│   └── utils/
│       ├── formatters.ts
│       ├── validators.ts
│       └── string-utils.ts
├── public/
│   ├── data/
│   │   ├── glossary.json
│   │   ├── concepts.json
│   │   └── sample-sqls.json
│   └── assets/
│       └── ...
├── styles/
│   ├── globals.css
│   └── tailwind.config.ts
├── __tests__/               # 테스트 파일
│   ├── unit/
│   │   └── sql-engine.test.ts
│   └── integration/
│       └── playground.test.ts
├── docs/
│   └── planning/            # 기획 문서
├── .eslintrc.json
├── .prettierrc.json
├── tsconfig.json
├── next.config.ts
├── package.json
└── README.md
```

### 3.2 컴포넌트 내부 구조

```typescript
// components/features/SQLPlayground/SQLEditor.tsx

// 1. 임포트
import React, { useState, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { executeQuery } from '@/lib/sql/engine'
import { Button } from '@/components/ui'

// 2. 타입 정의
interface SQLEditorProps {
  initialValue?: string
  onExecute?: (sql: string, results: any[]) => void
  height?: string
}

// 3. 컴포넌트 함수
export const SQLEditor: React.FC<SQLEditorProps> = ({
  initialValue = '',
  onExecute,
  height = '400px',
}) => {
  // 상태
  const [sql, setSql] = useState(initialValue)
  const [executing, setExecuting] = useState(false)

  // 핸들러
  const handleExecute = useCallback(async () => {
    setExecuting(true)
    const result = executeQuery(sql)
    if (result.success) {
      onExecute?.(sql, result.data || [])
    }
    setExecuting(false)
  }, [sql, onExecute])

  // 렌더링
  return (
    <div>
      <Editor
        height={height}
        language="sql"
        value={sql}
        onChange={v => setSql(v || '')}
        options={{
          fontSize: 14,
          tabSize: 2,
          wordWrap: 'on',
        }}
      />
      <Button
        onClick={handleExecute}
        disabled={executing}
        label={executing ? '실행 중...' : '실행'}
      />
    </div>
  )
}

// 4. 기본 내보내기
export default SQLEditor
```

### 3.3 인덱스 파일 (index.ts)

```typescript
// components/features/SQLPlayground/index.ts
export { SQLEditor } from './SQLEditor'
export { ResultTable } from './ResultTable'
export { SampleDataSelector } from './SampleDataSelector'
export { SQLPlayground } from './SQLPlayground'  // 통합 컴포넌트

// 사용
import { SQLEditor, ResultTable } from '@/components/features/SQLPlayground'
```

---

## 네이밍 컨벤션

### 4.1 변수 & 함수

```typescript
// ✅ Good: camelCase
const userName: string = 'Alice'
const isLoading: boolean = false
const userList: User[] = []

const fetchUserData = async (userId: number): Promise<User> => {}
const calculateTotalPrice = (items: Item[]): number => {}
const isValidEmail = (email: string): boolean => {}

// ✅ 불린 변수: is/has/should 접두사
const isOpen: boolean = false
const hasError: boolean = true
const shouldRender: boolean = true

// ❌ Bad: 다른 케이싱
const UserName = 'Alice'  // PascalCase (상수용)
const user_name = 'Alice'  // snake_case
const CONSTANT = 'value'   // CONSTANT는 상수만

// ❌ Bad: 의미 모호
const data = users      // 무엇의 data인가?
const fn = () => {}     // 함수 이름이 너무 짧음
```

### 4.2 컴포넌트 & 타입

```typescript
// ✅ Good: PascalCase
const Button: React.FC<ButtonProps> = () => {}

interface UserProfile {
  id: number
  name: string
}

type UserStatus = 'active' | 'inactive'

// ✅ Props 인터페이스: {ComponentName}Props
interface ButtonProps {
  label: string
  onClick?: () => void
}

// ✅ 이벤트 핸들러: handle{Action}
const handleClick = () => {}
const handleInputChange = (value: string) => {}
const handleFormSubmit = (data: FormData) => {}

// ❌ Bad: lowercase 컴포넌트
const button: React.FC = () => {}  // React가 컴포넌트로 인식 못함

// ❌ Bad: Props 명확하지 않음
interface Props {
  label: string
}
```

### 4.3 파일명

```
// ✅ Good
- Button.tsx          (컴포넌트)
- useLocalStorage.ts  (Hook)
- sql-engine.ts       (유틸리티)
- types.ts            (타입 정의)
- constants.ts        (상수)

// ❌ Bad
- button.tsx          (소문자)
- UseLocalStorage.ts  (Hook은 소문자)
- SQLEngine.ts        (모듈은 kebab-case)
```

### 4.4 상수

```typescript
// ✅ Good: UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3
const DEFAULT_PAGE_SIZE = 10
const SAMPLE_DATA_TABLES = ['employees', 'departments', 'orders']

const DATABASE_CONFIG = {
  MAX_CONNECTIONS: 10,
  TIMEOUT_MS: 5000,
}

// ❌ Bad: camelCase 상수
const maxRetryCount = 3  // 상수는 UPPER_SNAKE_CASE
```

---

## Git 워크플로우

### 5.1 브랜치 전략 (Git Flow)

```
main (프로덕션)
  ├── develop (개발)
  │   ├── feature/sql-editor
  │   ├── feature/concepts-viz
  │   ├── bugfix/query-error
  │   └── ...
```

### 5.2 커밋 메시지 규칙 (Conventional Commits)

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type 종류

| Type | 용도 | 예시 |
|------|------|------|
| **feat** | 새로운 기능 | `feat(playground): add query history` |
| **fix** | 버그 수정 | `fix(sql-engine): handle null values` |
| **refactor** | 리팩토링 | `refactor(components): extract Button` |
| **style** | 스타일/포맷 | `style: apply prettier formatting` |
| **docs** | 문서 | `docs: update README` |
| **test** | 테스트 | `test(sql-engine): add unit tests` |
| **chore** | 빌드/의존성 | `chore: update dependencies` |

#### 예제

```bash
# ✅ Good
git commit -m "feat(glossary): implement search functionality

- Add SearchBar component
- Implement fuzzy search with Fuse.js
- Update TermCard to highlight matches
- Add tests for search logic

Closes #42"

# ❌ Bad
git commit -m "fix stuff"
git commit -m "updated components"
git commit -m "wip"
```

### 5.3 PR (Pull Request) 규칙

```markdown
## 📝 Description
What does this PR do?

## 🔗 Related Issue
Closes #42

## 🧪 Testing
How was this tested?

- [ ] Unit tests added
- [ ] Component tested manually
- [ ] No breaking changes

## 📸 Screenshots (if applicable)
Before / After
```

---

## ESLint & Prettier 설정

### 6.1 ESLint 설정 (.eslintrc.json)

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-types": "warn",
    "no-console": [
      "warn",
      {
        "allow": ["warn", "error"]
      }
    ],
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### 6.2 Prettier 설정 (.prettierrc.json)

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid"
}
```

### 6.3 사용 명령어

```bash
# Lint 체크
npm run lint

# Lint 자동 수정
npm run lint:fix

# Prettier 포맷팅
npm run format

# 커밋 전 확인
npm run lint && npm run format
```

---

## 테스트 작성

### 7.1 테스트 구조 (Vitest)

```typescript
// __tests__/unit/sql-engine.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { executeQuery, initializeDatabase } from '@/lib/sql/engine'

describe('SQL Engine', () => {
  beforeEach(async () => {
    await initializeDatabase()
  })

  describe('executeQuery', () => {
    it('should return results for valid SELECT query', () => {
      const result = executeQuery('SELECT * FROM employees LIMIT 1')

      expect(result.success).toBe(true)
      expect(result.data).toHaveLength(1)
      expect(result.data?.[0]).toHaveProperty('emp_id')
    })

    it('should return error for invalid SQL', () => {
      const result = executeQuery('SELECT * FORM employees')

      expect(result.success).toBe(false)
      expect(result.error).toMatch(/Syntax error/)
    })

    it('should handle WHERE conditions', () => {
      const result = executeQuery(
        'SELECT * FROM employees WHERE salary > 50000'
      )

      expect(result.success).toBe(true)
      expect(result.data?.every(emp => emp.salary > 50000)).toBe(true)
    })
  })

  describe('JOIN queries', () => {
    it('should join employees with departments', () => {
      const result = executeQuery(`
        SELECT e.emp_name, d.dept_name
        FROM employees e
        INNER JOIN departments d ON e.dept_id = d.dept_id
      `)

      expect(result.success).toBe(true)
      expect(result.data?.[0]).toHaveProperty('emp_name')
      expect(result.data?.[0]).toHaveProperty('dept_name')
    })
  })
})
```

### 7.2 컴포넌트 테스트

```typescript
// __tests__/unit/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui'

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler', () => {
    const handleClick = vi.fn()
    render(<Button label="Click" onClick={handleClick} />)

    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('disables when disabled prop is true', () => {
    render(<Button label="Click" disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### 7.3 테스트 커맨드

```bash
# 모든 테스트 실행
npm test

# 감시 모드 (파일 변경 시 자동 실행)
npm test -- --watch

# 커버리지 리포트
npm test -- --coverage

# 특정 파일만 테스트
npm test sql-engine.test.ts
```

---

## 문서 작성

### 8.1 코드 주석

```typescript
// ✅ Good: 필요한 부분만 주석
/**
 * SQL 쿼리를 실행하고 결과를 반환합니다.
 * @param sql - 실행할 SQL 쿼리 문자열
 * @param params - 매개변수 바인딩 (SQL 삽입 방지)
 * @returns 성공 시 결과 행 배열, 실패 시 에러 정보
 */
export function executeQuery(
  sql: string,
  params: any[] = []
): { success: boolean; data?: any[]; error?: string } {
  // 구현...
}

// ✅ 복잡한 로직에 설명
const result = db.prepare(sql)

// 매개변수 바인딩으로 SQL 삽입 방지
if (params.length > 0) {
  stmt.bind(params)
}

// ❌ Bad: 자명한 주석
// counter 증가
counter++

// ❌ Bad: 주석이 코드와 불일치
// counter 감소
counter++
```

### 8.2 README 예제

```markdown
# SQLD Visual Lab

## 설치

\`\`\`bash
git clone https://github.com/user/sqld-visual-lab
cd sqld-visual-lab
pnpm install
\`\`\`

## 실행

\`\`\`bash
pnpm run dev
\`\`\`

## 테스트

\`\`\`bash
pnpm test
\`\`\`

## 빌드

\`\`\`bash
pnpm run build
pnpm start
\`\`\`
```

### 8.3 컴포넌트 문서 (Storybook)

```typescript
// components/ui/Button.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Button',
    disabled: true,
  },
}
```

---

## 체크리스트

### 코드 작성 전
- [ ] 요구사항 이해
- [ ] 타입 정의 (interface/type)
- [ ] 테스트 케이스 작성 (TDD)

### 코드 작성 후
- [ ] ESLint 통과 (`npm run lint`)
- [ ] Prettier 포맷팅 (`npm run format`)
- [ ] 테스트 통과 (`npm test`)
- [ ] 주석/문서 작성
- [ ] 성능 최적화 확인

### 커밋 전
- [ ] 커밋 메시지 규칙 준수
- [ ] 관련 이슈 링크
- [ ] 불필요한 파일 제외 (.env, node_modules 등)

### PR 전
- [ ] 모든 로컬 테스트 통과
- [ ] develop 브랜치와 충돌 없음
- [ ] PR 템플릿 작성
- [ ] 리뷰어 지정

---

**최종 검토자**: 코드 리더
**최종 검토일**: 2026-03-26
**프로젝트 상태**: 기획 문서 완성 ✅
