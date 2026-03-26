'use client'

// @TASK P3-S1-T1 - 개념 목록 사이드바 (카테고리별 아코디언)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ConceptGroup } from '@/data/concepts'
import { Concept } from '@/types'

interface ConceptListProps {
  groups: ConceptGroup[]
  activeConceptId: string
  onSelect: (concept: Concept) => void
}

const DIFFICULTY_LABEL: Record<Concept['difficulty'], string> = {
  beginner: '기초',
  intermediate: '중급',
  advanced: '고급',
}

const DIFFICULTY_COLOR: Record<Concept['difficulty'], string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
}

export default function ConceptList({ groups, activeConceptId, onSelect }: ConceptListProps) {
  // 처음에 모든 카테고리 열려있게
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(groups.map((g) => g.category))
  )

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  return (
    <nav className="flex flex-col gap-1" aria-label="SQL 개념 목록">
      {groups.map((group) => {
        const isOpen = openCategories.has(group.category)

        return (
          <div key={group.category} className="rounded-lg overflow-hidden">
            {/* 카테고리 헤더 */}
            <button
              onClick={() => toggleCategory(group.category)}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-100 hover:bg-gray-200 transition-colors text-left"
              aria-expanded={isOpen}
              aria-controls={`category-${group.category}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base" aria-hidden="true">{group.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{group.label}</span>
                <span className="text-xs text-gray-400">({group.concepts.length})</span>
              </div>
              <motion.span
                className="text-gray-400 text-xs"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                ▼
              </motion.span>
            </button>

            {/* 개념 목록 */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  id={`category-${group.category}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden bg-white"
                >
                  {group.concepts.map((concept) => {
                    const isActive = concept.id === activeConceptId
                    return (
                      <li key={concept.id}>
                        <button
                          onClick={() => onSelect(concept)}
                          className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-2 transition-colors border-b border-gray-50 last:border-b-0 ${
                            isActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" aria-hidden="true" />
                            )}
                            <span className="text-sm font-medium truncate">{concept.name}</span>
                          </div>
                          <span
                            className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 ${DIFFICULTY_COLOR[concept.difficulty]}`}
                          >
                            {DIFFICULTY_LABEL[concept.difficulty]}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}
