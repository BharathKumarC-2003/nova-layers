import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenisInstance } from '../lib/scroll.js'

function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({ duration: reduceMotion ? 0 : 1.05, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: !reduceMotion, touchMultiplier: 1, syncTouch: false })
    setLenisInstance(lenis)
    const update = () => ScrollTrigger.update()
    const tick = (time) => lenis.raf(time * 1000)
    lenis.on('scroll', update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => { gsap.ticker.remove(tick); lenis.off('scroll', update); setLenisInstance(null); lenis.destroy() }
  }, [])
  return null
}
export default SmoothScroll
