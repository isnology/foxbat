import { api, setHeaders } from './auth'


export function allInstrumentClasses() {
  setHeaders()
  return api.get('/api/v1/instrument_classes')
  .then((res) => res.data.instrument_classes)
}

export function updateInstrumentClass(id, data) {
  setHeaders()
  return api.put(`/api/v1/instrument_classes/${id}`, data)
  .then((res) => res.data.instrument_class)
}

export function createInstrumentClass(data) {
  setHeaders()
  return api.post(`/api/v1/instrument_classes`, data)
  .then((res) => res.data.instrument_class)
}
