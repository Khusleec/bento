import { AnimatePresence, motion } from 'framer-motion'

export default function ModalShell({ open, title, onClose, children }) {
  return (
    <AnimatePresence>
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
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <motion.div
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border-2 border-accent bg-black/50 backdrop-blur-xl"
              initial={{ y: 16, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 16, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]" />
              <div className="pointer-events-none absolute inset-2 rounded-[inherit] border border-white/15" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.10] via-transparent to-transparent" />

              <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="text-base font-semibold tracking-wide text-white">{title}</div>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white transition"
                >
                  ×
                </button>
              </div>
              <motion.div
                className="relative max-h-[75vh] overflow-auto p-6 text-white/90"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
              >
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
