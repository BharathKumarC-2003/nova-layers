import { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar.jsx'
import FullscreenMenu from './components/FullscreenMenu.jsx'
import Home from './pages/Home.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import PortfolioPage from './pages/PortfolioPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import CareersPage from './pages/CareersPage.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsConditions from './pages/TermsConditions.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import NovaGridBackground from './components/NovaGridBackground.jsx'
import { resetScrollPosition } from './lib/scroll.js'
import './styles/globals.css'
import './styles/navbar.css'
import './styles/menu.css'
import './styles/hero.css'
import './styles/founder-team.css'
import './styles/process.css'
import './styles/cursor.css'
import './styles/depth-system.css'

function App() {
  const resolveRoute = (pathname) => {
    const path = pathname || window.location.pathname
    if (path === '/services') return '/services'
    if (path === '/portfolio') return '/portfolio'
    if (path === '/contact') return '/contact'
    if (path === '/careers') return '/careers'
    if (path === '/privacy-policy') return '/privacy-policy'
    if (path === '/terms-and-conditions') return '/terms-and-conditions'
    return '/'
  }

  const [menuOpen, setMenuOpen] = useState(false)
  const [route, setRoute] = useState(() => resolveRoute(window.location.pathname))
  const menuButtonRef = useRef(null)
  const mainRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    return () => { window.history.scrollRestoration = 'auto' }
  }, [])

  useEffect(() => {
    const handlePopState = () => setRoute(resolveRoute(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (window.location.hash) return

    resetScrollPosition()

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => cancelAnimationFrame(rafId)
  }, [route])

  const navigate = useCallback((destination) => {
    const url = destination || '/'
    const nextUrl = new URL(url, window.location.origin)
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

    const completeNavigation = () => {
      if (url !== currentUrl) {
        window.history.pushState({}, '', url)
      }

      setRoute(resolveRoute(nextUrl.pathname))

      requestAnimationFrame(() => {
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
      }
      resetScrollPosition()
      })
    }

    if (url === currentUrl) {
      completeNavigation()
      return
    }

    completeNavigation()
  }, [])

  const handleMenuToggle = () => {
    setMenuOpen((current) => !current)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <div className="app-shell">
      <SmoothScroll />
      <CustomCursor enabled={!menuOpen} />
      <NovaGridBackground
        intensity={
          route === '/'
            ? 'high'
            : route === '/contact'
              ? 'medium'
              : 'low'
        }
      />
      <div className={`page ${menuOpen ? 'page--menu-open' : ''}`}>
        <Navbar
          cinematic={route === '/'}
          onMenuToggle={handleMenuToggle}
          menuOpen={menuOpen}
          buttonRef={menuButtonRef}
          onNavigate={navigate}
          route={route}
        />
        <FullscreenMenu
          open={menuOpen}
          onClose={handleMenuClose}
          onNavigate={(path) => {
            handleMenuClose()
            navigate(path)
          }}
        />
        <main className={`page__main page-depth page-depth--${route.slice(1) || 'home'}`} ref={mainRef}>
          {route === '/services' ? (
            <ServicesPage onNavigate={navigate} />
          ) : route === '/portfolio' ? (
            <PortfolioPage onNavigate={navigate} />
          ) : route === '/contact' ? (
            <ContactPage onNavigate={navigate} />
          ) : route === '/careers' ? (
            <CareersPage onNavigate={navigate} />
          ) : route === '/privacy-policy' ? (
            <PrivacyPolicy onNavigate={navigate} />
          ) : route === '/terms-and-conditions' ? (
            <TermsConditions onNavigate={navigate} />
          ) : (
            <Home onNavigate={navigate} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
