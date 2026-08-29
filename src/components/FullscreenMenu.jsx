import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const links = [
  { label: 'HOME', description: 'Overview', href: '/' },
  { label: 'SERVICES', description: 'Capabilities', href: '/services' },
  { label: 'PORTFOLIO', description: 'Selected Work', href: '/portfolio' },
  { label: 'CONTACT', description: 'Start a Project', href: '/contact' },
]

function FullscreenMenu({ open, onClose, onNavigate }) {
  const overlayRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [open, onClose])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(overlay, { autoAlpha: 1 })
        gsap.fromTo(
          overlay,
          { clipPath: 'inset(0 0 100% 0)', yPercent: 0 },
          { duration: 0.8, clipPath: 'inset(0 0 0% 0)', ease: 'power3.out' }
        )
        gsap.from(itemsRef.current, {
          duration: 0.8,
          y: 32,
          opacity: 0,
          stagger: 0.08,
          ease: 'power3.out',
        })
      } else {
        gsap.to(overlay, {
          duration: 0.55,
          clipPath: 'inset(0 0 100% 0)',
          ease: 'power3.inOut',
          onComplete: () => gsap.set(overlay, { autoAlpha: 0 }),
        })
      }
    }, overlay)

    return () => ctx.revert()
  }, [open])

  return (
    <div className="menu-overlay" ref={overlayRef} aria-hidden={!open}>
      <div className="menu-overlay__inner">
        <div className="menu-top">
          <div className="menu-top__brand">
            <span>NOVA LAYERS</span>
          </div>
          <button
            className="menu-top__close"
            type="button"
            onClick={onClose}
            aria-label="Close menu"
          >
            Close ×
          </button>
        </div>

        <nav className="menu-nav" aria-label="Primary navigation">
          {links.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="menu-nav__item"
              onClick={(event) => {
                event.preventDefault()
                onClose()
                onNavigate?.(item.href)
              }}
              ref={(el) => { itemsRef.current[index] = el }}
            >
              <span className="menu-nav__index">( 0{index + 1} )</span>
              <span className="menu-nav__label">{item.label}</span>
              <span className="menu-nav__desc">{item.description}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default FullscreenMenu
