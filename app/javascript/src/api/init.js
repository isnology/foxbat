import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_SERVER_URL
})

export function setHeaders(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  else {
    delete api.defaults.headers.common['Authorization']
  }
}

export default api