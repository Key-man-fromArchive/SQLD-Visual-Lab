'use client'

// @TASK P3-R1-T2 - 데이터 흐름 시각화 (WHERE / GROUP BY 등)
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { motion } from 'framer-motion'

export interface FlowStep {
  label: string
  count: number | null
  icon: 'table' | 'filter' | 'group' | 'grouped' | 'aggregate' | 'result' | 'sort' | 'query' | 'value'
  condition?: string
}

interface DataFlowProps {
  steps: FlowStep[]
  activeStep?: number
}

const ICON_MAP: Record<FlowStep['icon'], string> = {
  table: '📋',
  filter: '🔽',
  group: '📦',
  grouped: '🗂️',
  aggregate: '🔢',
  result: '✅',
  sort: '↕️',
  query: '🔍',
  value: '💡',
}

const ICON_COLOR: Record<FlowStep['icon'], string> = {
  table: 'bg-slate-100 text-slate-600 border-slate-200',
  filter: 'bg-amber-50 text-amber-600 border-amber-200',
  group: 'bg-purple-50 text-purple-600 border-purple-200',
  grouped: 'bg-purple-100 text-purple-700 border-purple-300',
  aggregate: 'bg-blue-50 text-blue-600 border-blue-200',
  result: 'bg-green-50 text-green-600 border-green-200',
  sort: 'bg-cyan-50 text-cyan-600 border-cyan-200',
  query: 'bg-slate-50 text-slate-500 border-slate-200',
  value: 'bg-yellow-50 text-yellow-600 border-yellow-200',
}

export default function DataFlow({ steps, activeStep }: DataFlowProps) {
  return (
    <div className="flex flex-col items-center gap-1 w-full py-2">
      {steps.map((step, idx) => {
        const isActive = activeStep === idx
        const colorClass = ICON_COLOR[step.icon]

        return (
          <div key={idx} className="flex flex-col items-center w-full max-w-xs">
            {/* 스텝 카드 */}
            <motion.div
              className={`w-full rounded-lg border px-4 py-3 flex items-center gap-3 ${colorClass} ${
                isActive ? 'ring-2 ring-blue-400 shadow-md' : ''
              }`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
            >
              {/* 아이콘 */}
              <span className="text-xl flex-shrink-0" aria-hidden="true">
                {ICON_MAP[step.icon]}
              </span>

              {/* 내용 */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{step.label}</div>
                {step.condition && (
                  <div className="text-xs mt-0.5 font-mono opacity-80 truncate">
                    {step.condition}
                  </div>
                )}
              </div>

              {/* 행 수 뱃지 */}
              {step.count !== null && (
                <span className="flex-shrink-0 bg-white bg-opacity-70 rounded-full px-2 py-0.5 text-xs font-bold border border-current border-opacity-30">
                  {step.count}행
                </span>
              )}
            </motion.div>

            {/* 화살표 (마지막 제외) */}
            {idx < steps.length - 1 && (
              <motion.div
                className="text-gray-400 text-lg my-1 select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.2 }}
                aria-hidden="true"
              >
                ↓
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}
