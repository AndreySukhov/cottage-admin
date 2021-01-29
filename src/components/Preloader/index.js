import './style.css'

const Preloader = ({ size = 80, color = 'yellow' }) => {

  const divSize = size * 0.8;
  return (
    <div className={`lds-ring lds-ring--${color}`} style={{
      height: `${size}px`,
      width: `${size}px`,

    }}>
      <div style={{
        height: `${divSize}px`,
        width: `${divSize}px`,

      }} />
      <div style={{
        height: `${divSize}px`,
        width: `${divSize}px`,

      }} />
      <div style={{
        height: `${divSize}px`,
        width: `${divSize}px`,

      }} />
      <div style={{
        height: `${divSize}px`,
        width: `${divSize}px`,
      }} />
    </div>
  )
}

export default Preloader
