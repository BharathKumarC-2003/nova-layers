import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import novaLogo from '../../assets/nova logo 2.png'

import './NovaStandard.css'

gsap.registerPlugin(ScrollTrigger)

const standardCards = [
  {
    code: '01',
    title: 'Strategy Before Execution',
    text: 'Every project starts with clarity. We understand your goals, audience and direction before we begin creating.',
    art: 'ring',
    side: 'left',
  },
  {
    code: '02',
    title: 'Built Around Measurable Growth',
    text: 'We combine creativity with data to build digital work that delivers measurable business value.',
    art: 'bars',
    side: 'right',
  },
  {
    code: '03',
    title: 'Designed To Stay Relevant',
    text: 'We adapt to changing platforms, trends and user behaviour while keeping your brand consistent.',
    art: 'orbit',
    side: 'right',
  },
  {
    code: '04',
    title: 'Precision In Every Detail',
    text: 'Every interaction, campaign and digital experience is refined for clarity, quality and performance.',
    art: 'frame',
    side: 'left',
  },
  {
    code: '05',
    title: 'Creative Systems That Scale',
    text: 'We create flexible systems built to evolve with your business without losing consistency.',
    art: 'signal',
    side: 'left',
  },
  {
    code: '06',
    title: 'Focused On Lasting Results',
    text: 'Our work is built for stronger visibility, engagement and sustainable long-term digital growth.',
    art: 'line',
    side: 'right',
  },
]

function NovaStandardIcon({ type }) {
  if (type === 'ring') {
    return (
      <svg
        viewBox="0 0 100 100"
        className="nova-standard__icon-svg"
        aria-hidden="true"
      >
        <circle
          className="ns-icon-faint"
          cx="50"
          cy="50"
          r="29"
        />

        <circle
          className="ns-icon-main ns-icon-main--dash"
          cx="50"
          cy="50"
          r="20"
        />

        <circle
          className="ns-icon-core"
          cx="50"
          cy="50"
          r="5"
        />

        <path
          className="ns-icon-line"
          d="M50 11v17M50 72v17M11 50h17M72 50h17"
        />
      </svg>
    )
  }

  if (type === 'bars') {
    return (
      <svg
        viewBox="0 0 100 100"
        className="nova-standard__icon-svg"
        aria-hidden="true"
      >
        <path
          className="ns-icon-bar ns-icon-bar--1"
          d="M25 70V53h12v17z"
        />

        <path
          className="ns-icon-bar ns-icon-bar--2"
          d="M44 70V39h12v31z"
        />

        <path
          className="ns-icon-bar ns-icon-bar--3"
          d="M63 70V25h12v45z"
        />

        <path
          className="ns-icon-base"
          d="M19 76h62"
        />
      </svg>
    )
  }

  if (type === 'orbit') {
    return (
      <svg
        viewBox="0 0 100 100"
        className="nova-standard__icon-svg"
        aria-hidden="true"
      >
        <path
          className="ns-icon-line ns-icon-chart"
          d="M20 70 40 47l15 14 26-34"
        />

        <path
          className="ns-icon-line ns-icon-arrow"
          d="M68 27h13v13"
        />

        <circle
          className="ns-icon-dot ns-icon-dot--pulse"
          cx="40"
          cy="47"
          r="3"
        />
      </svg>
    )
  }

  if (type === 'frame') {
    return (
      <svg
        viewBox="0 0 100 100"
        className="nova-standard__icon-svg"
        aria-hidden="true"
      >
        <circle
          className="ns-icon-faint"
          cx="50"
          cy="50"
          r="27"
        />

        <path
          className="ns-icon-arc ns-icon-arc--a"
          d="M25 40a28 28 0 0 1 45-13"
        />

        <path
          className="ns-icon-arc ns-icon-arc--b"
          d="M75 60a28 28 0 0 1-45 13"
        />

        <circle
          className="ns-icon-core"
          cx="50"
          cy="50"
          r="6"
        />

        <circle
          className="ns-icon-dot ns-icon-dot--orbit"
          cx="75"
          cy="50"
          r="3"
        />
      </svg>
    )
  }

  if (type === 'signal') {
    return (
      <svg
        viewBox="0 0 100 100"
        className="nova-standard__icon-svg"
        aria-hidden="true"
      >
        <path
          className="ns-icon-diamond ns-icon-diamond--outer"
          d="M19 34h62L50 78z"
        />

        <path
          className="ns-icon-diamond ns-icon-diamond--inner"
          d="M34 34 50 78 66 34"
        />

        <path
          className="ns-icon-line"
          d="M19 34 35 21h30l16 13M35 21 50 34l15-13"
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className="nova-standard__icon-svg"
      aria-hidden="true"
    >
      <path
        className="ns-icon-hand ns-icon-hand--left"
        d="M19 45l15-15 16 13-10 10-9-5-8 8z"
      />

      <path
        className="ns-icon-hand ns-icon-hand--right"
        d="M81 45 66 30 50 43l10 10 9-5 8 8z"
      />

      <path
        className="ns-icon-line ns-icon-handshake"
        d="m40 53 8 8c4 4 8 4 12 0l8-8M44 57l-5 5m11 1-5 5m11-1-4 4"
      />
    </svg>
  )
}

function NovaCard({ card }) {
  return (
    <article
      className={`nova-standard__card nova-standard__card--${card.side}`}
    >
      <div className="nova-standard__card-icon">
        <div className="nova-standard__hex">
          <div className="nova-standard__hex-inner">
            <NovaStandardIcon type={card.art} />
          </div>
        </div>
      </div>

      <div className="nova-standard__card-content">
        <div className="nova-standard__meta">
          {card.code}
        </div>

        <h3>
          {card.title}
        </h3>

        <p>
          {card.text}
        </p>

        <span className="nova-standard__mini-line" />
      </div>
    </article>
  )
}

function NovaStandard() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.nova-standard__header > *',
        {
          y: 25,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,

          duration: 0.8,

          stagger: 0.08,

          ease: 'power3.out',

          scrollTrigger: {
            trigger: section,
            start: 'top 76%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.nova-standard__card--left',
        {
          x: -45,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,

          duration: 0.9,

          stagger: 0.12,

          ease: 'power3.out',

          scrollTrigger: {
            trigger: '.nova-standard__system',
            start: 'top 80%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.nova-standard__card--right',
        {
          x: 45,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,

          duration: 0.9,

          stagger: 0.12,

          ease: 'power3.out',

          scrollTrigger: {
            trigger: '.nova-standard__system',
            start: 'top 80%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.nova-standard__core',
        {
          scale: 0.82,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,

          duration: 1,

          ease: 'power3.out',

          scrollTrigger: {
            trigger: '.nova-standard__system',
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const leftCards = standardCards.filter(
    (card) => card.side === 'left'
  )

  const rightCards = standardCards.filter(
    (card) => card.side === 'right'
  )

  return (
    <section
      ref={sectionRef}
      className="nova-standard"
      aria-label="The Nova Standard"
    >
      <div className="nova-standard__inner">

        <header className="nova-standard__header">

          <div className="nova-standard__eyebrow">
            Built On Purpose · Engineered To Lead
          </div>

          <h2>
            <span>THE</span>

            <span className="nova-standard__title-accent">
              NOVA
            </span>

            <span>
              STANDARD.
            </span>
          </h2>

          <p>
            Six principles behind how Nova Layers approaches
            strategy, creativity, technology and digital growth.
          </p>

        </header>

        <div className="nova-standard__system">

          <div className="nova-standard__orbital-bg" />


          {/* LEFT CARDS */}

          <div className="nova-standard__column nova-standard__column--left">

            {leftCards.map((card) => (
              <NovaCard
                key={card.code}
                card={card}
              />
            ))}

          </div>


          {/* CENTRE */}

          <div className="nova-standard__centre">

            <div className="nova-standard__core">

              <span className="nova-standard__core-ring nova-standard__core-ring--1" />

              <span className="nova-standard__core-ring nova-standard__core-ring--2" />

              <span className="nova-standard__core-ring nova-standard__core-ring--3" />

              <span className="nova-standard__core-ring nova-standard__core-ring--4" />

              <div className="nova-standard__logo-shell">

                <img
                  src={novaLogo}
                  alt="Nova Layers"
                  className="nova-standard__logo"
                />

              </div>

              <span className="nova-standard__core-dot nova-standard__core-dot--1" />

              <span className="nova-standard__core-dot nova-standard__core-dot--2" />

              <span className="nova-standard__core-dot nova-standard__core-dot--3" />

              <span className="nova-standard__core-dot nova-standard__core-dot--4" />

            </div>

          </div>


          {/* RIGHT CARDS */}

          <div className="nova-standard__column nova-standard__column--right">

            {rightCards.map((card) => (
              <NovaCard
                key={card.code}
                card={card}
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  )
}

export default NovaStandard