import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { createPortal } from 'react-dom'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import '../styles/client-videos.css'

import clientVideo01 from '../assets/clientvideos/1.mp4'
import clientVideo02 from '../assets/clientvideos/2.mp4'
import clientVideo03 from '../assets/clientvideos/3.mp4'
import clientVideo04 from '../assets/clientvideos/4.mp4'
import clientVideo05 from '../assets/clientvideos/5.mp4'
import clientVideo06 from '../assets/clientvideos/6.mp4'

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   VIDEO DATA
========================================================= */

export const videoItems = [
  {
    title: '',
    category: '',
    portfolioCategory: '',
    video: clientVideo01,
  },
  {
    title: '',
    category: '',
    portfolioCategory: '',
    video: clientVideo02,
  },
  {
    title: '',
    category: '',
    portfolioCategory: '',
    video: clientVideo03,
  },
  {
    title: '',
    category: '',
    portfolioCategory: '',
    video: clientVideo04,
  },
  {
    title: '',
    category: '',
    portfolioCategory: '',
    video: clientVideo05,
  },
  {
    title: '',
    category: '',
    portfolioCategory: '',
    video: clientVideo06,
  },
]

/* =========================================================
   ICONS
========================================================= */

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 6.5v11l9-5.5-9-5.5Z" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* =========================================================
   COMPONENT
========================================================= */

function ClientVideos() {
  const sectionRef = useRef(null)
  const railRef = useRef(null)
  const loopRef = useRef(null)
  const backgroundVideoRefs = useRef([])
  const animationRef = useRef(null)
  const observerRef = useRef(null)

  const [selectedIndex, setSelectedIndex] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const loopItems = useMemo(
    () => [...videoItems, ...videoItems],
    []
  )

  const getMaxVisibleVideoCount = useCallback(() => {
    if (typeof window === 'undefined') return 2
    return window.matchMedia('(max-width: 768px)').matches ? 1 : 3
  }, [])

  const playVideo = useCallback((video) => {
    if (!(video instanceof HTMLVideoElement)) return

    if (video.dataset.loaded !== 'true') {
      try {
        video.load()
      } catch {}

      video.dataset.loaded = 'true'
    }

    if (video.paused && !video.ended) {
      const playPromise = video.play()

      if (playPromise) {
        playPromise.catch(() => {})
      }
    }
  }, [])

  const pauseVideo = useCallback((video) => {
    if (!(video instanceof HTMLVideoElement)) return

    if (!video.paused) {
      try {
        video.pause()
      } catch {}
    }
  }, [])

  const syncVisibleVideos = useCallback(() => {
    const videos = backgroundVideoRefs.current.filter(Boolean)

    if (!videos.length) return

    if (isModalOpen) {
      videos.forEach((video) => pauseVideo(video))
      return
    }

    const visibleVideos = videos
      .filter((video) => video.dataset.isVisible === 'true')
      .sort(
        (first, second) =>
          Number(second.dataset.intersectionRatio || 0) -
          Number(first.dataset.intersectionRatio || 0)
      )

    const maxVisibleVideos = getMaxVisibleVideoCount()
    const allowedVideos = new Set(
      visibleVideos.slice(0, maxVisibleVideos)
    )

    videos.forEach((video) => {
      if (allowedVideos.has(video)) {
        playVideo(video)
        return
      }

      pauseVideo(video)
    })
  }, [getMaxVisibleVideoCount, isModalOpen, pauseVideo, playVideo])

  const openViewer = useCallback((index) => {
    setSelectedIndex(index)
    setIsModalOpen(true)

    backgroundVideoRefs.current.forEach((video) => {
      if (video) {
        pauseVideo(video)
      }
    })

    document.body.classList.add('client-video-modal-open')
  }, [pauseVideo])

  const closeViewer = useCallback(() => {
    setIsModalOpen(false)
    setSelectedIndex(null)

    document.body.classList.remove('client-video-modal-open')
  }, [])

  const nextVideo = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return 0

      return (current + 1) % videoItems.length
    })
  }, [])

  const previousVideo = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return 0

      return (current - 1 + videoItems.length) % videoItems.length
    })
  }, [])

  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeViewer()
        return
      }

      if (event.key === 'ArrowRight') {
        nextVideo()
        return
      }

      if (event.key === 'ArrowLeft') {
        previousVideo()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, closeViewer, nextVideo, previousVideo])

  useEffect(() => {
    if (!isModalOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isModalOpen])

  useEffect(() => {
    if (!isModalOpen || selectedIndex === null) return

    const timer = requestAnimationFrame(() => {
      const modalVideo = document.querySelector('.client-video-viewer__video')

      if (!modalVideo) return

      modalVideo.muted = false

      const playPromise = modalVideo.play()

      if (playPromise) {
        playPromise.catch(() => {
          modalVideo.muted = true
          modalVideo.play().catch(() => {})
        })
      }
    })

    return () => {
      cancelAnimationFrame(timer)
    }
  }, [selectedIndex, isModalOpen])

  useEffect(() => {
    if (!isModalOpen) {
      syncVisibleVideos()
      return
    }

    backgroundVideoRefs.current.forEach((video) => {
      if (video) pauseVideo(video)
    })
  }, [isModalOpen, pauseVideo, syncVisibleVideos])

  useEffect(() => {
    const section = sectionRef.current
    const rail = railRef.current
    const loop = loopRef.current

    if (!section || !rail || !loop) return undefined

    const ctx = gsap.context(() => {
      let isDragging = false
      let dragStartX = 0
      let dragStartPosition = 0
      let loopWidth = 0

      const wrapX = (value, width) => {
        if (!width) return value

        let result = value

        while (result <= -width) {
          result += width
        }

        while (result > 0) {
          result -= width
        }

        return result
      }

      const buildInfiniteScroll = () => {
        if (isDragging) return

        loopWidth = loop.scrollWidth / 2

        if (!loopWidth) return

        const currentX = Number(gsap.getProperty(loop, 'x')) || 0
        const normalizedX = wrapX(currentX, loopWidth)

        animationRef.current?.kill()

        gsap.set(loop, {
          x: normalizedX,
        })

        const speed = 45
        const distance = loopWidth + normalizedX
        const duration = Math.max(distance / speed, 12)

        animationRef.current = gsap.to(loop, {
          x: -loopWidth,
          duration,
          ease: 'none',
          overwrite: true,
          onComplete: () => {
            gsap.set(loop, { x: 0 })
            buildInfiniteScroll()
          },
        })
      }

      const startRail = () => {
        if (isDragging) return

        buildInfiniteScroll()
      }

      const handlePointerDown = (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return

        isDragging = true
        dragStartX = event.clientX
        dragStartPosition = Number(gsap.getProperty(loop, 'x')) || 0

        animationRef.current?.pause()

        try {
          rail.setPointerCapture(event.pointerId)
        } catch {}
      }

      const handlePointerMove = (event) => {
        if (!isDragging) return

        const delta = event.clientX - dragStartX
        const nextX = wrapX(dragStartPosition + delta, loopWidth)

        gsap.set(loop, { x: nextX })
      }

      const handlePointerUp = (event) => {
        if (!isDragging) return

        isDragging = false

        try {
          if (rail.hasPointerCapture(event.pointerId)) {
            rail.releasePointerCapture(event.pointerId)
          }
        } catch {}

        requestAnimationFrame(() => {
          buildInfiniteScroll()
        })
      }

      const handleCardClick = (index) => {
        if (isDragging) return

        openViewer(index % videoItems.length)
      }

      const cards = section.querySelectorAll('.client-videos__card')

      cards.forEach((card, index) => {
        const clickHandler = () => handleCardClick(index)
        card.addEventListener('click', clickHandler)
        card._clientVideoClick = clickHandler
      })

      rail.addEventListener('pointerdown', handlePointerDown)
      rail.addEventListener('pointermove', handlePointerMove)
      rail.addEventListener('pointerup', handlePointerUp)
      rail.addEventListener('pointercancel', handlePointerUp)

      const handleVisibility = () => {
        if (!document.hidden) {
          requestAnimationFrame(() => {
            if (!isDragging) {
              buildInfiniteScroll()
            }

            syncVisibleVideos()
          })
        }
      }

      document.addEventListener('visibilitychange', handleVisibility)

      const handleResize = () => {
        requestAnimationFrame(() => {
          if (!isDragging) {
            buildInfiniteScroll()
          }
        })
      }

      window.addEventListener('resize', handleResize)

      requestAnimationFrame(() => {
        startRail()
        syncVisibleVideos()
      })

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      })

      revealTimeline
        .fromTo(
          '.client-videos__eyebrow',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' }
        )
        .fromTo(
          '.client-videos__title .line-mask__inner',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.85, ease: 'power4.out' },
          0.08
        )
        .fromTo(
          '.client-videos__description',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          0.18
        )
        .fromTo(
          '.client-videos__rail',
          { autoAlpha: 0, y: 45 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power4.out' },
          0.25
        )

      return () => {
        animationRef.current?.kill()

        cards.forEach((card) => {
          if (card._clientVideoClick) {
            card.removeEventListener('click', card._clientVideoClick)
          }
        })

        rail.removeEventListener('pointerdown', handlePointerDown)
        rail.removeEventListener('pointermove', handlePointerMove)
        rail.removeEventListener('pointerup', handlePointerUp)
        rail.removeEventListener('pointercancel', handlePointerUp)

        document.removeEventListener('visibilitychange', handleVisibility)
        window.removeEventListener('resize', handleResize)
      }
    }, section)

    return () => {
      ctx.revert()
      animationRef.current?.kill()
    }
  }, [openViewer, syncVisibleVideos])

  useEffect(() => {
    const videos = backgroundVideoRefs.current.filter(Boolean)

    if (!videos.length) return undefined

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
          const video = target
          const shouldPlay = isIntersecting && intersectionRatio > 0.12

          video.dataset.isVisible = String(shouldPlay)
          video.dataset.intersectionRatio = String(intersectionRatio)

          if (shouldPlay && !isModalOpen) {
            if (video.dataset.loaded !== 'true') {
              try {
                video.load()
              } catch {}

              video.dataset.loaded = 'true'
            }
          }
        })

        requestAnimationFrame(syncVisibleVideos)
      },
      {
        threshold: [0, 0.12, 0.35, 0.7],
        rootMargin: '120px 0px 180px 0px',
      }
    )

    videos.forEach((video) => observerRef.current.observe(video))

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [isModalOpen, loopItems.length, syncVisibleVideos])

  const setBackgroundVideoRef = (element, index) => {
    backgroundVideoRefs.current[index] = element

    if (!element) return

    element.muted = true
    element.defaultMuted = true
    element.playsInline = true
    element.preload = 'metadata'
    element.setAttribute('muted', '')
    element.dataset.isVisible = 'false'
    element.dataset.intersectionRatio = '0'
    element.dataset.loaded = 'false'
  }

  const selectedVideo =
    selectedIndex !== null ? videoItems[selectedIndex] : null

  return (
    <>
      <section
        ref={sectionRef}
        className="client-videos"
        aria-label="Client work created by Nova Layers"
      >
        {/* =====================================================
            BACKGROUND
        ===================================================== */}

        <div
          className="client-videos__background"
          aria-hidden="true"
        >
          <div className="client-videos__grid" />

          <div className="client-videos__glow" />

          <div className="client-videos__hairline client-videos__hairline--one" />

          <div className="client-videos__hairline client-videos__hairline--two" />
        </div>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="client-videos__container">
          <header className="client-videos__header">
            <span className="client-videos__eyebrow">
              CLIENT WORK
            </span>

            <h2 className="client-videos__title">
              <span className="line-mask">
                <span className="line-mask__inner">
                  CLIENT WORK IN MOTION
                </span>
              </span>
            </h2>

            <p className="client-videos__description">
              A selection of videos, campaigns and
              visual stories created by Nova Layers
              for our clients.
            </p>
          </header>
        </div>

        {/* =====================================================
            VIDEO RAIL
        ===================================================== */}

        <div
          ref={railRef}
          className="client-videos__rail"
        >
          <div
            ref={loopRef}
            className="client-videos__loop"
          >
            {loopItems.map(
              (item, index) => (
                <article
                  key={`${item.video}-${index}`}
                  className="client-videos__card"
                  data-video-index={
                    index %
                    videoItems.length
                  }
                >
                  <div className="client-videos__media">

                    <video
                      ref={(element) =>
                        setBackgroundVideoRef(
                          element,
                          index
                        )
                      }
                      className="client-videos__video"
                      src={item.video}
                      autoPlay
                      muted
                      defaultMuted
                      loop
                      playsInline
                      preload="metadata"
                      disablePictureInPicture
                      aria-label={
                        `${item.title} client work video`
                      }
                    />

                    <div className="client-videos__overlay" />

                    <span className="client-videos__border-light" />

                    <div className="client-videos__info">
                      <div className="client-videos__info-top">

                        <span className="client-videos__play">
                          <PlayIcon />
                        </span>

                        <span className="client-videos__work-label">
                          NOVA LAYERS WORK
                        </span>

                      </div>

                      <div className="client-videos__info-bottom">

                        <h3 className="client-videos__name">
                          {item.title}
                        </h3>

                        <p className="client-videos__category">
                          {item.category}
                        </p>

                      </div>
                    </div>

                    {/* CLICK INDICATOR */}

                    <span className="client-videos__click-layer" />

                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          FULL SCREEN VIDEO VIEWER
      ========================================================= */}

      {isMounted &&
        isModalOpen &&
        selectedVideo &&
        createPortal(
          <div
            className="client-video-viewer"
            role="dialog"
            aria-modal="true"
            aria-label="Client video viewer"
          >

            {/* ===================================================
                BACKDROP
            =================================================== */}

            <div
              className="client-video-viewer__backdrop"
              onClick={closeViewer}
            />

            {/* ===================================================
                CLOSE
            =================================================== */}

            <button
              type="button"
              className="client-video-viewer__close"
              onClick={closeViewer}
              aria-label="Close video viewer"
            >
              <CloseIcon />
            </button>

            {/* ===================================================
                PREVIOUS
            =================================================== */}

            <button
              type="button"
              className="client-video-viewer__arrow client-video-viewer__arrow--left"
              onClick={previousVideo}
              aria-label="Previous video"
            >
              <ArrowLeftIcon />
            </button>

            {/* ===================================================
                NEXT
            =================================================== */}

            <button
              type="button"
              className="client-video-viewer__arrow client-video-viewer__arrow--right"
              onClick={nextVideo}
              aria-label="Next video"
            >
              <ArrowRightIcon />
            </button>

            {/* ===================================================
                CENTER VIDEO
            =================================================== */}

            <div
              className="client-video-viewer__content"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div className="client-video-viewer__video-shell">

                <video
                  key={selectedVideo.video}
                  className="client-video-viewer__video"
                  src={selectedVideo.video}
                  autoPlay
                  playsInline
                  controls
                  preload="auto"
                  controlsList="nodownload"
                  aria-label={
                    `${selectedVideo.title} enlarged video`
                  }
                />

              </div>

              {/* =================================================
                  VIDEO INFO
              ================================================= */}

              <div className="client-video-viewer__details">

                <div>

                  <span className="client-video-viewer__eyebrow">
                    NOVA LAYERS WORK
                  </span>

                  <h3>
                    {selectedVideo.title}
                  </h3>

                  <p>
                    {selectedVideo.category}
                  </p>

                </div>

                <span className="client-video-viewer__counter">

                  {String(
                    selectedIndex + 1
                  ).padStart(2, '0')}

                  {' / '}

                  {String(
                    videoItems.length
                  ).padStart(2, '0')}

                </span>

              </div>

            </div>

          </div>,
          document.body
        )}
    </>
  )
}

export default ClientVideos