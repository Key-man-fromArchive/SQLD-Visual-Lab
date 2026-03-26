'use client'

// @TASK P1-S0-T2 - SQL 코드 하이라이팅 블록
import { useState } from 'react'

interface SQLCodeBlockProps {
  code: string
  title?: string
}

export default function SQLCodeBlock({ code, title }: SQLCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {title && (
        <div className="bg-gray-50 px-4 py-2 text-sm text-gray-600 border-b border-gray-200 flex items-center justify-between">
          <span>{title}</span>
          <button
            onClick={handleCopy}
            className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            {copied ? '복사됨!' : '복사'}
          </button>
        </div>
      )}
      <pre className="bg-gray-900 text-green-400 p-4 overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}
