import { useEffect, useState } from 'react'

function CustomCursor({ enabled }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (!enabled) return undefined

    const move = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    const onPointerEnter = () => setHovering(true)
    const onPointerLeave = () => setHovering(false)

    const targets = document.querySelectorAll('button, a, .navbar__menu, .menu-top__close')
    targets.forEach((target) => {
      target.addEventListener('pointerenter', onPointerEnter)
      target.addEventListener('pointerleave', onPointerLeave)
    })

    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      targets.forEach((target) => {
        target.removeEventListener('pointerenter', onPointerEnter)
        target.removeEventListener('pointerleave', onPointerLeave)
      })
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="cursor" style={{ left: position.x, top: position.y }}>
      <div className={`cursor__ring ${hovering ? 'cursor__ring--hover' : ''}`} />
      <div className="cursor__dot" />
    </div>
  )
}

export default CustomCursor
