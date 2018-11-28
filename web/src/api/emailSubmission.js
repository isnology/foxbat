import { api, setHeaders } from './auth'

export function emailPanelDesign(data) {
  setHeaders()
  return api.post('/api/v1/submitpanel', data)
    .then((res) => res.email)
}
