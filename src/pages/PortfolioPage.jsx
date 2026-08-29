import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Footer from '../components/Footer/Footer.jsx'
import { videoItems } from '../components/ClientVideos.jsx'
import '../styles/portfolio-page.css'

import sheraera from '../assets/portfolio/sheraera.png'
import mmteez from '../assets/portfolio/70mmteez.png'
import cliks from '../assets/portfolio/cliks.png'
import fansaga from '../assets/portfolio/fansaga.png'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'sheraera',
    number: '01',
    title: 'Sheraera',
    year: '2026',
    industry: 'WEBSITE',
    categories: ['WEB'],
    services: '',
    description: '',
    image: sheraera,
    website: 'https://sheraera.com/',
  },
  {
    id: '70mmteez-studio',
    number: '02',
    title: '70mmteez Studio',
    year: '2026',
    industry: 'WEBSITE',
    categories: ['WEB'],
    services: '',
    description: '',
    image: mmteez,
    website: 'https://70mmteezstudio.com/',
  },
  {
    id: 'clikes',
    number: '03',
    title: 'Clikes',
    year: '2026',
    industry: 'WEBSITE',
    categories: ['WEB'],
    services: '',
    description: '',
    image: cliks,
    website: 'https://clikes.in/',
  },
  {
    id: 'fansaga',
    number: '04',
    title: 'Fansaga',
    year: '2026',
    industry: 'WEBSITE',
    categories: ['WEB'],
    services: '',
    description: '',
    image: fansaga,
    website: 'https://fansaga.in/',
  },
]

const videoCategoryOrder = [
  'BRANDING',
  'MARKETING',
  'SOCIAL MEDIA',
]

const videoProjects = [...videoItems]
  .sort(
    (first, second) =>
      videoCategoryOrder.indexOf(first.portfolioCategory) -
      videoCategoryOrder.indexOf(second.portfolioCategory)
  )
  .map((item, index) => ({
  id: `client-video-${index + 1}`,
  number: String(projects.length + index + 1).padStart(2, '0'),
  title: item.title,
  year: '2026',
  industry: item.portfolioCategory || 'CLIENT WORK',
  categories: [item.portfolioCategory || 'BRANDING'],
  services: '',
  description: '',
  video: item.video,
  }))

const allProjects = [...projects, ...videoProjects]

const filters = [
  'ALL',
  'WEB',
  'BRANDING',
  'MARKETING',
  'SOCIAL MEDIA',
]

function PortfolioPage({ onNavigate }) {
  const pageRef = useRef(null)
  const selectedRef = useRef(null)
  const workRef = useRef(null)
  const videoRefs = useRef([])

  const [activeFilter, setActiveFilter] = useState('ALL')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') {
      return allProjects
    }

    return allProjects.filter((project) =>
      project.categories.includes(activeFilter)
    )
  }, [activeFilter])

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean)

    if (!videos.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.play().catch(() => {})
          } else {
            target.pause()
          }
        })
      },
      { rootMargin: '240px 0px' }
    )

    videos.forEach((video) => observer.observe(video))

    return () => observer.disconnect()
  }, [filteredProjects])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =====================================================
         HERO PARALLAX
         ===================================================== */

      if (selectedRef.current) {
        gsap.to(selectedRef.current, {
          xPercent: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: '.portfolio-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.15,
            invalidateOnRefresh: true,
          },
        })
      }

      if (workRef.current) {
        gsap.to(workRef.current, {
          xPercent: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: '.portfolio-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.15,
            invalidateOnRefresh: true,
          },
        })
      }

      /* =====================================================
         FILTER
         ===================================================== */

      gsap.fromTo(
        '.portfolio-filter',
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-filter-section',
            start: 'top 85%',
          },
        }
      )

      /* =====================================================
         WORK HEADER
         ===================================================== */

      gsap.fromTo(
        '.portfolio-work-header__title span',
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.portfolio-work-header',
            start: 'top 82%',
          },
        }
      )

      gsap.fromTo(
        '.portfolio-work-header__meta',
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-work-header',
            start: 'top 82%',
          },
        }
      )

      /* =====================================================
         PROJECT CARDS
         ===================================================== */

      const cards = gsap.utils.toArray(
        '.portfolio-work-card'
      )

      cards.forEach((card, index) => {
        const image = card.querySelector(
          '.portfolio-work-card__image-inner'
        )

        const content = card.querySelector(
          '.portfolio-work-card__content'
        )

        gsap.fromTo(
          card,
          {
            y: 70,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: index % 2 === 1 ? 0.08 : 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
            },
          }
        )

        if (image) {
          gsap.to(image, {
            scale: 1.07,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }

        if (content) {
          gsap.fromTo(
            content,
            {
              y: 25,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 78%',
              },
            }
          )
        }
      })

      /* =====================================================
         DECORATIVE ELEMENTS
         ===================================================== */

      gsap.utils
        .toArray('.portfolio-decoration')
        .forEach((item, index) => {
          gsap.to(item, {
            rotation: index % 2 === 0 ? 360 : -360,
            duration: 18 + index * 3,
            repeat: -1,
            ease: 'none',
          })
        })

      /* =====================================================
         FINAL CTA
         ===================================================== */

      gsap.fromTo(
        '.portfolio-final__line',
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.portfolio-final',
            start: 'top 72%',
          },
        }
      )

      gsap.fromTo(
        '.portfolio-final__bottom',
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-final',
            start: 'top 65%',
          },
        }
      )

      /* =====================================================
         STARS
         ===================================================== */

      gsap.utils
        .toArray('.portfolio-star')
        .forEach((star) => {
          gsap.to(star, {
            opacity: 0.08,
            repeat: -1,
            yoyo: true,
            duration: gsap.utils.random(2.5, 5),
            ease: 'sine.inOut',
          })
        })
    }, pageRef)

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [activeFilter])

  videoRefs.current = []

  const handleNavigate = (path) => {
    if (onNavigate) {
      onNavigate(path)
      return
    }

    window.location.href = path
  }

  return (
    <div
      className="portfolio-page"
      ref={pageRef}
    >
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="portfolio-hero">
        <div className="portfolio-hero__circle" />

        <div className="portfolio-hero__grid" />

        <div className="portfolio-hero__title">
          <div className="portfolio-hero__mask">
            <h1
              ref={selectedRef}
              className="portfolio-hero__word portfolio-hero__word--selected"
            >
              SELECTED
            </h1>
          </div>

          <div className="portfolio-hero__mask">
            <h1
              ref={workRef}
              className="portfolio-hero__word portfolio-hero__word--work"
            >
              WORK
            </h1>
          </div>
        </div>

        <div className="portfolio-hero__bottom">
          <p>
            PROJECTS / DIGITAL EXPERIENCES /
            CAMPAIGNS / IDENTITIES
          </p>

          <p>NOVA LAYERS</p>

          <p>SCROLL TO EXPLORE ↓</p>
        </div>

        <span
          className="portfolio-star"
          style={{
            top: '16%',
            left: '8%',
          }}
        />

        <span
          className="portfolio-star"
          style={{
            top: '24%',
            right: '11%',
          }}
        />

        <span
          className="portfolio-star"
          style={{
            bottom: '21%',
            left: '13%',
          }}
        />

        <span
          className="portfolio-star"
          style={{
            bottom: '18%',
            right: '6%',
          }}
        />
      </section>

      {/* =====================================================
          FILTER
          ===================================================== */}

      <section className="portfolio-filter-section">
        <div className="portfolio-container">
          <div className="portfolio-filter">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`portfolio-filter__button ${
                  activeFilter === filter
                    ? 'portfolio-filter__button--active'
                    : ''
                }`}
                onClick={() => {
                  setActiveFilter(filter)

                  requestAnimationFrame(() => {
                    ScrollTrigger.refresh()
                  })
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WORK SHOWCASE
          ===================================================== */}

      <section className="portfolio-work">
        <div className="portfolio-work__grid-bg" />

        <span className="portfolio-decoration portfolio-decoration--one">
          +
        </span>

        <span className="portfolio-decoration portfolio-decoration--two">
          +
        </span>

        <span className="portfolio-decoration portfolio-decoration--three">
          ◇
        </span>

        <div className="portfolio-container">
          {/* HEADER */}

          <div className="portfolio-work-header">
            <div className="portfolio-work-header__title">
              <div className="portfolio-title-mask">
                <span>OUR</span>
              </div>

              <div className="portfolio-title-mask">
                <span className="muted">
                  WORK
                </span>
              </div>
            </div>

            <div className="portfolio-work-header__meta">
              <span>
                [ 01 — {String(filteredProjects.length).padStart(2, '0')} ]
              </span>

              <p>
                DIGITAL EXPERIENCES
                <br />
                BUILT BY NOVA LAYERS
              </p>
            </div>
          </div>

          {/* PROJECT GRID */}

          <div className="portfolio-work-grid">
            {filteredProjects.map(
              (project, index) => (
                <article
                  key={project.id}
                  className={`portfolio-work-card ${
                    project.video
                      ? 'portfolio-work-card--video'
                      : ''
                  }`}
                >
                  <a
                    className="portfolio-work-card__visual"
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="portfolio-work-card__image">
                      <div className="portfolio-work-card__image-inner">
                        {project.video ? (
                          <video
                            ref={(video) => {
                              if (video) videoRefs.current.push(video)
                            }}
                            src={project.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="portfolio-work-card__video"
                            aria-label={`${project.title} client work video`}
                          />
                        ) : (
                          <img
                            src={project.image}
                            alt={project.title}
                          />
                        )}
                      </div>
                    </div>

                    <div className="portfolio-work-card__overlay" />

                    {!project.video && (
                      <>
                        <div className="portfolio-work-card__top">
                          <span>
                            {project.number}
                          </span>

                          <span>
                            NOVA / {project.year}
                          </span>
                        </div>

                        <div className="portfolio-work-card__view">
                          <span>
                            VIEW
                            <br />
                            PROJECT ↗
                          </span>
                        </div>

                        <div className="portfolio-work-card__corner portfolio-work-card__corner--tl" />
                        <div className="portfolio-work-card__corner portfolio-work-card__corner--br" />
                      </>
                    )}
                  </a>

                </article>
              )
            )}
          </div>

          {filteredProjects.length === 0 && (
            <div className="portfolio-empty">
              NO PROJECTS IN THIS CATEGORY YET.
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="portfolio-final">
        <div className="portfolio-final__grid-bg" />

        <div className="portfolio-container">
          <div className="portfolio-final__top">
            <span>
              [ YOUR PROJECT / NEXT ]
            </span>

            <span>
              NOVA / 2026
            </span>
          </div>

          <div className="portfolio-final__heading">
            <div className="portfolio-title-mask">
              <h2 className="portfolio-final__line">
                LET'S BUILD
              </h2>
            </div>

            <div className="portfolio-title-mask">
              <h2 className="portfolio-final__line portfolio-final__line--muted">
                THE NEXT ONE.
              </h2>
            </div>
          </div>

          <div className="portfolio-final__bottom">
            <p>
              HAVE A PROJECT IN MIND?
              <br />
              LET'S TURN IT INTO SOMETHING
              PEOPLE REMEMBER.
            </p>

            <button
              type="button"
              onClick={() =>
                handleNavigate('/contact')
              }
            >
              START A PROJECT ↗
            </button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}

export default PortfolioPage