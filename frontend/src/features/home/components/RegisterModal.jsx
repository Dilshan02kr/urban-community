import { createPortal } from 'react-dom'
import { useEffect, useId, useRef } from 'react'
import { Link } from 'react-router-dom'
import { REGISTER_MODAL_CARDS } from '@/features/home/data/homeContent'

const ACCENT = {
  emerald: {
    ring: 'hover:border-emerald-400/40 focus-within:border-emerald-400/50',
    btn: 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-300',
  },
  sky: {
    ring: 'hover:border-sky-400/40 focus-within:border-sky-400/50',
    btn: 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/25 hover:bg-sky-300',
    badge: 'bg-sky-500/15 text-sky-200',
  },
}

export function RegisterModal({ isOpen, onClose }) {
  const titleId = useId()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        aria-label="Close registration dialog"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-3xl rounded-[1.75rem] border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-black/40 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Get started
            </p>
            <h2
              id={titleId}
              className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Create your account
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
              Choose how you want to join Urban Community. You can register as a
              citizen or as an organization.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="shrink-0 rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {REGISTER_MODAL_CARDS.map((card) => {
            const a = ACCENT[card.accent] ?? ACCENT.emerald
            return (
              <article
                key={card.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 transition ${a.ring}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${a.badge}`}
                  >
                    {card.id === 'civilian' ? 'Citizen' : 'Organization'}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {card.description}
                  </p>
                  <Link
                    to={card.to}
                    className={`mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition hover:scale-[1.02] ${a.btn}`}
                    onClick={onClose}
                  >
                    Continue
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>,
    document.body,
  )
}
