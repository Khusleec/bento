import { Mail, Phone } from 'lucide-react'
import Tile from './Tile'

export default function ContactsCard({ onClick }) {
  return (
    <Tile
      area="f"
      fill="light"
      showChrome={true}
      label="Contacts"
      labelAlign="center"
      labelRestPosition="top-left"
      onClick={onClick}
      borderRadius="15px 50% 50% 50%"
    >
      <div className="h-full w-full" />
    </Tile>
  )
}

export function ContactsModal() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-base font-bold tracking-normal text-white">Contact</div>
            <div className="mt-2 text-sm text-white/80 leading-relaxed">
              Open to opportunities. I respond quickly and communicate clearly.
            </div>
          </div>
          <div className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">Open to work</div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[{ k: 'Response', v: 'Fast' }, { k: 'Timezone', v: 'UTC+8' }, { k: 'Preferred', v: 'Email' }].map((x) => (
            <div key={x.k} className="rounded-2xl border border-white/15 bg-black/20 p-4">
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{x.k}</div>
              <div className="mt-1 text-sm font-semibold text-white/90">{x.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-5 flex items-start gap-3">
          <Mail size={16} className="mt-0.5 shrink-0 text-white/50" />
          <div>
            <div className="text-sm font-bold tracking-normal text-white">Email</div>
            <a
              className="mt-2 inline-block text-sm text-white/90 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/50"
              href="mailto:khuselsuren@gmail.com"
            >
              khuselsuren@gmail.com
            </a>
            <div className="mt-2 text-xs text-white/60">Best for project details and scheduling.</div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-5 flex items-start gap-3">
          <Phone size={16} className="mt-0.5 shrink-0 text-white/50" />
          <div>
            <div className="text-sm font-bold tracking-normal text-white">Phone</div>
            <a
              className="mt-2 inline-block text-sm text-white/90 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/50"
              href="tel:86566676"
            >
              86566676
            </a>
            <div className="mt-2 text-xs text-white/60">Available for quick calls.</div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
        <div className="text-base font-bold tracking-normal text-white">Quick note</div>
        <div className="mt-2 text-sm text-white/80">
          Send the role, timeline, and any links/specs — I’ll reply with availability.
        </div>
      </div>
    </div>
  )
}
