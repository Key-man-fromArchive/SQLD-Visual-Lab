// @TASK P4-R1-T2 - 용어 데이터 통합 export
// @SPEC docs/planning/sqld-visual-lab-spec.md

import { Term } from '@/types'
import { ddlTerms } from './ddl'
import { dmlTerms } from './dml'
import { tclTerms } from './tcl'
import { dclTerms } from './dcl'
import { functionTerms } from './functions'
import { operatorTerms } from './operators'
import { datatypeTerms } from './datatypes'
import { normalizationTerms } from './normalization'
import { otherTerms } from './other'

export const allTerms: Term[] = [
  ...ddlTerms,
  ...dmlTerms,
  ...tclTerms,
  ...dclTerms,
  ...functionTerms,
  ...operatorTerms,
  ...datatypeTerms,
  ...normalizationTerms,
  ...otherTerms,
]

export const categories = ['전체', 'DDL', 'DML', 'TCL', 'DCL', 'FUNCTION', 'OPERATOR', 'DATATYPE', 'NORMALIZATION', 'OTHER'] as const
export type Category = (typeof categories)[number]
