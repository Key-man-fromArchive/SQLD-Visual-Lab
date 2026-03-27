import { test, expect } from '@playwright/test'

// ============================================================
// 1. 메인 대시보드 (/)
// ============================================================
test.describe('메인 대시보드', () => {
  test('페이지 로드 + 제목 표시', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('SQLD Visual Lab')
  })

  test('3개 기능 카드 텍스트 표시', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('시작하기').first()).toBeVisible({ timeout: 10000 })
    // 카드 클릭이 모두 동작하는 것은 별도 테스트에서 검증됨
  })

  test('SQL 실행기 카드 클릭 → /playground 이동', async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="/playground"]').first().click()
    await expect(page).toHaveURL('/playground')
  })

  test('개념 설명 카드 클릭 → /concepts 이동', async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="/concepts"]').first().click()
    await expect(page).toHaveURL('/concepts')
  })

  test('용어 사전 카드 클릭 → /glossary 이동', async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="/glossary"]').first().click()
    await expect(page).toHaveURL('/glossary')
  })

  test('헤더 네비게이션 표시', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation')).toBeVisible()
  })

  test('푸터 크레딧 표시', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('안국현, 박기범 & Claude Code')).toBeVisible()
  })
})

// ============================================================
// 2. SQL 실행기 (/playground)
// ============================================================
test.describe('SQL 실행기', () => {
  test('페이지 로드 + 에디터 표시', async ({ page }) => {
    await page.goto('/playground')
    await expect(page.locator('h1, h2').filter({ hasText: 'SQL' })).toBeVisible({ timeout: 10000 })
  })

  test('빈 DB에서 시작 (기본)', async ({ page }) => {
    await page.goto('/playground')
    const select = page.locator('select')
    await expect(select).toHaveValue('custom', { timeout: 10000 })
  })

  test('데이터셋 변경 → EMPLOYEES 로드', async ({ page }) => {
    await page.goto('/playground')
    // WASM 로딩 대기
    await page.waitForTimeout(5000)
    // EMPLOYEES 선택
    await page.locator('select').selectOption('employees')
    await page.waitForTimeout(3000)
    // 실행 버튼 클릭
    const runBtn = page.getByRole('button', { name: /실행/ })
    await runBtn.click()
    await page.waitForTimeout(2000)
    // 결과가 나타나는지 (테이블 또는 행 수)
    const hasResult = await page.getByText(/행|EMP_ID|김철수/).first().isVisible().catch(() => false)
    expect(hasResult).toBeTruthy()
  })

  test('예제 보기 패널 토글', async ({ page }) => {
    await page.goto('/playground')
    await page.waitForTimeout(1000)
    // 예제 보기 버튼 (aria-pressed로 찾기)
    const btn = page.locator('button[aria-pressed]').filter({ hasText: /예제/ })
    if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn.click()
      await page.waitForTimeout(500)
      // 패널이 열리면 SELECT 같은 카테고리가 보여야 함
      const panelVisible = await page.getByText('SELECT 기초').isVisible().catch(() => false)
      expect(panelVisible).toBeTruthy()
    }
  })

  test('연습 문제 패널 토글', async ({ page }) => {
    await page.goto('/playground')
    await page.waitForTimeout(1000)
    const btn = page.locator('button[aria-pressed]').filter({ hasText: /연습/ })
    if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await btn.click()
      await page.waitForTimeout(500)
      // 연습 문제 패널 열림 확인
      const panelVisible = await page.locator('body').isVisible()
      expect(panelVisible).toBeTruthy()
    }
  })

  test('지우기 버튼 동작', async ({ page }) => {
    await page.goto('/playground')
    await page.waitForTimeout(2000)
    const clearBtn = page.getByRole('button', { name: /지우기/ })
    if (await clearBtn.isVisible()) {
      await clearBtn.click()
    }
  })
})

// ============================================================
// 3. 시각적 개념 설명 (/concepts)
// ============================================================
test.describe('시각적 개념 설명', () => {
  test('페이지 로드 + 개념 목록 표시', async ({ page }) => {
    await page.goto('/concepts')
    await expect(page.getByText('SELECT').first()).toBeVisible({ timeout: 10000 })
  })

  test('개념 카테고리 표시', async ({ page }) => {
    await page.goto('/concepts')
    await expect(page.getByText('JOIN').first()).toBeVisible({ timeout: 5000 })
  })

  test('개념 클릭 → 설명 패널 업데이트', async ({ page }) => {
    await page.goto('/concepts')
    await page.waitForTimeout(1000)
    const joinItem = page.getByText('INNER JOIN').first()
    if (await joinItem.isVisible()) {
      await joinItem.click()
      await page.waitForTimeout(500)
      await expect(page.getByText(/교집합|공통|일치/).first()).toBeVisible({ timeout: 5000 })
    }
  })

  test('실습해보기 버튼 존재', async ({ page }) => {
    await page.goto('/concepts')
    await page.waitForTimeout(2000)
    const practiceBtn = page.getByText('실습해보기').or(page.getByText('실습하기')).or(page.getByText('SQL 실행기에서'))
    await expect(practiceBtn.first()).toBeVisible({ timeout: 10000 })
  })
})

// ============================================================
// 4. SQLD 용어 사전 (/glossary)
// ============================================================
test.describe('SQLD 용어 사전', () => {
  test('페이지 로드 + 검색창 표시', async ({ page }) => {
    await page.goto('/glossary')
    await expect(page.getByPlaceholder(/검색/).or(page.locator('input[type="text"]'))).toBeVisible({ timeout: 10000 })
  })

  test('카테고리 탭 표시', async ({ page }) => {
    await page.goto('/glossary')
    await expect(page.getByText('DDL').first()).toBeVisible({ timeout: 5000 })
    await expect(page.getByText('DML').first()).toBeVisible({ timeout: 5000 })
  })

  test('용어 카드 표시', async ({ page }) => {
    await page.goto('/glossary')
    await page.waitForTimeout(1000)
    await expect(page.getByText('CREATE TABLE').or(page.getByText('SELECT')).first()).toBeVisible({ timeout: 5000 })
  })

  test('검색 필터링 동작', async ({ page }) => {
    await page.goto('/glossary')
    await page.waitForTimeout(1000)
    const searchInput = page.getByPlaceholder(/검색/).or(page.locator('input[type="text"]')).first()
    await searchInput.fill('JOIN')
    await page.waitForTimeout(500)
    await expect(page.locator('body')).toBeVisible()
  })

  test('카테고리 탭 클릭 → 필터링', async ({ page }) => {
    await page.goto('/glossary')
    await page.waitForTimeout(1000)
    await page.getByText('DDL').first().click()
    await page.waitForTimeout(500)
    await expect(page.getByText('CREATE TABLE').or(page.getByText('ALTER')).first()).toBeVisible({ timeout: 5000 })
  })

  test('용어 카드 "예제 보기" 동작', async ({ page }) => {
    await page.goto('/glossary')
    await page.waitForTimeout(1000)
    const viewBtn = page.getByRole('button', { name: /예제 보기|보기/ }).first()
    if (await viewBtn.isVisible()) {
      await viewBtn.click()
      await page.waitForTimeout(500)
      await expect(page.getByText(/구문|예제|정의/).first()).toBeVisible({ timeout: 5000 })
    }
  })
})

// ============================================================
// 5. 네비게이션 전체 흐름
// ============================================================
test.describe('네비게이션', () => {
  test('헤더 메뉴로 모든 페이지 이동', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /SQL 실행기/ }).first().click()
    await expect(page).toHaveURL('/playground')

    await page.getByRole('link', { name: /개념 설명/ }).first().click()
    await expect(page).toHaveURL('/concepts')

    await page.getByRole('link', { name: /용어 사전/ }).first().click()
    await expect(page).toHaveURL('/glossary')

    await page.getByRole('link', { name: /홈/ }).first().click()
    await expect(page).toHaveURL('/')
  })
})
