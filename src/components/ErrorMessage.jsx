import './ErrorMessage.css'

function ErrorMessage({ children }) {
  return (
    <div className="error" role="alert">
      <p className="error__text">{children}</p>
    </div>
  )
}

export default ErrorMessage
