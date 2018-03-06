import api, { setHeaders } from './init'
import { getValidToken } from './token'

export function loadInstruments() {
  setHeaders(getValidToken())
  return api.get('/api/instruments')
  .then((res) => res.data)
}

export function updateInstrument(id, data) {
  setHeaders(getValidToken())
  return api.put(`/api/instruments/${id}`, data)
  .then((res) => res.data)
}

export function createInstrument(data) {
  setHeaders(getValidToken())
  return api.post(`/api/instruments`, data)
  .then((res) => res.data)
}
