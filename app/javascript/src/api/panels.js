import api, { setHeaders } from './init'
import { getValidToken } from './token'

export function loadPanels(userId) {
  setHeaders(getValidToken())
  // pass user_id as a parameter so no login is required to get the records
  return api.get(`/api/panels?user_id=${userId}`)
  .then((res) => res.data)
}

export function createPanel(data) {
  setHeaders(getValidToken())
  return api.post('/api/panels', data)
  .then((res) => res.data)
}

export function updatePanel(id, data) {
  setHeaders(getValidToken())
  return api.put(`/api/panels/${id}`, data)
  .then((res) => res.data)
}

export function deletePanel(id) {
  setHeaders(getValidToken())
  return api.delete(`/api/panels/${id}`)
  .then((res) => res.data)
}
