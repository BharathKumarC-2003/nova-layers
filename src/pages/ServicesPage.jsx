import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Footer from '../components/Footer/Footer.jsx'
import '../styles/services-page.css'

gsap.registerPlugin(ScrollTrigger)

function ServicesPage({ onNavigate }) {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =====================================================
         SERVICES SECTION
         ===================================================== */

      const serviceCards = gsap.utils.toArray(
        '.service-card'
      )

      serviceCards.forEach((card) => {
        const badge = card.querySelector(
          '.service-card__badge'
        )

        const icon = card.querySelector(
          '.service-card__icon'
        )

        const content = card.querySelector(
          '.service-card__content'
        )

        const line = card.querySelector(
          '.service-card__line'
        )

        const number = card.querySelector(
          '.service-card__number'
        )

        const elements = [
          badge,
          icon,
          content,
          number,
        ].filter(Boolean)

        gsap.set(elements, {
          opacity: 0,
          y: 35,
        })

        if (line) {
          gsap.set(line, {
            scaleX: 0,
          })
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions:
              'play none none reverse',
          },
        })

        timeline.to(line, {
          scaleX: 1,
          duration: 0.7,
          ease: 'power3.out',
        })

        timeline.to(
          number,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power3.out',
          },
          '-=0.45'
        )

        timeline.to(
          badge,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'back.out(1.6)',
          },
          '-=0.25'
        )

        timeline.to(
          icon,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )

        timeline.to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power4.out',
          },
          '-=0.4'
        )
      })

      /* =====================================================
         SERVICE CARD HOVER
         ===================================================== */

      serviceCards.forEach((card) => {
        const badge = card.querySelector(
          '.service-card__badge'
        )

        const icon = card.querySelector(
          '.service-card__icon'
        )

        const glow = card.querySelector(
          '.service-card__glow'
        )

        const number = card.querySelector(
          '.service-card__number'
        )

        const handleEnter = () => {
          gsap.to(card, {
            y: -8,
            duration: 0.35,
            ease: 'power3.out',
          })

          gsap.to(badge, {
            y: -5,
            scale: 1.03,
            duration: 0.35,
            ease: 'power3.out',
          })

          gsap.to(icon, {
            y: -5,
            scale: 1.06,
            rotation: 2,
            duration: 0.35,
            ease: 'power3.out',
          })

          gsap.to(glow, {
            opacity: 1,
            scale: 1.08,
            duration: 0.45,
            ease: 'power2.out',
          })

          gsap.to(number, {
            color: '#ffffff',
            duration: 0.25,
          })
        }

        const handleLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: 'power3.out',
          })

          gsap.to(badge, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
          })

          gsap.to(icon, {
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'power3.out',
          })

          gsap.to(glow, {
            opacity: 0.5,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          })

          gsap.to(number, {
            color: 'rgba(255,255,255,0.35)',
            duration: 0.25,
          })
        }

        card.addEventListener(
          'mouseenter',
          handleEnter
        )

        card.addEventListener(
          'mouseleave',
          handleLeave
        )

        card._novaEnter = handleEnter
        card._novaLeave = handleLeave
      })

      /* =====================================================
         IMPACT SECTION
         ===================================================== */

      const impactSection =
        pageRef.current?.querySelector(
          '.impact-section'
        )

      const impactVisual =
        pageRef.current?.querySelector(
          '.impact-visual'
        )

      const impactContent =
        pageRef.current?.querySelector(
          '.impact-section__content'
        )

      if (impactVisual && impactSection) {
        gsap.fromTo(
          impactVisual,
          {
            clipPath:
              'inset(15% 15% 15% 15%)',
            scale: 1.08,
            opacity: 0,
          },
          {
            clipPath:
              'inset(0% 0% 0% 0%)',
            scale: 1,
            opacity: 1,

            scrollTrigger: {
              trigger: impactSection,
              start: 'top 78%',
              end: 'top 25%',
              scrub: 1,
            },
          }
        )

        const rings =
          impactVisual.querySelector(
            '.impact-visual__rings'
          )

        if (rings) {
          gsap.to(rings, {
            rotation: 360,
            duration: 22,
            repeat: -1,
            ease: 'none',
          })
        }
      }

      if (impactContent && impactSection) {
        const elements =
          impactContent.querySelectorAll(
            '.impact-section__label, .impact-section__heading, .impact-section__description, .impact-section__info, .impact-section__cta'
          )

        gsap.set(elements, {
          y: 45,
          opacity: 0,
        })

        gsap.to(elements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.out',

          scrollTrigger: {
            trigger: impactSection,
            start: 'top 72%',
            toggleActions:
              'play none none reverse',
          },
        })
      }

      /* =====================================================
         IMPACT PARALLAX
         ===================================================== */

      if (impactVisual && impactSection) {
        gsap.to(impactVisual, {
          y: -35,
          ease: 'none',

          scrollTrigger: {
            trigger: impactSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }

      /* =====================================================
         REFRESH
         ===================================================== */

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 300)

      return () => {
        clearTimeout(refreshTimer)

        serviceCards.forEach((card) => {
          if (card._novaEnter) {
            card.removeEventListener(
              'mouseenter',
              card._novaEnter
            )
          }

          if (card._novaLeave) {
            card.removeEventListener(
              'mouseleave',
              card._novaLeave
            )
          }
        })
      }
    }, pageRef)

    return () => {
      ctx.revert()
    }
  }, [])

  /* ==========================================================
     NAVIGATION
     ========================================================== */

  const handleNavigate = (path) => {
    if (onNavigate) {
      onNavigate(path)
    }
  }

  return (
    <div
      className="services-page"
      ref={pageRef}
    >

      {/* =====================================================
          SERVICES
          ===================================================== */}

      <section className="services-section">

        <div className="services-section__header">

          <div className="services-section__eyebrow">
            NOVA / CAPABILITIES
          </div>

          <div className="services-section__header-grid">

            <div>
              <h1 className="services-section__title">
                OUR
                <span>SERVICES</span>
              </h1>
            </div>

            <div className="services-section__intro">

              <p>
                Strategy, design, technology and
                growth — connected into one
                digital system.
              </p>

              <span className="services-section__scroll">
                06 DISCIPLINES / ONE SYSTEM
              </span>

            </div>

          </div>

          <div className="services-section__top-line" />

        </div>


        {/* =================================================
            SERVICE GRID
            ================================================= */}

        <div className="services-grid">

          {/* 01 */}

          <article className="service-card service-card--left">

            <div className="service-card__glow" />

            <div className="service-card__line" />

            <div className="service-card__number">
              01
            </div>

            <div className="service-card__badge">

              <span>
                01
              </span>

              <small>
                WEB
              </small>

            </div>

            <div className="service-card__icon service-card__icon--code">

              <svg
                viewBox="0 0 80 80"
                fill="none"
              >

                <path
                  d="M31 24L18 40L31 56"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <path
                  d="M49 24L62 40L49 56"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <path
                  d="M44 18L36 62"
                  stroke="currentColor"
                  strokeWidth="3"
                />

              </svg>

            </div>

            <div className="service-card__content">

              <span className="service-card__index">
                DIGITAL / 001
              </span>

              <h2>
                WEB
                <strong>DEVELOPMENT</strong>
              </h2>

              <p>
                High-performance digital experiences
                engineered around clarity, speed and
                conversion. Responsive websites built
                with purpose on every screen.
              </p>

              <div className="service-card__tags">

                <span>REACT</span>
                <span>SHOPIFY</span>
                <span>WORDPRESS</span>
                <span>PERFORMANCE</span>

              </div>

              <a
                href="/contact"
                className="service-card__cta"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate('/contact')
                }}
              >
                BUILD WITH NOVA
                <span>↗</span>
              </a>

            </div>

          </article>


          {/* 02 */}

          <article className="service-card service-card--right">

            <div className="service-card__glow" />

            <div className="service-card__line" />

            <div className="service-card__number">
              02
            </div>

            <div className="service-card__badge">

              <span>
                02
              </span>

              <small>
                UI / UX
              </small>

            </div>

            <div className="service-card__icon service-card__icon--design">

              <svg
                viewBox="0 0 80 80"
                fill="none"
              >

                <circle
                  cx="40"
                  cy="40"
                  r="21"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <path
                  d="M40 19V61"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M19 40H61"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle
                  cx="40"
                  cy="40"
                  r="5"
                  fill="currentColor"
                />

              </svg>

            </div>

            <div className="service-card__content">

              <span className="service-card__index">
                DIGITAL / 002
              </span>

              <h2>
                UI / UX
                <strong>DESIGN</strong>
              </h2>

              <p>
                Interfaces shaped around real
                behaviour. We transform complex
                requirements into simple, intuitive
                and refined digital journeys.
              </p>

              <div className="service-card__tags">

                <span>UX STRATEGY</span>
                <span>WIREFRAMES</span>
                <span>UI SYSTEMS</span>
                <span>PROTOTYPING</span>

              </div>

              <a
                href="/contact"
                className="service-card__cta"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate('/contact')
                }}
              >
                BUILD WITH NOVA
                <span>↗</span>
              </a>

            </div>

          </article>


          {/* 03 */}

          <article className="service-card service-card--left">

            <div className="service-card__glow" />

            <div className="service-card__line" />

            <div className="service-card__number">
              03
            </div>

            <div className="service-card__badge">

              <span>
                03
              </span>

              <small>
                GROWTH
              </small>

            </div>

            <div className="service-card__icon service-card__icon--growth">

              <svg
                viewBox="0 0 80 80"
                fill="none"
              >

                <path
                  d="M17 57L31 43L40 51L62 24"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <path
                  d="M49 24H62V37"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <circle
                  cx="17"
                  cy="57"
                  r="3"
                  fill="currentColor"
                />

                <circle
                  cx="31"
                  cy="43"
                  r="3"
                  fill="currentColor"
                />

                <circle
                  cx="40"
                  cy="51"
                  r="3"
                  fill="currentColor"
                />

                <circle
                  cx="62"
                  cy="24"
                  r="3"
                  fill="currentColor"
                />

              </svg>

            </div>

            <div className="service-card__content">

              <span className="service-card__index">
                DIGITAL / 003
              </span>

              <h2>
                DIGITAL
                <strong>MARKETING</strong>
              </h2>

              <p>
                Campaign systems designed to create
                attention, generate demand and turn
                digital reach into measurable business
                momentum.
              </p>

              <div className="service-card__tags">

                <span>META ADS</span>
                <span>STRATEGY</span>
                <span>CAMPAIGNS</span>
                <span>ANALYTICS</span>

              </div>

              <a
                href="/contact"
                className="service-card__cta"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate('/contact')
                }}
              >
                BUILD WITH NOVA
                <span>↗</span>
              </a>

            </div>

          </article>


          {/* 04 */}

          <article className="service-card service-card--right">

            <div className="service-card__glow" />

            <div className="service-card__line" />

            <div className="service-card__number">
              04
            </div>

            <div className="service-card__badge">

              <span>
                04
              </span>

              <small>
                SOCIAL
              </small>

            </div>

            <div className="service-card__icon service-card__icon--social">

              <svg
                viewBox="0 0 80 80"
                fill="none"
              >

                <rect
                  x="17"
                  y="20"
                  width="46"
                  height="34"
                  rx="8"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <path
                  d="M28 54L24 64L37 54"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <circle
                  cx="30"
                  cy="37"
                  r="3"
                  fill="currentColor"
                />

                <circle
                  cx="40"
                  cy="37"
                  r="3"
                  fill="currentColor"
                />

                <circle
                  cx="50"
                  cy="37"
                  r="3"
                  fill="currentColor"
                />

              </svg>

            </div>

            <div className="service-card__content">

              <span className="service-card__index">
                DIGITAL / 004
              </span>

              <h2>
                SOCIAL MEDIA
                <strong>MARKETING</strong>
              </h2>

              <p>
                Social ecosystems built around
                consistency, relevance and strong
                visual storytelling — designed to keep
                brands present and memorable.
              </p>

              <div className="service-card__tags">

                <span>CONTENT</span>
                <span>SOCIAL STRATEGY</span>
                <span>CREATIVE</span>
                <span>GROWTH</span>

              </div>

              <a
                href="/contact"
                className="service-card__cta"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate('/contact')
                }}
              >
                BUILD WITH NOVA
                <span>↗</span>
              </a>

            </div>

          </article>


          {/* 05 */}

          <article className="service-card service-card--left">

            <div className="service-card__glow" />

            <div className="service-card__line" />

            <div className="service-card__number">
              05
            </div>

            <div className="service-card__badge">

              <span>
                05
              </span>

              <small>
                BRAND
              </small>

            </div>

            <div className="service-card__icon service-card__icon--brand">

              <svg
                viewBox="0 0 80 80"
                fill="none"
              >

                <path
                  d="M40 16L46 34L65 40L46 46L40 65L34 46L15 40L34 34L40 16Z"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <circle
                  cx="40"
                  cy="40"
                  r="5"
                  fill="currentColor"
                />

              </svg>

            </div>

            <div className="service-card__content">

              <span className="service-card__index">
                DIGITAL / 005
              </span>

              <h2>
                BRAND
                <strong>IDENTITY</strong>
              </h2>

              <p>
                Distinct identities built from
                positioning, visual language and
                communication systems that make
                brands instantly recognisable.
              </p>

              <div className="service-card__tags">

                <span>IDENTITY</span>
                <span>DIRECTION</span>
                <span>DESIGN SYSTEM</span>
                <span>BRAND LANGUAGE</span>

              </div>

              <a
                href="/contact"
                className="service-card__cta"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate('/contact')
                }}
              >
                BUILD WITH NOVA
                <span>↗</span>
              </a>

            </div>

          </article>


          {/* 06 */}

          <article className="service-card service-card--right">

            <div className="service-card__glow" />

            <div className="service-card__line" />

            <div className="service-card__number">
              06
            </div>

            <div className="service-card__badge">

              <span>
                06
              </span>

              <small>
                SEARCH
              </small>

            </div>

            <div className="service-card__icon service-card__icon--seo">

              <svg
                viewBox="0 0 80 80"
                fill="none"
              >

                <circle
                  cx="35"
                  cy="35"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <path
                  d="M49 49L64 64"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  d="M28 35L33 40L43 29"
                  stroke="currentColor"
                  strokeWidth="3"
                />

              </svg>

            </div>

            <div className="service-card__content">

              <span className="service-card__index">
                DIGITAL / 006
              </span>

              <h2>
                SEO &
                <strong>OPTIMIZATION</strong>
              </h2>

              <p>
                Search visibility and technical
                refinement engineered together —
                improving discoverability, site health,
                performance and sustainable growth.
              </p>

              <div className="service-card__tags">

                <span>SEO</span>
                <span>TECHNICAL SEO</span>
                <span>SPEED</span>
                <span>SEARCH GROWTH</span>

              </div>

              <a
                href="/contact"
                className="service-card__cta"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate('/contact')
                }}
              >
                BUILD WITH NOVA
                <span>↗</span>
              </a>

            </div>

          </article>

        </div>

      </section>


      {/* =====================================================
          LAYERING IMPACT
          ===================================================== */}

      <section className="impact-section">

        <div className="impact-section__top">

          <span>
            [ HOW WE BUILD ]
          </span>

          <span>
            NOVA / SYSTEM 002
          </span>

        </div>

        <div className="impact-section__grid">

          {/* VISUAL */}

          <div className="impact-section__visual-col">

            <div className="impact-visual">

              <div className="impact-visual__glow" />

              <div className="impact-visual__grid" />

              <div className="impact-visual__center">

                <svg
                  className="impact-visual__rings"
                  viewBox="0 0 200 200"
                >

                  <circle
                    cx="100"
                    cy="100"
                    r="82"
                  />

                  <circle
                    cx="100"
                    cy="100"
                    r="63"
                  />

                  <circle
                    cx="100"
                    cy="100"
                    r="44"
                  />

                  <circle
                    cx="100"
                    cy="100"
                    r="25"
                  />

                </svg>

                <div className="impact-visual__dot" />

                <div className="impact-visual__cross-h" />

                <div className="impact-visual__cross-v" />

                <span className="impact-visual__axis impact-visual__axis--x">
                  0.00 X
                </span>

                <span className="impact-visual__axis impact-visual__axis--y">
                  0.00 Y
                </span>

              </div>

              <span className="impact-visual__corner impact-visual__corner--tl">
                LAYER
              </span>

              <span className="impact-visual__corner impact-visual__corner--tr">
                SYSTEM
              </span>

              <span className="impact-visual__corner impact-visual__corner--bl">
                DIGITAL
              </span>

              <span className="impact-visual__corner impact-visual__corner--br">
                GROWTH
              </span>

            </div>

          </div>


          {/* CONTENT */}

          <div className="impact-section__content">

            <div className="impact-section__label">
              NOVA / METHOD
            </div>

            <h2 className="impact-section__heading">
              LAYERING
              <span>IMPACT.</span>
            </h2>

            <p className="impact-section__description">
              We bring strategy, creative direction,
              technology and growth into the same
              system. Each layer strengthens the next —
              resulting in digital work that is clear,
              purposeful and built to perform.
            </p>

            <div className="impact-section__info">

              <div className="impact-info-card">

                <span className="impact-info-card__number">
                  01
                </span>

                <h3>
                  STRATEGIC
                  FOUNDATION
                </h3>

                <p>
                  Understanding the audience,
                  problem and opportunity before
                  execution begins.
                </p>

              </div>

              <div className="impact-info-card">

                <span className="impact-info-card__number">
                  02
                </span>

                <h3>
                  CONNECTED
                  EXECUTION
                </h3>

                <p>
                  Design, development and
                  marketing aligned through one
                  creative direction.
                </p>

              </div>

            </div>

            <a
              href="/contact"
              className="impact-section__cta"
              onClick={(e) => {
                e.preventDefault()
                handleNavigate('/contact')
              }}
            >
              START A PROJECT
              <span>↗</span>
            </a>

          </div>

        </div>

      </section>

      <Footer onNavigate={onNavigate} />

    </div>
  )
}

export default ServicesPage