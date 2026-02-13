import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

const baseTile =
  'group relative h-full w-full overflow-hidden border-2 border-accent transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:-translate-y-1 hover:scale-[1.02] hover:border-white/60 hover:shadow-[0_8px_32px_-8px_rgba(0,245,208,0.2)]'

export default function Tile({
  fill = 'dark',
  label,
  area,
  onClick,
  clickable = true,
  showChrome = true,
  borderRadius = '36px',
  labelAlign = 'left',
  children,
}) {
  const fillClasses =
    fill === 'light'
      ? 'bg-white/70 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]'
      : 'bg-black/40 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
  const textClasses = fill === 'light' ? 'text-black/75' : 'text-white/75'
  const labelPosition = labelAlign === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-6'
  const innerFrame = fill === 'light' ? 'border-black/15' : 'border-white/15'

  const Comp = clickable ? motion.button : motion.div
  const compProps = clickable
    ? {
        type: 'button',
        onClick,
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 },
      }
    : {}

  const enterX = fill === 'light' ? 50 : -50
  const enterDelay =
    {
      a: 0.0,
      b: 0.04,
      c: 0.08,
      d: 0.12,
      e: 0.16,
      f: 0.2,
    }[area] ?? 0

  return (
    <Comp
      className={`${baseTile} ${fillClasses} text-left ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ gridArea: area, borderRadius }}
      {...compProps}
      initial={{ opacity: 0, x: enterX, y: 16, scale: 0.97, filter: 'blur(12px)' }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: enterDelay }}
    >
      <div className={`pointer-events-none absolute inset-2 z-[1] rounded-[inherit] border ${innerFrame}`} />

      {showChrome && (
        <>
          <div className={`absolute top-1/2 ${labelPosition} z-[2] -translate-y-1/2 transition-all duration-300 ease-out group-hover:text-white/95`}>
            <div className={`text-[1.75rem] font-black tracking-normal leading-none uppercase ${textClasses}`}>
              {label}
            </div>
          </div>
        </>
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </Comp>
  )
}
