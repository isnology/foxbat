import api, { setToken } from './init'
import { getDecodedToken } from './token'

export function signIn({ email, password }) {
  return api.post('/auth', { email, password })
  .then((res) => {
    setToken(res.data.token)
    return getDecodedToken()
  })
  .catch((error) => {
    if (/ 401/.test(error.message)) {
      error = new Error('The email/password combination was incorrect')
    }
    throw error
  })
}

export function signUp({ email, password }) {
  return api.post('/auth/register', { email, password })
  .then((res) => {
    setToken(res.data.token)
    return getDecodedToken()
  })
}

export function signOutNow() {
  setToken(null)
}