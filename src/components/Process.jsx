import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    id: '01',
    title: 'DISCOVER',
    description:
      'We understand your goals, audience, challenges and business direction before defining the right path forward.',
    image: '/images/process/discover.webp',
    imageAlt: 'Discovery and strategy session',
  },
  {
    id: '02',
    title: 'RESEARCH',
    description:
      'We study your market, competitors, users and opportunities to build a clear strategic foundation for the project.',
    image: '/images/process/research.webp',
    imageAlt: 'Market and competitor research',
  },
  {
    id: '03',
    title: 'DESIGN',
    description:
      'We transform strategy into visual direction, user experience and interface systems that align with your brand.',
    image: '/images/process/design.webp',
    imageAlt: 'Interface and visual design process',
  },
  {
    id: '04',
    title: 'DEVELOP',
    description:
      'We turn approved designs into responsive, high-performance digital experiences using reliable modern technology.',
    image: '/images/process/develop.webp',
    imageAlt: 'Website development process',
  },
  {
    id: '05',
    title: 'LAUNCH',
    description:
      'We test, refine and prepare every detail before launching the final experience with confidence.',
    image: '/images/process/launch.webp',
    imageAlt: 'Digital product launch',
  },
  {
    id: '06',
    title: 'SCALE',
    description:
      'We continue optimizing, marketing and evolving the experience to support long-term business growth.',
    image: '/images/process/scale.webp',
    imageAlt: 'Business growth and scaling',
  },
]

function Process() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      const timelineContainer =
        section.querySelector('.process__timeline')

      const progressLine =
        section.querySelector('.process__line-progress')

      const baseLine =
        section.querySelector('.process__line-base')

      const steps = gsap.utils.toArray(
        '.process__step',
        section
      )

      /*
        =====================================================
        CALCULATE EXACT LINE END

        This measures the Phase 06 node and makes both
        timeline lines stop exactly at the middle of it.
        No extra line is left underneath.
        =====================================================
      */

      const updateTimelineHeight = () => {
        if (
          !timelineContainer ||
          !baseLine ||
          !progressLine ||
          !steps.length
        ) {
          return
        }

        const lastStep =
          steps[steps.length - 1]

        const lastNode =
          lastStep.querySelector(
            '.process__node-wrap'
          )

        if (!lastNode) return

        const timelineRect =
          timelineContainer.getBoundingClientRect()

        const nodeRect =
          lastNode.getBoundingClientRect()

        const nodeCenter =
          nodeRect.top -
          timelineRect.top +
          nodeRect.height / 2

        baseLine.style.height =
          `${nodeCenter}px`

        progressLine.style.height =
          `${nodeCenter}px`
      }

      updateTimelineHeight()

      requestAnimationFrame(() => {
        updateTimelineHeight()
      })

      /*
        =====================================================
        RESPONSIVE GSAP
        =====================================================
      */

      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop:
            '(min-width: 769px)',

          mobile:
            '(max-width: 768px)',

          reduceMotion:
            '(prefers-reduced-motion: reduce)',
        },

        (context) => {
          const {
            desktop,
            mobile,
            reduceMotion,
          } = context.conditions

          /*
            ============================================
            REDUCED MOTION
            ============================================
          */

          if (reduceMotion) {
            gsap.set(
              '.process__content, .process__visual',
              {
                opacity: 1,
                visibility: 'visible',
                x: 0,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
              }
            )

            gsap.set(
              '.process__visual-image',
              {
                scale: 1,
              }
            )

            gsap.set(
              progressLine,
              {
                scaleY: 1,
              }
            )

            updateTimelineHeight()

            return
          }

          /*
            ============================================
            CENTER LINE
            ============================================
          */

          gsap.fromTo(
            progressLine,

            {
              scaleY: 0,
            },

            {
              scaleY: 1,

              ease: 'none',

              scrollTrigger: {
                trigger:
                  timelineContainer,

                start:
                  'top 52%',

                end:
                  'bottom 92%',

                scrub:
                  0.7,

                invalidateOnRefresh:
                  true,

                onRefresh:
                  updateTimelineHeight,
              },
            }
          )

          /*
            ============================================
            INTRO EYEBROW
            ============================================
          */

          gsap.fromTo(
            '.process__eyebrow',

            {
              opacity: 0,
              y: 20,
            },

            {
              opacity: 1,
              y: 0,

              duration: 0.8,

              ease:
                'power3.out',

              scrollTrigger: {
                trigger:
                  '.process__intro',

                start:
                  'top 80%',
              },
            }
          )

          /*
            ============================================
            INTRO HEADING
            ============================================
          */

          gsap.fromTo(
            '.process__heading-line',

            {
              yPercent:
                110,
            },

            {
              yPercent:
                0,

              duration:
                1,

              stagger:
                0.1,

              ease:
                'power4.out',

              scrollTrigger: {
                trigger:
                  '.process__intro',

                start:
                  'top 78%',
              },
            }
          )

          /*
            ============================================
            INTRO DESCRIPTION
            ============================================
          */

          gsap.fromTo(
            '.process__sub',

            {
              opacity:
                0,

              y:
                24,
            },

            {
              opacity:
                1,

              y:
                0,

              duration:
                0.9,

              delay:
                0.15,

              ease:
                'power3.out',

              scrollTrigger: {
                trigger:
                  '.process__intro',

                start:
                  'top 78%',
              },
            }
          )

          /*
            ============================================
            PROCESS STEPS
            ============================================
          */

          steps.forEach(
            (step, index) => {
              const content =
                step.querySelector(
                  '.process__content'
                )

              const visual =
                step.querySelector(
                  '.process__visual'
                )

              const visualImage =
                step.querySelector(
                  '.process__visual-image'
                )

              const node =
                step.querySelector(
                  '.process__node'
                )

              const title =
                step.querySelector(
                  '.process__title-text'
                )

              const desc =
                step.querySelector(
                  '.process__desc'
                )

              const phase =
                step.querySelector(
                  '.process__phase-label'
                )

              const isLeft =
                index % 2 === 0

              /*
                TEXT:
                Phase 01/03/05 enters from left.
                Phase 02/04/06 enters from right.
              */

              const contentX =
                mobile
                  ? 0
                  : isLeft
                    ? -38
                    : 38

              /*
                IMAGE:
                always enters from opposite side.
              */

              const visualX =
                mobile
                  ? 0
                  : isLeft
                    ? 38
                    : -38

              /*
                ========================================
                TEXT + IMAGE MAIN TIMELINE
                ========================================
              */

              const stepTimeline =
                gsap.timeline({
                  scrollTrigger: {
                    trigger:
                      step,

                    start:
                      'top 72%',

                    end:
                      'bottom 28%',

                    scrub:
                      0.65,

                    invalidateOnRefresh:
                      true,
                  },
                })

              /*
                TEXT APPEAR
              */

              stepTimeline.fromTo(
                content,

                {
                  opacity:
                    0.06,

                  y:
                    42,

                  x:
                    contentX,

                  scale:
                    0.985,

                  filter:
                    'blur(9px)',
                },

                {
                  opacity:
                    1,

                  y:
                    0,

                  x:
                    0,

                  scale:
                    1,

                  filter:
                    'blur(0px)',

                  duration:
                    0.34,

                  ease:
                    'power2.out',
                },

                0
              )

              /*
                IMAGE APPEAR

                Fully hidden first.
                Then small -> normal zoom.
              */

              stepTimeline.fromTo(
                visual,

                {
                  autoAlpha:
                    0,

                  y:
                    18,

                  x:
                    visualX,

                  scale:
                    0.72,

                  filter:
                    'blur(13px)',
                },

                {
                  autoAlpha:
                    1,

                  y:
                    0,

                  x:
                    0,

                  scale:
                    1,

                  filter:
                    'blur(0px)',

                  duration:
                    0.36,

                  ease:
                    'power3.out',
                },

                0
              )

              /*
                SMALL INTERNAL IMAGE ZOOM
              */

              stepTimeline.fromTo(
                visualImage,

                {
                  scale:
                    1.08,
                },

                {
                  scale:
                    1,

                  duration:
                    0.42,

                  ease:
                    'power2.out',
                },

                0
              )

              /*
                HOLD ACTIVE
              */

              stepTimeline.to(
                [content, visual],

                {
                  opacity:
                    1,

                  y:
                    0,

                  x:
                    0,

                  scale:
                    1,

                  filter:
                    'blur(0px)',

                  duration:
                    0.3,

                  ease:
                    'none',
                }
              )

              /*
                TEXT LEAVE
              */

              stepTimeline.to(
                content,

                {
                  opacity:
                    0.06,

                  y:
                    -42,

                  x:
                    desktop
                      ? isLeft
                        ? -14
                        : 14
                      : 0,

                  scale:
                    0.985,

                  filter:
                    'blur(9px)',

                  duration:
                    0.34,

                  ease:
                    'power2.in',
                }
              )

              /*
                IMAGE LEAVE
              */

              stepTimeline.to(
                visual,

                {
                  autoAlpha:
                    0,

                  y:
                    -18,

                  x:
                    desktop
                      ? isLeft
                        ? 14
                        : -14
                      : 0,

                  scale:
                    0.78,

                  filter:
                    'blur(12px)',

                  duration:
                    0.34,

                  ease:
                    'power2.in',
                },

                '<'
              )

              /*
                ========================================
                NODE ACTIVE
                ========================================
              */

              ScrollTrigger.create({
                trigger:
                  step,

                start:
                  'top 55%',

                end:
                  'bottom 45%',

                onEnter:
                  () =>
                    node.classList.add(
                      'is-active'
                    ),

                onEnterBack:
                  () =>
                    node.classList.add(
                      'is-active'
                    ),

                onLeave:
                  () =>
                    node.classList.remove(
                      'is-active'
                    ),

                onLeaveBack:
                  () =>
                    node.classList.remove(
                      'is-active'
                    ),
              })

              /*
                ========================================
                INTERNAL TEXT REVEAL
                ========================================
              */

              const textTimeline =
                gsap.timeline({
                  scrollTrigger: {
                    trigger:
                      step,

                    start:
                      'top 72%',

                    toggleActions:
                      'play none none reverse',
                  },
                })

              textTimeline.fromTo(
                phase,

                {
                  opacity:
                    0,

                  y:
                    10,
                },

                {
                  opacity:
                    1,

                  y:
                    0,

                  duration:
                    0.45,

                  ease:
                    'power2.out',
                }
              )

              textTimeline.fromTo(
                title,

                {
                  yPercent:
                    115,
                },

                {
                  yPercent:
                    0,

                  duration:
                    0.75,

                  ease:
                    'power4.out',
                },

                '-=0.3'
              )

              textTimeline.fromTo(
                desc,

                {
                  opacity:
                    0,

                  y:
                    18,
                },

                {
                  opacity:
                    1,

                  y:
                    0,

                  duration:
                    0.6,

                  ease:
                    'power3.out',
                },

                '-=0.45'
              )
            }
          )

          requestAnimationFrame(
            () => {
              updateTimelineHeight()

              ScrollTrigger.refresh()
            }
          )
        }
      )

      /*
        =====================================================
        RESIZE

        Recalculate exact line endpoint on screen resize.
        =====================================================
      */

      const handleResize = () => {
        updateTimelineHeight()
      }

      window.addEventListener(
        'resize',
        handleResize
      )

      ScrollTrigger.addEventListener(
        'refreshInit',
        updateTimelineHeight
      )

      ScrollTrigger.addEventListener(
        'refresh',
        updateTimelineHeight
      )

      return () => {
        window.removeEventListener(
          'resize',
          handleResize
        )

        ScrollTrigger.removeEventListener(
          'refreshInit',
          updateTimelineHeight
        )

        ScrollTrigger.removeEventListener(
          'refresh',
          updateTimelineHeight
        )

        mm.revert()
      }
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="process"
      aria-label="Our process"
    >
      <div className="process__container">

        {/* INTRO */}

        <header className="process__intro">

          <span className="process__eyebrow">
            OUR PROCESS
          </span>

          <h2 className="process__heading">

            <span className="process__heading-mask">

              <span className="process__heading-line">
                FROM IDEA
              </span>

            </span>

            <span className="process__heading-mask">

              <span className="process__heading-line">
                TO IMPACT
              </span>

            </span>

          </h2>

          <p className="process__sub">
            Every project moves through a focused process
            designed to turn ideas into clear,
            high-performing digital experiences.
          </p>

        </header>


        {/* TIMELINE */}

        <div className="process__timeline">

          {/* BASE LINE */}

          <div
            className="process__line-base"
            aria-hidden="true"
          />


          {/* PROGRESS LINE */}

          <div
            className="process__line-progress"
            aria-hidden="true"
          />


          {/* PROCESS STEPS */}

          <div className="process__steps">

            {processSteps.map(
              (step, index) => {
                const side =
                  index % 2 === 0
                    ? 'left'
                    : 'right'

                return (
                  <article
                    key={step.id}
                    className={`process__step process__step--${side}`}
                  >

                    {/* CENTER NODE */}

                    <div className="process__node-wrap">

                      <div
                        className="process__node"
                        aria-hidden="true"
                      >

                        <span className="process__node-inner" />

                      </div>

                    </div>


                    {/* TEXT */}

                    <div className="process__content">

                      <div className="process__phase-label">

                        PHASE {step.id}

                      </div>

                      <h3 className="process__title">

                        <span className="process__title-mask">

                          <span className="process__title-text">

                            {step.title}

                          </span>

                        </span>

                      </h3>

                      <p className="process__desc">

                        {step.description}

                      </p>

                    </div>


                    {/* IMAGE */}

                    <figure className="process__visual">

                      <div className="process__visual-frame">

                        <img
                          className="process__visual-image"
                          src={step.image}
                          alt={step.imageAlt}
                          loading="lazy"
                        />

                        <div
                          className="process__visual-shade"
                          aria-hidden="true"
                        />

                        <span
                          className="process__visual-index"
                          aria-hidden="true"
                        >

                          {step.id}

                        </span>

                      </div>

                    </figure>

                  </article>
                )
              }
            )}

          </div>

        </div>

      </div>
    </section>
  )
}

export default Process