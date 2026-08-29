import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Footer from '../components/Footer/Footer.jsx'
import '../styles/contact-page.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  'Web Development',
  'UI / UX Design',
  'Digital Marketing',
  'Social Media Marketing',
  'Brand Identity',
  'SEO & Optimization',
]

const budgets = [
  '₹25K – ₹50K',
  '₹50K – ₹1L',
  '₹1L – ₹2L',
  '₹2L+',
  'Not sure yet',
]

const timelines = [
  'ASAP',
  '2 – 4 Weeks',
  '1 – 2 Months',
  '2 – 3 Months',
  'Flexible',
]

function ContactPage({ onNavigate }) {
  const pageRef = useRef(null)

  const [openAccordion, setOpenAccordion] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /*
       * =====================================================
       * CONTACT SECTION ENTRANCE
       * =====================================================
       */

      const introTimeline = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
      })

      introTimeline
        .fromTo(
          '.contact-modern__background-title',
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
          }
        )
        .fromTo(
          '.contact-modern__left > *',
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
          },
          '-=0.75'
        )
        .fromTo(
          '.contact-modern__form',
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
          },
          '-=0.55'
        )

      /*
       * =====================================================
       * CONTACT INFO CARDS
       * =====================================================
       */

      gsap.fromTo(
        '.contact-info-card',
        {
          y: 18,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.35,
        }
      )

      /*
       * =====================================================
       * FORM ITEMS
       * =====================================================
       */

      gsap.fromTo(
        '.contact-form > *',
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.45,
        }
      )

      /*
       * =====================================================
       * BACKGROUND PARALLAX
       * =====================================================
       */

      gsap.to('.contact-modern__background-title', {
        yPercent: -12,
        ease: 'none',

        scrollTrigger: {
          trigger: '.contact-modern',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      /*
       * =====================================================
       * LIGHT MOVEMENT
       * =====================================================
       */

      gsap.to('.contact-modern__glow', {
        x: 30,
        y: 15,
        scale: 1.08,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      /*
       * =====================================================
       * CIRCUIT LIGHT
       * =====================================================
       */

      gsap.to('.contact-circuit__dot', {
        opacity: 0.8,
        scale: 1.4,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
        ease: 'sine.inOut',
      })
    }, pageRef)

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [])

  /*
   * =====================================================
   * INPUT
   * =====================================================
   */

  const updateField = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  /*
   * =====================================================
   * ACCORDION
   * =====================================================
   */

  const toggleAccordion = (name) => {
    setOpenAccordion((previous) =>
      previous === name ? null : name
    )
  }

  const updateChoice = (name, value) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setOpenAccordion(null)
  }

  /*
   * =====================================================
   * SUBMIT
   * =====================================================
   */

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(
      'Nova Layers contact enquiry:',
      formData
    )

    setSubmitted(true)
  }

  return (
    <div
      className="contact-page"
      ref={pageRef}
    >

      {/* =====================================================
          MODERN CONTACT HERO
      ===================================================== */}

      <section className="contact-modern">

        {/* =================================================
            BACKGROUND GLOW
        ================================================= */}

        <div className="contact-modern__glow" />

        <div className="contact-modern__glow contact-modern__glow--secondary" />


        {/* =================================================
            HUGE BACKGROUND TITLE
        ================================================= */}

        <div className="contact-modern__background-title">
          CONTACT
        </div>


        {/* =================================================
            CIRCUIT DECORATIONS
        ================================================= */}

        <div className="contact-circuit contact-circuit--left">

          <span className="contact-circuit__line contact-circuit__line--horizontal" />

          <span className="contact-circuit__line contact-circuit__line--vertical" />

          <span className="contact-circuit__node" />

          <span className="contact-circuit__dot" />

        </div>


        <div className="contact-circuit contact-circuit--right">

          <span className="contact-circuit__line contact-circuit__line--horizontal" />

          <span className="contact-circuit__line contact-circuit__line--vertical" />

          <span className="contact-circuit__node" />

          <span className="contact-circuit__dot" />

        </div>


        {/* =================================================
            CONTACT CONTENT
        ================================================= */}

        <div className="contact-modern__container">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="contact-modern__left">

            <div className="contact-modern__eyebrow">

              <span className="contact-modern__eyebrow-icon">
                ◉
              </span>

              <span>
                CONTACT
              </span>

            </div>


            <div className="contact-modern__heading">

              <h1>
                GET IN
                <br />
                <span>TOUCH</span>
              </h1>

            </div>


            <p className="contact-modern__description">
              Have questions or ready to transform
              your business? Tell us what you're
              working on.
            </p>

            <h2 className="contact-modern__contact-heading">
              LET'S BUILD SOMETHING GREAT TOGETHER
            </h2>


            {/* =================================================
                EMAIL
            ================================================= */}

            <a
              href="mailto:novalayersteam@gmail.com"
              className="contact-info-card"
            >

              <div className="contact-info-card__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3v-13Zm1.5 1.8v.1l7.5 5.1 7.5-5.1v-.1h-15Zm15 2-7.5 5.1L4.5 9.3v7.7h15V9.3Z" /></svg>
              </div>

              <div className="contact-info-card__content">

                <span>
                  EMAIL US
                </span>

                <strong>
                  novalayersteam@gmail.com
                </strong>

              </div>

              <div className="contact-info-card__arrow">
                ↗
              </div>

            </a>


            {/* =================================================
                PHONE
            ================================================= */}

            <a
              href="tel:+917811022879"
              className="contact-info-card"
            >

              <div className="contact-info-card__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.5h2.7l1.2 4.2-1.7 1.7a15.2 15.2 0 0 0 5.3 5.3l1.7-1.7 4.2 1.2v2.7c0 1-.8 1.8-1.8 1.8C11.7 18.7 5.3 12.3 5.3 5.3c0-1 .8-1.8 1.8-1.8Z" /></svg>
              </div>

              <div className="contact-info-card__content">

                <span>
                  CALL US
                </span>

                <strong>
                  78110 22879
                </strong>

              </div>

              <div className="contact-info-card__arrow">
                ↗
              </div>

            </a>


            {/* =================================================
                LOCATION
            ================================================= */}

            <a
              href="https://www.google.com/maps/search/?api=1&query=Periyar+Colony%2C+Tiruppur%2C+Tamil+Nadu%2C+Backside+of+Niranjana+Hospital"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card"
            >

              <div className="contact-info-card__icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8a6.2 6.2 0 0 0-6.2 6.2c0 4.6 6.2 12.2 6.2 12.2s6.2-7.6 6.2-12.2A6.2 6.2 0 0 0 12 2.8Zm0 8.6a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Z" /></svg>
              </div>

              <div className="contact-info-card__content">

                <span>
                  OUR LOCATION
                </span>

                <strong>
                  Periyar Colony, Tiruppur, Tamil Nadu - Backside of Niranjana Hospital
                </strong>

              </div>

              <div className="contact-info-card__arrow">
                ↗
              </div>

            </a>

          </div>


          {/* =================================================
              RIGHT FORM
          ================================================= */}

          <div className="contact-modern__form">

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <div className="contact-input">

                <label htmlFor="name">
                  NAME
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={updateField}
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="contact-input">

                <label htmlFor="email">
                  EMAIL
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={updateField}
                  required
                />

              </div>


              {/* COMPANY */}

              <div className="contact-input">

                <label htmlFor="company">
                  COMPANY / BRAND
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={updateField}
                />

              </div>


              {/* PHONE */}

              <div className="contact-input">

                <label htmlFor="phone">
                  PHONE
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91"
                  value={formData.phone}
                  onChange={updateField}
                />

              </div>


              {/* SERVICE */}

              <div className="contact-accordion">

                <button
                  type="button"
                  className={`contact-accordion__trigger ${
                    openAccordion === 'service'
                      ? 'is-open'
                      : ''
                  }`}
                  onClick={() =>
                    toggleAccordion('service')
                  }
                >

                  <span>
                    WHAT DO YOU NEED?
                  </span>

                  <span className="contact-accordion__value">
                    {formData.service || 'Select'}
                  </span>

                  <span className="contact-accordion__icon">
                    +
                  </span>

                </button>


                {openAccordion === 'service' && (
                  <div className="contact-accordion__content">

                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        className={
                          formData.service === service
                            ? 'active'
                            : ''
                        }
                        onClick={() =>
                          updateChoice(
                            'service',
                            service
                          )
                        }
                      >
                        {service}
                      </button>
                    ))}

                  </div>
                )}

              </div>


              {/* BUDGET */}

              <div className="contact-accordion">

                <button
                  type="button"
                  className={`contact-accordion__trigger ${
                    openAccordion === 'budget'
                      ? 'is-open'
                      : ''
                  }`}
                  onClick={() =>
                    toggleAccordion('budget')
                  }
                >

                  <span>
                    ESTIMATED BUDGET
                  </span>

                  <span className="contact-accordion__value">
                    {formData.budget || 'Select'}
                  </span>

                  <span className="contact-accordion__icon">
                    +
                  </span>

                </button>


                {openAccordion === 'budget' && (
                  <div className="contact-accordion__content">

                    {budgets.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        className={
                          formData.budget === budget
                            ? 'active'
                            : ''
                        }
                        onClick={() =>
                          updateChoice(
                            'budget',
                            budget
                          )
                        }
                      >
                        {budget}
                      </button>
                    ))}

                  </div>
                )}

              </div>


              {/* TIMELINE */}

              <div className="contact-accordion">

                <button
                  type="button"
                  className={`contact-accordion__trigger ${
                    openAccordion === 'timeline'
                      ? 'is-open'
                      : ''
                  }`}
                  onClick={() =>
                    toggleAccordion('timeline')
                  }
                >

                  <span>
                    IDEAL TIMELINE
                  </span>

                  <span className="contact-accordion__value">
                    {formData.timeline || 'Select'}
                  </span>

                  <span className="contact-accordion__icon">
                    +
                  </span>

                </button>


                {openAccordion === 'timeline' && (
                  <div className="contact-accordion__content">

                    {timelines.map((timeline) => (
                      <button
                        key={timeline}
                        type="button"
                        className={
                          formData.timeline === timeline
                            ? 'active'
                            : ''
                        }
                        onClick={() =>
                          updateChoice(
                            'timeline',
                            timeline
                          )
                        }
                      >
                        {timeline}
                      </button>
                    ))}

                  </div>
                )}

              </div>


              {/* MESSAGE */}

              <div className="contact-message">

                <label htmlFor="message">
                  MESSAGE
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us briefly about your project..."
                  value={formData.message}
                  onChange={updateField}
                  required
                />

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="contact-submit"
              >

                <span>
                  SUBMIT
                </span>

                <span className="contact-submit__arrow">
                  ↗
                </span>

              </button>


              {submitted && (
                <div className="contact-success">

                  <span>
                    ✓
                  </span>

                  <div>

                    <strong>
                      MESSAGE RECEIVED.
                    </strong>

                    <p>
                      Thanks for reaching out.
                      We'll get back to you soon.
                    </p>

                  </div>

                </div>
              )}

            </form>

          </div>

        </div>

      </section>


      {/* =====================================================
          LOCATION SECTION
      ===================================================== */}

      <section className="contact-location">

        <div className="contact-container">

          <div className="contact-location__header">

            <span className="contact-eyebrow">
              [ LOCATION / 02 ]
            </span>

            <p>
              BASED IN TIRUPUR.
              <br />
              WORKING BEYOND BORDERS.
            </p>

          </div>


          <div className="contact-location__grid">

            <div className="contact-location__map">

              <iframe
                title="Nova Layers location"
                src="https://www.google.com/maps?q=Periyar%20Colony%2C%20Tiruppur%2C%20Tamil%20Nadu%2C%20Backside%20of%20Niranjana%20Hospital&z=13&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="contact-map-overlay">

                <span>
                  NOVA LAYERS
                </span>

                <span>
                  11.1085° N / 77.3411° E
                </span>

              </div>

            </div>


            <div className="contact-location__details">

              <span className="contact-location__index">
                11°06'N / 77°20'E
              </span>

              <h2>
                TIRUPUR,
                <br />
                <span>
                  INDIA.
                </span>
              </h2>

              <p>
                Our studio operates from Tirupur,
                Tamil Nadu — collaborating with brands,
                founders and teams wherever good work
                takes us.
              </p>


              <div className="contact-location__meta">

                <div>

                  <span>
                    LOCATION
                  </span>

                  <strong>
                    TIRUPUR
                    <br />
                    TAMIL NADU
                    <br />
                    INDIA
                  </strong>

                </div>


                <div>

                  <span>
                    WORKING HOURS
                  </span>

                  <strong>
                    MON — SAT
                    <br />
                    10:00 — 19:00
                    <br />
                    IST
                  </strong>

                </div>

              </div>


              <a
                href="https://www.google.com/maps/search/?api=1&query=Periyar+Colony%2C+Tiruppur%2C+Tamil+Nadu%2C+Backside+of+Niranjana+Hospital"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-location__link"
              >
                OPEN IN MAPS ↗
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer onNavigate={onNavigate} />

    </div>
  )
}

export default ContactPage