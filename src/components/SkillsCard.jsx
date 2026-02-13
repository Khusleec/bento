import { MonitorSmartphone, Server, Wrench } from 'lucide-react'
import Tile from './Tile'

export default function SkillsCard({ onClick }) {
  return (
    <Tile area="c" fill="light" showChrome={true} label="Skills" labelAlign="center" onClick={onClick} borderRadius="50% 50% 50% 16px">
      <div className="h-full w-full" />
    </Tile>
  )
}

export function SkillsModal() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <div className="text-base font-bold tracking-normal text-white">Overview</div>
        <div className="mt-2 text-sm text-white/85 leading-relaxed">
          Strong across frontend and backend with a focus on building readable UI systems, clean APIs, and smooth,
          performant experiences.
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
          <div className="flex items-center gap-2">
            <MonitorSmartphone size={16} className="text-white/60" />
            <div className="text-sm font-bold tracking-normal text-white">Frontend</div>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li className="flex gap-2"><span className="text-white/55">-</span><span>React component architecture + state patterns</span></li>
            <li className="flex gap-2"><span className="text-white/55">-</span><span>Tailwind UI, responsive layouts, accessibility</span></li>
            <li className="flex gap-2"><span className="text-white/55">-</span><span>Motion & micro-interactions, polished UX</span></li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
          <div className="flex items-center gap-2">
            <Server size={16} className="text-white/60" />
            <div className="text-sm font-bold tracking-normal text-white">Backend</div>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li className="flex gap-2"><span className="text-white/55">-</span><span>Node.js services, REST APIs, integrations</span></li>
            <li className="flex gap-2"><span className="text-white/55">-</span><span>Authentication, authorization, validation</span></li>
            <li className="flex gap-2"><span className="text-white/55">-</span><span>Data modeling, error handling, reliability</span></li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <div className="flex items-center gap-2">
          <Wrench size={16} className="text-white/60" />
          <div className="text-sm font-bold tracking-normal text-white">Tooling</div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Vite', 'Git', 'CI', 'Deploy', 'Perf'].map((t) => (
            <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
