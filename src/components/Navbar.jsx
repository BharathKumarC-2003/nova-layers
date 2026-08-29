import { useEffect } from 'react'

import novaLayersLogo from '../assets/nova logo 2.png'

const navItems = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
]

function Navbar({ onNavigate, cinematic, route }) {
  useEffect(() => {
    const nav = document.querySelector('.navbar')
    if (!nav) return

    const onScroll = () => {
      nav.classList.toggle('navbar--scrolled', window.scrollY > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${cinematic ? 'navbar--cinematic' : ''}`}>
      <nav className="navbar__inner" aria-label="Main navigation">
        <button
          type="button"
          className="navbar__brand"
          onClick={() => onNavigate?.('/')}
          aria-label="Go to home"
        >
          <img
            src={novaLayersLogo}
            alt="Nova Layers"
            className="navbar__logo"
          />
        </button>

        <div className="navbar__links">
          {navItems.map((item) => {
            const isActive = route === item.href
            return (
              <button
                key={item.href}
                type="button"
                className={`navbar__link ${isActive ? 'is-active' : ''}`}
                onClick={() => onNavigate?.(item.href)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
