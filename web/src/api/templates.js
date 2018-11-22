import { api, setHeaders } from './auth'


export function loadTemplates() {
  setHeaders()
  return api.get('/api/v1/templates')
  .then((res) => res.data.template)
}

export function createTemplate(data) {
  setHeaders()
  return api.post('/api/v1/templates', data)
  .then((res) => res.data.template)
}

export function updateTemplate(id, data) {
  setHeaders()
  return api.put(`/api/v1/templates/${id}`, data)
  .then((res) => res.data.template)
}
