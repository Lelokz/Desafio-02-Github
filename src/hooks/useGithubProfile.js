import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchGithubUser, ErrorType } from '../services/github.js'

/**
 * Controla a busca de perfil: estado atual, perfil encontrado e erro.
 * Uma nova busca cancela a anterior, para que uma resposta antiga não
 * substitua a mais recente.
 */
export function useGithubProfile() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [profile, setProfile] = useState(null)
  const [errorType, setErrorType] = useState(null)
  const controllerRef = useRef(null)

  const search = useCallback(async (username) => {
    const term = username.trim()
    if (!term) return

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setStatus('loading')
    setProfile(null)
    setErrorType(null)

    try {
      const user = await fetchGithubUser(term, { signal: controller.signal })
      setProfile(user)
      setStatus('success')
    } catch (error) {
      if (error.name === 'AbortError') return
      setErrorType(error.type ?? ErrorType.UNKNOWN)
      setStatus('error')
    }
  }, [])

  // Cancela a requisição pendente se o componente sair da tela
  useEffect(() => () => controllerRef.current?.abort(), [])

  return { status, profile, errorType, search }
}
