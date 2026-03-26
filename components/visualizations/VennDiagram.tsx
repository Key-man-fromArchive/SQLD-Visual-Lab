'use client'

// @TASK P3-R1-T2 - JOIN 벤 다이어그램 시각화
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { motion } from 'framer-motion'

interface VennDiagramProps {
  type: 'inner' | 'left' | 'right' | 'full'
}

const TYPE_META = {
  inner: {
    label: 'INNER JOIN',
    desc: '두 테이블 모두에 존재하는 데이터만',
    leftFill: 'none',
    intersectionFill: '#3b82f6',
    rightFill: 'none',
    leftOpacity: 0.15,
    rightOpacity: 0.15,
    intersectionOpacity: 0.7,
  },
  left: {
    label: 'LEFT JOIN',
    desc: '왼쪽 테이블 전체 + 오른쪽 일치 데이터',
    leftFill: '#3b82f6',
    intersectionFill: '#3b82f6',
    rightFill: 'none',
    leftOpacity: 0.6,
    rightOpacity: 0.15,
    intersectionOpacity: 0.85,
  },
  right: {
    label: 'RIGHT JOIN',
    desc: '오른쪽 테이블 전체 + 왼쪽 일치 데이터',
    leftFill: 'none',
    intersectionFill: '#3b82f6',
    rightFill: '#3b82f6',
    leftOpacity: 0.15,
    rightOpacity: 0.6,
    intersectionOpacity: 0.85,
  },
  full: {
    label: 'FULL OUTER JOIN',
    desc: '두 테이블의 모든 데이터',
    leftFill: '#3b82f6',
    intersectionFill: '#3b82f6',
    rightFill: '#3b82f6',
    leftOpacity: 0.6,
    rightOpacity: 0.6,
    intersectionOpacity: 0.85,
  },
}

export default function VennDiagram({ type }: VennDiagramProps) {
  const meta = TYPE_META[type]

  // SVG 좌표 설정
  const cx1 = 110  // 왼쪽 원 중심 x
  const cx2 = 190  // 오른쪽 원 중심 x
  const cy = 110   // 원 중심 y
  const r = 70     // 원 반지름

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        viewBox="0 0 300 220"
        className="w-full max-w-xs"
        aria-label={`${meta.label} 벤 다이어그램`}
        role="img"
      >
        {/* 왼쪽 원 (배경) */}
        <circle
          cx={cx1}
          cy={cy}
          r={r}
          fill="#6b7280"
          fillOpacity={0.12}
          stroke="#6b7280"
          strokeWidth={1.5}
        />
        {/* 오른쪽 원 (배경) */}
        <circle
          cx={cx2}
          cy={cy}
          r={r}
          fill="#6b7280"
          fillOpacity={0.12}
          stroke="#6b7280"
          strokeWidth={1.5}
        />

        {/* 왼쪽 전용 영역 강조 (clipPath로 교집합 제외) */}
        {(type === 'left' || type === 'full') && (
          <>
            <defs>
              <clipPath id={`clip-left-${type}`}>
                <rect x="0" y="0" width={cx2 - r + 5} height="220" />
              </clipPath>
            </defs>
            <motion.circle
              cx={cx1}
              cy={cy}
              r={r}
              fill="#3b82f6"
              fillOpacity={0}
              clipPath={`url(#clip-left-${type})`}
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: meta.leftOpacity }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </>
        )}

        {/* 오른쪽 전용 영역 강조 */}
        {(type === 'right' || type === 'full') && (
          <>
            <defs>
              <clipPath id={`clip-right-${type}`}>
                <rect x={cx1 + r - 5} y="0" width="300" height="220" />
              </clipPath>
            </defs>
            <motion.circle
              cx={cx2}
              cy={cy}
              r={r}
              fill="#3b82f6"
              fillOpacity={0}
              clipPath={`url(#clip-right-${type})`}
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: meta.rightOpacity }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </>
        )}

        {/* 교집합 강조 */}
        <defs>
          <clipPath id={`clip-intersect-left-${type}`}>
            <circle cx={cx2} cy={cy} r={r} />
          </clipPath>
        </defs>
        <motion.circle
          cx={cx1}
          cy={cy}
          r={r}
          fill="#3b82f6"
          fillOpacity={0}
          clipPath={`url(#clip-intersect-left-${type})`}
          initial={{ fillOpacity: 0 }}
          animate={{ fillOpacity: meta.intersectionOpacity }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
        />

        {/* 원 테두리 (강조선) */}
        <circle
          cx={cx1}
          cy={cy}
          r={r}
          fill="none"
          stroke={type === 'left' || type === 'full' ? '#3b82f6' : '#9ca3af'}
          strokeWidth={type === 'left' || type === 'full' ? 2 : 1.5}
        />
        <circle
          cx={cx2}
          cy={cy}
          r={r}
          fill="none"
          stroke={type === 'right' || type === 'full' ? '#3b82f6' : '#9ca3af'}
          strokeWidth={type === 'right' || type === 'full' ? 2 : 1.5}
        />

        {/* 라벨: 테이블 A */}
        <text
          x={cx1 - 18}
          y={cy + r + 20}
          textAnchor="middle"
          fontSize="12"
          fill="#374151"
          fontWeight="600"
        >
          테이블 A
        </text>
        {/* 라벨: 테이블 B */}
        <text
          x={cx2 + 18}
          y={cy + r + 20}
          textAnchor="middle"
          fontSize="12"
          fill="#374151"
          fontWeight="600"
        >
          테이블 B
        </text>

        {/* 중앙 교집합 라벨 */}
        <text
          x={(cx1 + cx2) / 2}
          y={cy + 4}
          textAnchor="middle"
          fontSize="10"
          fill="white"
          fontWeight="700"
        >
          일치
        </text>
      </svg>

      {/* 설명 텍스트 */}
      <p className="text-sm text-gray-600 text-center max-w-xs">{meta.desc}</p>

      {/* 범례 */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="inline-block w-3 h-3 rounded-full bg-blue-500 opacity-70" />
        <span>반환되는 데이터</span>
        <span className="inline-block w-3 h-3 rounded-full bg-gray-300 ml-2" />
        <span>제외되는 데이터</span>
      </div>
    </div>
  )
}
