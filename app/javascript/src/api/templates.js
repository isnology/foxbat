import api, { setHeaders } from './init'
import { getValidToken } from './token'

export function loadTemplates() {
  setHeaders(getValidToken())
  return api.get('/templates')
  .then((res) => res.data.template)
}

export function createTemplate(data) {
  setHeaders(getValidToken())
  return api.post('/templates', data)
  .then((res) => res.data.template)
}

export function updateTemplate(id, data) {
  setHeaders(getValidToken())
  return api.put(`/templates/${id}`, data)
  .then((res) => res.data.template)
}