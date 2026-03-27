// @TASK P1-R2-T1 - 샘플 데이터셋 인덱스
// @SPEC docs/planning/sqld-visual-lab-spec.md#sample-datasets

import { SampleDataset } from '@/types'
import { employeesDataset } from './employees'
import { ordersDataset } from './orders'
import { schoolDataset } from './school'

export const datasets: Record<string, SampleDataset> = {
  employees: employeesDataset,
  orders: ordersDataset,
  school: schoolDataset,
}

export const datasetList: SampleDataset[] = Object.values(datasets)

export function getDatasetSQL(name: string): string | null {
  return datasets[name]?.initSQL ?? null
}

export { employeesDataset, ordersDataset, schoolDataset }
