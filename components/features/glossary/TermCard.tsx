'use client'

// @TASK P4-S1-T1 - 용어 카드 컴포넌트
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Term } from '@/types'
import PracticeButton from '@/components/shared/PracticeButton'

const CATEGORY_BADGE: Record<Term['category'], string> = {
  DDL: 'bg-blue-100 text-blue-700',
  DML: 'bg-green-100 text-green-700',
  TCL: 'bg-purple-100 text-purple-700',
  DCL: 'bg-red-100 text-red-700',
  FUNCTION: 'bg-indigo-100 text-indigo-700',
  OPERATOR: 'bg-cyan-100 text-cyan-700',
  DATATYPE: 'bg-amber-100 text-amber-700',
  NORMALIZATION: 'bg-orange-100 text-orange-700',
  OTHER: 'bg-gray-100 text-gray-600',
}

const CATEGORY_LABELS: Record<Term['category'], string> = {
  DDL: 'DDL',
  DML: 'DML',
  TCL: 'TCL',
  DCL: 'DCL',
  FUNCTION: '함수',
  OPERATOR: '연산자',
  DATATYPE: '데이터타입',
  NORMALIZATION: '정규화',
  OTHER: '기타',
}

interface TermCardProps {
  term: Term
  onDetail: (term: Term) => void
}

export default function TermCard({ term, onDetail }: TermCardProps) {
  const badgeClass = CATEGORY_BADGE[term.category]
  const truncated =
    term.definition.length > 80
      ? term.definition.slice(0, 80) + '...'
      : term.definition

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:border-blue-300 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 text-base leading-tight">{term.name}</h3>
        <span
          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${badgeClass}`}
        >
          {CATEGORY_LABELS[term.category]}
        </span>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed flex-1">{truncated}</p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => onDetail(term)}
          className="flex-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 rounded-md py-1.5 transition-colors font-medium"
          aria-label={`${term.name} 예제 보기`}
        >
          예제 보기
        </button>
        {term.exampleSQL && (
          <PracticeButton sql={term.exampleSQL} size="sm" label="실습" />
        )}
      </div>
    </article>
  )
}
