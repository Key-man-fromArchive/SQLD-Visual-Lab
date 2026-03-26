// @TASK P5-S1-T1 - 기능 카드 컴포넌트
// @SPEC docs/planning/sqld-visual-lab-spec.md

import Link from 'next/link'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  href: string
  color: string
  borderColor: string
}

export default function FeatureCard({ icon, title, description, href, color, borderColor }: FeatureCardProps) {
  return (
    <Link href={href}>
      <div className={`${color} border ${borderColor} rounded-xl p-8 hover:shadow-lg transition-all duration-200 cursor-pointer group h-full`}>
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <span className="inline-block bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 group-hover:bg-blue-600 group-hover:text-white transition-all">
          시작하기 →
        </span>
      </div>
    </Link>
  )
}
