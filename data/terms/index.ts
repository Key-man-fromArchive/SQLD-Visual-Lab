// @TASK P4-R1-T1 - 용어 데이터 통합 export
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Term } from '@/types'
import { ddlTerms } from './ddl'
import { dmlTerms } from './dml'
import { tclTerms } from './tcl'
import { normalizationTerms } from './normalization'
import { otherTerms } from './other'

export const allTerms: Term[] = [
  ...ddlTerms,
  ...dmlTerms,
  ...tclTerms,
  ...normalizationTerms,
  ...otherTerms,
]

export const categories = ['전체', 'DDL', 'DML', 'TCL', 'NORMALIZATION', 'OTHER'] as const
export type Category = (typeof categories)[number]
