// @TASK P1-S0-T2 - 에러 알림 컴포넌트
interface ErrorAlertProps {
  message: string
  hint?: string
  onDismiss?: () => void
}

export default function ErrorAlert({ message, hint, onDismiss }: ErrorAlertProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <span className="text-red-500 text-lg flex-shrink-0" aria-hidden="true">!</span>
        <div className="flex-1">
          <p className="text-red-800 text-sm font-medium">{message}</p>
          {hint && <p className="text-red-600 text-xs mt-1">{hint}</p>}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-600 text-sm"
            aria-label="닫기"
          >
            x
          </button>
        )}
      </div>
    </div>
  )
}
