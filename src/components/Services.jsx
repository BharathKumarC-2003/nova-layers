import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import '../styles/services.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'WEB DEVELOPMENT',
    description:
      'High-performance digital experiences built with clarity, speed and purpose.',
    x: 620,
    y: 55,
    placement: 'top',
  },
  {
    number: '02',
    title: 'UI / UX DESIGN',
    description:
      'Clear, intuitive interfaces designed around usability and meaningful interaction.',
    x: 1430,
    y: 58,
    placement: 'bottom',
  },
  {
    number: '03',
    title: 'DIGITAL MARKETING',
    description:
      'Focused digital strategies designed to create reach, engagement and measurable growth.',
    x: 2240,
    y: 55,
    placement: 'top',
  },
  {
    number: '04',
    title: 'SOCIAL MEDIA MARKETING',
    description:
      'Consistent social content and campaigns that keep brands visible and recognizable.',
    x: 3060,
    y: 58,
    placement: 'bottom',
  },
  {
    number: '05',
    title: 'BRAND IDENTITY',
    description:
      'Distinctive visual identities built to communicate clearly across every touchpoint.',
    x: 3880,
    y: 55,
    placement: 'top',
  },
  {
    number: '06',
    title: 'SEO & OPTIMIZATION',
    description:
      'Search-focused structure and optimization built for sustainable organic visibility.',
    x: 4700,
    y: 58,
    placement: 'bottom',
  },
]

const GRAPH_PATH = `
  M -200 420
  C 100 435 320 340 620 370
  C 850 390 1050 445 1250 415
  C 1370 398 1410 375 1430 380
  C 1680 425 1900 420 2100 395
  C 2170 386 2220 370 2240 372
  C 2480 415 2700 415 2900 392
  C 3000 380 3030 370 3060 375
  C 3300 420 3500 407 3700 382
  C 3800 370 3850 360 3880 367
  C 4120 415 4330 397 4500 375
  C 4600 362 4670 355 4700 365
  C 4930 410 5150 385 5480 320
`

const GRAPH_HIGHLIGHT_PATH = `
  M -200 414
  C 100 429 320 334 620 364
  C 850 384 1050 439 1250 409
  C 1370 392 1410 369 1430 374
  C 1680 419 1900 414 2100 389
  C 2170 380 2220 364 2240 366
  C 2480 409 2700 409 2900 386
  C 3000 374 3030 364 3060 369
  C 3300 414 3500 401 3700 376
  C 3800 364 3850 354 3880 361
  C 4120 409 4330 391 4500 369
  C 4600 356 4670 349 4700 359
  C 4930 404 5150 379 5480 314
`

function Services() {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const worldRef = useRef(null)
  const travellingLineRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const world = worldRef.current
    const travellingLine = travellingLineRef.current
    const endDot = section.querySelector(
      '.nova-services-journey__end-dot'
    )
    const endRing = section.querySelector(
      '.nova-services-journey__end-ring'
    )

    if (!section || !viewport || !world) return undefined

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) return undefined

    let resizeTimer

    const ctx = gsap.context(() => {
      const serviceElements = gsap.utils.toArray(
        '.nova-services-journey__service'
      )

      const firstService = serviceElements[0]
      const lastService =
        serviceElements[serviceElements.length - 1]

      if (!firstService || !lastService) return

      const getStartX = () => {
        const mobile = window.innerWidth <= 760

        return (
          window.innerWidth * (mobile ? 0.18 : 0.15) -
          firstService.offsetLeft
        )
      }

      const getEndX = () => {
        const mobile = window.innerWidth <= 760

        return (
          window.innerWidth * (mobile ? 0.44 : 0.47) -
          lastService.offsetLeft
        )
      }

      const getTravel = () =>
        Math.abs(getEndX() - getStartX())

      const getScrollDistance = () => {
        const mobile = window.innerWidth <= 760

        return (
          getTravel() * (mobile ? 1.16 : 1.08) +
          window.innerHeight * (mobile ? 1.25 : 0.95)
        )
      }

      serviceElements.forEach((service) => {
        const content = service.querySelector(
          '.nova-services-journey__content'
        )

        const connector = service.querySelector(
          '.nova-services-journey__connector'
        )

        const node = service.querySelector(
          '.nova-services-journey__node'
        )

        gsap.set(content, {
          autoAlpha: 0,
        })

        gsap.set(connector, {
          scaleY: 0,
          autoAlpha: 0,
        })

        gsap.set(node, {
          scale: 0.76,
          autoAlpha: 0.55,
        })
      })

      /*
       * MAIN HORIZONTAL SCROLL
       */

      /*
       * One pinned timeline controls the complete journey. Keeping the
       * world movement in this timeline also makes it safe to use as the
       * containerAnimation for the service-level triggers below.
       */

      const horizontalTween = gsap.timeline({
        defaults: {
          ease: 'none',
        },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: viewport,
          pinType: 'transform',
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      horizontalTween.fromTo(
        world,
        {
          x: getStartX,
          force3D: true,
        },
        {
          x: getEndX,
          force3D: true,
          duration: 1,
        },
        0
      )

      if (travellingLine) {
        const pathLength = travellingLine.getTotalLength()

        gsap.set(travellingLine, {
          strokeDasharray: `170 ${pathLength}`,
          strokeDashoffset: pathLength,
        })

        horizontalTween.to(
          travellingLine,
          {
            strokeDashoffset: -170,
            duration: 1,
          },
          0
        )
      }

      if (endDot) {
        horizontalTween.to(
          endDot,
          {
            scale: 2.35,
            duration: 0.18,
          },
          0.82
        )
      }

      if (endRing) {
        horizontalTween.fromTo(
          endRing,
          {
            scale: 0.6,
            autoAlpha: 0,
          },
          {
            scale: 1.55,
            autoAlpha: 0.45,
            duration: 0.22,
          },
          0.78
        )
      }

      /*
       * SERVICES
       */

      serviceElements.forEach((service, index) => {
        const placement =
          service.dataset.placement

        const content = service.querySelector(
          '.nova-services-journey__content'
        )

        const connector = service.querySelector(
          '.nova-services-journey__connector'
        )

        const node = service.querySelector(
          '.nova-services-journey__node'
        )

        const nextService =
          serviceElements[index + 1]

        /*
         * CARD ENTER
         */

        if (content) {
          gsap.fromTo(
            content,
            {
              autoAlpha: 0,

              y:
                placement === 'top'
                  ? 18
                  : -18,

              scale: 0.965,
            },
            {
              autoAlpha: 1,

              y: 0,

              scale: 1,

              ease: 'none',

              scrollTrigger: {
                trigger: service,

                containerAnimation:
                  horizontalTween,

                start: 'left 84%',

                end: 'left 58%',

                scrub: true,
              },
            }
          )

          /*
           * CURRENT SERVICE LEAVES ONLY
           * WHEN NEXT SERVICE ARRIVES.
           */

          if (nextService) {
            gsap.fromTo(
              content,
              {
                autoAlpha: 1,

                scale: 1,

                y: 0,
              },
              {
                autoAlpha: 0,

                scale: 0.975,

                y:
                  placement === 'top'
                    ? 8
                    : -8,

                ease: 'none',

                scrollTrigger: {
                  trigger: nextService,

                  containerAnimation:
                    horizontalTween,

                  start: 'left 86%',

                  end: 'left 63%',

                  scrub: true,
                },
              }
            )
          }
        }

        /*
         * CONNECTOR
         */

        if (connector) {
          gsap.fromTo(
            connector,
            {
              scaleY: 0,

              autoAlpha: 0,
            },
            {
              scaleY: 1,

              autoAlpha: 1,

              ease: 'none',

              scrollTrigger: {
                trigger: service,

                containerAnimation:
                  horizontalTween,

                start: 'left 86%',

                end: 'left 61%',

                scrub: true,
              },
            }
          )

          if (nextService) {
            gsap.fromTo(
              connector,
              {
                autoAlpha: 1,
              },
              {
                autoAlpha: 0,

                ease: 'none',

                scrollTrigger: {
                  trigger: nextService,

                  containerAnimation:
                    horizontalTween,

                  start: 'left 86%',

                  end: 'left 63%',

                  scrub: true,
                },
              }
            )
          }
        }

        /*
         * NODE
         */

        if (node) {
          gsap.fromTo(
            node,
            {
              scale: 0.76,

              autoAlpha: 0.5,
            },
            {
              scale: 1.15,

              autoAlpha: 1,

              ease: 'none',

              scrollTrigger: {
                trigger: service,

                containerAnimation:
                  horizontalTween,

                start: 'left 83%',

                end: 'left 58%',

                scrub: true,
              },
            }
          )

          if (nextService) {
            gsap.fromTo(
              node,
              {
                scale: 1.15,

                autoAlpha: 1,
              },
              {
                scale: 0.85,

                autoAlpha: 0.35,

                ease: 'none',

                scrollTrigger: {
                  trigger: nextService,

                  containerAnimation:
                    horizontalTween,

                  start: 'left 86%',

                  end: 'left 63%',

                  scrub: true,
                },
              }
            )
          }
        }
      })

      /*
       * HEADER
       */

      gsap.fromTo(
        [
          '.nova-services-journey__eyebrow',
          '.nova-services-journey__heading',
          '.nova-services-journey__intro',
        ],
        {
          autoAlpha: 0,
          y: 18,
        },
        {
          autoAlpha: 1,
          y: 0,

          duration: 0.9,

          stagger: 0.08,

          ease: 'power3.out',

          scrollTrigger: {
            trigger: section,

            start: 'top 78%',

            once: true,
          },
        }
      )

      /*
       * RESIZE
       */

      const handleResize = () => {
        clearTimeout(resizeTimer)

        resizeTimer = setTimeout(() => {
          if (travellingLine) {
            const newLength =
              travellingLine.getTotalLength()

            gsap.set(travellingLine, {
              strokeDasharray:
                `170 ${newLength}`,
            })
          }

          ScrollTrigger.refresh()
        }, 150)
      }

      window.addEventListener(
        'resize',
        handleResize
      )

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })

      return () => {
        clearTimeout(resizeTimer)

        window.removeEventListener(
          'resize',
          handleResize
        )
      }
    }, section)

    return () => {
      ctx.revert()

      clearTimeout(resizeTimer)

    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="nova-services-journey"
      aria-label="Nova Layers services"
    >
      <div
        ref={viewportRef}
        className="nova-services-journey__viewport"
      >
        <div
          className="nova-services-journey__grid"
          aria-hidden="true"
        />

        <div
          className="nova-services-journey__grid-glow"
          aria-hidden="true"
        />

        <header className="nova-services-journey__header">
          <span className="nova-services-journey__eyebrow">
            SERVICES
          </span>

          <h2 className="nova-services-journey__heading">
            WHAT WE DO
          </h2>

          <p className="nova-services-journey__intro">
            End-to-end digital capabilities built to move
            brands forward with clarity, creativity and
            measurable impact.
          </p>
        </header>

        <div
          ref={worldRef}
          className="nova-services-journey__world"
        >
          <svg
            className="nova-services-journey__graph"
            viewBox="0 0 5500 720"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="nova-service-metal"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" />

                <stop offset="16%" stopColor="#d8d8d8" />

                <stop offset="34%" stopColor="#737373" />

                <stop offset="53%" stopColor="#292929" />

                <stop offset="70%" stopColor="#8d8d8d" />

                <stop offset="87%" stopColor="#dddddd" />

                <stop offset="100%" stopColor="#515151" />
              </linearGradient>

              <linearGradient
                id="nova-service-running-light"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="#ffffff"
                  stopOpacity="0"
                />

                <stop
                  offset="30%"
                  stopColor="#ffffff"
                  stopOpacity="0.45"
                />

                <stop
                  offset="50%"
                  stopColor="#ffffff"
                  stopOpacity="1"
                />

                <stop
                  offset="70%"
                  stopColor="#ffffff"
                  stopOpacity="0.45"
                />

                <stop
                  offset="100%"
                  stopColor="#ffffff"
                  stopOpacity="0"
                />
              </linearGradient>

              <filter
                id="nova-service-running-glow"
                x="-50%"
                y="-200%"
                width="200%"
                height="500%"
              >
                <feGaussianBlur
                  stdDeviation="4"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />

                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              className="nova-services-journey__graph-shadow"
              d={GRAPH_PATH}
            />

            <path
              className="nova-services-journey__graph-base"
              d={GRAPH_PATH}
            />

            <path
              className="nova-services-journey__graph-main"
              d={GRAPH_PATH}
            />

            <path
              className="nova-services-journey__graph-highlight"
              d={GRAPH_HIGHLIGHT_PATH}
            />

            <path
              ref={travellingLineRef}
              className="nova-services-journey__graph-travelling-light"
              d={GRAPH_PATH}
            />
          </svg>

          {services.map((service) => (
            <article
              key={service.number}
              className={`
                nova-services-journey__service
                nova-services-journey__service--${service.placement}
                nova-services-journey__service--${service.number}
              `}
              data-placement={service.placement}
              style={{
                '--service-x': `${service.x}px`,
                '--service-y': `${service.y}%`,
              }}
            >
              <span className="nova-services-journey__node">
                <span className="nova-services-journey__node-inner" />
              </span>

              <span className="nova-services-journey__connector" />

              <div className="nova-services-journey__content">

                <div
                  className="nova-services-journey__card-grid"
                  aria-hidden="true"
                />

                <span
                  className="nova-services-journey__card-orbit"
                  aria-hidden="true"
                />

                <span
                  className="nova-services-journey__card-dot"
                  aria-hidden="true"
                />

                <div className="nova-services-journey__content-inner">

                  <span className="nova-services-journey__number">
                    {service.number}
                  </span>

                  <div className="nova-services-journey__text-block">

                    <h3 className="nova-services-journey__title">
                      {service.title}
                    </h3>

                    <p className="nova-services-journey__description">
                      {service.description}
                    </p>

                  </div>

                  <span
                    className="nova-services-journey__card-line"
                    aria-hidden="true"
                  />

                </div>

              </div>
            </article>
          ))}

          <div className="nova-services-journey__end">

            <span className="nova-services-journey__end-line" />

            <span className="nova-services-journey__end-ring" />

            <span className="nova-services-journey__end-dot" />

          </div>

        </div>
      </div>
    </section>
  )
}

export default Services