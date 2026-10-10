import searchIcon from '../assets/icone-busca.svg'
import './SearchForm.css'

function SearchForm({ value, onChange, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="search" role="search" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="username">
        Usuário do GitHub
      </label>
      <input
        id="username"
        className="search__input"
        type="text"
        placeholder="Digite um usuário do Github"
        autoComplete="off"
        autoCapitalize="none"
        spellCheck="false"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button className="search__button" type="submit" aria-label="Buscar perfil">
        <img src={searchIcon} alt="" width="25" height="25" />
      </button>
    </form>
  )
}

export default SearchForm
