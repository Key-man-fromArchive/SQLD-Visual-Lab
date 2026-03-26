'use client'

// @TASK P2-S1-T1 - SQL 실행 컨트롤 (실행/지우기 버튼)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useEffect } from 'react'

interface SQLControlsProps {
  onExecute: () => void
  onClear: () => void
  loading?: boolean
  disabled?: boolean
}

export default function SQLControls({
  onExecute,
  onClear,
  loading = false,
  disabled = false,
}: SQLControlsProps) {
  // Ctrl+Enter / Cmd+Enter 전역 단축키 (에디터 밖에서도 작동)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        if (!loading && !disabled) {
          onExecute()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onExecute, loading, disabled])

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onExecute}
        disabled={loading || disabled}
        className="
          flex items-center gap-2 px-5 py-2.5
          bg-blue-600 text-white text-sm font-medium rounded-lg
          hover:bg-blue-700 active:bg-blue-800
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          transition-colors
        "
        aria-label="SQL 실행 (Ctrl+Enter)"
      >
        {loading ? (
          <>
            <span
              className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"
              aria-hidden="true"
            />
            실행 중...
          </>
        ) : (
          <>
            <span aria-hidden="true">&#9654;</span>
            실행
          </>
        )}
      </button>

      <button
        onClick={onClear}
        disabled={loading}
        className="
          px-4 py-2.5
          bg-white text-gray-700 text-sm font-medium rounded-lg
          border border-gray-300
          hover:bg-gray-50 active:bg-gray-100
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
          transition-colors
        "
        aria-label="편집기 내용 지우기"
      >
        지우기
      </button>

      <span className="text-xs text-gray-400 hidden sm:block" aria-hidden="true">
        Ctrl+Enter 실행
      </span>
    </div>
  )
}
