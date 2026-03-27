// @TASK P1-R1-T1 - sql.js WASM 기반 SQL 실행 엔진
// @SPEC docs/planning/sqld-visual-lab-spec.md

// sql.js는 동적 import로 로드 (SSR 방지, WASM 호환)
type Database = import('sql.js').Database

let db: Database | null = null

/**
 * SQL 에러 메시지를 한국어로 변환한다.
 * 주요 패턴을 매칭하여 사용자 친화적 메시지를 반환한다.
 */
function translateErrorMessage(message: string): string {
  // 구문 오류: near "FORM": syntax error
  const syntaxMatch = message.match(/near "([^"]+)":\s*syntax error/i)
  if (syntaxMatch) {
    return `SQL 구문 오류: '${syntaxMatch[1]}' 근처에서 오류가 발생했습니다. 올바른 SQL 키워드인지 확인해주세요.`
  }

  // 테이블 없음: no such table: xxx
  const tableMatch = message.match(/no such table:\s*(\S+)/i)
  if (tableMatch) {
    return `테이블 오류: '${tableMatch[1]}' 테이블이 존재하지 않습니다. 테이블 이름을 확인해주세요.`
  }

  // 컬럼 없음: no such column: xxx
  const columnMatch = message.match(/no such column:\s*(\S+)/i)
  if (columnMatch) {
    return `컬럼 오류: '${columnMatch[1]}' 컬럼이 존재하지 않습니다. 컬럼 이름을 확인해주세요.`
  }

  // 중복 테이블: table xxx already exists
  const duplicateTableMatch = message.match(/table (\S+) already exists/i)
  if (duplicateTableMatch) {
    return `테이블 오류: '${duplicateTableMatch[1]}' 테이블이 이미 존재합니다.`
  }

  // UNIQUE 제약 위반: UNIQUE constraint failed: xxx.yyy
  const uniqueMatch = message.match(/UNIQUE constraint failed:\s*(\S+)/i)
  if (uniqueMatch) {
    return `제약조건 오류: '${uniqueMatch[1]}'에 중복된 값이 있습니다. UNIQUE 제약조건을 확인해주세요.`
  }

  // NOT NULL 제약 위반: NOT NULL constraint failed: xxx.yyy
  const notNullMatch = message.match(/NOT NULL constraint failed:\s*(\S+)/i)
  if (notNullMatch) {
    return `제약조건 오류: '${notNullMatch[1]}'에 NULL 값을 입력할 수 없습니다.`
  }

  // 기타 에러
  return `SQL 오류: ${message}`
}

/**
 * sql.js 데이터베이스를 초기화한다.
 * 브라우저에서는 /sql-wasm.wasm을 로드하고,
 * Node.js(테스트)에서는 node_modules 경로를 사용한다.
 * @param initSQL 초기 실행할 SQL (CREATE TABLE, INSERT 등)
 */
export async function initDatabase(initSQL?: string): Promise<void> {
  try {
    // 동적 import로 sql.js 로드 (SSR 방지)
    const initSqlJs = (await import('sql.js')).default

    const isNode = typeof window === 'undefined'
    let locateFile: (file: string) => string

    if (isNode) {
      // Node.js 환경 (테스트)
      const path = require('path')
      locateFile = (file: string) =>
        path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', file)
    } else {
      // 브라우저 환경: CDN에서 WASM 로드 (Vercel 호환)
      locateFile = () =>
        'https://cdn.jsdelivr.net/npm/sql.js@1.14.1/dist/sql-wasm.wasm'
    }

    const SQL = await initSqlJs({ locateFile })
    db = new SQL.Database()

    if (initSQL) {
      db.run(initSQL)
    }
  } catch (err) {
    console.error('sql.js 초기화 실패:', err)
    throw err
  }
}

/**
 * SQL 쿼리를 실행하고 결과를 반환한다.
 * DB가 초기화되지 않은 경우 에러를 반환한다.
 */
export function executeQuery(sql: string): {
  columns: string[]
  rows: any[][]
  rowCount: number
  executionTime: number
  error: string | null
} {
  if (!db) {
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      executionTime: 0,
      error: 'SQL 오류: 데이터베이스가 초기화되지 않았습니다. initDatabase()를 먼저 호출해주세요.',
    }
  }

  const startTime = performance.now()

  try {
    const results = db.exec(sql)
    const endTime = performance.now()
    const executionTime = endTime - startTime

    if (results.length === 0) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        executionTime,
        error: null,
      }
    }

    // 마지막 결과 세트를 반환 (여러 문장 실행 시)
    const lastResult = results[results.length - 1]
    return {
      columns: lastResult.columns,
      rows: lastResult.values,
      rowCount: lastResult.values.length,
      executionTime,
      error: null,
    }
  } catch (err: unknown) {
    const endTime = performance.now()
    const executionTime = endTime - startTime
    const rawMessage = err instanceof Error ? err.message : String(err)

    return {
      columns: [],
      rows: [],
      rowCount: 0,
      executionTime,
      error: translateErrorMessage(rawMessage),
    }
  }
}

/**
 * 데이터베이스를 초기화한다 (메모리 해제 + null 설정).
 * 재사용하려면 initDatabase()를 다시 호출해야 한다.
 */
export function resetDatabase(): void {
  if (db) {
    db.close()
    db = null
  }
}

/**
 * 현재 Database 인스턴스를 반환한다.
 */
export function getDatabase(): Database | null {
  return db
}
