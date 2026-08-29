import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import '../../styles/growth-cta.css'

gsap.registerPlugin(ScrollTrigger)

function GrowthCTA({ onNavigate }) {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const content = contentRef.current

    if (!wrapper || !content) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(
        '.growth-cta__stagger-item',
        content
      )

      const waves = gsap.utils.toArray(
        '.growth-cta__wave',
        wrapper
      )

      gsap.set(items, {
        autoAlpha: 1,
        y: 0,
        force3D: true,
      })

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${window.innerHeight}`,
        pin: wrapper,
        pinSpacing: true,
        pinType: 'transform',
        anticipatePin: 1,
        invalidateOnRefresh: true,
      })

      waves.forEach((wave, index) => {
        gsap.to(wave, {
          xPercent: index % 2 === 0 ? 6 : -6,
          duration: 12 + index * 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          force3D: true,
          overwrite: 'auto',
        })
      })
    }, wrapper)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={wrapperRef}
      className="growth-cta__wrapper"
      aria-labelledby="growth-cta-heading"
    >
      <div className="growth-cta__panel">

        {/* BACKGROUND GLOW */}

        <div
          className="growth-cta__background-glow"
          aria-hidden="true"
        />

        {/* WAVES */}

        <div
          className="growth-cta__waves"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1600 700"
            preserveAspectRatio="none"
          >
            <path
              className="growth-cta__wave growth-cta__wave--one"
              d="
                M-150 380
                C120 100 340 105 540 320
                C720 515 880 515 1070 290
                C1240 90 1430 125 1750 360
              "
            />

            <path
              className="growth-cta__wave growth-cta__wave--two"
              d="
                M-140 470
                C100 500 320 190 545 230
                C760 270 860 480 1070 350
                C1260 235 1450 230 1750 470
              "
            />

            <path
              className="growth-cta__wave growth-cta__wave--three"
              d="
                M-140 275
                C90 450 310 490 545 245
                C780 10 960 170 1130 345
                C1300 520 1490 470 1750 230
              "
            />
          </svg>
        </div>

        {/* CONTENT */}

        <div
          ref={contentRef}
          className="growth-cta__content"
        >

          <span
            className="
              growth-cta__eyebrow
              growth-cta__stagger-item
            "
          >
            LET&apos;S GROW TOGETHER
          </span>

          <h2
            id="growth-cta-heading"
            className="
              growth-cta__heading
              growth-cta__stagger-item
            "
          >
            Ready to Grow
            <br />
            Your Business?
          </h2>

          <p
            className="
              growth-cta__copy
              growth-cta__stagger-item
            "
          >
            Let&apos;s create something remarkable
            together and take your brand to the next
            level.
          </p>

          <a
            href="/contact"
            onClick={(event) => {
              event.preventDefault()
              onNavigate?.('/contact')
            }}
            className="
              growth-cta__button
              growth-cta__stagger-item
            "
          >
            <span>Start Your Project</span>

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 12h12m0 0l-4-4m4 4l-4 4" />
            </svg>
          </a>

        </div>

      </div>
    </section>
  )
}

export default GrowthCTA