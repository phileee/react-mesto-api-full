export const BASE_URL = 'https://api.phile.mesto.nomoredomains.sbs';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
};

export const deauthorize = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    },
  })
};

export const checkToken = (/*token*/) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
      // 'Authorization': `Bearer ${token}`,
    }
  })
};