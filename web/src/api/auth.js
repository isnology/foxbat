import axios from 'axios'
import { rememberToken, getDecodedToken, getValidToken } from './token'

function extractToken(res) {
  return res.headers.authorization.split(' ')[1]
}

export const api = axios

export function setHeaders() {
  const token = getValidToken()
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  else {
    delete api.defaults.headers.common['Authorization']
  }
}

export function signIn(data) {
  setHeaders()
  return api.post('api/users/sign_in', data)
  .then((res) => {
    rememberToken(extractToken(res))
    return getDecodedToken()
  })
  .catch((error) => {
    if (/ 401/.test(error.message)) {
      error = new Error('The email/password combination was incorrect')
    }
    throw error
  })
}

export function signUp(data) {
  setHeaders()
  return api.post('api/users', data)
  .then((res) => {
    rememberToken(extractToken(res))
    return getDecodedToken()
  })
}

export function signOut() {
  setHeaders()
  return api.delete('api/users/sign_out')
  .then((res) => {
    rememberToken(null)
    return null
  })
}

export function nextToken() {
  setHeaders()
  return api.get('api/auth/create')
  .then((res) => {
    rememberToken(extractToken(res))
    return getDecodedToken()
  })
}
