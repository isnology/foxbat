import api from './init'

export function emailPanelDesign(email, slotData, templateId) {
  return api.post(`/submitpanel`, email, slotData, templateId)
    .then((res) => res.email)
}