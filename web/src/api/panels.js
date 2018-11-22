import { api, setHeaders } from './auth'


export function loadPanels() {
  setHeaders()
  return api.get('/api/v1/panels')
  .then((res) => res.data.panels)
}

export function createPanel(data) {
  setHeaders()
  return api.post('/api/v1/panels', data)
  .then((res) => res.data.panel)
}

export function updatePanel(id, data) {
  setHeaders()
  return api.put(`/api/v1/panels/${id}`, data)
  .then((res) => res.data.panel)
}

export function deletePanel(id) {
  setHeaders()
  return api.delete(`/api/v1/panels/${id}`)
  .then((res) => res.data.panel)
}
