import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/testimonials.css'

/* =========================================================
   BRAND LOGOS
   ========================================================= */

import sheraEraLogo from '../assets/Brands/shera.png'
import seventyMmTeezLogo from '../assets/Brands/70mm logo.png'
import vaultLogo from '../assets/Brands/vault.png'
import sheLogo from '../assets/Brands/she.jpeg'

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   TESTIMONIALS
   ========================================================= */

const testimonials = [
  {
    quote:
      'Nova Layers completely transformed the way SheraEra presents its brand online. The website feels premium, smooth, and easy to navigate, while keeping the focus on our products. The attention to detail throughout the development really stood out.',
    name: 'SheraEra Team',
    role: 'Brand Team',
    company: 'SheraEra',
    image: sheraEraLogo,
    rating: 5,
  },
  {
    quote:
      'Working with Nova Layers gave 70MMTEEZ Studio a website that finally matched the quality of our creative work. The visual direction, animations, responsiveness, and overall experience feel modern without making the site difficult to use.',
    name: '70MMTEEZ Team',
    role: 'Studio Team',
    company: '70MMTEEZ Studio',
    image: seventyMmTeezLogo,
    rating: 5,
  },
  {
    quote:
      'Nova Layers understood the direction we wanted for Vault and turned it into a clean digital experience. The website feels structured, professional, and visually strong, while the interactions make the brand feel much more memorable.',
    name: 'Vault Team',
    role: 'Brand Team',
    company: 'Vault',
    image: vaultLogo,
    rating: 4.5,
  },
  {
    quote:
      'The team at Nova Layers brought a fresh perspective to SHE. From the visual layout to the small interaction details, everything feels intentional. The final result gives the brand a much stronger and more polished digital presence.',
    name: 'SHE Team',
    role: 'Brand Team',
    company: 'SHE',
    image: sheLogo,
    rating: 4.5,
  },
]

/* =========================================================
   STAR RATING
   ========================================================= */

function StarRating({ rating }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div
      className="testimonials__stars"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map(
        (_, index) => {
          if (index < fullStars) {
            return (
              <span
                key={index}
                className="testimonials__star testimonials__star--full"
              >
                ★
              </span>
            )
          }

          if (
            index === fullStars &&
            hasHalfStar
          ) {
            return (
              <span
                key={index}
                className="testimonials__star testimonials__star--half"
              >
                <span className="testimonials__star-base">
                  ★
                </span>

                <span className="testimonials__star-fill">
                  ★
                </span>
              </span>
            )
          }

          return (
            <span
              key={index}
              className="testimonials__star testimonials__star--empty"
            >
              ★
            </span>
          )
        }
      )}
    </div>
  )
}

/* =========================================================
   INITIALS
   ========================================================= */

function getInitials(name) {
  return name
    .split(' ')
    .map(
      (part) =>
        part[0]?.toUpperCase() ?? ''
    )
    .slice(0, 2)
    .join('')
}

/* =========================================================
   COMPONENT
   ========================================================= */

function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const progressRefs = useRef([])
  const autoSlideRef = useRef(null)
  const autoDirectionRef = useRef(1)
  const activeIndexRef = useRef(0)

  const [activeIndex, setActiveIndex] =
    useState(0)

  const reducedMotionRef =
    useRef(false)

  const isInteractingRef =
    useRef(false)

  const resumeTimeoutRef =
    useRef(null)

  const wheelLockRef =
    useRef(false)

  const wheelAccumRef =
    useRef(0)

  const cardCount =
    testimonials.length

  /* =========================================================
     SLIDE TO CARD
     ========================================================= */

  const slideToIndex = (index) => {
    const track =
      trackRef.current

    const cards =
      cardRefs.current.filter(Boolean)

    if (!track || cards.length === 0)
      return

    const cardWidth =
      cards[0].offsetWidth

    const computed =
      getComputedStyle(track)

    const gap =
      parseFloat(
        computed.gap || '24'
      )

    const wrapperWidth =
      track.parentElement.clientWidth

    const offset =
      wrapperWidth / 2 -
      cardWidth / 2

    const x =
      offset -
      index *
        (cardWidth + gap)

    gsap.killTweensOf(track)

    gsap.to(track, {
      x,
      duration:
        reducedMotionRef.current
          ? 0
          : 0.82,
      ease:
        'cubic-bezier(0.16, 1, 0.3, 1)',
      force3D: true,
      overwrite: 'auto',
    })
  }

  /* =========================================================
     UPDATE ACTIVE INDEX
     ========================================================= */

  const updateIndex = (
    nextIndex
  ) => {
    const normalized =
      (nextIndex + cardCount) %
      cardCount

    activeIndexRef.current =
      normalized

    setActiveIndex(normalized)

    slideToIndex(normalized)

    animateProgress(normalized)
  }

  /* =========================================================
     PROGRESS
     ========================================================= */

  const animateProgress = (
    index
  ) => {
    progressRefs.current.forEach(
      (bar, barIndex) => {
        if (!bar) return

        gsap.killTweensOf(bar)

        if (barIndex === index) {
          gsap.set(bar, {
            width: '0%',
          })

          if (
            !reducedMotionRef.current
          ) {
            gsap.to(bar, {
              width: '100%',
              duration: 2,
              ease: 'none',
            })
          } else {
            gsap.set(bar, {
              width: '100%',
            })
          }
        } else {
          gsap.set(bar, {
            width: '0%',
          })
        }
      }
    )
  }

  /* =========================================================
     AUTO SLIDE
     ========================================================= */

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      window.clearTimeout(
        autoSlideRef.current
      )
    }

    autoSlideRef.current = null
  }

  const scheduleAutoSlide = (
    delay = 1200
  ) => {
    if (
      reducedMotionRef.current ||
      isInteractingRef.current
    ) {
      return
    }

    autoSlideRef.current =
      window.setTimeout(() => {
        const currentIndex =
          activeIndexRef.current

        if (
          currentIndex ===
          cardCount - 1
        ) {
          autoDirectionRef.current =
            -1
        } else if (
          currentIndex === 0
        ) {
          autoDirectionRef.current =
            1
        }

        const nextIndex =
          currentIndex +
          autoDirectionRef.current

        updateIndex(nextIndex)

        scheduleAutoSlide(2020)
      }, delay)
  }

  const startAutoSlide = () => {
    if (
      reducedMotionRef.current ||
      isInteractingRef.current
    ) {
      return
    }

    stopAutoSlide()

    scheduleAutoSlide()
  }

  const pauseAutoSlide = () => {
    isInteractingRef.current =
      true

    stopAutoSlide()

    if (resumeTimeoutRef.current) {
      window.clearTimeout(
        resumeTimeoutRef.current
      )
    }
  }

  const resumeAutoSlide = () => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(
        resumeTimeoutRef.current
      )
    }

    resumeTimeoutRef.current =
      window.setTimeout(() => {
        isInteractingRef.current =
          false

        startAutoSlide()
      }, 700)
  }

  /* =========================================================
     CONTROLS
     ========================================================= */

  const handlePrev = () => {
    pauseAutoSlide()

    updateIndex(
      activeIndexRef.current -
        1
    )
  }

  const handleNext = () => {
    pauseAutoSlide()

    updateIndex(
      activeIndexRef.current +
        1
    )
  }

  /* =========================================================
     WHEEL / TRACKPAD
     ========================================================= */

  const handleWheel = (
    event
  ) => {
    const delta =
      Math.abs(event.deltaX) >
      Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY

    if (Math.abs(delta) < 2)
      return

    const currentIndex =
      activeIndexRef.current

    const isScrollingForward =
      delta > 0

    const isScrollingBackward =
      delta < 0

    if (
      (isScrollingBackward &&
        currentIndex === 0) ||
      (isScrollingForward &&
        currentIndex ===
          cardCount - 1)
    ) {
      wheelAccumRef.current = 0
      return
    }

    event.preventDefault()

    pauseAutoSlide()

    wheelAccumRef.current +=
      delta

    const THRESHOLD = 72

    if (wheelLockRef.current)
      return

    if (
      wheelAccumRef.current >=
      THRESHOLD
    ) {
      wheelLockRef.current = true

      wheelAccumRef.current = 0

      updateIndex(
        Math.min(
          currentIndex + 1,
          cardCount - 1
        )
      )

      window.setTimeout(() => {
        wheelLockRef.current = false
      }, 760)
    } else if (
      wheelAccumRef.current <=
      -THRESHOLD
    ) {
      wheelLockRef.current = true

      wheelAccumRef.current = 0

      updateIndex(
        Math.max(
          currentIndex - 1,
          0
        )
      )

      window.setTimeout(() => {
        wheelLockRef.current = false
      }, 760)
    }

    resumeAutoSlide()
  }

  /* =========================================================
     START AFTER REVEAL
     ========================================================= */

  const handleScrollTriggerStart =
    () => {
      if (
        !reducedMotionRef.current
      ) {
        startAutoSlide()
      }

      animateProgress(
        activeIndexRef.current
      )
    }

  /* =========================================================
     SWIPE / DRAG
     ========================================================= */

  const handleSwipe = (
    event
  ) => {
    const startX =
      event.clientX ||
      event.touches?.[0]?.clientX

    if (startX == null) return

    let currentX = startX

    const onMove = (
      moveEvent
    ) => {
      currentX =
        moveEvent.clientX ||
        moveEvent.touches?.[0]
          ?.clientX ||
        currentX
    }

    const onEnd = () => {
      const delta =
        currentX - startX

      if (Math.abs(delta) > 50) {
        if (delta < 0) {
          handleNext()
        } else {
          handlePrev()
        }
      }

      document.removeEventListener(
        'mousemove',
        onMove
      )

      document.removeEventListener(
        'touchmove',
        onMove
      )

      document.removeEventListener(
        'mouseup',
        onEnd
      )

      document.removeEventListener(
        'touchend',
        onEnd
      )

      document.removeEventListener(
        'touchcancel',
        onEnd
      )

      resumeAutoSlide()
    }

    document.addEventListener(
      'mousemove',
      onMove
    )

    document.addEventListener(
      'touchmove',
      onMove,
      {
        passive: true,
      }
    )

    document.addEventListener(
      'mouseup',
      onEnd
    )

    document.addEventListener(
      'touchend',
      onEnd
    )

    document.addEventListener(
      'touchcancel',
      onEnd
    )
  }

  /* =========================================================
     CARD HOVER TILT
     ========================================================= */

  const handleCardMove = (
    event,
    index
  ) => {
    if (
      reducedMotionRef.current ||
      index !== activeIndex
    ) {
      return
    }

    const card =
      cardRefs.current[index]

    if (!card) return

    const rect =
      card.getBoundingClientRect()

    const px =
      (event.clientX -
        rect.left) /
      rect.width

    const py =
      (event.clientY -
        rect.top) /
      rect.height

    const x =
      (px - 0.5) * 5

    const y =
      (py - 0.5) * 5

    gsap.to(card, {
      x,
      y,
      duration: 0.35,
      ease: 'power3.out',
    })
  }

  const handleCardLeave = (
    index
  ) => {
    const card =
      cardRefs.current[index]

    if (!card) return

    gsap.to(card, {
      x: 0,
      y: 0,
      duration: 0.35,
      ease: 'power3.out',
    })
  }

  /* =========================================================
     GSAP REVEAL
     ========================================================= */

  useEffect(() => {
    const section =
      sectionRef.current

    const track =
      trackRef.current

    if (!section || !track)
      return

    const mm =
      gsap.matchMedia()

    const ctx = gsap.context(
      () => {
        mm.add(
          {
            reduceMotion:
              '(prefers-reduced-motion: reduce)',
          },
          (context) => {
            const {
              reduceMotion,
            } = context.conditions

            reducedMotionRef.current =
              reduceMotion

            const cards =
              cardRefs.current.filter(
                Boolean
              )

            if (reduceMotion) {
              gsap.set(section, {
                autoAlpha: 1,
              })

              gsap.set(cards, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter:
                  'blur(0px)',
              })

              progressRefs.current.forEach(
                (bar) => {
                  gsap.set(bar, {
                    width: '100%',
                  })
                }
              )

              return
            }

            const revealTimeline =
              gsap.timeline({
                scrollTrigger: {
                  trigger: section,

                  start: 'top 88%',

                  toggleActions:
                    'play none none reverse',

                  invalidateOnRefresh:
                    true,

                  onEnter:
                    handleScrollTriggerStart,

                  onEnterBack:
                    handleScrollTriggerStart,
                },
              })

            /* HEADING */

            revealTimeline.fromTo(
              '.testimonials__script',
              {
                autoAlpha: 0,
                y: 30,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.75,
                ease: 'power4.out',
              }
            )

            revealTimeline.fromTo(
              '.testimonials__bold',
              {
                autoAlpha: 0,
                y: 50,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: 'power4.out',
              },
              0.12
            )

            /* SEPARATOR */

            revealTimeline.fromTo(
              '.testimonials__heading-line',
              {
                scaleX: 0,
                transformOrigin:
                  'center',
              },
              {
                scaleX: 1,
                duration: 0.75,
                ease: 'power4.out',
              },
              0.35
            )

            /* CAROUSEL */

            revealTimeline.fromTo(
              '.testimonials__carousel',
              {
                autoAlpha: 0,
                y: 50,
                scale: 0.96,
              },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: 'power4.out',
              },
              0.45
            )

            /* CARDS */

            cards.forEach(
              (card, index) => {
                const startX =
                  index === 0
                    ? -160
                    : index === 1
                    ? -80
                    : index ===
                      testimonials.length -
                        2
                    ? 80
                    : 160

                revealTimeline.fromTo(
                  card,
                  {
                    autoAlpha: 0,
                    x: startX,
                    scale: 0.94,
                  },
                  {
                    autoAlpha: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.85,
                    ease: 'power4.out',
                  },
                  0.55 +
                    index * 0.07
                )
              }
            )
          }
        )
      },
      section
    )

    /* =======================================================
       VISIBILITY
       ======================================================= */

    const handleVisibility =
      () => {
        if (document.hidden) {
          stopAutoSlide()
        } else {
          resumeAutoSlide()
        }
      }

    /* =======================================================
       RESIZE
       ======================================================= */

    const handleResize = () => {
      slideToIndex(
        activeIndexRef.current
      )

      ScrollTrigger.refresh()
    }

    document.addEventListener(
      'visibilitychange',
      handleVisibility
    )

    window.addEventListener(
      'resize',
      handleResize
    )

    return () => {
      stopAutoSlide()

      if (
        resumeTimeoutRef.current
      ) {
        window.clearTimeout(
          resumeTimeoutRef.current
        )
      }

      document.removeEventListener(
        'visibilitychange',
        handleVisibility
      )

      window.removeEventListener(
        'resize',
        handleResize
      )

      ctx.revert()

      mm.revert()
    }
  }, [])

  /* =========================================================
     ACTIVE INDEX UPDATE
     ========================================================= */

  useEffect(() => {
    slideToIndex(activeIndex)

    animateProgress(activeIndex)
  }, [activeIndex])

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <section
      className="testimonials"
      ref={sectionRef}
      aria-label="Client testimonials"
    >
      <div className="testimonials__background" />

      <div className="testimonials__container">

        {/* =================================================
            HEADER
            ================================================= */}

        <div className="testimonials__header">

          <div className="testimonials__title">

            <div className="line-mask">

              <div className="line-mask__inner">

                <div className="testimonials__heading-top">

                  <span className="testimonials__script">
                    what
                  </span>

                  <span className="testimonials__bold">
                    Our
                  </span>

                </div>

                <div className="testimonials__heading-bottom">

                  <span className="testimonials__bold">
                    Client Say
                  </span>

                </div>

              </div>

            </div>

          </div>

          <div className="testimonials__separator">

            <span className="testimonials__heading-line" />

            <span className="testimonials__separator-dot" />

            <span className="testimonials__heading-line" />

          </div>

        </div>

        {/* =================================================
            CAROUSEL
            ================================================= */}

        <div
          className="testimonials__carousel"
          onMouseEnter={
            pauseAutoSlide
          }
          onMouseLeave={
            resumeAutoSlide
          }
          onTouchStart={
            pauseAutoSlide
          }
          onTouchEnd={
            resumeAutoSlide
          }
          onPointerDown={
            handleSwipe
          }
          onWheel={handleWheel}
        >

          <div
            className="testimonials__track"
            ref={trackRef}
          >

            {testimonials.map(
              (item, index) => {

                const isActive =
                  index ===
                  activeIndex

                const isPrev =
                  index ===
                  (
                    activeIndex -
                    1 +
                    cardCount
                  ) %
                    cardCount

                const isNext =
                  index ===
                  (
                    activeIndex +
                    1
                  ) %
                    cardCount

                const stateClass =
                  isActive
                    ? 'testimonials__card--active'
                    : isPrev
                    ? 'testimonials__card--prev'
                    : isNext
                    ? 'testimonials__card--next'
                    : 'testimonials__card--other'

                return (
                  <article
                    key={
                      item.name +
                      index
                    }
                    className={`testimonials__card ${stateClass}`}
                    ref={(el) => {
                      cardRefs.current[
                        index
                      ] = el
                    }}
                    onMouseMove={(
                      event
                    ) =>
                      handleCardMove(
                        event,
                        index
                      )
                    }
                    onMouseLeave={() =>
                      handleCardLeave(
                        index
                      )
                    }
                  >

                    {/* QUOTE ICON */}

                    <span className="testimonials__quote-mark">
                      “
                    </span>

                    {/* STAR RATING */}

                    <div className="testimonials__rating">
                      <StarRating
                        rating={
                          item.rating
                        }
                      />
                    </div>

                    {/* REVIEW */}

                    <p className="testimonials__quote">
                      {item.quote}
                    </p>

                    {/* CLIENT INFO */}

                    <div className="testimonials__meta-row">

                      <div className="testimonials__client">

                        {item.image ? (
                          <img
                            src={
                              item.image
                            }
                            alt={`${item.company} logo`}
                            className="testimonials__avatar"
                          />
                        ) : (
                          <div className="testimonials__avatar testimonials__avatar--placeholder">
                            {getInitials(
                              item.name
                            )}
                          </div>
                        )}

                        <div>

                          <p className="testimonials__client-name">
                            {item.name}
                          </p>

                          <p className="testimonials__client-role">
                            {item.role} —{' '}
                            {item.company}
                          </p>

                        </div>

                      </div>

                      <span className="testimonials__index">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          '0'
                        )}{' '}
                        /{' '}
                        {String(
                          cardCount
                        ).padStart(
                          2,
                          '0'
                        )}
                      </span>

                    </div>

                  </article>
                )
              }
            )}

          </div>

        </div>

        {/* =================================================
            CONTROLS
            ================================================= */}

        <div className="testimonials__controls-row">

          <button
            type="button"
            aria-label="Previous testimonial"
            className="testimonials__control testimonials__control--prev"
            onClick={
              handlePrev
            }
          >
            ←
          </button>

          <button
            type="button"
            aria-label="Next testimonial"
            className="testimonials__control testimonials__control--next"
            onClick={
              handleNext
            }
          >
            →
          </button>

        </div>

        {/* =================================================
            PROGRESS
            ================================================= */}

        <div className="testimonials__progress">

          {testimonials.map(
            (_, index) => (
              <div
                key={index}
                className="testimonials__progress-item"
              >

                <div
                  ref={(el) => {
                    progressRefs.current[
                      index
                    ] = el
                  }}
                  className={`testimonials__progress-fill ${
                    index ===
                    activeIndex
                      ? 'active'
                      : ''
                  }`}
                />

              </div>
            )
          )}

        </div>

      </div>
    </section>
  )
}

export default Testimonials