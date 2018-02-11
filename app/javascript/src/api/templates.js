import api from './init'

export function loadTemplates() {
  return api.get('/templates')
  .then((res) => res.data)
}

export function createTemplate(data) {
  return api.post('/templates', data)
  .then((res) => res.data)
}

export function updateTemplate(id, data) {
  return api.put(`/templates/${id}`, data)
  .then((res) => res.data)
}