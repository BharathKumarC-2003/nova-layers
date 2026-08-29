import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './HomeServicesGraph.css'

gsap.registerPlugin(ScrollTrigger)

const graphServices = [
  { number: '01', title: 'Web Development', text: 'High-performance digital experiences built with clarity, speed and strategic intent.', icon: 'web' },
  { number: '02', title: 'UI / UX', text: 'Thoughtful interfaces designed to guide people clearly and confidently through each interaction.', icon: 'ux' },
  { number: '03', title: 'Digital Marketing', text: 'Performance-driven campaigns shaped for visibility, engagement and measurable growth.', icon: 'marketing' },
  { number: '04', title: 'Social Media Marketing', text: 'Content systems and campaigns designed to keep your brand visible and relevant.', icon: 'social' },
  { number: '05', title: 'Content Writing', text: 'Compelling storytelling that sharpens your voice and deepens brand trust.', icon: 'content' },
  { number: '06', title: 'SEO Optimization', text: 'Technical search strategy that improves discoverability and digital authority.', icon: 'seo' },
  { number: '07', title: 'Video Editing', text: 'Refined motion storytelling built for campaigns, launches, and digital attention.', icon: 'video' },
  { number: '08', title: 'Advertisement Shoot', text: 'Creative commercial direction that translates ideas into powerful, polished visuals.', icon: 'shoot' },
  { number: '09', title: 'Meta / Google Ads', text: 'Focused paid media systems that turn audience intent into efficient, trackable growth.', icon: 'ads' },
]

function HomeServicesGraph() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.nova-services-graph__path',
        { strokeDashoffset: 1100 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 20%',
            scrub: 0.5,
          },
        }
      )

      gsap.utils.toArray('.nova-services-graph__item').forEach((item, index) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0.2, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: index * 0.06,
            scrollTrigger: {
              trigger: section,
              start: `top ${68 - index * 3}%`,
              once: true,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="nova-services-graph" ref={sectionRef} aria-label="Our services growth path">
      <div className="nova-services-graph__inner">
        <div className="nova-services-graph__header">
          <p className="nova-services-graph__eyebrow">OUR SERVICES</p>
          <h2>
            Solutions That Drive <span>Real Results</span>
          </h2>
          <div className="nova-services-graph__rule" />
          <p className="nova-services-graph__intro">We combine creativity, technology, and strategy to deliver exceptional digital experiences.</p>
        </div>

        <div className="nova-services-graph__viewport">
          <svg className="nova-services-graph__svg" viewBox="0 0 1600 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <path className="nova-services-graph__path" d="M 30 380 C 220 360, 310 260, 440 245 S 690 165, 840 210 S 1065 300, 1220 200 S 1410 120, 1530 180" />
          </svg>

          {graphServices.map((service, index) => (
            <article
              key={service.number}
              className="nova-services-graph__item"
              style={{
                left: `${12 + index * 10.15}%`,
                top: `${55 + (index % 2 === 0 ? 0 : 10)}%`,
              }}
            >
              <div className="nova-services-graph__node"><span>{service.number}</span></div>
              <div className="nova-services-graph__card">
                <div className="nova-services-graph__meta">{service.number}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeServicesGraph
