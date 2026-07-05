'use client'

import { useState } from 'react'
import { Menu, X, Mail } from 'lucide-react'
import { siteConfig, whatsappLink, defaultWhatsappMessage, emailHref } from '@/lib/site-config'

const links = [
  { href: '#demos', label: 'Demos' },
  { href: '#developer', label: 'The Developer' },
  { href: '#pricing', label: 'Plans' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/30">
            <span className="font-display text-sm font-bold text-primary">AF</span>
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            {siteConfig.brand}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={emailHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Email us at </span>
            {siteConfig.email}
          </a>
          <a
            href={whatsappLink(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_24px_-6px_var(--primary)] active:scale-95"
          >
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              Get a Quote on WhatsApp
            </a>
            <a
              href={emailHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold text-foreground"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email {siteConfig.email}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
