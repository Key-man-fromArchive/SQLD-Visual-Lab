'use client'

// @TASK P3-S1-T1 - 개념 설명 우측 패널
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { motion, AnimatePresence } from 'framer-motion'
import { Concept } from '@/types'
import ConceptVisualizer from '@/components/visualizations/ConceptVisualizer'
import SQLCodeBlock from '@/components/shared/SQLCodeBlock'
import PracticeButton from '@/components/shared/PracticeButton'
import MiniSQLExecutor from './MiniSQLExecutor'
import { findConceptById } from '@/data/concepts'

interface ConceptPanelProps {
  concept: Concept
  onRelatedConceptSelect?: (conceptId: string) => void
}

const DIFFICULTY_INFO = {
  beginner: { label: '기초', color: 'bg-green-100 text-green-700 border-green-200' },
  intermediate: { label: '중급', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  advanced: { label: '고급', color: 'bg-red-100 text-red-700 border-red-200' },
}

export default function ConceptPanel({ concept, onRelatedConceptSelect }: ConceptPanelProps) {
  const diff = DIFFICULTY_INFO[concept.difficulty]

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={concept.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="max-w-2xl"
        aria-label={`${concept.name} 개념 설명`}
      >
        {/* 개념 이름 + 난이도 */}
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-gray-900">{concept.name}</h1>
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${diff.color}`}>
            {diff.label}
          </span>
        </div>

        {/* 한 줄 설명 */}
        <p className="text-gray-500 text-sm mb-5">{concept.shortDescription}</p>

        {/* 시각화 */}
        <section className="mb-6" aria-label="시각화">
          <ConceptVisualizer concept={concept} />
        </section>

        {/* 상세 설명 */}
        <section className="mb-6" aria-label="상세 설명">
          <h2 className="text-base font-semibold text-gray-800 mb-2">개념 설명</h2>
          <div className="text-sm text-gray-600 leading-relaxed space-y-1">
            {concept.fullDescription.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </section>

        {/* 사용 사례 */}
        {concept.useCases.length > 0 && (
          <section className="mb-6" aria-label="이럴 때 사용해요">
            <h2 className="text-base font-semibold text-gray-800 mb-2">이럴 때 사용해요</h2>
            <ul className="space-y-1.5">
              {concept.useCases.map((uc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true">•</span>
                  <span>{uc}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* SQL 예제 */}
        <section className="mb-6" aria-label="SQL 예제">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-gray-800">SQL 예제</h2>
            <PracticeButton sql={concept.sqlExample.split('\n').find(l => l.trim().startsWith('SELECT')) ?? concept.sqlExample} size="sm" />
          </div>
          <SQLCodeBlock code={concept.sqlExample} title="예제 코드" />
        </section>

        {/* 미니 SQL 실행기 */}
        <section className="mb-6" aria-label="SQL 직접 실행">
          <MiniSQLExecutor
            initialSQL={
              concept.sqlExample
                .split(/\n\n/)
                .find(block => block.trim().startsWith('SELECT')) ?? concept.sqlExample
            }
          />
        </section>

        {/* 시험 팁 */}
        {concept.notes && (
          <section className="mb-6" aria-label="시험 포인트">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
              <span className="text-lg flex-shrink-0" aria-hidden="true">💡</span>
              <div>
                <h2 className="text-sm font-semibold text-amber-800 mb-1">SQLD 시험 포인트</h2>
                <p className="text-sm text-amber-700">{concept.notes}</p>
              </div>
            </div>
          </section>
        )}

        {/* 관련 개념 */}
        {concept.relatedConcepts.length > 0 && onRelatedConceptSelect && (
          <section aria-label="관련 개념">
            <h2 className="text-base font-semibold text-gray-800 mb-2">관련 개념</h2>
            <div className="flex flex-wrap gap-2">
              {concept.relatedConcepts.map((relId) => {
                const rel = findConceptById(relId)
                if (!rel) return null
                return (
                  <button
                    key={relId}
                    onClick={() => onRelatedConceptSelect(relId)}
                    className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    {rel.name}
                  </button>
                )
              })}
            </div>
          </section>
        )}
      </motion.article>
    </AnimatePresence>
  )
}
