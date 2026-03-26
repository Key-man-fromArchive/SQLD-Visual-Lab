'use client'

// @TASK P1-S0-T2 - 실습 연계 버튼
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants'

interface PracticeButtonProps {
  sql: string
  label?: string
  size?: 'sm' | 'md'
}

export default function PracticeButton({ sql, label = '실습해보기', size = 'md' }: PracticeButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`${ROUTES.PLAYGROUND}?sql=${encodeURIComponent(sql)}`)
  }

  const sizeClasses = size === 'sm'
    ? 'px-3 py-1.5 text-xs'
    : 'px-4 py-2 text-sm'

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses} bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium`}
    >
      ▶ {label}
    </button>
  )
}
