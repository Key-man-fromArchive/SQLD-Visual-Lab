'use client'

// @TASK P4-S1-T1 - 용어 카테고리 탭
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Category, categories } from '@/data/terms'

const CATEGORY_LABELS: Record<Category, string> = {
  '전체': '전체',
  DDL: 'DDL',
  DML: 'DML',
  TCL: 'TCL',
  NORMALIZATION: '정규화',
  OTHER: '기타',
}

interface CategoryTabsProps {
  selected: Category
  onSelect: (category: Category) => void
  counts: Record<Category, number>
}

export default function CategoryTabs({ selected, onSelect, counts }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="용어 카테고리"
      className="flex flex-wrap gap-2"
    >
      {categories.map((cat) => {
        const isActive = selected === cat
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[36px] ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {CATEGORY_LABELS[cat]}
            <span
              className={`ml-1.5 text-xs ${isActive ? 'text-blue-100' : 'text-gray-400'}`}
            >
              {counts[cat]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
