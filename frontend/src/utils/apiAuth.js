class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest(path, method = 'GET', body) {
    const config = {
      headers: this._headers,
      method
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

  signUp(email, password) {
    return this._makeRequest('/signup', 'POST', { email, password });
  }

  fetchToken(email, password) {
    return this._makeRequest('/signin', 'POST', { email, password });
  }

  addTokenToHeaders(token) {
    this._headers['Authorization'] = `Bearer ${token}`;
  }

  removeTokenFromHeaders() {
    delete this._headers['Authorization'];
  }

  fetchCurrentUser() {
    if (!this._headers['Authorization']) {
      throw Error(`use authApi.AddTokenToHeaders(token)\ncurrent headers: ${this._headers}`);
    }

    return this._makeRequest('/users/me');
  }
}

export const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});
