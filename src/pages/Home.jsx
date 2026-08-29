import Hero from '../components/Hero.jsx'
import BrandMarquee from '../components/BrandMarquee/BrandMarquee.jsx'
import NovaStandard from '../components/NovaStandard/NovaStandard.jsx'
import FounderTeam from '../components/FounderTeam.jsx'
import Services from '../components/Services.jsx'
import Portfolio from '../components/Portfolio.jsx'
import Stats from '../components/Stats.jsx'
import ClientVideos from '../components/ClientVideos.jsx'
import TestimonialsGrowthStack from '../components/TestimonialsGrowthStack.jsx'
import Footer from '../components/Footer/Footer.jsx'

function Home({ onNavigate }) {
  return (
    <>
      {/* =====================================================
          HOME CONTENT
      ===================================================== */}

      <Hero onNavigate={onNavigate} />

      <BrandMarquee />

      <NovaStandard />

      <FounderTeam />

      <Services />

      <Portfolio />

      <Stats />

      <ClientVideos />

      <TestimonialsGrowthStack onNavigate={onNavigate} />

      <Footer onNavigate={onNavigate} />
    </>
  )
}

export default Home