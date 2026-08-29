import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Footer from '../components/Footer/Footer.jsx'
import '../styles/about.css'

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   DATA
   ========================================================= */

const whoLines = [
  'WE BELIEVE THE STRONGEST BRANDS',
  'ARE BUILT WHERE STRATEGY,',
  'CREATIVITY, TECHNOLOGY AND',
  'CULTURE WORK TOGETHER.',
  'WE TURN IDEAS INTO DIGITAL',
  'EXPERIENCES THAT FEEL DISTINCTIVE,',
  'USEFUL AND IMPOSSIBLE TO IGNORE.',
]

const engineItems = [
  {
    number: '01',
    tag: 'DIRECTION',
    title: 'STRATEGY',
    visual: 'strategy',
    copy:
      'Research, positioning and digital direction that give every project a clear foundation.',
  },
  {
    number: '02',
    tag: 'EXPERIENCE',
    title: 'DESIGN',
    visual: 'design',
    copy:
      'Brand systems and digital interfaces built with clarity, emotion and purpose.',
  },
  {
    number: '03',
    tag: 'SYSTEM',
    title: 'TECHNOLOGY',
    visual: 'technology',
    copy:
      'Fast, responsive and scalable digital experiences engineered for real users.',
  },
  {
    number: '04',
    tag: 'MOMENTUM',
    title: 'GROWTH',
    visual: 'growth',
    copy:
      'Marketing systems designed to transform attention into measurable business momentum.',
  },
]

const philosophyItems = [
  {
    number: '01',
    label: 'STRATEGY',
    title: 'THINK DEEPER',
    copy:
      'We start by understanding the business, audience, context and opportunity before designing anything.',
  },
  {
    number: '02',
    label: 'CRAFT',
    title: 'DESIGN WITH INTENT',
    copy:
      'Every visual, interaction and message should have a reason to exist.',
  },
  {
    number: '03',
    label: 'SYSTEMS',
    title: 'BUILD FOR GROWTH',
    copy:
      'We create flexible systems that can evolve as the brand and business continue to grow.',
  },
  {
    number: '04',
    label: 'IMPACT',
    title: 'MAKE IT MATTER',
    copy:
      'Good creative work should create attention, recognition and real business momentum.',
  },
]

const values = [
  {
    number: '01',
    title: 'CLARITY',
    copy: 'Good work starts with clear thinking.',
  },
  {
    number: '02',
    title: 'CRAFT',
    copy: 'Details turn ordinary work into memorable work.',
  },
  {
    number: '03',
    title: 'CURIOSITY',
    copy: 'Better questions create better ideas.',
  },
  {
    number: '04',
    title: 'IMPACT',
    copy: 'Creative work should move businesses forward.',
  },
]

/* =========================================================
   ENGINE VISUALS
   ========================================================= */

function EngineVisual({ type }) {
  if (type === 'strategy') {
    return (
      <div className="engine-art engine-art--strategy" aria-hidden="true">
        <div className="engine-art__strategy-circle engine-art__strategy-circle--1" />
        <div className="engine-art__strategy-circle engine-art__strategy-circle--2" />

        <span className="engine-art__strategy-axis engine-art__strategy-axis--x" />
        <span className="engine-art__strategy-axis engine-art__strategy-axis--y" />

        <span className="engine-art__strategy-point engine-art__strategy-point--1" />
        <span className="engine-art__strategy-point engine-art__strategy-point--2" />
        <span className="engine-art__strategy-point engine-art__strategy-point--3" />

        <div className="engine-art__strategy-core">
          <span />
        </div>
      </div>
    )
  }

  if (type === 'design') {
    return (
      <div className="engine-art engine-art--design" aria-hidden="true">
        <div className="engine-art__design-frame engine-art__design-frame--1" />
        <div className="engine-art__design-frame engine-art__design-frame--2" />
        <div className="engine-art__design-frame engine-art__design-frame--3" />

        <span className="engine-art__design-line engine-art__design-line--1" />
        <span className="engine-art__design-line engine-art__design-line--2" />

        <span className="engine-art__design-dot engine-art__design-dot--1" />
        <span className="engine-art__design-dot engine-art__design-dot--2" />
      </div>
    )
  }

  if (type === 'technology') {
    return (
      <div className="engine-art engine-art--technology" aria-hidden="true">
        <div className="engine-art__tech-core">
          <span />
          <span />
        </div>

        <span className="engine-art__tech-node engine-art__tech-node--1" />
        <span className="engine-art__tech-node engine-art__tech-node--2" />
        <span className="engine-art__tech-node engine-art__tech-node--3" />
        <span className="engine-art__tech-node engine-art__tech-node--4" />

        <span className="engine-art__tech-link engine-art__tech-link--1" />
        <span className="engine-art__tech-link engine-art__tech-link--2" />
        <span className="engine-art__tech-link engine-art__tech-link--3" />
        <span className="engine-art__tech-link engine-art__tech-link--4" />
      </div>
    )
  }

  return (
    <div className="engine-art engine-art--growth" aria-hidden="true">
      <span className="engine-art__growth-line engine-art__growth-line--1" />
      <span className="engine-art__growth-line engine-art__growth-line--2" />
      <span className="engine-art__growth-line engine-art__growth-line--3" />
      <span className="engine-art__growth-line engine-art__growth-line--4" />

      <span className="engine-art__growth-point engine-art__growth-point--1" />
      <span className="engine-art__growth-point engine-art__growth-point--2" />
      <span className="engine-art__growth-point engine-art__growth-point--3" />
      <span className="engine-art__growth-point engine-art__growth-point--4" />

      <svg
        className="engine-art__growth-curve"
        viewBox="0 0 500 300"
        preserveAspectRatio="none"
      >
        <path d="M25 260 C110 250 130 205 205 210 C280 215 296 135 365 145 C418 151 448 84 478 38" />
      </svg>

      <span className="engine-art__growth-arrow">↗</span>
    </div>
  )
}

function About({ onNavigate }) {
  const pageRef = useRef(null)

  const heroRef = useRef(null)
  const whoRef = useRef(null)
  const storyRef = useRef(null)

  const engineRef = useRef(null)
  const engineCardsRef = useRef(null)

  const philosophyRef = useRef(null)
  const philosophyTrackRef = useRef(null)

  const statementRef = useRef(null)
  const statementOneRef = useRef(null)
  const statementTwoRef = useRef(null)
  const statementThreeRef = useRef(null)

  useLayoutEffect(() => {
    const page = pageRef.current

    if (!page) return

    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      /* =====================================================
         HERO
      ===================================================== */

      gsap.set('.about-hero__line-inner', {
        yPercent: 110,
      })

      gsap.set('.about-hero__side-copy', {
        autoAlpha: 0,
        y: 22,
      })

      gsap.set('.about-hero__scroll', {
        autoAlpha: 0,
      })

      const heroTl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
      })

      heroTl
        .to('.about-hero__line-inner', {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.08,
        })
        .to(
          '.about-hero__side-copy',
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
          },
          0.4
        )
        .to(
          '.about-hero__scroll',
          {
            autoAlpha: 1,
            duration: 0.6,
          },
          0.65
        )

      gsap.fromTo(
        '.about-hero__ghost',
        {
          scale: 1.06,
          yPercent: 2,
        },
        {
          scale: 1,
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      /* =====================================================
         WHO WE ARE
      ===================================================== */

      const whoLinesEls = gsap.utils.toArray(
        '.about-who__line',
        whoRef.current
      )

      gsap.set(whoLinesEls, {
        color: 'rgba(255,255,255,0.11)',
        opacity: 0.32,
        filter: 'blur(6px)',
        force3D: true,
      })

      gsap.set('.about-who__footer', {
        opacity: 0,
        y: 22,
      })

      mm.add('(min-width: 901px)', () => {
        const whoTl = gsap.timeline({
          scrollTrigger: {
            trigger: whoRef.current,
            start: 'top top',
            end: '+=230%',
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        whoLinesEls.forEach((line) => {
          whoTl.to(line, {
            color: '#ffffff',
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.42,
            ease: 'none',
          })
        })

        whoTl.to('.about-who__footer', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'none',
        })

        whoTl.to({}, {
          duration: 0.4,
        })
      })

      mm.add('(max-width: 900px)', () => {
        whoLinesEls.forEach((line) => {
          gsap.to(line, {
            color: '#ffffff',
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: line,
              start: 'top 82%',
              end: 'top 55%',
              scrub: true,
            },
          })
        })

        gsap.to('.about-who__footer', {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: '.about-who__footer',
            start: 'top 88%',
          },
        })
      })

      /* =====================================================
         OUR STORY
      ===================================================== */

      gsap.fromTo(
        '.about-story__marker',
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 82%',
          },
        }
      )

      gsap.fromTo(
        '.about-story__heading-line',
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 76%',
          },
        }
      )

      gsap.fromTo(
        '.about-story__copy > *',
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-story__copy',
            start: 'top 84%',
          },
        }
      )

      gsap.fromTo(
        '.about-story__visual',
        {
          opacity: 0,
          scale: 0.95,
          clipPath: 'inset(8% 7% 8% 7%)',
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 78%',
          },
        }
      )

      gsap.fromTo(
        '.about-story__visual-inner',
        {
          scale: 1.08,
        },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      /* =====================================================
         WHAT POWERS US
      ===================================================== */

      mm.add('(min-width: 901px)', () => {
        const cards = gsap.utils.toArray(
          '.about-engine__card',
          engineCardsRef.current
        )

        if (!cards.length) return

        cards.forEach((card, index) => {
          gsap.set(card, {
            yPercent: index === 0 ? 0 : 108,
            scale: 1,
            opacity: 1,
            force3D: true,
          })
        })

        const engineTl = gsap.timeline({
          scrollTrigger: {
            trigger: engineRef.current,
            start: 'top top',
            end: '+=335%',
            pin: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        cards.forEach((card, index) => {
          if (index === 0) return

          const previous = cards[index - 1]

          engineTl.to(card, {
            yPercent: 0,
            duration: 1,
            ease: 'none',
            force3D: true,
          })

          engineTl.to(
            previous,
            {
              scale: 0.978,
              opacity: 0.58,
              duration: 1,
              ease: 'none',
              force3D: true,
            },
            '<'
          )
        })

        engineTl.to({}, {
          duration: 0.75,
        })
      })

      mm.add('(max-width: 900px)', () => {
        gsap.utils
          .toArray('.about-engine__card')
          .forEach((card) => {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                },
              }
            )
          })
      })

      /* =====================================================
         HOW WE THINK
      ===================================================== */

      mm.add('(min-width: 901px)', () => {
        const section = philosophyRef.current
        const track = philosophyTrackRef.current

        if (!section || !track) return

        const getTravel = () =>
          Math.max(
            0,
            track.scrollWidth -
              window.innerWidth +
              window.innerWidth * 0.055
          )

        const philosophyTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () =>
              `+=${getTravel() + window.innerWidth * 1.25}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        philosophyTl.to({}, {
          duration: 0.28,
        })

        philosophyTl.to(track, {
          x: () => -getTravel(),
          duration: 1,
          ease: 'none',
          force3D: true,
        })

        philosophyTl.to({}, {
          duration: 0.38,
        })
      })

      mm.add('(max-width: 900px)', () => {
        gsap.utils
          .toArray('.about-philosophy-card')
          .forEach((card) => {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                y: 36,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.72,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                },
              }
            )
          })
      })

      /* =====================================================
         VALUES
      ===================================================== */

      gsap.utils
        .toArray('.about-values__row')
        .forEach((row) => {
          gsap.fromTo(
            row,
            {
              opacity: 0.3,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
              },
            }
          )
        })

      /* =====================================================
         NOVA / POV
         PREVIOUS CINEMATIC STYLE
      ===================================================== */

      mm.add('(min-width: 901px)', () => {
        const one = statementOneRef.current
        const two = statementTwoRef.current
        const three = statementThreeRef.current

        if (!one || !two || !three) return

        gsap.set(one, {
          yPercent: 0,
          autoAlpha: 1,
          scale: 1,
        })

        gsap.set(two, {
          yPercent: 105,
          autoAlpha: 0,
          scale: 0.96,
        })

        gsap.set(three, {
          yPercent: 105,
          autoAlpha: 0,
          scale: 0.96,
        })

        const povTl = gsap.timeline({
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        /* first sentence hold */
        povTl.to({}, {
          duration: 0.32,
        })

        /* first exits */
        povTl.to(one, {
          yPercent: -90,
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.78,
          ease: 'none',
        })

        /* second enters */
        povTl.to(
          two,
          {
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.78,
            ease: 'none',
          },
          '<0.12'
        )

        /* second hold */
        povTl.to({}, {
          duration: 0.38,
        })

        /* second exits */
        povTl.to(two, {
          yPercent: -90,
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.78,
          ease: 'none',
        })

        /* third enters */
        povTl.to(
          three,
          {
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.78,
            ease: 'none',
          },
          '<0.12'
        )

        /* final hold */
        povTl.to({}, {
          duration: 0.65,
        })

        povTl.fromTo(
          '.about-statement__ghost',
          {
            yPercent: 7,
            scale: 0.96,
            opacity: 0.7,
          },
          {
            yPercent: -7,
            scale: 1.06,
            opacity: 1,
            duration: 4.2,
            ease: 'none',
          },
          0
        )
      })

      mm.add('(max-width: 900px)', () => {
        gsap.set(
          [
            statementTwoRef.current,
            statementThreeRef.current,
          ],
          {
            opacity: 1,
            yPercent: 0,
          }
        )
      })
    }, page)

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  return (
    <div
      ref={pageRef}
      className="about-page"
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        ref={heroRef}
        className="about-hero"
      >
        <div
          className="about-hero__ghost"
          aria-hidden="true"
        >
          <span>NOVA</span>
          <span>LAYERS</span>
        </div>

        <div className="about-hero__shell">
          <div className="about-hero__top">
            <span>
              NOVA / ABOUT / 001
            </span>
          </div>

          <h1 className="about-hero__heading">
            <span className="about-hero__line">
              <span className="about-hero__line-inner">
                WE CREATE
              </span>
            </span>

            <span className="about-hero__line">
              <span className="about-hero__line-inner">
                WHAT MOVES
              </span>
            </span>

            <span className="about-hero__line">
              <span className="about-hero__line-inner">
                BRANDS FORWARD.
              </span>
            </span>
          </h1>

          <div className="about-hero__bottom">
            <div className="about-hero__side-copy">
              <span>
                01 / STRATEGIC THINKING
              </span>

              <p>
                Ideas built with purpose,
                <br />
                not decoration.
              </p>
            </div>

            <div className="about-hero__scroll">
              <span className="about-hero__scroll-line" />
              <span>EXPLORE NOVA</span>
              <span>↓</span>
            </div>

            <div className="about-hero__side-copy about-hero__side-copy--right">
              <span>
                02 / PRECISE EXECUTION
              </span>

              <p>
                Every detail exists
                <br />
                for a reason.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHO WE ARE
      ===================================================== */}

      <section
        ref={whoRef}
        className="about-who"
      >
        <div className="about-who__inner">
          <div className="about-who__top">
            <span>
              01 / WHO WE ARE
            </span>

            <span>
              NOVA LAYERS
            </span>
          </div>

          <div className="about-who__statement">
            {whoLines.map((line) => (
              <div
                key={line}
                className="about-who__line"
              >
                {line}
              </div>
            ))}
          </div>

          <div className="about-who__footer">
            <p>
              Nova Layers is an independent creative
              studio building brands, digital products
              and experiences designed for meaningful
              growth.
            </p>

            <button
              type="button"
              onClick={() =>
                document
                  .querySelector('.about-story')
                  ?.scrollIntoView({
                    behavior: 'smooth',
                  })
              }
            >
              <span>OUR STORY</span>
              <span>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR STORY
      ===================================================== */}

      <section
        ref={storyRef}
        className="about-story"
      >
        <div className="about-shell about-story__grid">
          <div className="about-story__text">
            <div className="about-story__marker">
              <span>02</span>
              <span>OUR STORY</span>
            </div>

            <h2>
              <span className="about-story__heading-mask">
                <span className="about-story__heading-line">
                  BUILT FROM
                </span>
              </span>

              <span className="about-story__heading-mask">
                <span className="about-story__heading-line about-story__heading-line--bright">
                  CURIOSITY.
                </span>
              </span>

              <span className="about-story__heading-mask">
                <span className="about-story__heading-line">
                  DRIVEN BY
                </span>
              </span>

              <span className="about-story__heading-mask">
                <span className="about-story__heading-line about-story__heading-line--bright">
                  AMBITION.
                </span>
              </span>
            </h2>

            <div className="about-story__copy">
              <p>
                Nova Layers exists at the intersection
                of strategic thinking, creative direction
                and technology.
              </p>

              <p>
                We connect branding, UI/UX, development
                and digital growth into one cohesive
                system — giving every layer of the brand
                a reason to exist.
              </p>
            </div>

            <div className="about-story__meta">
              <span>NOVA / 02</span>
              <span>CREATIVE SYSTEM</span>
              <span>TIRUPUR / INDIA</span>
            </div>
          </div>

          <div className="about-story__visual">
            <div className="about-story__visual-inner">
              <div className="about-story__visual-grid" />

              <div className="about-story__orb">
                <span />
                <span />
                <span />
              </div>

              <div className="about-story__crosshair">
                <span />
                <span />
              </div>

              <strong>NOVA</strong>

              <div className="about-story__visual-meta">
                <span>INDEPENDENT</span>
                <span>CREATIVE STUDIO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT POWERS US
      ===================================================== */}

      <section
        ref={engineRef}
        className="about-engine"
      >
        <div className="about-engine__header">
          <div className="about-engine__header-top">
            <span>
              03 / WHAT POWERS US
            </span>

            <span>
              NOVA / SYSTEM
            </span>
          </div>

          <h2>
            THE NOVA ENGINE.
          </h2>
        </div>

        <div
          ref={engineCardsRef}
          className="about-engine__cards"
        >
          {engineItems.map((item, index) => (
            <article
              key={item.number}
              className="about-engine__card"
              style={{
                zIndex: index + 1,
              }}
            >
              <div className="about-engine__card-top">
                <span>{item.number}</span>
                <span>{item.tag}</span>
              </div>

              <EngineVisual type={item.visual} />

              <div className="about-engine__card-content">
                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.copy}
                </p>
              </div>

              <div className="about-engine__card-bottom">
                <span>NOVA LAYERS</span>
                <span>
                  SYSTEM / {item.number}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          HOW WE THINK
      ===================================================== */}

      <section
        ref={philosophyRef}
        className="about-philosophy"
      >
        <div className="about-philosophy__header about-shell">
          <div className="about-philosophy__eyebrow">
            04 / OUR PHILOSOPHY
          </div>

          <h2>
            HOW WE THINK.
          </h2>

          <p>
            Principles that shape how we approach
            every layer of the work.
          </p>
        </div>

        <div className="about-philosophy__viewport">
          <div
            ref={philosophyTrackRef}
            className="about-philosophy__track"
          >
            {philosophyItems.map((item) => (
              <article
                key={item.number}
                className="about-philosophy-card"
              >
                <div className="about-philosophy-card__top">
                  <span>{item.number}</span>
                  <span>{item.label}</span>
                </div>

                <div className="about-philosophy-card__visual">
                  <span className="about-philosophy-card__axis about-philosophy-card__axis--x" />
                  <span className="about-philosophy-card__axis about-philosophy-card__axis--y" />

                  <div className="about-philosophy-card__orbit about-philosophy-card__orbit--one" />
                  <div className="about-philosophy-card__orbit about-philosophy-card__orbit--two" />

                  <span className="about-philosophy-card__point about-philosophy-card__point--one" />
                  <span className="about-philosophy-card__point about-philosophy-card__point--two" />
                </div>

                <div className="about-philosophy-card__content">
                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.copy}
                  </p>
                </div>

                <div className="about-philosophy-card__bottom">
                  <span>NOVA / PRINCIPLE</span>
                  <span>↗</span>
                </div>
              </article>
            ))}

            <div className="about-philosophy__end">
              <span>
                NOVA / PHILOSOPHY
              </span>

              <h3>
                THINK.
                <br />
                MAKE.
                <br />
                GROW.
              </h3>

              <p>
                Build with intention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="about-values">
        <div className="about-shell">
          <div className="about-values__header">
            <span>
              05 / OUR VALUES
            </span>

            <h2>
              WHAT WE BELIEVE.
            </h2>

            <p>
              The principles we return to when
              decisions get complicated.
            </p>
          </div>

          <div className="about-values__rows">
            {values.map((item) => (
              <article
                key={item.number}
                className="about-values__row"
              >
                <span>{item.number}</span>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.copy}
                </p>

                <span className="about-values__arrow">
                  →
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          NOVA / POV
      ===================================================== */}

      <section
        ref={statementRef}
        className="about-statement"
      >
        <div
          className="about-statement__ghost"
          aria-hidden="true"
        >
          NOVA
        </div>

        <div
          ref={statementOneRef}
          className="about-statement__message"
        >
          <span>
            NOVA / POV
          </span>

          <h2>
            WE DON'T JUST
            <br />
            MAKE THINGS
            <br />
            LOOK GOOD.
          </h2>
        </div>

        <div
          ref={statementTwoRef}
          className="about-statement__message"
        >
          <span>
            NOVA / POV
          </span>

          <h2>
            WE MAKE
            <br />
            THEM MATTER.
          </h2>
        </div>

        <div
          ref={statementThreeRef}
          className="about-statement__message"
        >
          <span>
            NOVA / POV
          </span>

          <h2>
            BUILT TO BE
            <br />
            REMEMBERED.
          </h2>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="about-cta">
        <div className="about-cta__panel">
          <span className="about-cta__eyebrow">
            READY WHEN YOU ARE
          </span>

          <h2>
            LET'S BUILD
            <br />
            WHAT'S NEXT.
          </h2>

          <p>
            Have an idea, challenge or brand ready
            for its next layer? Let's make it happen.
          </p>

          <button
            type="button"
            className="about-cta__button"
            onClick={() =>
              onNavigate?.('/#contact')
            }
          >
            <span>
              Start Your Project
            </span>

            <span>→</span>
          </button>
        </div>
      </section>

      <Footer
        onNavigate={onNavigate}
      />
    </div>
  )
}

export default About