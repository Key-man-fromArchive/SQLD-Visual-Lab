// @TASK P1-R1-T1 - sql.js 엔진 래퍼 테스트
// @SPEC docs/planning/sqld-visual-lab-spec.md
// @TEST lib/sql-engine.test.ts

import { describe, it, expect, beforeEach } from 'vitest'
import { initDatabase, executeQuery, resetDatabase, getDatabase } from './sql-engine'

describe('sql-engine', () => {
  beforeEach(async () => {
    // 각 테스트 전 DB 초기화
    resetDatabase()
    await initDatabase()
  })

  describe('initDatabase', () => {
    it('DB 초기화에 성공한다', async () => {
      const db = getDatabase()
      expect(db).not.toBeNull()
    })

    it('initSQL을 전달하면 초기 SQL이 실행된다', async () => {
      resetDatabase()
      await initDatabase(
        'CREATE TABLE test_init (id INTEGER PRIMARY KEY, name TEXT); INSERT INTO test_init VALUES (1, "hello");'
      )
      const result = executeQuery('SELECT * FROM test_init')
      expect(result.error).toBeNull()
      expect(result.rows).toHaveLength(1)
      expect(result.rows[0]).toEqual([1, 'hello'])
    })
  })

  describe('executeQuery', () => {
    it('CREATE TABLE + INSERT가 성공한다', () => {
      const createResult = executeQuery(
        'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)'
      )
      expect(createResult.error).toBeNull()

      const insertResult = executeQuery(
        "INSERT INTO users VALUES (1, '홍길동', 25)"
      )
      expect(insertResult.error).toBeNull()
    })

    it('SELECT 쿼리 결과를 올바르게 반환한다', () => {
      executeQuery('CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER)')
      executeQuery("INSERT INTO products VALUES (1, '노트북', 1500000)")
      executeQuery("INSERT INTO products VALUES (2, '마우스', 35000)")

      const result = executeQuery('SELECT * FROM products ORDER BY id')
      expect(result.error).toBeNull()
      expect(result.columns).toEqual(['id', 'name', 'price'])
      expect(result.rows).toHaveLength(2)
      expect(result.rows[0]).toEqual([1, '노트북', 1500000])
      expect(result.rows[1]).toEqual([2, '마우스', 35000])
      expect(result.rowCount).toBe(2)
    })

    it('잘못된 SQL에서 에러를 반환한다', () => {
      const result = executeQuery('SELEC * FORM users')
      expect(result.error).not.toBeNull()
      expect(result.error).toContain('오류')
      expect(result.columns).toEqual([])
      expect(result.rows).toEqual([])
    })

    it('executionTime이 0 이상이다', () => {
      executeQuery('CREATE TABLE timing_test (id INTEGER)')
      const result = executeQuery('SELECT 1')
      expect(result.executionTime).toBeGreaterThanOrEqual(0)
    })

    it('존재하지 않는 테이블 조회 시 에러를 반환한다', () => {
      const result = executeQuery('SELECT * FROM nonexistent_table')
      expect(result.error).not.toBeNull()
      expect(result.error).toContain('오류')
    })
  })

  describe('resetDatabase', () => {
    it('resetDatabase 후 이전 테이블이 없어진다', async () => {
      executeQuery('CREATE TABLE temp_table (id INTEGER)')
      executeQuery("INSERT INTO temp_table VALUES (1)")

      // 리셋
      resetDatabase()
      await initDatabase()

      // 이전 테이블이 없어야 함
      const result = executeQuery('SELECT * FROM temp_table')
      expect(result.error).not.toBeNull()
    })
  })

  describe('getDatabase', () => {
    it('초기화 전 null을 반환한다', () => {
      resetDatabase()
      const db = getDatabase()
      expect(db).toBeNull()
    })

    it('초기화 후 Database 인스턴스를 반환한다', async () => {
      const db = getDatabase()
      expect(db).not.toBeNull()
    })
  })

  describe('에러 메시지 한국어 변환', () => {
    it('구문 오류 메시지를 한국어로 변환한다', () => {
      const result = executeQuery('SELECT * FORM users')
      expect(result.error).toContain('구문 오류')
    })

    it('테이블 없음 오류 메시지를 한국어로 변환한다', () => {
      const result = executeQuery('SELECT * FROM missing_table')
      expect(result.error).toContain('테이블')
    })
  })
})
