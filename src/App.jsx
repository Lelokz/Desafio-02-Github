import { useState } from 'react'
import dots from './assets/pontos.svg'
import Header from './components/Header.jsx'
import SearchForm from './components/SearchForm.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import Loader from './components/Loader.jsx'
import { useGithubProfile } from './hooks/useGithubProfile.js'
import { ErrorType } from './services/github.js'
import './App.css'

const errorMessages = {
  [ErrorType.NOT_FOUND]: (
    <>
      Nenhum perfil foi encontrado com esse nome de usuário.
      <br />
      Tente novamente
    </>
  ),
  [ErrorType.RATE_LIMIT]: 'Muitas buscas em pouco tempo. Aguarde alguns minutos e tente novamente.',
  [ErrorType.NETWORK]: 'Não foi possível conectar ao GitHub. Verifique sua internet e tente novamente.',
  [ErrorType.UNKNOWN]: 'Algo deu errado ao buscar o perfil. Tente novamente.',
}

function App() {
  const [username, setUsername] = useState('')
  const { status, profile, errorType, search } = useGithubProfile()

  return (
    <div className="page">
      <div className="stage">
        <span className="glow glow--top" aria-hidden="true" />
        <img className="dots" src={dots} alt="" aria-hidden="true" width="239" height="225" />

        <main className="card">
          <Header />
          <SearchForm value={username} onChange={setUsername} onSubmit={() => search(username)} />

          <section className="result" aria-live="polite" aria-busy={status === 'loading'}>
            {status === 'loading' && <Loader />}
            {status === 'success' && <ProfileCard profile={profile} />}
            {status === 'error' && <ErrorMessage>{errorMessages[errorType]}</ErrorMessage>}
          </section>
        </main>

        <span className="glow glow--left" aria-hidden="true" />
      </div>
    </div>
  )
}

export default App
