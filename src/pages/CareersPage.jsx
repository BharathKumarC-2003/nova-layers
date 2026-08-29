import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Footer from '../components/Footer/Footer.jsx'
import '../styles/careers-page.css'

gsap.registerPlugin(ScrollTrigger)

const internshipRoles = [
  'Web Development',
  'UI / UX Design',
  'Digital Marketing',
  'Social Media Marketing',
  'Graphic Design',
  'Video Editing',
  'Branding',
  'SEO',
]

const durations = [
  '1 Month',
  '2 Months',
  '3 Months',
]

function CareersPage({ onNavigate }) {
  const pageRef = useRef(null)
  const heroLineOneRef = useRef(null)
  const heroLineTwoRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    role: '',
    duration: '',
    availability: '',
    portfolio: '',
    resume: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      /* =====================================================
         HERO
      ===================================================== */

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
      })

      heroTimeline
        .fromTo(
          heroLineOneRef.current,
          {
            yPercent: 110,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
          }
        )

        .fromTo(
          heroLineTwoRef.current,
          {
            yPercent: 110,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
          },
          '-=0.78'
        )

        .fromTo(
          '.careers-hero__bottom',
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          '-=0.48'
        )

      gsap.to('.careers-hero__heading', {
        yPercent: -14,
        opacity: 0.48,
        ease: 'none',

        scrollTrigger: {
          trigger: '.careers-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      })

      /* =====================================================
         INTRO
      ===================================================== */

      gsap.fromTo(
        '.careers-intro__content > *',
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: '.careers-intro',
            start: 'top 78%',
          },
        }
      )

      /* =====================================================
         GENERAL APPLICATION
      ===================================================== */

      gsap.fromTo(
        '.resume-section__grid > *',
        {
          y: 28,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: '.resume-section',
            start: 'top 78%',
          },
        }
      )

      /* =====================================================
         INTERN APPLICATION
      ===================================================== */

      gsap.fromTo(
        '.intern-form-section__aside',
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: '.intern-form-section',
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.career-form',
        {
          y: 34,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',

          scrollTrigger: {
            trigger: '.intern-form-section',
            start: 'top 78%',
          },
        }
      )

      gsap.utils
        .toArray('.career-field, .career-choice-group')
        .forEach((field) => {
          gsap.fromTo(
            field,
            {
              y: 18,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: 'power3.out',

              scrollTrigger: {
                trigger: field,
                start: 'top 92%',
              },
            }
          )
        })

      /* =====================================================
         STARS
      ===================================================== */

      gsap.utils
        .toArray('.careers-star')
        .forEach((star) => {
          gsap.to(star, {
            opacity: gsap.utils.random(
              0.28,
              0.7
            ),

            duration: gsap.utils.random(
              2.5,
              5
            ),

            repeat: -1,
            yoyo: true,
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
  }, [])

  const updateField = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (submitted) {
      setSubmitted(false)
    }
  }

  const updateChoice = (name, value) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (submitted) {
      setSubmitted(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.role || !formData.duration) {
      return
    }

    console.log(
      'Nova Layers internship application:',
      formData
    )

    setSubmitted(true)
  }

  return (
    <div
      className="careers-page"
      ref={pageRef}
    >

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="careers-hero">

        <div className="careers-hero__ambient" />

        <div className="careers-hero__circle" />

        <span
          className="careers-star careers-star--one"
          style={{
            top: '15%',
            left: '9%',
          }}
        />

        <span
          className="careers-star careers-star--two"
          style={{
            top: '22%',
            right: '12%',
          }}
        />

        <span
          className="careers-star careers-star--three"
          style={{
            bottom: '23%',
            left: '12%',
          }}
        />

        <span
          className="careers-star careers-star--four"
          style={{
            bottom: '18%',
            right: '8%',
          }}
        />

        <div className="careers-hero__heading">

          <div className="careers-title-mask">
            <h1
              ref={heroLineOneRef}
              className="careers-hero__line"
            >
              BUILD WITH
            </h1>
          </div>

          <div className="careers-title-mask">
            <h1
              ref={heroLineTwoRef}
              className="careers-hero__line careers-hero__line--muted"
            >
              NOVA.
            </h1>
          </div>

        </div>

        <div className="careers-hero__bottom">

          <p>
            CAREERS / INTERNSHIPS /
            COLLABORATION
          </p>

          <p>
            NOVA LAYERS
          </p>

          <p>
            FIND YOUR PLACE ↓
          </p>

        </div>

      </section>


      {/* =====================================================
          INTRO — 01
      ===================================================== */}

      <section className="careers-intro">

        <div className="careers-container">

          <div className="careers-intro__grid">

            <div className="careers-section-label">

              <span className="careers-eyebrow">
                [ JOIN NOVA / 01 ]
              </span>

              <span className="careers-section-label__line" />

            </div>

            <div className="careers-intro__content">

              <h2>
                WE'RE LOOKING
                <br />

                FOR PEOPLE WHO
                <br />

                <span>
                  CARE ABOUT THE WORK.
                </span>
              </h2>

              <div className="careers-intro__copy">

                <p>
                  Nova Layers is built around people
                  who think deeply, create carefully
                  and want their work to have a reason
                  behind it. We care more about
                  curiosity, consistency and the
                  willingness to improve than perfect
                  resumes.
                </p>

                <p>
                  If you think your skills, ideas or
                  perspective can add something to
                  Nova, we'd like to hear from you.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GENERAL APPLICATION — 02
      ===================================================== */}

      <section className="resume-section">

        <div className="careers-container">

          <div className="resume-section__grid">

            <div className="resume-section__heading">

              <span className="careers-eyebrow">
                [ GENERAL APPLICATION / 02 ]
              </span>

              <h2>
                FIND YOUR PLACE
                <br />
                AT NOVA
              </h2>

            </div>

            <div className="resume-section__content">

              <p className="resume-section__lead">
                We're always interested in meeting
                good people. If there isn't a position
                that exactly matches what you do,
                send us your details anyway.
              </p>

              <div className="resume-section__requirements">

                <span>
                  WHAT TO INCLUDE
                </span>

                <ul>

                  <li>
                    <span>01</span>
                    Your updated resume
                  </li>

                  <li>
                    <span>02</span>
                    Portfolio / work samples
                  </li>

                  <li>
                    <span>03</span>
                    Role you're interested in
                  </li>

                  <li>
                    <span>04</span>
                    Short introduction about yourself
                  </li>

                  <li>
                    <span>05</span>
                    Current location
                  </li>

                  <li>
                    <span>06</span>
                    Availability
                  </li>

                </ul>

              </div>

              <a
                className="resume-mail"
                href="mailto:careers@novalayers.com?subject=Career Application — Nova Layers"
              >

                <span className="resume-mail__label">
                  SEND YOUR RESUME
                </span>

                <strong>
                  careers@novalayers.com
                </strong>

                <span className="resume-mail__arrow">
                  ↗
                </span>

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTERN APPLICATION — 03
      ===================================================== */}

      <section className="intern-form-section">

        <div className="careers-container">

          <div className="intern-form-section__grid">

            {/* LEFT */}

            <aside className="intern-form-section__aside">

              <span className="careers-eyebrow">
                [ INTERN APPLICATION / 03 ]
              </span>

              <h2>
                YOUR NEXT
                <br />
                LAYER STARTS
                <br />

                <span>
                  HERE.
                </span>
              </h2>

              <p>
                Complete the application with your
                preferred role and internship
                duration. Strong portfolios help,
                but we're equally interested in how
                you think and how willing you are
                to learn.
              </p>

              <div className="intern-form-section__note">

                <span>
                  AVAILABLE DURATIONS
                </span>

                <strong>
                  01 / 02 / 03 MONTHS
                </strong>

              </div>

            </aside>


            {/* FORM */}

            <form
              className="career-form"
              onSubmit={handleSubmit}
            >

              <div className="career-form__intro">

                <span>
                  APPLICATION DETAILS
                </span>

                <p>
                  Tell us a little about yourself and
                  the direction you want to explore.
                </p>

              </div>


              {/* PERSONAL DETAILS */}

              <div className="career-field-grid">

                <div className="career-field">

                  <label htmlFor="career-name">
                    FULL NAME *
                  </label>

                  <input
                    id="career-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={updateField}
                    required
                  />

                </div>


                <div className="career-field">

                  <label htmlFor="career-email">
                    EMAIL *
                  </label>

                  <input
                    id="career-email"
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={updateField}
                    required
                  />

                </div>


                <div className="career-field">

                  <label htmlFor="career-phone">
                    PHONE *
                  </label>

                  <input
                    id="career-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91"
                    value={formData.phone}
                    onChange={updateField}
                    required
                  />

                </div>


                <div className="career-field">

                  <label htmlFor="career-college">
                    COLLEGE / INSTITUTE
                  </label>

                  <input
                    id="career-college"
                    type="text"
                    name="college"
                    placeholder="College name"
                    value={formData.college}
                    onChange={updateField}
                  />

                </div>

              </div>


              {/* ROLE */}

              <div className="career-choice-group">

                <div className="career-choice-group__head">

                  <span className="career-choice-group__label">
                    INTERNSHIP ROLE *
                  </span>

                  <span>
                    SELECT ONE
                  </span>

                </div>

                <div className="career-role-options">

                  {internshipRoles.map(
                    (role) => (

                      <button
                        key={role}
                        type="button"
                        className={`career-role-option ${
                          formData.role === role
                            ? 'career-role-option--active'
                            : ''
                        }`}
                        onClick={() =>
                          updateChoice(
                            'role',
                            role
                          )
                        }
                      >

                        <span>
                          {role}
                        </span>

                        <span>
                          {formData.role === role
                            ? '✓'
                            : '+'}
                        </span>

                      </button>

                    )
                  )}

                </div>

              </div>


              {/* DURATION */}

              <div className="career-choice-group">

                <div className="career-choice-group__head">

                  <span className="career-choice-group__label">
                    INTERNSHIP DURATION *
                  </span>

                  <span>
                    CHOOSE DURATION
                  </span>

                </div>

                <div className="intern-duration-options">

                  {durations.map(
                    (
                      duration,
                      index
                    ) => (

                      <button
                        key={duration}
                        type="button"
                        className={`intern-duration ${
                          formData.duration === duration
                            ? 'intern-duration--active'
                            : ''
                        }`}
                        onClick={() =>
                          updateChoice(
                            'duration',
                            duration
                          )
                        }
                      >

                        <span>
                          0{index + 1}
                        </span>

                        <strong>
                          {duration}
                        </strong>

                        <span className="intern-duration__indicator">
                          {formData.duration === duration
                            ? '✓'
                            : '+'}
                        </span>

                      </button>

                    )
                  )}

                </div>

              </div>


              {/* AVAILABILITY */}

              <div className="career-field career-field--full">

                <label htmlFor="availability">
                  WHEN CAN YOU START? *
                </label>

                <input
                  id="availability"
                  type="text"
                  name="availability"
                  placeholder="Example: September 2026 / Immediately"
                  value={formData.availability}
                  onChange={updateField}
                  required
                />

              </div>


              {/* PORTFOLIO */}

              <div className="career-field career-field--full">

                <label htmlFor="portfolio">
                  PORTFOLIO / WORK LINK
                </label>

                <input
                  id="portfolio"
                  type="url"
                  name="portfolio"
                  placeholder="https://"
                  value={formData.portfolio}
                  onChange={updateField}
                />

              </div>


              {/* RESUME */}

              <div className="career-field career-field--full">

                <label htmlFor="resume">
                  RESUME LINK *
                </label>

                <input
                  id="resume"
                  type="url"
                  name="resume"
                  placeholder="Google Drive / Dropbox / resume link"
                  value={formData.resume}
                  onChange={updateField}
                  required
                />

                <span className="career-field__hint">
                  Make sure the resume link has public
                  viewing access.
                </span>

              </div>


              {/* MESSAGE */}

              <div className="career-field career-field--message">

                <label htmlFor="career-message">
                  TELL US ABOUT YOURSELF *
                </label>

                <textarea
                  id="career-message"
                  name="message"
                  placeholder="Tell us what you want to learn, why you are interested in this role and what kind of work you enjoy."
                  value={formData.message}
                  onChange={updateField}
                  required
                />

              </div>


              {/* SUBMIT */}

              <div className="career-form__footer">

                <p>
                  By submitting this application, you
                  agree to be contacted regarding
                  internship opportunities at Nova
                  Layers.
                </p>

                <button
                  type="submit"
                  className="career-submit"
                >

                  <span>
                    APPLY FOR INTERNSHIP
                  </span>

                  <span>
                    ↗
                  </span>

                </button>

              </div>


              {/* SUCCESS */}

              {submitted && (

                <div className="career-success">

                  <span className="career-success__icon">
                    ✓
                  </span>

                  <div>

                    <strong>
                      APPLICATION RECEIVED.
                    </strong>

                    <p>
                      Your internship details have
                      been captured successfully.
                    </p>

                  </div>

                </div>

              )}

            </form>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <Footer onNavigate={onNavigate} />

    </div>
  )
}

export default CareersPage