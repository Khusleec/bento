import { useRef, useState } from 'react'
import DrawerShell from '../components/DrawerShell'
import ExperienceCard, { ExperienceModal } from '../components/ExperienceCard'
import AboutCard, { AboutModal } from '../components/AboutCard'
import SkillsCard, { SkillsModal } from '../components/SkillsCard'
import PhotoCard from '../components/PhotoCard'
import ProjectsCard, { ProjectsModal } from '../components/ProjectsCard'
import ContactsCard, { ContactsModal } from '../components/ContactsCard'
import GhostCursor from '../components/GhostCursor'

export default function Home() {
  const [active, setActive] = useState(null)
  const lastTriggerRef = useRef(null)
  const lastOriginRef = useRef('right')

  const order = ['exp', 'about', 'skills', 'projects', 'contact']
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

  const originForSection = (section) => {
    if (section === 'exp') return 'left'
    if (section === 'projects') return 'bottom'
    if (section === 'about') return 'top'
    if (section === 'contact') return 'right'
    return lastOriginRef.current ?? 'right'
  }

  const activeTitle =
    active === 'exp'
      ? 'Experience'
      : active === 'about'
        ? 'About Me'
        : active === 'skills'
          ? 'Skills'
          : active === 'projects'
            ? 'Projects'
            : active === 'contact'
              ? 'Contacts'
              : ''

  const activeBody =
    active === 'exp' ? (
      <ExperienceModal />
    ) : active === 'about' ? (
      <AboutModal />
    ) : active === 'skills' ? (
      <SkillsModal />
    ) : active === 'projects' ? (
      <ProjectsModal />
    ) : active === 'contact' ? (
      <ContactsModal />
    ) : null

  return (
    <section className="relative h-screen bg-black p-[50px] overflow-hidden">
      <GhostCursor />
      <div className="background-stage topo-animate" />
      <div className="relative z-10 mx-auto h-full w-full">
        <div
          className="bento-grid w-full"
        >
          <ExperienceCard
            onClick={(e) => {
              lastTriggerRef.current = e?.currentTarget ?? null
              lastOriginRef.current = 'left'
              setActive('exp')
            }}
          />
          <AboutCard
            onClick={(e) => {
              lastTriggerRef.current = e?.currentTarget ?? null
              lastOriginRef.current = 'top'
              setActive('about')
            }}
          />
          <SkillsCard
            onClick={(e) => {
              lastTriggerRef.current = e?.currentTarget ?? null
              lastOriginRef.current = 'right'
              setActive('skills')
            }}
          />
          <PhotoCard />
          <ProjectsCard
            onClick={(e) => {
              lastTriggerRef.current = e?.currentTarget ?? null
              lastOriginRef.current = 'bottom'
              setActive('projects')
            }}
          />
          <ContactsCard
            onClick={(e) => {
              lastTriggerRef.current = e?.currentTarget ?? null
              lastOriginRef.current = 'right'
              setActive('contact')
            }}
          />
        </div>
      </div>

      <DrawerShell
        open={Boolean(activeBody)}
        title={activeTitle}
        origin={active ? originForSection(active) : 'right'}
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