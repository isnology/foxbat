import api from './init'

export function loadPanels() {
  return api.get('/api/panels')
  .then((res) => res.data)
}

export function createPanel(data) {
  return api.post('/api/panels', data)
  .then((res) => res.data)
}

export function updatePanel(id, data) {
  return api.put(`/api/panels/${id}`, data)
  .then((res) => res.data)
}

export function deletePanel(id) {
  return api.delete(`/api/panels/${id}`)
  .then((res) => res.data)
}
