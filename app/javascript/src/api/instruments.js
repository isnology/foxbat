import api from './init'

export function loadInstruments() {
  return api.get('/api/instruments')
  .then((res) => res.data)
}

export function updateInstrument(id, data) {
  return api.put(`/api/instruments/${id}`, data)
  .then((res) => res.data)
}

export function createInstrument(data) {
  return api.post(`/api/instruments`, data)
  .then((res) => res.data)
}
