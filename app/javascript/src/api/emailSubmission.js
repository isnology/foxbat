import api from './init'

export function emailPanelDesign(email, slots, template, templateSlots) {
  return api.post(`/submitpanel`, email, slots, template, templateSlots)
    .then((res) => res.email)
}