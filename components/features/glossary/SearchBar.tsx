'use client'

// @TASK P4-S1-T1 - 용어 사전 검색바 (fuse.js 퍼지 검색)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useEffect, useRef } from 'react'
import Fuse from 'fuse.js'
import { Term } from '@/types'

interface SearchBarProps {
  terms: Term[]
  value: string
  onChange: (query: string, results: Term[] | null) => void
}

export default function SearchBar({ terms, value, onChange }: SearchBarProps) {
  const fuseRef = useRef<Fuse<Term> | null>(null)

  useEffect(() => {
    fuseRef.current = new Fuse(terms, {
      keys: ['name', 'definition', 'syntax'],
      threshold: 0.3,
      includeScore: false,
    })
  }, [terms])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    if (!query.trim()) {
      onChange(query, null)
      return
    }
    const results = fuseRef.current
      ? fuseRef.current.search(query).map((r) => r.item)
      : null
    onChange(query, results)
  }

  return (
    <div className="relative">
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="용어명, 설명, 구문으로 검색..."
        aria-label="용어 검색"
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      />
    </div>
  )
}
