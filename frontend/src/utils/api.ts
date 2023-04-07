class Api {
  _baseUrl: string
  _headers: HeadersInit

  constructor({ baseUrl, headers }: ApiConstructorArgs) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _makeRequest(path: string, method = 'GET', body?: Body) {
    const config: RequestInit = {
      headers: this._headers,
      method,
      credentials: 'include',
    }

    if (body) {
      config.body = JSON.stringify(body)
    }

    return fetch(`${this._baseUrl}${path}`, config).then((res) => {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(res.status)
    })
  }

  getCards() {
    return this._makeRequest('/cards').then(
      ({ data }: { data: Card[] }) => data
    )
  }

  getUserInfo() {
    return this._makeRequest('/users/me').then(
      ({ data }: { data: User }) => data
    )
  }

  patchUserInfo(name: string, about: string) {
    return this._makeRequest('/users/me', 'PATCH', { name, about }).then(
      ({ data }: { data: User }) => data
    )
  }

  postCard(name: string, link: string) {
    return this._makeRequest('/cards', 'POST', { name, link }).then(
      ({ data }: { data: Card }) => data
    )
  }

  deleteCard(cardId: string) {
    return this._makeRequest(`/cards/${cardId}`, 'DELETE')
  }

  putCardLike(cardId: string) {
    return this._makeRequest(`/cards/${cardId}/likes`, 'PUT').then(
      ({ data }: { data: Card }) => data
    )
  }

  deleteCardLike(cardId: string) {
    return this._makeRequest(`/cards/${cardId}/likes`, 'DELETE').then(
      ({ data }: { data: Card }) => data
    )
  }

  patchUserAvatar(avatarUrl: string) {
    return this._makeRequest(`/users/me/avatar`, 'PATCH', {
      avatar: avatarUrl,
    }).then(({ data }: { data: User }) => data)
  }

  signUp(email: string, password: string) {
    return this._makeRequest('/signup', 'POST', { email, password })
  }

  signIn(email: string, password: string) {
    return this._makeRequest('/signin', 'POST', { email, password })
  }

  signOut() {
    return this._makeRequest('/users/logout', 'DELETE')
  }
}

const baseUrl = import.meta.env.PROD
  ? (import.meta.env.VITE_API_URL as string)
  : 'http://localhost:8080'

export const api = new Api({
  baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

type ApiConstructorArgs = {
  baseUrl: string
  headers: HeadersInit
}

type PatchUserInfoBody = {
  name: string
  about: string
}

type PostCardBody = {
  name: string
  link: string
}

type PatchUserAvatar = {
  avatar: string
}

type SignUpBody = {
  email: string
  password: string
}

type SignInBody = {
  email: string
  password: string
}

type Body =
  | PatchUserInfoBody
  | PatchUserAvatar
  | PostCardBody
  | SignInBody
  | SignUpBody
