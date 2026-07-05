'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, ArrowUpRight } from 'lucide-react'
import { faqs, findAnswer } from '@/lib/knowledge'
import { whatsappLink } from '@/lib/site-config'

type Msg = { role: 'bot' | 'user'; text: string; wa?: string }

const GREETING =
  "Hi! I'm the Apex Forge assistant. Ask me about pricing, delivery time, what you need to provide, or which plan fits you. For a real quote, tap WhatsApp anytime."

const SUGGESTIONS = [
  'How much does it cost?',
  'How fast can you deliver?',
  'Which plan is right for me?',
  'Are there hidden costs?',
]

export function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([{ role: 'bot', text: GREETING }])
  const scrollRef = useRef<HTMLDivElement>(null)
  const composing = useRef(false)

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  function send(text: string) {
    const query = text.trim()
    if (!query) return
    const match = findAnswer(query)
    const reply: Msg = match
      ? { role: 'bot', text: match.a }
      : {
          role: 'bot',
          text: "That's a great question for Pravesh directly — he'll give you an exact answer for your business. Tap WhatsApp below to chat with the developer.",
          wa: whatsappLink(`Hi Apex Forge! I have a question: ${query}`),
        }
    setMessages((m) => [...m, { role: 'user', text: query }, reply])
    setInput('')
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={open}
        className="group fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/40 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_32px_-4px_var(--primary)]"
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Apex Forge chat assistant"
        aria-hidden={!open}
        className={`fixed bottom-40 right-6 z-50 flex w-[min(92vw,22rem)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/50 transition-all duration-300 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        style={{ maxHeight: 'min(70vh, 32rem)' }}
      >
        <div className="flex items-center gap-3 border-b border-border bg-secondary/50 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold leading-tight">Apex Forge Assistant</p>
            <p className="text-xs text-success">Free · answers instantly</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground'
                }`}
              >
                <p>{m.text}</p>
                {m.wa && (
                  <a
                    href={m.wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-success hover:underline"
                  >
                    Chat on WhatsApp <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          ))}

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onCompositionStart={() => (composing.current = true)}
            onCompositionEnd={() => (composing.current = false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (composing.current || e.nativeEvent.isComposing || e.keyCode === 229)) {
                e.preventDefault()
              }
            }}
            placeholder="Ask about price, time, plans…"
            aria-label="Type your question"
            className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/50"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </>
  )
}
