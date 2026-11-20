import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ease = 'expo.out'

function playHero() {
  if (!document.querySelector('.hero-banner')) return
  gsap.timeline({ defaults: { ease } })
    .from('.hero-media img', { scale: 1.12, opacity: 0, duration: 2.4 })
    .from('.hero-wordmark', { y: 48, opacity: 0, duration: 1.6 }, 0.25)
    .from('.hero-content .lede', { y: 24, opacity: 0, duration: 1.2 }, 0.6)
    .from('.hero-content .actions > *', { y: 20, opacity: 0, stagger: 0.12, duration: 1.1 }, 0.75)
}

function playPageHeading() {
  const heading = document.querySelector('.page-heading')
  if (!heading) return
  gsap.timeline({ defaults: { ease } })
    .from(heading.querySelector('h1'), { y: 28, opacity: 0, duration: 1.2 })
    .from(heading.querySelector('.lede'), { y: 16, opacity: 0, duration: 1 }, 0.3)
}

function revealSections() {
  const sections = document.querySelectorAll<HTMLElement>('.mission h2, .mission-text, .meeting-listing, .contact-email')
  sections.forEach((el) => {
    gsap.from(el, {
      y: 32,
      opacity: 0,
      duration: 1.2,
      ease,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
  })
}

function revealTimeline() {
  const timeline = document.querySelector<HTMLElement>('.leadership-timeline')
  if (!timeline) return
  const trigger = { trigger: timeline, start: 'top 80%', once: true }
  gsap.fromTo(timeline, { '--line': 0 }, { '--line': 1, duration: 1.8, ease: 'power2.out', scrollTrigger: trigger })
  gsap.from(timeline.querySelectorAll('.timeline-item'), { y: 40, opacity: 0, duration: 1.1, ease, stagger: 0.14, scrollTrigger: trigger })
}

function revealChannels() {
  const channels = document.querySelector<HTMLElement>('.channels')
  if (!channels) return
  gsap.from(channels.querySelectorAll('li'), {
    x: -24,
    opacity: 0,
    duration: 1,
    ease,
    stagger: 0.1,
    scrollTrigger: { trigger: channels, start: 'top 85%', once: true },
  })
}

function leadershipPanels() {
  const details = Array.from(document.querySelectorAll<HTMLDetailsElement>('.timeline-term'))
  const panels = details.flatMap((item) => {
    const summary = item.querySelector('summary')
    const body = item.querySelector<HTMLElement>('summary + *')
    if (!summary || !body) return []
    let busy = false

    const close = () => {
      if (!item.open || busy) return
      busy = true
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          item.open = false
          gsap.set(body, { clearProps: 'height,opacity' })
          busy = false
        },
      })
    }

    const open = () => {
      busy = true
      item.open = true
      gsap.fromTo(body, { height: 0, opacity: 0 }, {
        height: 'auto',
        opacity: 1,
        duration: 0.65,
        ease,
        onComplete: () => {
          gsap.set(body, { clearProps: 'height,opacity' })
          busy = false
        },
      })
    }

    summary.addEventListener('click', (event) => {
      event.preventDefault()
      if (busy) return
      if (item.open) {
        close()
        return
      }
      panels.forEach((other) => { if (other.item !== item) other.close() })
      open()
    })

    return [{ item, close }]
  })
}

function mobileMenu() {
  const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu')
  const summary = menu?.querySelector('summary')
  const nav = menu?.querySelector<HTMLElement>('.mobile-nav')
  if (!menu || !summary || !nav) return
  const links = nav.querySelectorAll('a')
  let closing = false

  menu.addEventListener('toggle', () => {
    const icon = menu.open ? menu.querySelector('.menu-close-icon') : menu.querySelector('.menu-open-icon')
    if (icon) gsap.fromTo(icon, { rotate: -90, opacity: 0 }, { rotate: 0, opacity: 1, duration: 0.5, ease })
    if (menu.open) {
      gsap.fromTo(links, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease })
    }
  })

  const close = () => {
    if (!menu.open || closing) return
    closing = true
    gsap.to(links, { y: -8, opacity: 0, duration: 0.2, stagger: 0.03, ease: 'power2.in' })
    gsap.to(nav, {
      opacity: 0,
      y: -8,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        menu.open = false
        gsap.set([nav, links], { clearProps: 'opacity,transform' })
        closing = false
      },
    })
  }

  summary.addEventListener('click', (event) => {
    if (!menu.open) return
    event.preventDefault()
    close()
  })

  document.addEventListener('click', (event) => {
    if (menu.open && !menu.contains(event.target as Node)) close()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close()
  })
}

export function initMotion() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  playHero()
  playPageHeading()
  revealSections()
  revealTimeline()
  revealChannels()
  leadershipPanels()
  mobileMenu()
}
