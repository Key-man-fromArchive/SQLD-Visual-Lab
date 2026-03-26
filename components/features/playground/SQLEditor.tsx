'use client'

// @TASK P2-S1-T1 - Monaco Editor 래퍼 컴포넌트
// @SPEC docs/planning/sqld-visual-lab-spec.md

import dynamic from 'next/dynamic'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

// SSR 비활성화: Monaco는 브라우저 전용
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[200px] bg-gray-50 rounded-lg border border-gray-200">
      <LoadingSpinner />
    </div>
  ),
})

interface SQLEditorProps {
  value: string
  onChange: (value: string) => void
  onExecute?: () => void
  disabled?: boolean
}

export default function SQLEditor({
  value,
  onChange,
  onExecute,
  disabled = false,
}: SQLEditorProps) {
  return (
    <div
      className="rounded-lg border border-gray-300 overflow-hidden"
      role="group"
      aria-label="SQL 편집기"
    >
      <MonacoEditor
        height="200px"
        language="sql"
        theme="vs-light"
        value={value}
        onChange={(val) => onChange(val ?? '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          automaticLayout: true,
          tabSize: 2,
          readOnly: disabled,
          contextmenu: false,
          folding: false,
          lineDecorationsWidth: 4,
          glyphMargin: false,
          renderLineHighlight: 'line',
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
          },
        }}
        onMount={(editor, monacoInstance) => {
          // Ctrl+Enter / Cmd+Enter 단축키 등록
          editor.addCommand(
            monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter,
            () => {
              onExecute?.()
            }
          )
        }}
      />
    </div>
  )
}
