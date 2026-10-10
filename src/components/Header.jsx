import githubIcon from '../assets/logo-github-icone.png'
import githubWordmark from '../assets/logo-github-texto.png'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">
        <img className="header__icon" src={githubIcon} alt="" width="58" height="58" />
        <span>Perfil</span>
        <img className="header__wordmark" src={githubWordmark} alt="GitHub" width="160" height="45" />
      </h1>
    </header>
  )
}

export default Header
