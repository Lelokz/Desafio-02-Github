import { useState } from 'react'
import dots from './assets/pontos.svg'
import Header from './components/Header.jsx'
import SearchForm from './components/SearchForm.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import avatarExemplo from './mocks/avatar-exemplo.jpg'
import './App.css'

// Pré-visualização temporária das telas do Figma (?tela=perfil ou ?tela=erro).
// Substituída pela busca na API na próxima fase.
const telaPreview = new URLSearchParams(window.location.search).get('tela')

const perfilExemplo = {
  name: 'Lucas Mendes',
  avatarUrl: avatarExemplo,
  bio: 'Desenvolvedor front-end apaixonado por criar interfaces intuitivas e acessíveis. Especialista em UX/UI e e-commerces, transformando design em código eficiente. Sempre explorando novas tecnologias para melhorar a experiência do usuário. 🚀',
}

function App() {
  const [username, setUsername] = useState(telaPreview === 'perfil' ? 'LucasMendes' : '')

  return (
    <div className="page">
      <div className="stage">
        <span className="glow glow--top" aria-hidden="true" />
        <img className="dots" src={dots} alt="" aria-hidden="true" width="239" height="225" />

        <main className="card">
          <Header />
          <SearchForm value={username} onChange={setUsername} onSubmit={() => {}} />

          {telaPreview === 'perfil' && <ProfileCard profile={perfilExemplo} />}
          {telaPreview === 'erro' && (
            <ErrorMessage>
              Nenhum perfil foi encontrado com esse nome de usuário.
              <br />
              Tente novamente
            </ErrorMessage>
          )}
        </main>

        <span className="glow glow--left" aria-hidden="true" />
      </div>
    </div>
  )
}

export default App
