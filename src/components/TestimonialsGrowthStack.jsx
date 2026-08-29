import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Testimonials from './Testimonials.jsx'
import GrowthCTA from './GrowthCTA/GrowthCTA.jsx'

import '../styles/testimonials-growth-stack.css'

gsap.registerPlugin(ScrollTrigger)

function TestimonialsGrowthStack({ onNavigate }) {
  const stackRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)

  useLayoutEffect(() => {
    const stack = stackRef.current
    const testimonials = testimonialsRef.current
    const cta = ctaRef.current

    if (!stack || !testimonials || !cta) return

    const resetTestimonials = () => {
      gsap.set(testimonials, {
        filter: 'blur(0px) brightness(1)',
        opacity: 1,
        scale: 1,
      })
      gsap.set(testimonials, { clearProps: 'willChange' })
    }

    const onRefreshInit = () => {
      resetTestimonials()
    }

    ScrollTrigger.addEventListener('refreshInit', onRefreshInit)

    const ctx = gsap.context(() => {
      /*
        IMPORTANT

        We are NOT animating CTA from yPercent: 100.

        CTA remains a normal document-flow section.

        ScrollTrigger is only used for a very tiny
        depth treatment on Testimonials.
      */

      resetTestimonials()

      gsap.fromTo(
        testimonials,
        {
          filter: 'blur(0px) brightness(1)',
          opacity: 1,
          scale: 1,
        },
        {
          filter: 'blur(5px) brightness(1)',
          opacity: 0.55,
          scale: 1,
          ease: 'none',
          immediateRender: false,

          scrollTrigger: {
            trigger: cta,
            start: 'top bottom',
            end: 'top 35%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      )
    }, stack)

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', onRefreshInit)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={stackRef}
      className="nova-testimonial-cta-stack"
    >
      {/* ==========================================
          NORMAL TESTIMONIAL SECTION

          It stays completely visible normally.
      ========================================== */}

      <div
        ref={testimonialsRef}
        className="nova-testimonial-cta-stack__testimonials"
      >
        <Testimonials />
      </div>

      {/* ==========================================
          NORMAL NEXT SECTION

          This is NOT absolute.
          This is NOT translated with GSAP.

          Normal page scrolling makes it rise.
      ========================================== */}

      <div
        ref={ctaRef}
        className="nova-testimonial-cta-stack__cta"
      >
        <GrowthCTA onNavigate={onNavigate} />
      </div>
    </section>
  )
}

export default TestimonialsGrowthStack
