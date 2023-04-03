class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest(path, method = 'GET', body) {
    const config = {
      headers: this._headers,
      method,
      credentials: 'include'
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${path}`, config)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res.status);
      })
  }

  getInitialCards() {
    return this._makeRequest('/cards').then(({ data }) => data);
  }

  getUserInfo() {
    return this._makeRequest('/users/me').then(({ data }) => data);
  }

  patchUserInfo(name, about) {
    return this._makeRequest('/users/me', 'PATCH', { name, about }).then(({ data }) => data);
  }

  postCard(name, link) {
    return this._makeRequest('/cards', 'POST', { name, link }).then(({ data }) => data);
  }

  deleteCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, 'DELETE');
  }

  putCardLike(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, 'PUT').then(({ data }) => data);
  }

  deleteCardLike(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, 'DELETE').then(({ data }) => data);
  }

  patchUserAvatar(avatarUrl) {
    return this._makeRequest(`/users/me/avatar`, 'PATCH', { avatar: avatarUrl }).then(({ data }) => data);
  }

  signUp(email, password) {
    return this._makeRequest('/signup', 'POST', { email, password });
  }

  signIn(email, password) {
    return this._makeRequest('/signin', 'POST', { email, password });
  }

  signOut() {
    return this._makeRequest('/users/logout', 'DELETE')
  }
}

export const api = new Api({
  baseUrl: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
