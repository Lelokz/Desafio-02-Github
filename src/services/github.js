const API_URL = 'https://api.github.com/users'

/** Tipos de erro tratados pela interface. */
export const ErrorType = {
  NOT_FOUND: 'not-found',
  RATE_LIMIT: 'rate-limit',
  NETWORK: 'network',
  UNKNOWN: 'unknown',
}

export class GithubError extends Error {
  constructor(type, message) {
    super(message)
    this.name = 'GithubError'
    this.type = type
  }
}

/**
 * Busca um perfil público do GitHub e devolve apenas os dados usados
 * na interface.
 */
export async function fetchGithubUser(username, { signal } = {}) {
  let response

  try {
    response = await fetch(`${API_URL}/${encodeURIComponent(username)}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal,
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new GithubError(ErrorType.NETWORK, 'Falha de conexão com a API do GitHub')
  }

  if (response.status === 404) {
    throw new GithubError(ErrorType.NOT_FOUND, `Usuário "${username}" não encontrado`)
  }

  // Sem autenticação, a API permite 60 requisições por hora por IP
  const isRateLimited =
    response.status === 429 ||
    (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0')

  if (isRateLimited) {
    throw new GithubError(ErrorType.RATE_LIMIT, 'Limite de requisições da API atingido')
  }

  if (!response.ok) {
    throw new GithubError(ErrorType.UNKNOWN, `Resposta inesperada da API: ${response.status}`)
  }

  const user = await response.json()

  return {
    login: user.login,
    name: user.name || user.login,
    bio: user.bio,
    // Pede a foto no dobro do tamanho exibido (220px) para ficar nítida em telas de alta densidade
    avatarUrl: `${user.avatar_url}${user.avatar_url.includes('?') ? '&' : '?'}s=440`,
    profileUrl: user.html_url,
  }
}
