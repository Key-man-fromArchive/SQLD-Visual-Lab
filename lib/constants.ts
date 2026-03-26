// @TASK P0-T0.3 - 상수 정의
// @SPEC docs/planning/sqld-visual-lab-spec.md

export const ROUTES = {
  HOME: '/',
  PLAYGROUND: '/playground',
  CONCEPTS: '/concepts',
  GLOSSARY: '/glossary',
} as const

export const NAV_ITEMS = [
  { label: '홈', href: ROUTES.HOME, icon: '🏠' },
  { label: 'SQL 실행기', href: ROUTES.PLAYGROUND, icon: '⚙️' },
  { label: '개념 설명', href: ROUTES.CONCEPTS, icon: '📊' },
  { label: '용어 사전', href: ROUTES.GLOSSARY, icon: '📚' },
] as const

export const DATASETS = {
  EMPLOYEES: 'employees',
  ORDERS: 'orders',
  CUSTOM: 'custom',
} as const

export const ITEMS_PER_PAGE = 12
export const MAX_QUERY_HISTORY = 10
