import { api, setHeaders } from './auth'


export function loadInstruments() {
  return api.get('/api/v1/instruments')
  .then((res) => res.data.instruments)
}

export function updateInstrument(id, data) {
  setHeaders()
  return api.put(`/api/v1/instruments/${id}`, data)
  .then((res) => res.data.instrument)
}

export function createInstrument(data) {
  setHeaders()
  return api.post(`/api/v1/instruments`, data)
  .then((res) => res.data.instrument)
}
