import novaLogo from '../../assets/nova logo 2.png'
import '../../styles/footer.css'

function Footer({ onNavigate }) {
  const handleNavigate = (event, path) => {
    if (onNavigate) {
      event.preventDefault()
      onNavigate(path)
    }
  }

  return (
    <footer
      className="footer"
      aria-label="Nova Layers footer"
    >
      <div className="footer__inner">

        {/* =================================================
            MAIN FOOTER
            ================================================= */}

        <div className="footer__main">

          {/* =================================================
              LOGO + DESCRIPTION
              ================================================= */}

          <div className="footer__brand footer__column">

            <a
              href="/"
              className="footer__logo-link"
              aria-label="Nova Layers"
              onClick={(event) =>
                handleNavigate(event, '/')
              }
            >
              <img
                src={novaLogo}
                alt="Nova Layers"
                className="footer__logo"
              />
            </a>

            <p className="footer__brand-copy">
              We build brands, websites and digital
              experiences that drive real growth and
              lasting impact.
            </p>

          </div>


          {/* =================================================
              NAVIGATION
              ================================================= */}

          <nav
            className="footer__navigation footer__column"
            aria-label="Footer navigation"
          >

            <a
              href="/"
              className="footer__nav-link"
              onClick={(event) =>
                handleNavigate(event, '/')
              }
            >
              Home
            </a>

            <a
              href="/portfolio"
              className="footer__nav-link"
              onClick={(event) =>
                handleNavigate(event, '/portfolio')
              }
            >
              Portfolio
            </a>

            <a
              href="/services"
              className="footer__nav-link"
              onClick={(event) =>
                handleNavigate(event, '/services')
              }
            >
              Services
            </a>

            <a
              href="/careers"
              className="footer__nav-link"
              onClick={(event) =>
                handleNavigate(event, '/careers')
              }
            >
              Careers
            </a>

            <a
              href="/contact"
              className="footer__nav-link"
              onClick={(event) =>
                handleNavigate(event, '/contact')
              }
            >
              Contact Us
            </a>

          </nav>


          {/* =================================================
              EMAIL + SOCIALS
              ================================================= */}

          <div className="footer__connect footer__column">

            <div className="footer__contact-list">
              <a href="mailto:novalayersteam@gmail.com" className="footer__contact-link">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3v-13Zm1.5 1.8v.1l7.5 5.1 7.5-5.1v-.1h-15Zm15 2-7.5 5.1L4.5 9.3v7.7h15V9.3Z" /></svg>
                <span>novalayersteam@gmail.com</span>
              </a>
              <a href="tel:7811022879" className="footer__contact-link">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.5h2.7l1.2 4.2-1.7 1.7a15.2 15.2 0 0 0 5.3 5.3l1.7-1.7 4.2 1.2v2.7c0 1-.8 1.8-1.8 1.8C11.7 18.7 5.3 12.3 5.3 5.3c0-1 .8-1.8 1.8-1.8Z" /></svg>
                <span>78110 22879</span>
              </a>
            </div>

            <div
              className="footer__socials"
              aria-label="Nova Layers social links"
            >

              {/* Instagram */}

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.68 2.06a.88.88 0 1 1 0 1.76.88.88 0 0 1 0-1.76ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z" />
                </svg>
              </a>


              {/* LinkedIn */}

              <a
                href="https://www.linkedin.com/company/nova-layers/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6.94 6.06h3.1V20H6.94V6.06Zm1.55-1.5a1.79 1.79 0 1 1 0 3.58 1.79 1.79 0 0 1 0-3.58ZM9.5 9.22h2.97v1.45h.04a3.25 3.25 0 0 1 2.92-1.6c3.13 0 3.7 2.06 3.7 4.74V20h-3.1v-4.64c0-1.11-.02-2.54-1.55-2.54-1.56 0-1.8 1.22-1.8 2.48V20h-3.1V9.22Z" />
                </svg>
              </a>


            </div>

          </div>

        </div>


        {/* =================================================
            DIVIDER
            ================================================= */}

        <div className="footer__divider" />


        {/* =================================================
            BOTTOM
            ================================================= */}

        <div className="footer__bottom">

          <p className="footer__copyright">
            © 2026 Nova Layers. All Rights Reserved.
          </p>

          <div className="footer__legal">

            <a
              href="/privacy-policy"
              className="footer__legal-link"
              onClick={(event) =>
                handleNavigate(event, '/privacy-policy')
              }
            >
              Privacy Policy
            </a>

            <a
              href="/terms-and-conditions"
              className="footer__legal-link"
              onClick={(event) =>
                handleNavigate(event, '/terms-and-conditions')
              }
            >
              Terms &amp; Conditions
            </a>

          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer