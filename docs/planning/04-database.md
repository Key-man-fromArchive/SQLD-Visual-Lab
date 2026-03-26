# 04-database.md (데이터 설계)

**프로젝트명**: SQLD Visual Lab
**작성일**: 2026-03-26
**버전**: 1.0
**상태**: 최종 검토 완료

---

## 목차
1. [샘플 데이터베이스 스키마](#샘플-데이터베이스-스키마)
2. [JSON 데이터 구조](#json-데이터-구조)
3. [sql.js 초기화 전략](#sqljs-초기화-전략)
4. [데이터 리셋 메커니즘](#데이터-리셋-메커니즘)
5. [샘플 데이터 시드](#샘플-데이터-시드)

---

## 샘플 데이터베이스 스키마

### 1.1 전체 ERD (Entity Relationship Diagram)

```
┌──────────────────────────┐
│     DEPARTMENTS          │
├──────────────────────────┤
│ PK│ dept_id  (INT)       │
│   │ dept_name (VARCHAR)  │
│   │ location (VARCHAR)   │
│   │ budget (DECIMAL)     │
└──────────────────────────┘
         ▲
         │ 1:N
         │ FK: dept_id
         │
┌──────────────────────────┐
│     EMPLOYEES            │
├──────────────────────────┤
│ PK│ emp_id (INT)         │
│   │ emp_name (VARCHAR)   │
│   │ dept_id (INT)        │
│   │ salary (INT)         │
│   │ hire_date (DATE)     │
│   │ manager_id (INT)     │
│   │ job_id (INT)         │
└──────────────────────────┘
         ▲
         │ 1:N
         │ FK: job_id
         │
┌──────────────────────────┐
│        JOBS              │
├──────────────────────────┤
│ PK│ job_id (INT)         │
│   │ job_title (VARCHAR)  │
│   │ min_salary (INT)     │
│   │ max_salary (INT)     │
└──────────────────────────┘

┌──────────────────────────┐
│       ORDERS             │
├──────────────────────────┤
│ PK│ order_id (INT)       │
│   │ emp_id (INT)         │
│   │ order_date (DATE)    │
│   │ amount (DECIMAL)     │
│   │ status (VARCHAR)     │
└──────────────────────────┘
         ▲
         │ N:1
         │ FK: emp_id
         │
    (EMPLOYEES)
```

### 1.2 테이블 상세 정의

#### 테이블 1: DEPARTMENTS (부서)

```sql
CREATE TABLE departments (
  dept_id INTEGER PRIMARY KEY,
  dept_name VARCHAR(50) NOT NULL,
  location VARCHAR(50),
  budget DECIMAL(10, 2)
);
```

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|--------|------|
| **dept_id** | INTEGER | PRIMARY KEY | 부서 ID (10, 20, 30, ...) |
| **dept_name** | VARCHAR(50) | NOT NULL | 부서명 (Sales, Engineering, ...) |
| **location** | VARCHAR(50) | - | 위치 (Seoul, Busan, ...) |
| **budget** | DECIMAL(10,2) | - | 부서 예산 |

**데이터 예시**:
```
| dept_id | dept_name   | location | budget      |
|---------|-------------|----------|-------------|
| 10      | Sales       | Seoul    | 5000000.00  |
| 20      | Engineering | Seoul    | 8000000.00  |
| 30      | HR          | Busan    | 2000000.00  |
| 40      | Finance     | Seoul    | 3000000.00  |
| 50      | Marketing   | Busan    | 2500000.00  |
```

---

#### 테이블 2: JOBS (직무)

```sql
CREATE TABLE jobs (
  job_id INTEGER PRIMARY KEY,
  job_title VARCHAR(50) NOT NULL,
  min_salary INTEGER,
  max_salary INTEGER
);
```

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|--------|------|
| **job_id** | INTEGER | PRIMARY KEY | 직무 ID |
| **job_title** | VARCHAR(50) | NOT NULL | 직무명 |
| **min_salary** | INTEGER | - | 최소 급여 |
| **max_salary** | INTEGER | - | 최대 급여 |

**데이터 예시**:
```
| job_id | job_title      | min_salary | max_salary |
|--------|----------------|------------|------------|
| 1      | Manager        | 50000      | 80000      |
| 2      | Senior Dev     | 60000      | 90000      |
| 3      | Junior Dev     | 30000      | 50000      |
| 4      | Analyst        | 40000      | 60000      |
| 5      | Coordinator    | 25000      | 40000      |
```

---

#### 테이블 3: EMPLOYEES (사원)

```sql
CREATE TABLE employees (
  emp_id INTEGER PRIMARY KEY,
  emp_name VARCHAR(50) NOT NULL,
  dept_id INTEGER NOT NULL,
  salary INTEGER,
  hire_date TEXT,
  manager_id INTEGER,
  job_id INTEGER,
  FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
  FOREIGN KEY (job_id) REFERENCES jobs(job_id),
  FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
);
```

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|--------|------|
| **emp_id** | INTEGER | PRIMARY KEY | 사원 ID |
| **emp_name** | VARCHAR(50) | NOT NULL | 사원명 |
| **dept_id** | INTEGER | FK | 부서 ID |
| **salary** | INTEGER | - | 급여 |
| **hire_date** | TEXT | - | 입사일 (YYYY-MM-DD) |
| **manager_id** | INTEGER | FK | 관리자 ID |
| **job_id** | INTEGER | FK | 직무 ID |

**데이터 예시**:
```
| emp_id | emp_name | dept_id | salary | hire_date  | manager_id | job_id |
|--------|----------|---------|--------|------------|------------|--------|
| 1      | Alice    | 10      | 75000  | 2020-01-15 | NULL       | 1      |
| 2      | Bob      | 10      | 55000  | 2020-02-20 | 1          | 4      |
| 3      | Charlie  | 20      | 70000  | 2019-06-10 | NULL       | 2      |
| 4      | Diana    | 20      | 45000  | 2021-03-15 | 3          | 3      |
| 5      | Eve      | 30      | 50000  | 2020-08-01 | NULL       | 1      |
| 6      | Frank    | 10      | 60000  | 2021-01-10 | 1          | 4      |
| 7      | Grace    | 20      | 48000  | 2021-05-20 | 3          | 3      |
| 8      | Henry    | 40      | 55000  | 2019-10-05 | NULL       | 1      |
| 9      | Ivy      | 50      | 52000  | 2020-12-01 | NULL       | 5      |
| 10     | Jack     | 30      | 42000  | 2022-01-15 | 5          | 5      |
```

---

#### 테이블 4: ORDERS (주문)

```sql
CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  emp_id INTEGER NOT NULL,
  order_date TEXT,
  amount DECIMAL(10, 2),
  status VARCHAR(20),
  FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
);
```

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|--------|------|
| **order_id** | INTEGER | PRIMARY KEY | 주문 ID |
| **emp_id** | INTEGER | FK | 담당 사원 ID |
| **order_date** | TEXT | - | 주문일 (YYYY-MM-DD) |
| **amount** | DECIMAL(10,2) | - | 주문금액 |
| **status** | VARCHAR(20) | - | 상태 (Pending, Completed, ...) |

**데이터 예시**:
```
| order_id | emp_id | order_date | amount    | status    |
|----------|--------|------------|-----------|-----------|
| 101      | 1      | 2026-01-05 | 10000.50  | Completed |
| 102      | 3      | 2026-01-10 | 25000.00  | Completed |
| 103      | 2      | 2026-01-15 | 15000.75  | Pending   |
| 104      | 4      | 2026-02-01 | 8000.00   | Completed |
| 105      | 5      | 2026-02-05 | 12000.00  | Completed |
| 106      | 6      | 2026-02-10 | 18000.50  | Pending   |
| 107      | 7      | 2026-02-15 | 22000.00  | Completed |
| 108      | 1      | 2026-02-20 | 30000.00  | Completed |
| 109      | 3      | 2026-02-25 | 16000.00  | Pending   |
| 110      | 8      | 2026-03-01 | 19000.50  | Completed |
| 111      | 2      | 2026-03-05 | 11000.00  | Pending   |
| 112      | 4      | 2026-03-10 | 24000.00  | Completed |
| 113      | 5      | 2026-03-15 | 17000.75  | Completed |
| 114      | 6      | 2026-03-20 | 9000.00   | Pending   |
| 115      | 7      | 2026-03-22 | 14000.50  | Completed |
```

---

### 1.3 제약조건 요약

| 제약조건 | 테이블 | 설명 |
|---------|--------|------|
| **PK: dept_id** | DEPARTMENTS | 부서 고유 식별 |
| **PK: emp_id** | EMPLOYEES | 사원 고유 식별 |
| **FK: dept_id** | EMPLOYEES | 부서 참조 무결성 |
| **FK: manager_id** | EMPLOYEES | 자기참조 (상사 정보) |
| **FK: job_id** | EMPLOYEES | 직무 참조 무결성 |
| **PK: order_id** | ORDERS | 주문 고유 식별 |
| **FK: emp_id** | ORDERS | 사원 참조 무결성 |

---

## JSON 데이터 구조

### 2.1 용어 사전 (glossary.json)

**파일 경로**: `public/data/glossary.json`

```json
{
  "version": "1.0",
  "lastUpdated": "2026-03-26",
  "totalTerms": 50,
  "categories": ["DDL", "DML", "TCL", "정규화", "그 외"],
  "terms": [
    {
      "id": "term-ddl-create",
      "name": "CREATE",
      "category": "DDL",
      "definition": "새로운 테이블, 뷰, 인덱스 등 객체를 생성하는 명령어",
      "description": "데이터베이스 객체의 구조를 정의합니다.",
      "usage": "데이터베이스 스키마 정의, 테이블 구조 설계",
      "example": "CREATE TABLE employees (emp_id INT PRIMARY KEY, emp_name VARCHAR(50))",
      "relatedTerms": ["DDL", "ALTER", "DROP"],
      "sqldFrequency": "매우 높음",
      "notes": "모든 CREATE 명령어는 DDL입니다."
    },
    {
      "id": "term-dml-select",
      "name": "SELECT",
      "category": "DML",
      "definition": "테이블에서 데이터를 조회하는 명령어",
      "description": "조건에 맞는 행과 열을 선택하여 반환합니다.",
      "usage": "데이터 조회, 분석, 리포팅",
      "example": "SELECT emp_id, emp_name, salary FROM employees WHERE salary > 50000",
      "relatedTerms": ["DML", "WHERE", "JOIN", "GROUP BY"],
      "sqldFrequency": "매우 높음",
      "notes": "가장 자주 사용되는 명령어입니다."
    },
    {
      "id": "term-join-inner",
      "name": "INNER JOIN",
      "category": "그 외",
      "definition": "두 테이블의 공통된 행만 반환하는 조인",
      "description": "ON 조건에서 일치하는 행만 결과로 반환합니다.",
      "usage": "여러 테이블의 정보를 조합할 때 사용",
      "example": "SELECT e.emp_name, d.dept_name FROM employees e INNER JOIN departments d ON e.dept_id = d.dept_id",
      "relatedTerms": ["JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
      "sqldFrequency": "매우 높음",
      "notes": "기본 JOIN이므로 JOIN만 써도 INNER JOIN입니다."
    },
    {
      "id": "term-aggregation-groupby",
      "name": "GROUP BY",
      "category": "그 외",
      "definition": "같은 값을 가진 행들을 그룹으로 묶는 명령어",
      "description": "집계 함수와 함께 사용하여 그룹별 통계를 계산합니다.",
      "usage": "부서별 평균 급여, 월별 판매액 등 집계 분석",
      "example": "SELECT dept_id, COUNT(*) as cnt, AVG(salary) as avg_salary FROM employees GROUP BY dept_id",
      "relatedTerms": ["HAVING", "COUNT", "SUM", "AVG"],
      "sqldFrequency": "높음",
      "notes": "GROUP BY 없으면 단순 SUM, COUNT는 전체 행 대상입니다."
    }
  ]
}
```

---

### 2.2 개념 설명 (concepts.json)

**파일 경로**: `public/data/concepts.json`

```json
{
  "version": "1.0",
  "lastUpdated": "2026-03-26",
  "totalConcepts": 20,
  "concepts": [
    {
      "id": "concept-inner-join",
      "name": "INNER JOIN",
      "shortDescription": "두 테이블의 공통 행만 반환",
      "fullDescription": "INNER JOIN은 두 테이블에서 ON 조건을 만족하는 행들만 결과로 반환합니다. 한쪽 테이블에만 있는 행은 제외됩니다.",
      "svgDiagram": "<svg width='300' height='200'><!-- 벤 다이어그램 SVG --></svg>",
      "sqlExample": "SELECT e.emp_name, d.dept_name\nFROM employees e\nINNER JOIN departments d\nON e.dept_id = d.dept_id",
      "useCases": [
        "사원과 부서 정보 함께 조회",
        "주문과 고객 정보 결합",
        "학생과 수강 과목 조회"
      ],
      "relatedConcepts": ["LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "JOIN"],
      "difficulty": "중급",
      "sequenceOrder": 1,
      "notes": "가장 기본적이고 자주 사용되는 JOIN입니다."
    },
    {
      "id": "concept-left-join",
      "name": "LEFT JOIN (LEFT OUTER JOIN)",
      "shortDescription": "왼쪽 테이블의 모든 행과 오른쪽 테이블의 일치 행",
      "fullDescription": "LEFT JOIN은 왼쪽 테이블의 모든 행을 반환하고, 오른쪽 테이블에서 일치하는 행을 추가합니다. 오른쪽에 일치하는 행이 없으면 NULL로 채웁니다.",
      "svgDiagram": "<svg width='300' height='200'><!-- 벤 다이어그램 SVG --></svg>",
      "sqlExample": "SELECT e.emp_name, d.dept_name\nFROM employees e\nLEFT JOIN departments d\nON e.dept_id = d.dept_id",
      "useCases": [
        "모든 사원을 표시하되 부서 정보가 있으면 추가",
        "구매 이력이 없는 고객도 포함 조회"
      ],
      "relatedConcepts": ["INNER JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
      "difficulty": "중급",
      "sequenceOrder": 2
    },
    {
      "id": "concept-group-by",
      "name": "GROUP BY",
      "shortDescription": "같은 값을 가진 행들을 그룹으로 묶기",
      "fullDescription": "GROUP BY는 지정된 컬럼 값이 같은 행들을 하나의 그룹으로 묶습니다. COUNT, SUM, AVG 등 집계 함수와 함께 사용합니다.",
      "svgDiagram": "<svg width='300' height='200'><!-- GROUP BY 시각화 SVG --></svg>",
      "sqlExample": "SELECT dept_id, COUNT(*) as emp_count, AVG(salary) as avg_salary\nFROM employees\nGROUP BY dept_id",
      "useCases": [
        "부서별 사원 수 계산",
        "월별 판매액 합계",
        "카테고리별 상품 개수"
      ],
      "relatedConcepts": ["HAVING", "집계함수", "ORDER BY"],
      "difficulty": "중급",
      "sequenceOrder": 3,
      "notes": "GROUP BY에 있는 컬럼이 아닌 것은 SELECT할 때 집계 함수를 사용해야 합니다."
    }
  ]
}
```

---

### 2.3 샘플 SQL (sample-sqls.json)

**파일 경로**: `public/data/sample-sqls.json`

```json
{
  "version": "1.0",
  "lastUpdated": "2026-03-26",
  "categories": {
    "SELECT": [
      {
        "id": "sql-select-1",
        "title": "전체 사원 조회",
        "description": "EMPLOYEES 테이블의 모든 행과 컬럼 조회",
        "difficulty": "초급",
        "sql": "SELECT * FROM employees"
      },
      {
        "id": "sql-select-2",
        "title": "특정 컬럼만 조회",
        "description": "사원명과 급여만 조회",
        "difficulty": "초급",
        "sql": "SELECT emp_name, salary FROM employees"
      }
    ],
    "WHERE": [
      {
        "id": "sql-where-1",
        "title": "급여 조건 필터링",
        "description": "급여가 50000 이상인 사원 조회",
        "difficulty": "초급",
        "sql": "SELECT emp_name, salary FROM employees WHERE salary >= 50000"
      }
    ],
    "JOIN": [
      {
        "id": "sql-join-1",
        "title": "부서 정보와 함께 사원 조회",
        "description": "INNER JOIN으로 사원과 부서 정보 결합",
        "difficulty": "중급",
        "sql": "SELECT e.emp_name, d.dept_name, e.salary FROM employees e INNER JOIN departments d ON e.dept_id = d.dept_id"
      },
      {
        "id": "sql-join-2",
        "title": "LEFT JOIN 예제",
        "description": "모든 부서와 해당 사원 수 조회",
        "difficulty": "중급",
        "sql": "SELECT d.dept_name, COUNT(e.emp_id) as emp_count FROM departments d LEFT JOIN employees e ON d.dept_id = e.dept_id GROUP BY d.dept_id, d.dept_name"
      }
    ],
    "GROUP_BY": [
      {
        "id": "sql-groupby-1",
        "title": "부서별 평균 급여",
        "description": "각 부서의 평균 급여 계산",
        "difficulty": "중급",
        "sql": "SELECT dept_id, AVG(salary) as avg_salary FROM employees GROUP BY dept_id"
      },
      {
        "id": "sql-groupby-2",
        "title": "부서별 사원 수 및 평균 급여",
        "description": "부서별로 사원 수와 평균 급여 동시 조회",
        "difficulty": "중급",
        "sql": "SELECT dept_id, COUNT(*) as emp_count, AVG(salary) as avg_salary, MAX(salary) as max_salary FROM employees GROUP BY dept_id ORDER BY avg_salary DESC"
      }
    ],
    "SUBQUERY": [
      {
        "id": "sql-subquery-1",
        "title": "평균 급여보다 높은 사원",
        "description": "전체 평균 급여보다 높은 사원 조회",
        "difficulty": "고급",
        "sql": "SELECT emp_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)"
      }
    ]
  }
}
```

---

## sql.js 초기화 전략

### 3.1 초기화 코드 (lib/sql/engine.ts)

```typescript
// lib/sql/engine.ts
import initSqlJs, { Database } from 'sql.js'

let db: Database | null = null
let isInitialized = false

/**
 * sql.js 데이터베이스 초기화
 * - 웹 워커로 WASM 로드
 * - 테이블 생성
 * - 샘플 데이터 삽입
 */
export async function initializeDatabase(): Promise<Database> {
  if (isInitialized && db) {
    return db
  }

  try {
    const SQL = await initSqlJs()
    db = new SQL.Database()

    // 테이블 생성 (CREATE TABLE)
    await createTables(db)

    // 샘플 데이터 삽입
    await loadSampleData(db)

    isInitialized = true
    console.log('[SQL] Database initialized successfully')

    return db
  } catch (error) {
    console.error('[SQL] Initialization failed:', error)
    throw error
  }
}

/**
 * 테이블 생성
 */
async function createTables(database: Database) {
  // DEPARTMENTS 테이블
  database.run(`
    CREATE TABLE IF NOT EXISTS departments (
      dept_id INTEGER PRIMARY KEY,
      dept_name VARCHAR(50) NOT NULL,
      location VARCHAR(50),
      budget DECIMAL(10, 2)
    )
  `)

  // JOBS 테이블
  database.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      job_id INTEGER PRIMARY KEY,
      job_title VARCHAR(50) NOT NULL,
      min_salary INTEGER,
      max_salary INTEGER
    )
  `)

  // EMPLOYEES 테이블
  database.run(`
    CREATE TABLE IF NOT EXISTS employees (
      emp_id INTEGER PRIMARY KEY,
      emp_name VARCHAR(50) NOT NULL,
      dept_id INTEGER NOT NULL,
      salary INTEGER,
      hire_date TEXT,
      manager_id INTEGER,
      job_id INTEGER,
      FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
      FOREIGN KEY (job_id) REFERENCES jobs(job_id),
      FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
    )
  `)

  // ORDERS 테이블
  database.run(`
    CREATE TABLE IF NOT EXISTS orders (
      order_id INTEGER PRIMARY KEY,
      emp_id INTEGER NOT NULL,
      order_date TEXT,
      amount DECIMAL(10, 2),
      status VARCHAR(20),
      FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
    )
  `)

  console.log('[SQL] Tables created')
}

/**
 * 샘플 데이터 삽입
 */
async function loadSampleData(database: Database) {
  // DEPARTMENTS 데이터
  database.run(`
    INSERT INTO departments VALUES
    (10, 'Sales', 'Seoul', 5000000.00),
    (20, 'Engineering', 'Seoul', 8000000.00),
    (30, 'HR', 'Busan', 2000000.00),
    (40, 'Finance', 'Seoul', 3000000.00),
    (50, 'Marketing', 'Busan', 2500000.00)
  `)

  // JOBS 데이터
  database.run(`
    INSERT INTO jobs VALUES
    (1, 'Manager', 50000, 80000),
    (2, 'Senior Dev', 60000, 90000),
    (3, 'Junior Dev', 30000, 50000),
    (4, 'Analyst', 40000, 60000),
    (5, 'Coordinator', 25000, 40000)
  `)

  // EMPLOYEES 데이터
  database.run(`
    INSERT INTO employees VALUES
    (1, 'Alice', 10, 75000, '2020-01-15', NULL, 1),
    (2, 'Bob', 10, 55000, '2020-02-20', 1, 4),
    (3, 'Charlie', 20, 70000, '2019-06-10', NULL, 2),
    (4, 'Diana', 20, 45000, '2021-03-15', 3, 3),
    (5, 'Eve', 30, 50000, '2020-08-01', NULL, 1),
    (6, 'Frank', 10, 60000, '2021-01-10', 1, 4),
    (7, 'Grace', 20, 48000, '2021-05-20', 3, 3),
    (8, 'Henry', 40, 55000, '2019-10-05', NULL, 1),
    (9, 'Ivy', 50, 52000, '2020-12-01', NULL, 5),
    (10, 'Jack', 30, 42000, '2022-01-15', 5, 5)
  `)

  // ORDERS 데이터
  database.run(`
    INSERT INTO orders VALUES
    (101, 1, '2026-01-05', 10000.50, 'Completed'),
    (102, 3, '2026-01-10', 25000.00, 'Completed'),
    (103, 2, '2026-01-15', 15000.75, 'Pending'),
    (104, 4, '2026-02-01', 8000.00, 'Completed'),
    (105, 5, '2026-02-05', 12000.00, 'Completed'),
    (106, 6, '2026-02-10', 18000.50, 'Pending'),
    (107, 7, '2026-02-15', 22000.00, 'Completed'),
    (108, 1, '2026-02-20', 30000.00, 'Completed'),
    (109, 3, '2026-02-25', 16000.00, 'Pending'),
    (110, 8, '2026-03-01', 19000.50, 'Completed'),
    (111, 2, '2026-03-05', 11000.00, 'Pending'),
    (112, 4, '2026-03-10', 24000.00, 'Completed'),
    (113, 5, '2026-03-15', 17000.75, 'Completed'),
    (114, 6, '2026-03-20', 9000.00, 'Pending'),
    (115, 7, '2026-03-22', 14000.50, 'Completed')
  `)

  console.log('[SQL] Sample data loaded')
}

/**
 * 쿼리 실행
 */
export function executeQuery(
  sql: string,
  params: any[] = []
): { success: boolean; data?: any[]; error?: string } {
  if (!db || !isInitialized) {
    return { success: false, error: 'Database not initialized' }
  }

  try {
    const stmt = db.prepare(sql)

    // 매개변수 바인딩 (필요시)
    if (params.length > 0) {
      stmt.bind(params)
    }

    const results: any[] = []

    // 결과 행 추출
    while (stmt.step()) {
      results.push(stmt.getAsObject())
    }

    stmt.free()

    return { success: true, data: results }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'

    return {
      success: false,
      error: errorMessage
    }
  }
}

/**
 * 데이터베이스 정보 조회
 */
export function getDatabaseInfo(): {
  initialized: boolean
  tableNames: string[]
} {
  if (!db) {
    return { initialized: false, tableNames: [] }
  }

  const result = db.exec(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
  )

  const tableNames: string[] = []
  if (result.length > 0) {
    result[0].values.forEach((row) => {
      if (row[0]) tableNames.push(row[0] as string)
    })
  }

  return { initialized: true, tableNames }
}

/**
 * 데이터베이스 리셋
 */
export function resetDatabase() {
  if (db) {
    db.close()
  }
  db = null
  isInitialized = false
}
```

---

### 3.2 사용 예제 (React Component)

```typescript
// app/playground/page.tsx
import { useEffect, useState } from 'react'
import { initializeDatabase, executeQuery } from '@/lib/sql/engine'

export default function PlaygroundPage() {
  const [sql, setSql] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // 초기화
  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase()
        setLoading(false)
      } catch (err) {
        setError('Database initialization failed')
        setLoading(false)
      }
    }

    init()
  }, [])

  // 쿼리 실행
  const handleExecute = () => {
    if (!sql.trim()) {
      setError('SQL을 입력해주세요')
      return
    }

    const result = executeQuery(sql)

    if (result.success) {
      setResults(result.data || [])
      setError(null)
    } else {
      setError(result.error || 'Query execution failed')
      setResults([])
    }
  }

  if (loading) {
    return <div>Loading database...</div>
  }

  return (
    <div>
      <textarea
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        placeholder="Enter SQL query..."
      />
      <button onClick={handleExecute}>Execute</button>

      {error && <div className="error">{error}</div>}

      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(results[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((val, idx) => (
                  <td key={idx}>{String(val)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
```

---

## 데이터 리셋 메커니즘

### 4.1 리셋 시나리오

#### 시나리오 1: 페이지 새로고침

```typescript
// 페이지 언마운트 시 자동 리셋
useEffect(() => {
  return () => {
    resetDatabase()  // 페이지 나갈 때 메모리 정리
  }
}, [])
```

#### 시나리오 2: 사용자 요청 (리셋 버튼)

```typescript
const handleResetData = async () => {
  resetDatabase()
  await initializeDatabase()
  setResults([])
  setSql('')
  showToast('Data reset successfully')
}
```

#### 시나리오 3: 자동 리셋 (타임아웃)

```typescript
// 30분 이상 활동 없으면 자동 리셋 (향후)
const resetTimeout = setTimeout(() => {
  resetDatabase()
  showToast('Session expired. Please refresh.')
}, 30 * 60 * 1000)
```

### 4.2 LocalStorage 관리

#### 쿼리 히스토리 저장

```typescript
export function saveQueryToHistory(sql: string, resultCount: number) {
  const history: QueryHistory[] = JSON.parse(
    localStorage.getItem('query-history') || '[]'
  )

  const newEntry: QueryHistory = {
    id: Date.now().toString(),
    sql,
    timestamp: Date.now(),
    resultCount,
  }

  history.unshift(newEntry)  // 최신순 정렬

  // 최대 20개까지만 저장
  if (history.length > 20) {
    history.pop()
  }

  localStorage.setItem('query-history', JSON.stringify(history))
}

export function getQueryHistory(): QueryHistory[] {
  return JSON.parse(localStorage.getItem('query-history') || '[]')
}

export function clearQueryHistory() {
  localStorage.removeItem('query-history')
}
```

#### 사용자 설정 저장

```typescript
export function saveUserPreferences(prefs: UserPreferences) {
  localStorage.setItem('user-preferences', JSON.stringify(prefs))
}

export function getUserPreferences(): UserPreferences {
  return JSON.parse(
    localStorage.getItem('user-preferences') || '{}'
  )
}
```

---

## 샘플 데이터 시드

### 5.1 시드 데이터 특징

| 특징 | 설명 | 이점 |
|------|------|------|
| **SQLD 준거성** | 공식 교재 예제와 동일 스키마 | 학생이 바로 적용 가능 |
| **현실성** | 실제 회사 조직 구조 반영 | 맥락 있는 학습 |
| **복잡도 조절** | 4개 테이블, 다양한 관계 | 초급~중급 학습 대상 |
| **충분한 데이터** | 각 테이블 10-15행 | JOIN, GROUP BY 학습에 충분 |
| **FK 관계** | 적절한 외래키 설정 | 조인 연습에 최적 |

### 5.2 데이터 크기 현황

| 테이블 | 행 수 | 용도 |
|--------|------|------|
| DEPARTMENTS | 5 | 부서별 조회, GROUP BY 학습 |
| JOBS | 5 | 직무별 급여 범위 학습 |
| EMPLOYEES | 10 | 주 학습 테이블, JOIN 연습 |
| ORDERS | 15 | 다중 테이블 조인, 집계 연습 |
| **합계** | **35행** | - |

---

### 5.3 데이터 일관성 보증

```typescript
/**
 * 초기화 검증
 */
export function validateDatabase(): boolean {
  if (!db || !isInitialized) return false

  try {
    // 테이블 수 확인
    const tables = db.exec("SELECT COUNT(*) FROM sqlite_master WHERE type='table'")
    if (!tables[0] || tables[0].values[0][0] !== 4) {
      console.error('Table count mismatch')
      return false
    }

    // 행 수 확인
    const empCount = db.exec("SELECT COUNT(*) FROM employees")[0]?.values[0]?.[0]
    if (empCount !== 10) {
      console.error('Employee data mismatch')
      return false
    }

    console.log('[SQL] Database validation passed')
    return true
  } catch (error) {
    console.error('[SQL] Validation failed:', error)
    return false
  }
}
```

---

**최종 검토자**: 데이터베이스 아키텍트
**최종 검토일**: 2026-03-26
**다음 문서**: [05-design-system.md](05-design-system.md)
