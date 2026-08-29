import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

import novaLayersLogo from '../assets/nova logo.png'

const graphItems = [
  {
    number: '01',
    title: 'Strategy',
    description: 'Ideas shaped into clear digital direction.',
    icon: '◎',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Distinctive experiences built around people.',
    icon: '◇',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Fast, scalable and refined digital products.',
    icon: '</>',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Digital execution built to create momentum.',
    icon: '↗',
  },
  {
    number: '05',
    title: 'Scale',
    description: 'Continuous optimization for stronger growth.',
    icon: '⌁',
  },
]

function Hero({ ready = true, onNavigate }) {
  const heroRef = useRef(null)
  const brandRef = useRef(null)
  const logoRef = useRef(null)
  const graphWrapRef = useRef(null)

  const pathRef = useRef(null)
  const areaRef = useRef(null)

  const cardsRef = useRef([])
  const actionsRef = useRef(null)

  const endpointRef = useRef(null)
  const endpointCoreRef = useRef(null)
  const endpointRingRef = useRef(null)

  const growthLabelRef = useRef(null)
  const lineStartStopRef = useRef(null)
  const lineMidStopRef = useRef(null)
  const lineEndStopRef = useRef(null)

  const burstRefs = useRef([])

  useLayoutEffect(() => {
    if (!ready) return undefined

    const hero = heroRef.current
    const brand = brandRef.current
    const logo = logoRef.current
    const graphWrap = graphWrapRef.current
    const path = pathRef.current
    const area = areaRef.current

    const endpoint = endpointRef.current
    const endpointCore = endpointCoreRef.current
    const endpointRing = endpointRingRef.current
    const growthLabel = growthLabelRef.current
    const actions = actionsRef.current

    const nav = document.querySelector('.navbar--cinematic')

    const cards = cardsRef.current.filter(Boolean)
    const bursts = burstRefs.current.filter(Boolean)

    if (
      !hero ||
      !brand ||
      !logo ||
      !graphWrap ||
      !path ||
      !area ||
      !endpoint ||
      !endpointCore ||
      !endpointRing ||
      !growthLabel ||
      !actions
    ) {
      return undefined
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const ctx = gsap.context(() => {
      const pathLength = path.getTotalLength()

      /* =====================================================
         INITIAL GRAPH STATE
      ===================================================== */

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      })

      /* =====================================================
         BRAND INITIAL STATE
      ===================================================== */

      gsap.set(brand, {
        autoAlpha: 0,
        clipPath: 'inset(100% 0% 0% 0%)',
        scale: 0.995,
        force3D: true,
      })

      /*
       * Logo starts slightly below.
       * Blur is strong at the beginning and smoothly disappears.
       */
      gsap.set(logo, {
        y: 34,
        opacity: 0,
        filter:
          'blur(18px) drop-shadow(0 0 24px rgba(255,255,255,0.04))',
        force3D: true,
        backfaceVisibility: 'hidden',
      })

      /* =====================================================
         NAV
      ===================================================== */

      if (nav) {
        gsap.set(nav, {
          autoAlpha: 0,
          y: -8,
          force3D: true,
        })
      }

      /* =====================================================
         GRAPH
      ===================================================== */

      gsap.set(graphWrap, {
        autoAlpha: 0,
        y: 15,
        force3D: true,
      })

      gsap.set(area, {
        autoAlpha: 0,
      })

      /* =====================================================
         CARDS
      ===================================================== */

      gsap.set(cards, {
        autoAlpha: 0,
        y: 10,
        force3D: true,
      })

      /* =====================================================
         BUTTONS
      ===================================================== */

      gsap.set(actions, {
        autoAlpha: 0,
        y: 8,
        force3D: true,
      })

      /* =====================================================
         ENDPOINT
         IMPORTANT:
         Position never changes.
      ===================================================== */

      gsap.set(endpoint, {
        autoAlpha: 0,
      })

      gsap.set(endpointCore, {
        attr: {
          r: 7,
        },
      })

      gsap.set(endpointRing, {
        attr: {
          r: 19,
        },
      })

      /* =====================================================
         GROWTH LABEL
      ===================================================== */

      gsap.set(growthLabel, {
        autoAlpha: 0,
        y: 4,
      })

      /* =====================================================
         BURST
      ===================================================== */

      gsap.set(bursts, {
        autoAlpha: 0,
        scale: 0.3,
        transformOrigin: 'center center',
      })

      /* =====================================================
         REDUCED MOTION
      ===================================================== */

      if (reducedMotion) {
        gsap.set(brand, {
          autoAlpha: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
        })

        gsap.set(logo, {
          y: 0,
          opacity: 1,
          filter:
            'blur(0px) drop-shadow(0 0 20px rgba(255,255,255,0.07))',
        })

        if (nav) {
          gsap.set(nav, {
            autoAlpha: 1,
            y: 0,
          })
        }

        gsap.set(graphWrap, {
          autoAlpha: 1,
          y: 0,
        })

        gsap.set(area, {
          autoAlpha: 1,
        })

        gsap.set(path, {
          strokeDashoffset: 0,
          filter:
            'drop-shadow(0 0 5px rgba(212,175,55,0.48)) drop-shadow(0 0 14px rgba(212,175,55,0.2))',
        })

        gsap.set(
          [
            lineStartStopRef.current,
            lineMidStopRef.current,
            lineEndStopRef.current,
          ],
          {
            attr: {
              stopColor: (i) =>
                ['#8A6A18', '#D4AF37', '#FFD966'][i],
            },
          }
        )

        gsap.set(cards, {
          autoAlpha: 1,
          y: 0,
        })

        gsap.set(endpoint, {
          autoAlpha: 1,
        })

        gsap.set(growthLabel, {
          autoAlpha: 1,
          y: 0,
        })

        gsap.set(actions, {
          autoAlpha: 1,
          y: 0,
        })

        return
      }

      /* =====================================================
         MAIN TIMELINE
      ===================================================== */

      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      })

      /* =====================================================
         LOGO REVEAL
         Bottom -> Top
         Blurry -> Sharp
         Smooth continuous reveal
      ===================================================== */

      tl.to(brand, {
        autoAlpha: 1,
        duration: 0.01,
      })

        .to(
          brand,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.45,
            ease: 'power2.inOut',
          },
          '<'
        )

        .to(
          logo,
          {
            y: 0,
            opacity: 1,
            filter:
              'blur(0px) drop-shadow(0 0 25px rgba(255,255,255,0.08))',
            duration: 1.55,
            ease: 'power3.out',
            force3D: true,
          },
          '<0.04'
        )

        /*
         * Very small settling glow.
         * Keeps the logo premium without making it look jumpy.
         */
        .to(logo, {
          filter:
            'blur(0px) drop-shadow(0 0 30px rgba(255,255,255,0.105))',
          duration: 0.3,
          ease: 'power2.out',
        })

        .to(logo, {
          filter:
            'blur(0px) drop-shadow(0 0 20px rgba(255,255,255,0.065))',
          duration: 0.45,
          ease: 'power2.inOut',
        })

      /* =====================================================
         NAV — FAST
      ===================================================== */

      if (nav) {
        tl.to(
          nav,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
          },
          '-=0.25'
        )
      }

      /* =====================================================
         GRAPH WRAPPER — FAST
      ===================================================== */

      tl.to(
        graphWrap,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.32,
          ease: 'power2.out',
        },
        '-=0.18'
      )

      /* =====================================================
         GRAPH AREA
      ===================================================== */

      tl.to(
        area,
        {
          autoAlpha: 1,
          duration: 0.25,
          ease: 'none',
        },
        '-=0.18'
      )

      /* =====================================================
         GRAPH LINE
         
         IMPORTANT:
         VERY SLOW DRAW.
         The line takes 3.8 seconds to reach the endpoint.
         
         Endpoint itself does NOT move.
      ===================================================== */

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 3.8,
          ease: 'power1.inOut',
        },
        '-=0.04'
      )

        /* ===================================================
           TURN LINE GOLD
        =================================================== */

        .to(
          [
            lineStartStopRef.current,
            lineMidStopRef.current,
            lineEndStopRef.current,
          ],
          {
            attr: {
              stopColor: (i) =>
                ['#8A6A18', '#D4AF37', '#FFD966'][i],
            },
            duration: 0.5,
            ease: 'power2.inOut',
          }
        )

        .to(
          path,
          {
            filter:
              'drop-shadow(0 0 5px rgba(212,175,55,0.45)) drop-shadow(0 0 15px rgba(212,175,55,0.22))',
            duration: 0.35,
          },
          '<'
        )

      /* =====================================================
         ENDPOINT
         
         Appears ONLY after graph has reached it.
         Position stays fixed.
      ===================================================== */

      tl.to(
        endpoint,
        {
          autoAlpha: 1,
          duration: 0.12,
          ease: 'none',
        },
        '>'
      )

      /* =====================================================
         GROWTH LABEL
      ===================================================== */

      tl.to(
        growthLabel,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
        },
        '-=0.03'
      )

      /* =====================================================
         SMALL ENDPOINT PULSE
      ===================================================== */

      tl.to(endpointCore, {
        attr: {
          r: 9,
        },
        duration: 0.12,
        ease: 'power2.out',
      })

      tl.to(
        endpointRing,
        {
          attr: {
            r: 23,
          },
          duration: 0.12,
          ease: 'power2.out',
        },
        '<'
      )

      tl.to(endpointCore, {
        attr: {
          r: 7,
        },
        duration: 0.2,
        ease: 'power2.out',
      })

      tl.to(
        endpointRing,
        {
          attr: {
            r: 19,
          },
          duration: 0.2,
          ease: 'power2.out',
        },
        '<'
      )

      /* =====================================================
         BURST
      ===================================================== */

      tl.to(
        bursts,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.1,
          stagger: 0.01,
          ease: 'power2.out',
        },
        '-=0.08'
      )

      tl.to(
        bursts,
        {
          autoAlpha: 0,
          scale: 1.6,
          duration: 0.3,
          stagger: 0.01,
          ease: 'power2.out',
        },
        '<0.02'
      )

      /* =====================================================
         CARDS — LOAD FASTER
      ===================================================== */

      tl.to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.32,
          stagger: 0.045,
          ease: 'power2.out',
        },
        '-=0.12'
      )

      /* =====================================================
         BUTTONS — LOAD FASTER
      ===================================================== */

      tl.to(
        actions,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
        },
        '-=0.15'
      )
    }, hero)

    return () => ctx.revert()
  }, [ready])

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const handleWork = () => {
    onNavigate?.('/portfolio')
  }

  const handleProject = () => {
    onNavigate?.('/contact')
  }

  return (
    <section
      ref={heroRef}
      className="nova-hero"
      aria-label="Nova Layers"
    >
      <div className="nova-hero__inner">

        {/* BRAND */}

        <header
          ref={brandRef}
          className="nova-hero__brand"
        >
          <img
            ref={logoRef}
            src={novaLayersLogo}
            alt="Nova Layers"
            className="nova-hero__logo"
          />
        </header>

        {/* GRAPH */}

        <div
          ref={graphWrapRef}
          className="nova-hero__graph-wrap"
        >
          <svg
            className="nova-hero__graph"
            viewBox="0 0 1400 400"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>

              <linearGradient
                id="novaHeroLine"
                x1="0"
                y1="1"
                x2="1"
                y2="0"
              >
                <stop
                  ref={lineStartStopRef}
                  offset="0%"
                  stopColor="rgba(255,255,255,0.28)"
                />

                <stop
                  ref={lineMidStopRef}
                  offset="48%"
                  stopColor="rgba(255,255,255,0.72)"
                />

                <stop
                  ref={lineEndStopRef}
                  offset="100%"
                  stopColor="#ffffff"
                />
              </linearGradient>

              <linearGradient
                id="novaHeroArea"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(255,255,255,0.13)"
                />

                <stop
                  offset="52%"
                  stopColor="rgba(255,255,255,0.035)"
                />

                <stop
                  offset="100%"
                  stopColor="rgba(255,255,255,0)"
                />
              </linearGradient>

            </defs>

            {/* GRAPH AREA */}

            <path
              ref={areaRef}
              className="nova-hero__graph-area"
              d="
                M95 318
                C205 305 318 278 420 235
                C525 191 620 170 730 166
                C850 162 950 137 1045 101
                C1140 65 1215 44 1303 18
                L1303 360
                L95 360
                Z
              "
            />

            {/* GRAPH LINE */}

            <path
              ref={pathRef}
              className="nova-hero__graph-path"
              d="
                M95 318
                C205 305 318 278 420 235
                C525 191 620 170 730 166
                C850 162 950 137 1045 101
                C1140 65 1215 44 1303 18
              "
            />

            {/* CONNECTORS */}

            <line
              className="nova-hero__connector"
              x1="250"
              y1="290"
              x2="250"
              y2="385"
            />

            <line
              className="nova-hero__connector"
              x1="495"
              y1="205"
              x2="495"
              y2="385"
            />

            <line
              className="nova-hero__connector"
              x1="735"
              y1="166"
              x2="735"
              y2="385"
            />

            <line
              className="nova-hero__connector"
              x1="1010"
              y1="115"
              x2="1010"
              y2="385"
            />

            <line
              className="nova-hero__connector"
              x1="1243"
              y1="39"
              x2="1243"
              y2="385"
            />

            {/* MARKERS */}

            <circle
              className="nova-hero__marker"
              cx="250"
              cy="290"
              r="5"
            />

            <circle
              className="nova-hero__marker"
              cx="495"
              cy="205"
              r="5"
            />

            <circle
              className="nova-hero__marker"
              cx="735"
              cy="166"
              r="5"
            />

            <circle
              className="nova-hero__marker"
              cx="1010"
              cy="115"
              r="5"
            />

            {/* FINAL ENDPOINT */}

            <g
              ref={endpointRef}
              className="nova-hero__endpoint"
            >
              <circle
                ref={endpointRingRef}
                className="nova-hero__endpoint-ring-static"
                cx="1303"
                cy="18"
                r="19"
              />

              <circle
                ref={endpointCoreRef}
                className="nova-hero__endpoint-core"
                cx="1303"
                cy="18"
                r="7"
              />
            </g>

            {/* GROWTH */}

            <text
              ref={growthLabelRef}
              className="nova-hero__growth-label"
              x="1303"
              y="-8"
              textAnchor="middle"
            >
              GROWTH
            </text>

            {/* BURST */}

            <circle
              ref={(el) => {
                burstRefs.current[0] = el
              }}
              className="nova-hero__burst-ring"
              cx="1303"
              cy="18"
              r="16"
            />

            <circle
              ref={(el) => {
                burstRefs.current[1] = el
              }}
              className="nova-hero__burst-ring nova-hero__burst-ring--two"
              cx="1303"
              cy="18"
              r="27"
            />

            <g className="nova-hero__burst-rays">

              <line
                ref={(el) => {
                  burstRefs.current[2] = el
                }}
                x1="1303"
                y1="-5"
                x2="1303"
                y2="-28"
              />

              <line
                ref={(el) => {
                  burstRefs.current[3] = el
                }}
                x1="1320"
                y1="2"
                x2="1343"
                y2="-11"
              />

              <line
                ref={(el) => {
                  burstRefs.current[4] = el
                }}
                x1="1327"
                y1="18"
                x2="1353"
                y2="18"
              />

              <line
                ref={(el) => {
                  burstRefs.current[5] = el
                }}
                x1="1320"
                y1="34"
                x2="1342"
                y2="47"
              />

              <line
                ref={(el) => {
                  burstRefs.current[6] = el
                }}
                x1="1303"
                y1="41"
                x2="1303"
                y2="65"
              />

              <line
                ref={(el) => {
                  burstRefs.current[7] = el
                }}
                x1="1287"
                y1="34"
                x2="1264"
                y2="47"
              />

              <line
                ref={(el) => {
                  burstRefs.current[8] = el
                }}
                x1="1279"
                y1="18"
                x2="1254"
                y2="18"
              />

              <line
                ref={(el) => {
                  burstRefs.current[9] = el
                }}
                x1="1287"
                y1="2"
                x2="1264"
                y2="-11"
              />

            </g>
          </svg>

          {/* CARDS */}

          <div className="nova-hero__cards">

            {graphItems.map((item, index) => (
              <article
                key={item.number}
                ref={(element) => {
                  cardsRef.current[index] = element
                }}
                className={`nova-hero__card nova-hero__card--${index + 1}`}
              >
                <div className="nova-hero__card-heading">

                  <div className="nova-hero__card-icon">
                    {item.icon}
                  </div>

                  <div className="nova-hero__card-title-wrap">

                    <span className="nova-hero__card-number">
                      {item.number}
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                  </div>

                </div>

                <p>
                  {item.description}
                </p>

              </article>
            ))}

          </div>
        </div>

        {/* ACTIONS */}

        <div
          ref={actionsRef}
          className="nova-hero__actions"
        >

          <button
            type="button"
            className="nova-hero__button nova-hero__button--primary"
            onClick={handleProject}
          >
            <span className="nova-hero__button-label">
              START YOUR PROJECT
            </span>

            <span className="nova-hero__button-circle">
              →
            </span>
          </button>

          <button
            type="button"
            className="nova-hero__button nova-hero__button--secondary"
            onClick={handleWork}
          >
            <span>
              OUR WORK
            </span>

            <span className="nova-hero__button-arrow">
              ↗
            </span>
          </button>

        </div>

      </div>
    </section>
  )
}

export default Hero