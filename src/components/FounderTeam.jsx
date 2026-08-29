import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import founderImage from '../assets/Team/founder.png'
import webDeveloperImage from '../assets/Team/web developer.png'
import seniordmImage from '../assets/Team/Senior Digital Marketer.png'
import juniordmImage from '../assets/Team/junior Digital Marketer.png'
import videoeditorImage from '../assets/Team/junior Digital Marketer.png'


gsap.registerPlugin(ScrollTrigger)

const teamMembers = [
  {
    name: 'Hari',
    role: 'Senior Digital Marketer',
    image: seniordmImage,
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
  {
    name: 'Gowtham',
    role: 'Junior Digital Marketer',
    image: juniordmImage,
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
    {
    name: 'Bharath Kumar',
    role: 'Web Developer',
    image: webDeveloperImage,
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
  {
    name: 'Aadharsh',
    role: 'Video Editor',
    image: videoeditorImage,
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
]

function FounderTeam() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) return undefined

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          '.founder-team__founder-card, .founder-team__member, .founder-team__aside',
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          }
        )

        return
      }

      gsap.fromTo(
        '.founder-team__aside',
        {
          autoAlpha: 0,
          y: 30,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.founder-team__founder-card',
        {
          autoAlpha: 0,
          x: 35,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.founder-team__member',
        {
          autoAlpha: 0,
          y: 30,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.founder-team__team-grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.founder-team__card',
        {
          autoAlpha: 0,
          y: 20,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.founder-team__info-grid',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="founder-team"
      ref={sectionRef}
      aria-label="Founder and team"
    >
      <div className="founder-team__inner">

        {/* =====================================================
            FOUNDER AREA
        ===================================================== */}

        <div className="founder-team__top">

          <div className="founder-team__aside">

            <span className="founder-team__eyebrow">
              Founder
            </span>

            <h2 className="founder-team__heading">
              <span className="founder-team__heading-white">
                Built by a
              </span>{' '}

              <span className="founder-team__heading-grey">
                curator-led
              </span>{' '}

              <span className="founder-team__heading-white">
                studio for
              </span>{' '}

              <span className="founder-team__heading-grey">
                craft-driven
              </span>{' '}

              <span className="founder-team__heading-white">
                brands.
              </span>
            </h2>

            <p className="founder-team__description">
              Nova Layers creates refined digital experiences that blend
              editorial precision with thoughtful technology. We partner with
              visionary leaders seeking confidence, clarity, and an elevated
              digital presence.
            </p>

          </div>


          {/* FOUNDER */}

          <article className="founder-team__founder-card">

            <div className="founder-team__founder-image-wrap">

              <img
                src={founderImage}
                alt="Guru - Founder of Nova Layers"
                className="founder-team__founder-image"
              />

              <div className="founder-team__founder-overlay">

                <div className="founder-team__founder-details">

                  <span className="founder-team__founder-small">
                    Founder & Creative Director
                  </span>

                  <h3 className="founder-team__founder-name">
                    Guru
                  </h3>

                </div>

                <div className="founder-team__socials">

                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Founder Instagram"
                  >
                    IG
                  </a>

                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Founder LinkedIn"
                  >
                    IN
                  </a>

                </div>

              </div>

            </div>

          </article>

        </div>


        {/* =====================================================
            TEAM
        ===================================================== */}

        <div className="founder-team__team-section">

          <div className="founder-team__team-head">

            <div>

              <span className="founder-team__card-title">
                OUR TEAM
              </span>

              <h3 className="founder-team__team-heading">
                THE PEOPLE BEHIND NOVA LAYERS
              </h3>

            </div>

            <span className="founder-team__team-count">
              05 PEOPLE
            </span>

          </div>


          <div className="founder-team__team-grid">

            {teamMembers.map((member) => (

              <article
                className="founder-team__member"
                key={member.name}
              >

                <div className="founder-team__member-image-wrap">

                  <img
                    src={member.image}
                    alt={member.name}
                    className="founder-team__member-image"
                    loading="lazy"
                    draggable="false"
                  />

                  <div className="founder-team__member-socials">

                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} Instagram`}
                    >
                      IG
                    </a>

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      IN
                    </a>

                  </div>

                </div>


                <div className="founder-team__member-info">

                  <span className="founder-team__member-name">
                    {member.name}
                  </span>

                  <span className="founder-team__member-role">
                    {member.role}
                  </span>

                </div>

              </article>

            ))}

          </div>

        </div>


        {/* =====================================================
            BOTTOM INFO
        ===================================================== */}

        <div className="founder-team__info-grid">

          <article className="founder-team__card">

            <span className="founder-team__card-title">
              CREATE
            </span>

            <p>
              Design systems, interfaces, and immersive content built for
              premium storytelling and strong conversion.
            </p>

          </article>


          <article className="founder-team__card">

            <span className="founder-team__card-title">
              COLLABORATE
            </span>

            <p>
              A close creative process where strategy, design and technology
              work together from concept to launch.
            </p>

          </article>

        </div>

      </div>
    </section>
  )
}

export default FounderTeam