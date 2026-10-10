import './Loader.css'

function Loader() {
  return (
    <div className="loader" role="status">
      <span className="loader__spinner" aria-hidden="true" />
      <span className="sr-only">Buscando perfil…</span>
    </div>
  )
}

export default Loader
