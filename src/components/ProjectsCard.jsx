import { FolderGit2, Rocket, FlaskConical } from 'lucide-react'
import Tile from './Tile'

export default function ProjectsCard({ onClick }) {
  return (
    <Tile area="e" fill="light" showChrome={true} label="Projects" labelAlign="center" onClick={onClick} borderRadius="200px 16px  200px 200px">
      <div className="h-full w-full" />
    </Tile>
  )
}

export function ProjectsModal() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <div className="text-base font-bold tracking-normal text-white">What these show</div>
        <div className="mt-2 text-sm text-white/85 leading-relaxed">
          I focus on product UX, clean UI hierarchy, and reliability. These projects demonstrate end‑to‑end feature
          delivery: UI, APIs, auth, and performance.
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[{ k: 'UI', v: 'Consistent' }, { k: 'UX', v: 'Clear flows' }, { k: 'Quality', v: 'Maintainable' }].map((x) => (
            <div key={x.k} className="rounded-2xl border border-white/15 bg-black/20 p-4">
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{x.k}</div>
              <div className="mt-1 text-sm font-semibold text-white/90">{x.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            title: 'Modern Portfolio',
            tag: 'Live',
            icon: Rocket,
            bullets: ['Bento layout + smooth motion', 'Fast load + clean hierarchy', 'Monochrome UI system'],
          },
          {
            title: 'E‑Commerce',
            tag: 'Live',
            icon: FolderGit2,
            bullets: ['Cart + checkout flow', 'Admin-ready structure', 'Reusable components'],
          },
          {
            title: 'Dashboard',
            tag: 'Demo',
            icon: FlaskConical,
            bullets: ['Tables + filters + charts', 'Readable data layouts', 'Performance-minded rendering'],
          },
          {
            title: 'API Service',
            tag: 'WIP',
            icon: FolderGit2,
            bullets: ['Auth + validation', 'Error handling patterns', 'Clean API contracts'],
          },
        ].map((p) => (
          <div key={p.title} className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <p.icon size={16} className="mt-0.5 shrink-0 text-white/50" />
                <div>
                  <div className="text-sm font-semibold text-white">{p.title}</div>
                  <ul className="mt-2 space-y-1 text-xs text-white/75">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2"><span className="text-white/45">-</span><span>{b}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] text-white/70">
                {p.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <div className="text-base font-bold tracking-normal text-white">Want details?</div>
        <div className="mt-2 text-sm text-white/80">
          If you want links, screenshots, or a walkthrough, open the Contacts section and message me.
        </div>
      </div>
    </div>
  )
}
