import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function DrawerShell({
  open,
  title,
  index,
  total,
  onPrev,
  onNext,
  onClose,
  children,
  origin = 'right',
  motionKey,
}) {
  const panelRef = useRef(null)
  const titleIdRef = useRef(`drawer-title-${Math.random().toString(36).slice(2)}`)

  const placement = useMemo(() => {
    if (origin === 'left') {
      return {
        panelClass:
          'fixed left-0 top-0 z-50 h-dvh w-full max-w-[720px] border-r-2 border-[var(--drawer-border)] bg-[var(--drawer-bg)] backdrop-blur-xl outline-none',
        initial: { x: -40, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -40, opacity: 0 },
      }
    }

    if (origin === 'top') {
      return {
        panelClass:
          'fixed left-0 top-0 z-50 w-full max-h-[720px] h-[70dvh] border-b-2 border-[var(--drawer-border)] bg-[var(--drawer-bg)] backdrop-blur-xl outline-none',
        initial: { y: -40, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -40, opacity: 0 },
      }
    }

    if (origin === 'bottom') {
      return {
        panelClass:
          'fixed left-0 bottom-0 z-50 w-full max-h-[720px] h-[70dvh] border-t-2 border-[var(--drawer-border)] bg-[var(--drawer-bg)] backdrop-blur-xl outline-none',
        initial: { y: 40, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 40, opacity: 0 },
      }
    }

    return {
      panelClass:
        'fixed right-0 top-0 z-50 h-dvh w-full max-w-[720px] border-l-2 border-[var(--drawer-border)] bg-[var(--drawer-bg)] backdrop-blur-xl outline-none',
      initial: { x: 40, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 40, opacity: 0 },
    }
  }, [origin])

  const getFocusable = () => {
    const root = panelRef.current
    if (!root) return []
    const nodes = root.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    return Array.from(nodes).filter((el) => {
      const isHidden = el.getAttribute('aria-hidden') === 'true'
      const isDisabled = el.hasAttribute('disabled')
      return !isHidden && !isDisabled && el instanceof HTMLElement
    })
  }

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose, onPrev, onNext])

  useEffect(() => {
    if (!open) return
    panelRef.current?.focus?.()
  }, [open])

  useEffect(() => {
    if (!open) return
    const t = window.requestAnimationFrame(() => {
      const focusables = getFocusable()
      ;(focusables[0] ?? panelRef.current)?.focus?.()
    })
    return () => window.cancelAnimationFrame(t)
  }, [open])

  const onPanelKeyDown = (e) => {
    if (e.key !== 'Tab') return

    const focusables = getFocusable()
    if (focusables.length === 0) {
      e.preventDefault()
      panelRef.current?.focus?.()
      return
    }

    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const activeEl = document.activeElement

    if (e.shiftKey) {
      if (activeEl === first || activeEl === panelRef.current) {
        e.preventDefault()
        last.focus()
      }
    } else if (activeEl === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close"
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            key={motionKey ?? title}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleIdRef.current}
            tabIndex={-1}
            onKeyDown={onPanelKeyDown}
            className={placement.panelClass}
            initial={placement.initial}
            animate={placement.animate}
            exit={placement.exit}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-white/10">
              <div className="min-w-0">
                <div id={titleIdRef.current} className="text-xl font-bold tracking-normal text-white truncate">
                  {title}
                </div>
                {typeof index === 'number' && typeof total === 'number' && (
                  <div className="mt-1 text-xs tracking-wider uppercase text-white/55">
                    {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  className="h-10 w-10 rounded-xl border border-white/15 bg-white/5 text-white/85 hover:text-white transition"
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="h-10 w-10 rounded-xl border border-white/15 bg-white/5 text-white/85 hover:text-white transition"
                  aria-label="Next"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 w-10 rounded-xl border border-white/15 bg-white/5 text-white/85 hover:text-white transition"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="max-h-[calc(100dvh-84px)] overflow-auto p-6 text-white/90">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
