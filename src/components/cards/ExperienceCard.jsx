import Tile from './Tile'

export default function ExperienceCard({ onClick }) {
  return (
    <Tile
      area="a"
      fill="dark"
      showChrome={true}
      label="Experience"
      labelAlign="center"
      labelRestPosition="bottom-right"
      onClick={onClick}
      borderRadius="50% 50% 16px 50%"
    >
      <div className="h-full w-full" />
    </Tile>
  )
}

export function ExperienceModal() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <div className="text-base font-bold tracking-normal text-white">Summary</div>
        <div className="mt-2 text-sm text-white/85 leading-relaxed">
          Full‑stack developer focused on shipping clean UI and reliable backend. I build end‑to‑end features: frontend,
          APIs, auth, data, deployment, and performance.
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[
            { k: 'Focus', v: 'Product UI + UX' },
            { k: 'Backend', v: 'APIs + Auth' },
            { k: 'Quality', v: 'Perf + DX' },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl border border-white/15 bg-black/20 p-4">
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{x.k}</div>
              <div className="mt-1 text-sm font-semibold text-white/90">{x.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <div className="text-base font-bold tracking-normal text-white">Impact</div>
        <ul className="mt-3 space-y-2 text-sm text-white/85">
          <li className="flex gap-2"><span className="text-white/55">-</span><span>Build responsive, accessible UI components with consistent patterns.</span></li>
          <li className="flex gap-2"><span className="text-white/55">-</span><span>Design and implement REST APIs, authentication, and data flows.</span></li>
          <li className="flex gap-2"><span className="text-white/55">-</span><span>Improve performance: loading states, caching, and UI smoothness.</span></li>
        </ul>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <div className="text-base font-bold tracking-normal text-white">Core stack</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {['React', 'Tailwind', 'Node.js', 'APIs', 'Auth', 'Vite'].map((t) => (
            <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Open to work</span>
          <span>Use the Contacts section to reach me.</span>
        </div>
      </div>
    </div>
  )
}
