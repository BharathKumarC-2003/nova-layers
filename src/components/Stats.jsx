import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/stats.css'

gsap.registerPlugin(ScrollTrigger)

const statsData = [
  {
    value: 35,
    suffix: '+',
    label: ['Projects', 'Completed'],
    icon: 'project',
  },
  {
    value: 95,
    suffix: '%',
    label: ['Client', 'Satisfaction'],
    icon: 'shield',
  },
  {
    value: 20,
    suffix: '+',
    label: ['Brands', 'Empowered'],
    icon: 'briefcase',
  },
  {
    value: 5,
    suffix: '+',
    label: ['Services', 'Offered'],
    icon: 'grid',
  },
]

const iconMap = {
  project: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 6.5C4 5.12 5.12 4 6.5 4h5.75c.41 0 .75.34.75.75V8h3.5c1.38 0 2.5 1.12 2.5 2.5v7.25c0 1.38-1.12 2.5-2.5 2.5H6.5A2.5 2.5 0 0 1 4 17.75V6.5Zm2 .5v10.75c0 .14.11.25.25.25H18c.14 0 .25-.11.25-.25V10.5c0-.14-.11-.25-.25-.25h-3.5v2.75c0 .69-.56 1.25-1.25 1.25H8.5V7Zm7.5-1.25V5h-4V5.75h4Z" />
    </svg>
  ),

  shield: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2 5 5.3v5.92c0 5.27 3.73 10.12 7 11.78 3.27-1.66 7-6.51 7-11.78V5.3L12 2Zm0 2.18 5 2.22v4.9c0 4.24-2.99 8.62-5 9.96-2.01-1.34-5-5.72-5-9.96V6.4l5-2.22Zm.75 5.92-2.5 2.5L9 11.41 10.5 9.9l1.75 1.75 3.75-3.75L16.75 9.1l-3 3Z" />
    </svg>
  ),

  briefcase: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 7V6.5C6 4.57 7.57 3 9.5 3h5C16.43 3 18 4.57 18 6.5V7h2.5A1.5 1.5 0 0 1 22 8.5v10A1.5 1.5 0 0 1 20.5 20h-17A1.5 1.5 0 0 1 2 18.5v-10A1.5 1.5 0 0 1 3.5 7H6Zm2 0h8V6.5c0-.83-.67-1.5-1.5-1.5h-5C9.67 5 9 5.67 9 6.5V7Zm-4 2v8.5c0 .28.22.5.5.5h15c.28 0 .5-.22.5-.5V9H4Zm4 2h8v4H8v-4Z" />
    </svg>
  ),

  grid: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5.5 4.5h4.5v4.5H5.5V4.5Zm0 6h4.5v4.5H5.5V10.5Zm0 6h4.5V21H5.5v-4.5Zm6-12h4.5v4.5H11.5V4.5Zm0 6h4.5v4.5H11.5V10.5Zm0 6h4.5V21H11.5v-4.5Zm6-12H22v4.5h-4.5V4.5Zm0 6H22v4.5h-4.5V10.5Zm0 6H22V21h-4.5v-4.5Z" />
    </svg>
  ),
}

function Stats() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const valueRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: '(min-width: 681px)',
          mobile: '(max-width: 680px)',
          reduceMotion:
            '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const {
            desktop,
            mobile,
            reduceMotion,
          } = context.conditions

          const cards =
            cardsRef.current.filter(Boolean)

          /*
            ==========================================
            REDUCED MOTION
            ==========================================
          */

          if (reduceMotion) {
            gsap.set(cards, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
            })

            statsData.forEach(
              (item, index) => {
                const valueEl =
                  valueRefs.current[index]

                if (!valueEl) return

                valueEl.textContent =
                  `${item.value}${item.suffix}`
              }
            )

            return
          }

          /*
            ==========================================
            ENTRANCE DISTANCES

            CARD 1 = LEFT
            CARD 2 = LEFT

            CARD 3 = RIGHT
            CARD 4 = RIGHT
            ==========================================
          */

          const xOffsets = mobile
            ? [-70, -45, 45, 70]
            : [-260, -150, 150, 260]

          /*
            ==========================================
            MAIN ENTRANCE TIMELINE
            ==========================================
          */

          const timeline =
            gsap.timeline({
              scrollTrigger: {
                trigger: section,

                start: 'top 78%',

                toggleActions:
                  'play none none reverse',

                invalidateOnRefresh:
                  true,
              },
            })

          /*
            ==========================================
            BACKGROUND REVEAL
            ==========================================
          */

          timeline.fromTo(
            '.stats__background-glow',
            {
              opacity: 0,
              scale: 0.85,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 1.4,
              ease: 'power3.out',
            },
            0
          )

          /*
            ==========================================
            CARD ENTRANCES
            ==========================================
          */

          statsData.forEach(
            (item, index) => {
              const card =
                cardsRef.current[index]

              if (!card) return

              /*
                First two:
                move LEFT -> CENTER

                Last two:
                move RIGHT -> CENTER
              */

              timeline.fromTo(
                card,
                {
                  autoAlpha: 0,

                  x: xOffsets[index],

                  y: mobile
                    ? 18
                    : 26,

                  scale: 0.94,

                  filter:
                    'blur(10px)',
                },
                {
                  autoAlpha: 1,

                  x: 0,

                  y: 0,

                  scale: 1,

                  filter:
                    'blur(0px)',

                  duration:
                    desktop
                      ? 1.25
                      : 0.95,

                  ease:
                    'power4.out',
                },

                /*
                  Creates slight overlap
                  so all cards converge together.
                */

                index * 0.06
              )

              /*
                ======================================
                NUMBER COUNTER
                ======================================
              */

              timeline.call(
                () => {
                  const valueEl =
                    valueRefs.current[index]

                  if (!valueEl) return

                  const counter = {
                    value: 0,
                  }

                  gsap.to(counter, {
                    value:
                      item.value,

                    duration:
                      1.1,

                    ease:
                      'power2.out',

                    onUpdate: () => {
                      valueEl.textContent =
                        `${Math.round(
                          counter.value
                        )}${item.suffix}`
                    },

                    onComplete: () => {
                      valueEl.textContent =
                        `${item.value}${item.suffix}`
                    },
                  })
                },

                null,

                0.25 + index * 0.06
              )
            }
          )

          /*
            ==========================================
            SUBTLE BACKGROUND LINE REVEAL
            ==========================================
          */

          timeline.fromTo(
            '.stats__line',
            {
              scaleX: 0,
              opacity: 0,
            },
            {
              scaleX: 1,
              opacity: 1,
              duration: 1.3,
              ease: 'power3.out',
            },
            0.15
          )
        }
      )

      return () => {
        mm.revert()
      }
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      className="stats"
      ref={sectionRef}
      aria-label="Nova Layers statistics"
    >

      {/* =========================================
          BACKGROUND DESIGN
      ========================================= */}

      <div
        className="stats__background"
        aria-hidden="true"
      >

        <div className="stats__background-grid" />

        <div className="stats__background-glow stats__background-glow--left" />

        <div className="stats__background-glow stats__background-glow--right" />

        <div className="stats__line" />

      </div>


      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="stats__container">

        <div className="stats__grid">

          {statsData.map(
            (item, index) => (

              <div
                key={item.label.join('-')}
                className="stats__card"
                ref={(el) => {
                  cardsRef.current[index] =
                    el
                }}
              >

                {/* HOVER LIGHT */}

                <span
                  className="stats__card-light"
                  aria-hidden="true"
                />


                {/* TOP */}

                <div className="stats__card-top">

                  <span className="stats__icon">

                    {iconMap[item.icon]}

                  </span>


                  <span
                    className="stats__value"
                    ref={(el) => {
                      valueRefs.current[index] =
                        el
                    }}
                  >
                    0{item.suffix}
                  </span>

                </div>


                {/* LABEL */}

                <div className="stats__label">

                  <span>
                    {item.label[0]}
                  </span>

                  <span>
                    {item.label[1]}
                  </span>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  )
}

export default Stats