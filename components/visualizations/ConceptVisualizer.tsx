'use client'

// @TASK P3-R1-T2 - visualizationType에 따른 시각화 래퍼 컴포넌트
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Concept } from '@/types'
import VennDiagram from './VennDiagram'
import TableStructure from './TableStructure'
import DataFlow, { FlowStep } from './DataFlow'

interface ConceptVisualizerProps {
  concept: Concept
}

export default function ConceptVisualizer({ concept }: ConceptVisualizerProps) {
  const { visualizationType, visualizationData } = concept

  if (visualizationType === 'venn') {
    const joinType = (visualizationData?.type as 'inner' | 'left' | 'right' | 'full') ?? 'inner'
    return (
      <div className="bg-gray-50 rounded-xl p-4 flex justify-center">
        <VennDiagram type={joinType} />
      </div>
    )
  }

  if (visualizationType === 'table-structure') {
    const { tableName, columns, sampleRows, highlightColumns } = visualizationData ?? {}
    if (!tableName || !columns) {
      return <FallbackVisualizer concept={concept} />
    }
    return (
      <div className="bg-gray-50 rounded-xl p-4">
        <TableStructure
          tableName={tableName}
          columns={columns}
          sampleRows={sampleRows ?? []}
          highlightColumns={highlightColumns ?? []}
        />
      </div>
    )
  }

  if (visualizationType === 'flow') {
    const steps: FlowStep[] = visualizationData?.steps ?? []
    if (steps.length === 0) {
      return <FallbackVisualizer concept={concept} />
    }
    return (
      <div className="bg-gray-50 rounded-xl p-4 flex justify-center">
        <DataFlow steps={steps} />
      </div>
    )
  }

  return <FallbackVisualizer concept={concept} />
}

function FallbackVisualizer({ concept }: { concept: Concept }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400 text-sm">
      <span className="text-3xl block mb-2" aria-hidden="true">📄</span>
      {concept.name} 시각화 준비 중입니다.
    </div>
  )
}
