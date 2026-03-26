'use client'

// @TASK P3-S1-T2 - 개념 설명 페이지 (sidebar-main 레이아웃)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useState, useEffect } from 'react'
import { Concept } from '@/types'
import { allConcepts, getConceptsByCategory } from '@/data/concepts'
import ConceptList from '@/components/features/concepts/ConceptList'
import ConceptPanel from '@/components/features/concepts/ConceptPanel'

const conceptGroups = getConceptsByCategory()

export default function ConceptsPage() {
  const [activeConceptId, setActiveConceptId] = useState<string>(allConcepts[0]?.id ?? '')

  const activeConcept = allConcepts.find((c) => c.id === activeConceptId) ?? allConcepts[0]

  const handleSelect = (concept: Concept) => {
    setActiveConceptId(concept.id)
    // 모바일에서는 패널로 스크롤
    if (window.innerWidth < 768) {
      document.getElementById('concept-panel')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleRelatedSelect = (conceptId: string) => {
    setActiveConceptId(conceptId)
    document.getElementById('concept-panel')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!activeConcept) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        개념 데이터를 불러올 수 없습니다.
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* 좌측 사이드바 (데스크톱: fixed, 모바일: 상단 스크롤) */}
      <aside
        className="hidden md:block w-64 flex-shrink-0 border-r border-gray-200 bg-white"
        aria-label="개념 목록 사이드바"
      >
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-3">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-3">
            SQL 개념 ({allConcepts.length}개)
          </h2>
          <ConceptList
            groups={conceptGroups}
            activeConceptId={activeConceptId}
            onSelect={handleSelect}
          />
        </div>
      </aside>

      {/* 모바일 가로 스크롤 개념 목록 */}
      <div className="md:hidden w-full border-b border-gray-200 bg-white sticky top-16 z-10">
        <div className="overflow-x-auto flex gap-2 px-4 py-2">
          {allConcepts.map((concept) => (
            <button
              key={concept.id}
              onClick={() => setActiveConceptId(concept.id)}
              className={`flex-shrink-0 px-3 py-1.5 text-sm rounded-full border transition-colors whitespace-nowrap ${
                concept.id === activeConceptId
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
              }`}
            >
              {concept.name}
            </button>
          ))}
        </div>
      </div>

      {/* 우측 메인 패널 */}
      <main
        id="concept-panel"
        className="flex-1 min-w-0 p-6 md:p-8 overflow-y-auto"
        aria-live="polite"
        aria-label="개념 설명 패널"
      >
        <ConceptPanel
          concept={activeConcept}
          onRelatedConceptSelect={handleRelatedSelect}
        />
      </main>
    </div>
  )
}
