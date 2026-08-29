import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer/Footer.jsx'
import '../styles/legal-page.css'

const sections = [
  {
    title: 'Introduction',
    body: 'Nova Layers respects your privacy. This Privacy Policy explains how information may be collected, used and protected when you visit our website, contact us or engage us for creative and digital services. It applies to the website and the relevant client communications we operate.',
  },
  {
    title: 'Information We Collect',
    body: 'We collect information that is reasonably necessary to operate this website, respond to enquiries and provide our services. You may provide your name, email address, company details, phone number, project requirements, budget, timeline and other information included in a contact form or direct communication. Limited technical information, such as browser type, device information, approximate location, pages visited and referring pages, may also be collected automatically by the website or its supporting technologies.',
  },
  {
    title: 'How We Use Information',
    body: 'We use information to understand project requirements, reply to messages, prepare proposals, deliver and improve services, maintain website security, understand how visitors use the website, improve accessibility and performance, communicate relevant updates and meet applicable operational or legal obligations. An enquiry is not treated as consent to send unrelated promotional messages.',
  },
  {
    title: 'Cookies & Tracking',
    body: 'The website may use cookies or similar technologies for essential functionality, preferences, performance and measurement. Where analytics tools are enabled, they may provide aggregated information about traffic and interactions. You can manage cookies through your browser settings, although some website functions may be affected. No specific analytics provider is identified here because tools in use may change.',
  },
  {
    title: 'Data Security',
    body: 'We take reasonable administrative and technical measures to protect information against unauthorized access, loss, misuse or alteration. No method of transmission or storage can be guaranteed to be completely secure, so please avoid sending information that is not reasonably needed for an enquiry or project.',
  },
  {
    title: 'Third-Party Services',
    body: 'Some website features or project workflows may rely on third-party platforms. Those providers may process information under their own terms and privacy policies. We aim to use such services only where they are reasonably necessary for the relevant function, but their practices and availability remain subject to their own policies.',
  },
  {
    title: 'Your Rights',
    body: 'Depending on where you are located, you may have rights to request access, correction, deletion, restriction or a copy of personal information, or to object to certain processing. Requests can be sent to [EMAIL ADDRESS]. We may need to verify a request before acting on it. Our website and services are intended for businesses and general audiences, and we do not knowingly collect personal information from children through the website.',
  },
  {
    title: 'Data Retention',
    body: 'We retain information only for as long as reasonably needed for the purpose for which it was collected, to manage an ongoing relationship, resolve questions, maintain business records or meet applicable obligations. Retention periods may vary according to the nature and context of the information.',
  },
  {
    title: 'Intellectual Property & Liability',
    body: 'The website may contain links to external websites or platforms. Nova Layers is not responsible for the privacy practices, content or security of those external services. Website content, branding and other materials remain protected by applicable intellectual property rights unless stated otherwise. Nothing on this page limits rights or responsibilities that cannot lawfully be limited.',
  },
  {
    title: 'Contact & Updates',
    body: 'We may update this Privacy Policy when our website, services or practices change. The latest version will be made available on this page and will apply from its posted date. For privacy questions or requests, contact [AGENCY NAME] at [EMAIL ADDRESS] or [BUSINESS ADDRESS].',
  },
]

const sectionId = (title) => `privacy-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

function PrivacyPolicy({ onNavigate }) {
  const pageRef = useRef(null)
  const contentBodyRef = useRef(null)
  const [activeSection, setActiveSection] = useState(sectionId(sections[0].title))

  useEffect(() => {
    const contentBody = contentBodyRef.current
    if (!contentBody) return undefined

    const sectionElements = [...contentBody.querySelectorAll('.legal-section')]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)

        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      {
        root: contentBody,
        rootMargin: '-8% 0px -70% 0px',
        threshold: 0,
      }
    )

    sectionElements.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleSectionClick = (event, id) => {
    event.preventDefault()
    const contentBody = contentBodyRef.current
    const section = contentBody?.querySelector(`#${id}`)
    if (!contentBody || !section) return

    if (contentBody.scrollHeight <= contentBody.clientHeight) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    contentBody.scrollTo({
      top: section.offsetTop - 20,
      behavior: 'smooth',
    })
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.legal-page__hero > *',
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.legal-section',
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.legal-content', start: 'top 82%' } }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="legal-page" ref={pageRef}>
      <header className="legal-page__hero legal-container">
        <span className="legal-page__eyebrow">Legal / Privacy</span>
        <h1>Privacy<br />Policy</h1>
        <p className="legal-page__intro">How we collect, use and protect your information.</p>
        <span className="legal-page__updated">Last Updated: [DATE]</span>
      </header>

      <main className="legal-content legal-container">
        <aside className="legal-toc" aria-label="Privacy policy sections">
          <span className="legal-toc__label">On This Page</span>
          <nav>
            {sections.map((section, index) => (
              <a
                className={activeSection === sectionId(section.title) ? 'is-active' : ''}
                href={`#${sectionId(section.title)}`}
                key={section.title}
                onClick={(event) => handleSectionClick(event, sectionId(section.title))}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>{section.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="legal-content__body" ref={contentBodyRef} data-lenis-prevent>
          <div className="legal-content__meta">Privacy / Information handling</div>
          {sections.map((section, index) => (
            <section className="legal-section" id={sectionId(section.title)} key={section.title}>
              <span className="legal-section__number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{String(index + 1).padStart(2, '0')}. {section.title}</h2>
                <p>{section.body}</p>
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}

export default PrivacyPolicy
