class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  getInitialUser() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  setUser(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse);
  }

  addCard(prename, url) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: prename,
        link: url
      })
    })
    .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method : 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  toggleLike(id, methodApi) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method : methodApi,
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  setAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method : 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const api = new Api({
  url: 'https://api.phile.mesto.nomoredomains.sbs',
  headers: {
    // authorization: '0d2eecbb-594d-452a-9a65-7b12cb43fb8e',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json'
  }
}); 