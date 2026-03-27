'use client'

// @TASK P2-S1-T1 - 데이터셋 선택 드롭다운
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { datasetList } from '@/data/datasets'

interface SampleDataSelectorProps {
  selectedDataset: string
  onSelect: (datasetId: string) => void
  disabled?: boolean
}

export default function SampleDataSelector({
  selectedDataset,
  onSelect,
  disabled = false,
}: SampleDataSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="dataset-select"
        className="text-sm font-medium text-gray-700 whitespace-nowrap"
      >
        데이터셋
      </label>
      <select
        id="dataset-select"
        value={selectedDataset}
        onChange={(e) => onSelect(e.target.value)}
        disabled={disabled}
        className="
          flex-1 rounded-lg border border-gray-300 bg-white
          px-3 py-2 text-sm text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
        "
        aria-label="샘플 데이터셋 선택"
      >
        <option value="custom">빈 DB (직접 만들기)</option>
        <optgroup label="샘플 데이터셋">
          {datasetList.map((dataset) => (
            <option key={dataset.id} value={dataset.id}>
              {dataset.name}
            </option>
          ))}
        </optgroup>
      </select>

      <p className="text-xs text-gray-500 hidden sm:block">
        {selectedDataset === 'custom'
          ? 'CREATE TABLE로 직접 테이블을 만들어보세요!'
          : datasetList.find((d) => d.id === selectedDataset)?.description}
      </p>
    </div>
  )
}
