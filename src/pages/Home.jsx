import { useEffect, useRef, useState } from 'react'
import DrawerShell from '../components/layout/DrawerShell'
import ExperienceCard, { ExperienceModal } from '../components/cards/ExperienceCard'
import AboutCard, { AboutModal } from '../components/cards/AboutCard'
import SkillsCard, { SkillsModal } from '../components/cards/SkillsCard'
import PhotoCard from '../components/cards/PhotoCard'
import ProjectsCard, { ProjectsModal } from '../components/cards/ProjectsCard'
import ContactsCard, { ContactsModal } from '../components/cards/ContactsCard'
import GhostCursor from '../components/effects/GhostCursor'

const sections = {
  exp: { title: 'Experience', origin: 'left', Modal: ExperienceModal },
  about: { title: 'About Me', origin: 'top', Modal: AboutModal },
  skills: { title: 'Skills', origin: 'right', Modal: SkillsModal },
  projects: { title: 'Projects', origin: 'bottom', Modal: ProjectsModal },
  contact: { title: 'Contacts', origin: 'right', Modal: ContactsModal },
}

export default function Home() {
  const [active, setActive] = useState(null)
  const [theme, setTheme] = useState('dark')
  const lastTriggerRef = useRef(null)
  const lastOriginRef = useRef('right')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const order = Object.keys(sections)
  const activeIndex = active ? order.indexOf(active) : -1
  const canNavigate = activeIndex !== -1
  const onPrev = () => {
    if (!canNavigate) return
    setActive(order[(activeIndex - 1 + order.length) % order.length])
  }
  const onNext = () => {
    if (!canNavigate) return
    setActive(order[(activeIndex + 1) % order.length])
  }

  const activeSection = active ? sections[active] : null
  const activeTitle = activeSection?.title ?? ''
  const ActiveModal = activeSection?.Modal
  const activeBody = ActiveModal ? <ActiveModal /> : null

  const openSection = (section, event) => {
    lastTriggerRef.current = event?.currentTarget ?? null
    lastOriginRef.current = sections[section]?.origin ?? 'right'
    setActive(section)
  }

  return (
    <section className="relative h-screen p-[50px] overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
      <GhostCursor />
      <div className="pointer-events-none absolute left-6 top-6 z-20 text-xs tracking-[0.28em] uppercase text-white/60">
        Khusleec's Portfolio
      </div>
      <button
        type="button"
        className="absolute right-6 top-6 z-30 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80 shadow hover:border-white/40 hover:text-white transition"
        onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      >
        {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
      <div className="background-stage topo-animate" />
      <div className="relative z-10 mx-auto h-full w-full">
        <div
          className="bento-grid w-full"
        >
          <ExperienceCard
            onClick={(e) => openSection('exp', e)}
          />
          <AboutCard
            onClick={(e) => openSection('about', e)}
          />
          <SkillsCard
            onClick={(e) => openSection('skills', e)}
          />
          <PhotoCard />
          <ProjectsCard
            onClick={(e) => openSection('projects', e)}
          />
          <ContactsCard
            onClick={(e) => openSection('contact', e)}
          />
        </div>
      </div>

      <DrawerShell
        open={Boolean(activeBody)}
        title={activeTitle}
        origin={activeSection?.origin ?? lastOriginRef.current ?? 'right'}
        motionKey={active}
        index={canNavigate ? activeIndex + 1 : undefined}
        total={order.length}
        onPrev={onPrev}
        onNext={onNext}
        onClose={() => {
          setActive(null)
          queueMicrotask(() => lastTriggerRef.current?.focus?.())
        }}
      >
        <div key={active}>{activeBody}</div>
      </DrawerShell>
    </section>
  )
}