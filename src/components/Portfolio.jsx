import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import '../styles/portfolio.css'

import sheraera from '../assets/portfolio/sheraera.png'
import mmteez from '../assets/portfolio/70mmteez.png'
import cliks from '../assets/portfolio/cliks.png'
import fansaga from '../assets/portfolio/fansaga.png'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    number: '01',
    title: 'Sheraera',
    image: sheraera,
    url: 'https://sheraera.com/',
  },
  {
    number: '02',
    title: '70mmteez Studio',
    image: mmteez,
    url: 'https://70mmteezstudio.com/',
  },
  {
    number: '03',
    title: 'Clikes',
    image: cliks,
    url: 'https://clikes.in/',
  },
  {
    number: '04',
    title: 'Fansaga',
    image: fansaga,
    url: 'https://fansaga.in/',
  },
]

function Portfolio() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])
  const progressRef = useRef(null)

  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  })

  /* =========================================================
     SECTION ANIMATION
  ========================================================= */

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })

      timeline
        .fromTo(
          '.portfolio__eyebrow',
          {
            autoAlpha: 0,
            y: 14,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.5,
            ease: 'power3.out',
          }
        )

        .fromTo(
          '.portfolio__heading-word',
          {
            yPercent: 110,
          },
          {
            yPercent: 0,
            duration: reduceMotion ? 0 : 0.85,
            stagger: 0.07,
            ease: 'power4.out',
          },
          0.05
        )

        .fromTo(
          '.portfolio__header-side',
          {
            autoAlpha: 0,
            x: 20,
          },
          {
            autoAlpha: 1,
            x: 0,
            duration: reduceMotion ? 0 : 0.6,
            ease: 'power3.out',
          },
          0.15
        )

        .fromTo(
          cardsRef.current,
          {
            autoAlpha: 0,
            y: 28,
            scale: 0.97,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: reduceMotion ? 0 : 0.7,
            stagger: 0.06,
            ease: 'power3.out',
          },
          0.22
        )

        .fromTo(
          '.portfolio__progress-wrap',
          {
            autoAlpha: 0,
            y: 12,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.5,
            ease: 'power3.out',
          },
          0.55
        )

        .fromTo(
          '.portfolio__view-all-wrap',
          {
            autoAlpha: 0,
            y: 18,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0 : 0.6,
            ease: 'power3.out',
          },
          0.65
        )
    }, section)

    return () => ctx.revert()
  }, [])

  /* =========================================================
     CAROUSEL PROGRESS + WHEEL
  ========================================================= */

  useEffect(() => {
    const track = trackRef.current

    if (!track) return

    const updateProgress = () => {
      const max =
        track.scrollWidth -
        track.clientWidth

      const progress =
        max > 0
          ? track.scrollLeft / max
          : 0

      if (progressRef.current) {
        progressRef.current.style.transform =
          `scaleX(${progress})`
      }
    }

    const handleWheel = (event) => {
      if (
        Math.abs(event.deltaY) <=
        Math.abs(event.deltaX)
      ) {
        return
      }

      const max =
        track.scrollWidth -
        track.clientWidth

      if (max <= 0) return

      const atStart =
        track.scrollLeft <= 1

      const atEnd =
        track.scrollLeft >= max - 1

      if (
        (event.deltaY < 0 && atStart) ||
        (event.deltaY > 0 && atEnd)
      ) {
        return
      }

      event.preventDefault()

      track.scrollLeft +=
        event.deltaY * 1.05
    }

    track.addEventListener(
      'wheel',
      handleWheel,
      { passive: false }
    )

    track.addEventListener(
      'scroll',
      updateProgress,
      { passive: true }
    )

    updateProgress()

    return () => {
      track.removeEventListener(
        'wheel',
        handleWheel
      )

      track.removeEventListener(
        'scroll',
        updateProgress
      )
    }
  }, [])

  /* =========================================================
     CAROUSEL BUTTONS
  ========================================================= */

  const scrollCarousel = (direction) => {
    const track = trackRef.current

    if (!track) return

    track.scrollBy({
      left:
        direction *
        Math.min(
          track.clientWidth * 0.56,
          380
        ),
      behavior: 'smooth',
    })
  }

  /* =========================================================
     POINTER DOWN
  ========================================================= */

  const handlePointerDown = (event) => {
    const track = trackRef.current

    if (!track) return

    /*
      Only left mouse button.
      Touch and pen are allowed.
    */

    if (
      event.pointerType === 'mouse' &&
      event.button !== 0
    ) {
      return
    }

    dragRef.current.dragging = true
    dragRef.current.startX = event.clientX
    dragRef.current.startScrollLeft =
      track.scrollLeft
    dragRef.current.moved = false

    track.classList.add(
      'portfolio__track--dragging'
    )
  }

  /* =========================================================
     POINTER MOVE
  ========================================================= */

  const handlePointerMove = (event) => {
    const track = trackRef.current

    if (
      !track ||
      !dragRef.current.dragging
    ) {
      return
    }

    const distance =
      event.clientX -
      dragRef.current.startX

    /*
      Only consider it a drag after
      moving more than 8 pixels.
    */

    if (Math.abs(distance) > 8) {
      dragRef.current.moved = true

      track.scrollLeft =
        dragRef.current.startScrollLeft -
        distance * 1.06
    }
  }

  /* =========================================================
     POINTER UP
  ========================================================= */

  const handlePointerUp = () => {
    const track = trackRef.current

    if (!track) return

    dragRef.current.dragging = false

    track.classList.remove(
      'portfolio__track--dragging'
    )

    /*
      Keep moved = true until the click event
      has finished.
    */
  }

  /* =========================================================
     POINTER CANCEL
  ========================================================= */

  const handlePointerCancel = () => {
    const track = trackRef.current

    if (!track) return

    dragRef.current.dragging = false
    dragRef.current.moved = false

    track.classList.remove(
      'portfolio__track--dragging'
    )
  }

  /* =========================================================
     PROJECT CLICK
  ========================================================= */

  const handleProjectClick = (event) => {
    /*
      IMPORTANT:

      We DO NOT use preventDefault for a normal click.

      The browser's native <a href=""> handles
      the website redirect.

      We only cancel the click when the user
      actually dragged the carousel.
    */

    if (dragRef.current.moved) {
      event.preventDefault()

      dragRef.current.moved = false
    }
  }

  /* =========================================================
     CARD REFERENCES
  ========================================================= */

  cardsRef.current = []

  return (
    <section
      ref={sectionRef}
      className="portfolio"
      aria-label="Selected Nova Layers projects"
    >

      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        className="portfolio__grid"
        aria-hidden="true"
      />

      <div className="portfolio__container">

        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="portfolio__header">

          <div className="portfolio__header-main">

            <span className="portfolio__eyebrow">
              PORTFOLIO
            </span>

            <div className="portfolio__heading">

              <div className="portfolio__heading-mask">

                <h2 className="portfolio__heading-word portfolio__heading-word--white">
                  SELECTED
                </h2>

              </div>

              <div className="portfolio__heading-mask">

                <h2 className="portfolio__heading-word portfolio__heading-word--grey">
                  PROJECTS
                </h2>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="portfolio__header-side">

            <p className="portfolio__intro">
              A curated selection of work built with
              strategy, craft and purposeful digital
              experiences.
            </p>

            <div className="portfolio__explore">

              <div className="portfolio__explore-label">

                <span className="portfolio__explore-dot" />

                <span>
                  SCROLL / DRAG TO EXPLORE
                </span>

              </div>

              <span className="portfolio__explore-arrow">
                ←
              </span>

            </div>

          </div>

        </header>

        {/* ===================================================
            GALLERY
        =================================================== */}

        <div className="portfolio__gallery">

          {/* PREVIOUS BUTTON */}

          <button
            type="button"
            className="portfolio__nav portfolio__nav--prev"
            onClick={() =>
              scrollCarousel(-1)
            }
            aria-label="Previous projects"
          >
            ←
          </button>

          {/* =================================================
              CAROUSEL TRACK
          ================================================= */}

          <div
            ref={trackRef}
            className="portfolio__track"

            onPointerDown={
              handlePointerDown
            }

            onPointerMove={
              handlePointerMove
            }

            onPointerUp={
              handlePointerUp
            }

            onPointerCancel={
              handlePointerCancel
            }
          >

            {projects.map(
              (project, index) => (

                /*
                 =================================================
                 REAL HTML LINK
                 =================================================

                 Clicking this card normally goes directly to:

                 project.url

                 No JavaScript redirect is required.
                */

                <a
                  key={project.number}

                  ref={(element) => {
                    cardsRef.current[index] =
                      element
                  }}

                  href={project.url}

                  target="_blank"

                  rel="noopener noreferrer"

                  className="portfolio-project"

                  onClick={
                    handleProjectClick
                  }

                  aria-label={
                    `Open ${project.title} website`
                  }
                >

                  {/* =========================================
                      IMAGE CONTAINER
                  ========================================= */}

                  <div className="portfolio-project__media">

                    <img
                      className="portfolio-project__image"

                      src={project.image}

                      alt={
                        `${project.title} project preview`
                      }

                      draggable="false"
                    />

                    {/* IMAGE OVERLAY */}

                    <span
                      className="portfolio-project__image-overlay"
                      aria-hidden="true"
                    />

                    {/* NUMBER */}

                    <span
                      className="portfolio-project__number"
                      aria-hidden="true"
                    >
                      {project.number}
                    </span>

                  </div>

                  {/* =========================================
                      PROJECT FOOTER
                  ========================================= */}

                  <div className="portfolio-project__footer">

                    <div>

                      <span className="portfolio-project__label">
                        PROJECT {project.number}
                      </span>

                      <h3 className="portfolio-project__title">
                        {project.title}
                      </h3>

                    </div>

                    <span
                      className="portfolio-project__arrow"
                      aria-hidden="true"
                    >
                      ↗
                    </span>

                  </div>

                </a>

              )
            )}

          </div>

          {/* NEXT BUTTON */}

          <button
            type="button"
            className="portfolio__nav portfolio__nav--next"
            onClick={() =>
              scrollCarousel(1)
            }
            aria-label="Next projects"
          >
            →
          </button>

        </div>

        {/* ===================================================
            PROGRESS
        =================================================== */}

        <div className="portfolio__progress-wrap">

          <span>
            01
          </span>

          <div className="portfolio__progress">

            <span
              ref={progressRef}
              className="portfolio__progress-fill"
            />

          </div>

          <span>
            {String(
              projects.length
            ).padStart(2, '0')}
          </span>

        </div>

        {/* ===================================================
            VIEW ALL
        =================================================== */}

        <div className="portfolio__view-all-wrap">

          <a
            href="/portfolio"
            className="portfolio__view-all"
          >

            <span>
              View All Projects
            </span>

            <span>
              ↗
            </span>

          </a>

        </div>

      </div>

    </section>
  )
}

export default Portfolio