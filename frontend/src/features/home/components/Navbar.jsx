import { useId, useState } from 'react'
import { NAV_ITEMS } from '@/features/home/data/homeContent'

export function Navbar({ onRegisterClick }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  return (
    <nav
      className="sticky top-0 z-50 border-b border-glass/10 bg-page/80 backdrop-blur-xl"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/20 text-xl shadow-lg shadow-accent/20">
            🌍
          </div>
          <div>
            <p className="text-lg font-bold tracking-wide text-fg">
              Urban Community
            </p>
            <p className="text-xs text-fg-subtle">Connect. Report. Improve.</p>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-fg-muted transition hover:text-accent-hover"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex rounded-xl border border-glass/10 px-4 py-2 text-sm font-medium text-fg-soft transition hover:border-accent-hover/40 hover:bg-glass/5"
            onClick={onRegisterClick}
          >
            Register
          </button>
          <button
            type="button"
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-on-accent shadow-lg shadow-accent/30 transition hover:scale-[1.02] hover:bg-accent-hover"
          >
            Login
          </button>

          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-fg-muted hover:bg-glass/10 md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id={menuId}
          className="border-t border-glass/10 bg-page/95 px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="block text-sm font-medium text-fg-muted hover:text-accent-hover"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  )
}
