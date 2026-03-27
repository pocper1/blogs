'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      className="
        absolute right-3 top-3 flex items-center gap-1.5
        rounded-md px-2 py-1.5 text-xs font-medium
        bg-muted/80 text-muted-foreground
        hover:bg-muted hover:text-foreground
        transition-all duration-150
        opacity-0 group-hover:opacity-100 focus:opacity-100
      "
    >
      {copied ? (
        <><Check className="h-3.5 w-3.5 text-green-500" />Copied</>
      ) : (
        <><Copy className="h-3.5 w-3.5" />Copy</>
      )}
    </button>
  )
}
