// @TASK P5-S1-T1 - 메인 홈 페이지 (대시보드)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import HeroSection from '@/components/features/dashboard/HeroSection'
import FeatureCard from '@/components/features/dashboard/FeatureCard'
import { ROUTES } from '@/lib/constants'

const features = [
  {
    icon: '⚙️',
    title: 'SQL 실행기',
    description: 'SQL을 직접 작성하고 브라우저에서 바로 실행해보세요. SQLD 교재 예제를 따라하며 학습할 수 있습니다.',
    href: ROUTES.PLAYGROUND,
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    icon: '📊',
    title: '시각적 개념 설명',
    description: 'JOIN, GROUP BY 등 핵심 SQL 개념을 그림과 다이어그램으로 직관적으로 이해합니다.',
    href: ROUTES.CONCEPTS,
    color: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    icon: '📚',
    title: 'SQLD 용어 사전',
    description: 'SQLD 시험에 자주 나오는 용어를 검색하고, 예제와 함께 쉽게 학습합니다.',
    href: ROUTES.GLOSSARY,
    color: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
]

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
          3가지 학습 도구로 SQLD를 정복하세요
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.href} {...feature} />
          ))}
        </div>
      </section>
    </div>
  )
}
