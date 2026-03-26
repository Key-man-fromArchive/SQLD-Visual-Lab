'use client'

// @TASK P4-S1-T1 - 용어 상세 모달
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useEffect, useCallback } from 'react'
import { Term } from '@/types'
import SQLCodeBlock from '@/components/shared/SQLCodeBlock'
import PracticeButton from '@/components/shared/PracticeButton'
import { allTerms } from '@/data/terms'

const CATEGORY_BADGE: Record<Term['category'], string> = {
  DDL: 'bg-blue-100 text-blue-700',
  DML: 'bg-green-100 text-green-700',
  TCL: 'bg-purple-100 text-purple-700',
  NORMALIZATION: 'bg-orange-100 text-orange-700',
  OTHER: 'bg-gray-100 text-gray-600',
}

const CATEGORY_LABELS: Record<Term['category'], string> = {
  DDL: 'DDL',
  DML: 'DML',
  TCL: 'TCL',
  NORMALIZATION: '정규화',
  OTHER: '기타',
}

interface TermDetailModalProps {
  term: Term
  onClose: () => void
  onSelectTerm: (term: Term) => void
}

export default function TermDetailModal({ term, onClose, onSelectTerm }: TermDetailModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const relatedTermObjects = term.relatedTerms
    .map((id) => allTerms.find((t) => t.id === id))
    .filter((t): t is Term => t !== undefined)

  const badgeClass = CATEGORY_BADGE[term.category]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 모달 본문 */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <h2 id="modal-title" className="text-xl font-bold text-gray-900">
              {term.name}
            </h2>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
              {CATEGORY_LABELS[term.category]}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="모달 닫기"
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 내용 */}
        <div className="px-6 py-5 space-y-5">
          {/* 전체 정의 */}
          <section>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              정의
            </h3>
            <p className="text-gray-700 leading-relaxed">{term.definition}</p>
          </section>

          {/* 구문 */}
          {term.syntax && (
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                구문 (Syntax)
              </h3>
              <SQLCodeBlock code={term.syntax} title="구문" />
            </section>
          )}

          {/* SQL 예제 */}
          {term.exampleSQL && (
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                SQL 예제
              </h3>
              <SQLCodeBlock code={term.exampleSQL} title="예제 SQL" />
            </section>
          )}

          {/* 실행 결과 설명 */}
          {term.exampleResult && (
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                실행 결과
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                {term.exampleResult}
              </div>
            </section>
          )}

          {/* 관련 용어 */}
          {relatedTermObjects.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                관련 용어
              </h3>
              <div className="flex flex-wrap gap-2">
                {relatedTermObjects.map((related) => (
                  <button
                    key={related.id}
                    onClick={() => onSelectTerm(related)}
                    className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {related.name}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* 실습 버튼 */}
          {term.exampleSQL && (
            <div className="pt-2 border-t border-gray-100">
              <PracticeButton sql={term.exampleSQL} label="SQL 실습하기" size="md" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
