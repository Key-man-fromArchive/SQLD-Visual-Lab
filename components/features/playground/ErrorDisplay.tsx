'use client'

// @TASK P2-S1-T2 - SQL 에러 표시 + 초보자 힌트
// @SPEC docs/planning/sqld-visual-lab-spec.md

interface ErrorDisplayProps {
  message: string
}

function getHint(message: string): string | null {
  if (message.includes('구문 오류') || message.includes('syntax error')) {
    return 'SELECT, FROM, WHERE 등 SQL 키워드를 올바르게 입력했는지 확인하세요. 오타가 있으면 구문 오류가 발생합니다.'
  }
  if (message.includes('테이블 오류') || message.includes('no such table')) {
    return "테이블 이름이 정확한지 확인하세요. 데이터셋 선택 후 해당 데이터셋의 테이블만 사용할 수 있습니다."
  }
  if (message.includes('컬럼 오류') || message.includes('no such column')) {
    return 'SELECT 절에 지정한 컬럼 이름이 테이블에 존재하는지 확인하세요. 대소문자를 구분하는 경우도 있습니다.'
  }
  if (message.includes('UNIQUE')) {
    return '동일한 PRIMARY KEY 또는 UNIQUE 컬럼에 같은 값을 두 번 삽입할 수 없습니다.'
  }
  if (message.includes('NOT NULL')) {
    return 'NOT NULL 제약이 걸린 컬럼에 NULL 값을 넣을 수 없습니다. 값을 지정해주세요.'
  }
  if (message.includes('초기화')) {
    return '페이지를 새로고침하거나 데이터셋을 다시 선택해보세요.'
  }
  return null
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
  const hint = getHint(message)

  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 p-4"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold mt-0.5"
          aria-hidden="true"
        >
          !
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-red-800">{message}</p>
          {hint && (
            <div className="mt-2 flex items-start gap-1.5">
              <span className="text-blue-500 text-xs flex-shrink-0 mt-0.5" aria-hidden="true">
                &#9432;
              </span>
              <p className="text-xs text-blue-700">{hint}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
