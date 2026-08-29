import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer/Footer.jsx'
import '../styles/legal-page.css'

const sections = [
  ['Introduction', 'These Terms & Conditions govern access to the Nova Layers website and the provision of creative and digital services. “Nova Layers”, “we” and “us” refer to [AGENCY NAME]. “Client” and “you” refer to the person or organization engaging us. A proposal or statement of work may add project-specific terms.'],
  ['Website Usage', 'You may use this website for lawful purposes only. You must not misuse the website, interfere with its operation, attempt unauthorized access or reproduce its content without permission. Website content, branding and other materials remain protected by applicable intellectual property rights.'],
  ['Services', 'Services are supplied according to the agreed scope, deliverables, timeline and fee. This may include agreed strategy, branding, design, development, content, video, marketing, social media or SEO work. Results vary with audience, budget, competition, platforms and external events, so no commercial outcome or ranking is guaranteed unless expressly agreed.'],
  ['Project Scope', 'The project scope is defined by the accepted proposal or written agreement. The Client will provide accurate information, timely feedback, content, approvals, access credentials and other materials reasonably needed to perform the work. Included revisions, formats, testing, timelines and dependencies should be reviewed before work begins; changes or additional revisions may require written approval and a separate estimate.'],
  ['Pricing & Payments', 'Fees, payment stages, applicable taxes and due dates will be set out in the proposal or agreement. Work may pause while an overdue invoice remains unpaid. Advertising, hosting, domain, software, licensing and other third-party costs are separate unless expressly included.'],
  ['Cancellation & Termination', 'Either party may end a project according to the agreed written terms. The Client remains responsible for approved work, committed costs and work completed up to the effective termination date.'],
  ['Intellectual Property', 'Unless otherwise agreed, Nova Layers retains rights in pre-existing tools, methods, working files and unused concepts. Upon receipt of all agreed payment, the Client receives the rights to final approved deliverables described in the scope, subject to third-party rights and licenses. Editable source files, raw footage, fonts, stock assets and unused concepts transfer only where stated. Unless the agreement says otherwise, completed public work may be displayed in our portfolio after public release.'],
  ['Third-Party Services', 'Projects may depend on hosting providers, software, APIs, advertising platforms, fonts, stock libraries, plugins or other third parties. Their fees, terms, availability, security and changes are outside our control. The Client is responsible for maintaining accounts, permissions and licenses unless the scope states otherwise.'],
  ['Liability & Warranties', 'We will perform services with reasonable care and skill consistent with the agreed scope. Except where expressly stated, services and deliverables are provided without guarantees about uninterrupted operation, identical behavior across every device or browser, commercial results or fitness for an unstated purpose. To the extent permitted by law, direct liability is limited to the fees paid for the relevant services, and indirect or consequential losses are excluded.'],
  ['Contact & General Terms', 'Each party will treat non-public project information as confidential. Neither party is responsible for delay caused by events beyond reasonable control. We may update service methods, and these Terms may be updated from time to time; the version accepted when a project begins applies unless agreed otherwise. Governing law and dispute arrangements should be stated in the relevant written agreement. Questions can be sent to [EMAIL ADDRESS] or [BUSINESS ADDRESS].'],
]

const sectionId = (title) => `terms-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

function TermsConditions({ onNavigate }) {
  const pageRef = useRef(null)
  const contentBodyRef = useRef(null)
  const [activeSection, setActiveSection] = useState(sectionId(sections[0][0]))

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
        { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.04, ease: 'power3.out', scrollTrigger: { trigger: '.legal-content', start: 'top 82%' } }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="legal-page" ref={pageRef}>
      <header className="legal-page__hero legal-container">
        <span className="legal-page__eyebrow">Legal / Agreement</span>
        <h1>Terms &amp;<br />Conditions</h1>
        <p className="legal-page__intro">The terms that govern your use of our services and website.</p>
        <span className="legal-page__updated">Last Updated: [DATE]</span>
      </header>

      <main className="legal-content legal-container">
        <aside className="legal-toc" aria-label="Terms and conditions sections">
          <span className="legal-toc__label">On This Page</span>
          <nav>
            {sections.map(([title], index) => (
              <a
                className={activeSection === sectionId(title) ? 'is-active' : ''}
                href={`#${sectionId(title)}`}
                key={title}
                onClick={(event) => handleSectionClick(event, sectionId(title))}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>{title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="legal-content__body" ref={contentBodyRef} data-lenis-prevent>
          <div className="legal-content__meta">Terms / Working relationship</div>
          {sections.map(([title, body], index) => (
            <section className="legal-section" id={sectionId(title)} key={title}>
              <span className="legal-section__number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{String(index + 1).padStart(2, '0')}. {title}</h2>
                <p>{body}</p>
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}

export default TermsConditions
