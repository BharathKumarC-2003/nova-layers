import '../styles/nova-grid-background.css'

function NovaGridBackground({ intensity = 'medium' }) {
  const supportedIntensity = ['low', 'medium', 'high'].includes(intensity)
    ? intensity
    : 'medium'

  return (
    <div
      className={`nova-grid-background nova-grid-background--${supportedIntensity}`}
      aria-hidden="true"
    >
      <div className="nova-grid-background__plane" />
      <div className="nova-grid-background__vignette" />
    </div>
  )
}

export default NovaGridBackground
