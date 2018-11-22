import { api, setHeaders } from './auth'

export function emailPanelDesign(email, slots, template, templateSlots) {
  setHeaders()
  return api.post(`/api/v1/submitpanel`, email, slots, template, templateSlots)
    .then((res) => res.email)
}
