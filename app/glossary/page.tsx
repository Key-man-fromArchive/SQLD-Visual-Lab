'use client'

// @TASK P4-S1-T2 - 용어 사전 페이지 조립
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { useState, useMemo } from 'react'
import { Term } from '@/types'
import { allTerms, categories, Category } from '@/data/terms'
import { ITEMS_PER_PAGE } from '@/lib/constants'
import SearchBar from '@/components/features/glossary/SearchBar'
import CategoryTabs from '@/components/features/glossary/CategoryTabs'
import TermCard from '@/components/features/glossary/TermCard'
import TermDetailModal from '@/components/features/glossary/TermDetailModal'

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Term[] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null)

  // 카테고리 + 검색 동시 필터링
  const filteredTerms = useMemo(() => {
    let base = searchResults !== null ? searchResults : allTerms
    if (selectedCategory !== '전체') {
      base = base.filter((t) => t.category === selectedCategory)
    }
    return base
  }, [searchResults, selectedCategory])

  // 카테고리별 카운트 (검색 결과 기반)
  const counts = useMemo(() => {
    const base = searchResults !== null ? searchResults : allTerms
    const result = {} as Record<Category, number>
    result['전체'] = base.length
    for (const cat of categories.slice(1) as Exclude<Category, '전체'>[]) {
      result[cat] = base.filter((t) => t.category === cat).length
    }
    return result
  }, [searchResults])

  // 페이지네이션
  const totalPages = Math.max(1, Math.ceil(filteredTerms.length / ITEMS_PER_PAGE))
  const pagedTerms = filteredTerms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleSearchChange = (query: string, results: Term[] | null) => {
    setSearchQuery(query)
    setSearchResults(results)
    setCurrentPage(1)
  }

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SQLD 용어 사전</h1>
          <p className="text-gray-500">
            SQL 핵심 용어 {allTerms.length}개를 한 곳에서 정리했습니다.
          </p>
        </div>

        {/* 검색 + 카테고리 */}
        <div className="space-y-4 mb-8">
          <SearchBar
            terms={allTerms}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <CategoryTabs
            selected={selectedCategory}
            onSelect={handleCategorySelect}
            counts={counts}
          />
        </div>

        {/* 결과 수 표시 */}
        <p className="text-sm text-gray-400 mb-4">
          {searchQuery
            ? `"${searchQuery}" 검색 결과 ${filteredTerms.length}개`
            : `전체 ${filteredTerms.length}개`}
        </p>

        {/* 용어 카드 그리드 */}
        {pagedTerms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {pagedTerms.map((term) => (
              <TermCard
                key={term.id}
                term={term}
                onDetail={setSelectedTerm}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">검색 결과가 없습니다.</p>
            <p className="text-gray-300 text-sm">다른 키워드로 검색하거나 카테고리를 변경해 보세요.</p>
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <nav aria-label="페이지 이동" className="flex justify-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="이전 페이지"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                aria-label={`${page}페이지`}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`px-3 py-2 rounded-lg text-sm font-medium min-w-[40px] transition-colors ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="다음 페이지"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              &gt;
            </button>
          </nav>
        )}
      </div>

      {/* 용어 상세 모달 */}
      {selectedTerm && (
        <TermDetailModal
          term={selectedTerm}
          onClose={() => setSelectedTerm(null)}
          onSelectTerm={(term) => setSelectedTerm(term)}
        />
      )}
    </>
  )
}
