import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import logo70mm from '../../assets/Brands/70mm logo.png'
import logoBhairava from '../../assets/Brands/Bhairava apparels logo.png'
import logoCoolInCool from '../../assets/Brands/cool in cool logo.png'
import logoEra from '../../assets/Brands/era logo.png'
import logoNovaGarments from '../../assets/Brands/Nova Garments logo.png'
import logoShera from '../../assets/Brands/shera.png'
import logoShe from '../../assets/Brands/she.jpeg'
import logovault from '../../assets/Brands/vault.png'

import './BrandMarquee.css'

gsap.registerPlugin(ScrollTrigger)

const brandLogos = [
  {
    name: '70mm',
    logo: logo70mm,
  },
  {
    name: 'Bhairava Apparels',
    logo: logoBhairava,
  },
  {
    name: 'Era',
    logo: logoEra,
  },
  {
    name: 'Shera',
    logo: logoShera,
  },
   {
    name: 'She',
    logo: logoShe,
  },
    {
    name: 'vault',
    logo: logovault,
  },
   {
    name: 'Cool in Cool',
    logo: logoCoolInCool,
  },
   {
    name: 'Nova Garments',
    logo: logoNovaGarments,
  },
]

function BrandMarquee() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  const marqueeTweenRef = useRef(null)
  const hoverPausedRef = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current

    if (!section || !track) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const ctx = gsap.context(() => {
      /* =====================================================
         SECTION HEADING REVEAL
      ===================================================== */

      gsap.fromTo(
        '.nova-brands__heading-line > span',
        {
          yPercent: 115,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.nova-brands__intro',
        {
          y: 18,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            once: true,
          },
        }
      )

      /* =====================================================
         TAGLINE REVEAL
      ===================================================== */

      gsap.fromTo(
        '.nova-brands__tagline',
        {
          y: 18,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      )

      /* =====================================================
         MARQUEE
      ===================================================== */

      if (!reducedMotion) {
        marqueeTweenRef.current = gsap.to(track, {
          xPercent: -50,
          duration: 32,
          ease: 'none',
          repeat: -1,
        })
      }
    }, section)

    /* =====================================================
       LOGO HOVER PAUSE
    ===================================================== */

    const logos = track.querySelectorAll(
      '.nova-brands__logo'
    )

    const pauseMarquee = () => {
      hoverPausedRef.current = true

      if (marqueeTweenRef.current) {
        marqueeTweenRef.current.pause()
      }
    }

    const resumeMarquee = () => {
      hoverPausedRef.current = false

      if (
        marqueeTweenRef.current &&
        !reducedMotion
      ) {
        marqueeTweenRef.current.resume()
      }
    }

    logos.forEach((logo) => {
      logo.addEventListener(
        'mouseenter',
        pauseMarquee
      )

      logo.addEventListener(
        'mouseleave',
        resumeMarquee
      )
    })

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      logos.forEach((logo) => {
        logo.removeEventListener(
          'mouseenter',
          pauseMarquee
        )

        logo.removeEventListener(
          'mouseleave',
          resumeMarquee
        )
      })

      marqueeTweenRef.current?.kill()

      ctx.revert()
    }
  }, [])

  const repeatedBrands = [
    ...brandLogos,
    ...brandLogos,
  ]

  return (
    <section
      className="nova-brands"
      ref={sectionRef}
      aria-label="Our brands"
    >

      <div className="nova-brands__inner">

        {/* =================================================
            TOP CONTENT
        ================================================= */}

        <div className="nova-brands__top">

          <div>

            <div className="nova-brands__eyebrow">
              Selected collaborations
            </div>

            <h2 className="nova-brands__heading">

              <span className="nova-brands__heading-line">
                <span>BRANDS WE</span>
              </span>

              <span className="nova-brands__heading-line nova-brands__heading-line--ghost">
                <span>BUILD WITH.</span>
              </span>

            </h2>

          </div>

          <p className="nova-brands__intro">
            Partnering with ambitious brands to shape
            memorable digital identities, sharper
            experiences, and work built to move forward.
          </p>

        </div>


        {/* =================================================
            BRAND MARQUEE
        ================================================= */}

        <div className="nova-brands__brand-area">

          <div className="nova-brands__tagline">
            Brands that trust us to shape what’s next
          </div>

          <div className="nova-brands__stage">

            <div className="nova-brands__marquee">

              <div
                className="nova-brands__track"
                ref={trackRef}
              >

                {repeatedBrands.map(
                  (brand, index) => (

                    <div
                      className="nova-brands__item"
                      key={`${brand.name}-${index}`}
                    >

                      <img
                        className="nova-brands__logo"
                        src={brand.logo}
                        alt={brand.name}
                        draggable="false"
                        loading="lazy"
                      />

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className="nova-brands__footer"
          aria-hidden="true"
        >

          <span>
            Nova Layers / Selected Network
          </span>

          <span className="nova-brands__footer-line" />

          <span>
            Infinite Creative Studio
          </span>

        </div>

      </div>

    </section>
  )
}

export default BrandMarquee