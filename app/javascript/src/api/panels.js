import api, { setHeaders } from './init'
import { getValidToken } from './token'

export function loadPanels() {
  setHeaders(getValidToken())
  return api.get('/api/panels')
  .then((res) => res.data.panels)
}

export function createPanel(data) {
  setHeaders(getValidToken())
  return api.post('/api/panels', data)
  .then((res) => res.data.panel)
}

export function updatePanel(id, data) {
  setHeaders(getValidToken())
  return api.put(`/api/panels/${id}`, data)
  .then((res) => res.data.panel)
}

export function deletePanel(id) {
  setHeaders(getValidToken())
  return api.delete(`/api/panels/${id}`)
  .then((res) => res.data.panel)
}
