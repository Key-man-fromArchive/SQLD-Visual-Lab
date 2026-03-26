'use client'

// @TASK P2-S1-T2 - 빈 결과 상태 안내
// @SPEC docs/planning/sqld-visual-lab-spec.md

interface EmptyStateProps {
  type?: 'initial' | 'empty-result'
}

export default function EmptyState({ type = 'initial' }: EmptyStateProps) {
  if (type === 'empty-result') {
    return (
      <div
        className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="text-3xl mb-3" aria-hidden="true">
          0
        </div>
        <p className="text-sm font-medium text-gray-700">결과가 없습니다</p>
        <p className="text-xs text-gray-500 mt-1">
          쿼리 조건에 맞는 데이터가 없습니다. WHERE 조건을 확인해보세요.
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-lg border border-gray-200 bg-gray-50 p-10 text-center"
      role="status"
    >
      <div
        className="mx-auto mb-4 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-400"
        aria-hidden="true"
      >
        &#9654;
      </div>
      <p className="text-sm font-medium text-gray-600">SQL을 입력하고 실행 버튼을 눌러보세요</p>
      <p className="text-xs text-gray-400 mt-2">
        단축키: <kbd className="px-1 py-0.5 bg-gray-200 rounded text-gray-600 font-mono text-xs">Ctrl</kbd>
        {' '}+{' '}
        <kbd className="px-1 py-0.5 bg-gray-200 rounded text-gray-600 font-mono text-xs">Enter</kbd>
      </p>
    </div>
  )
}
