import axios from 'axios'
import { rememberToken, getValidToken} from './token'

const api = axios.create({
  //baseURL: process.env.REACT_APP_API_URL
  baseURL: 'http://localhost:3000'
})


export function setToken(token) {
  rememberToken(token)

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  else {
    delete api.defaults.headers.common['Authorization']
  }
}

setToken(getValidToken())

export default api