import { User, Mail, Phone } from 'lucide-react'
import Tile from './Tile'

export default function AboutCard({ onClick }) {
  return (
    <Tile area="b" fill="dark" showChrome={true} label="About Me" labelAlign="center" onClick={onClick} borderRadius="200px 200px 200px 16px">
      <div className="h-full w-full" />
    </Tile>
  )
}

export function AboutModal() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center">
            <User size={18} className="text-white/80" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-normal text-white">Khusleec</div>
            <div className="mt-1 text-sm text-white/65">Full Stack Developer</div>
          </div>
        </div>

        <div className="mt-4 text-sm text-white/85 leading-relaxed">
          I enjoy building modern web products with strong UX, clear UI hierarchy, and reliable APIs. I care about
          performance, accessibility, and code quality.
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
          <div className="text-sm font-bold tracking-normal text-white">Strengths</div>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li className="flex gap-2"><span className="text-white/55">-</span><span>UI components + design systems</span></li>
            <li className="flex gap-2"><span className="text-white/55">-</span><span>APIs, auth, and data modeling</span></li>
            <li className="flex gap-2"><span className="text-white/55">-</span><span>Performance and smooth interactions</span></li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
          <div className="text-sm font-bold tracking-normal text-white">Working style</div>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li className="flex gap-2"><span className="text-white/55">-</span><span>Clear communication and fast iteration</span></li>
            <li className="flex gap-2"><span className="text-white/55">-</span><span>Ship small → improve continuously</span></li>
            <li className="flex gap-2"><span className="text-white/55">-</span><span>Readable, maintainable code</span></li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <div className="text-base font-bold tracking-normal text-white">Contact</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Mail size={12} /> Email
            </div>
            <a
              className="mt-1 block text-sm text-white/90 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/50"
              href="mailto:khuselsuren@gmail.com"
            >
              khuselsuren@gmail.com
            </a>
          </div>
          <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Phone size={12} /> Phone
            </div>
            <a
              className="mt-1 block text-sm text-white/90 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/50"
              href="tel:86566676"
            >
              86566676
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
