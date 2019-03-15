import { api, setHeaders } from './auth'


export function loadInstrumentClasses() {
  setHeaders()
  return api.get('/api/v1/instrument_classes')
  //.then((res) => res.data.instrument_classes)
  .then((res) => res.data)
}

export function updateInstrumentClass(id, data) {
  setHeaders()
  return api.put(`/api/v1/instrument_classes/${id}`, data)
  //.then((res) => res.data.instrument_classes)
  .then((res) => res.data)
}

export function createInstrumentClass(data) {
  setHeaders()
  return api.post(`/api/v1/instrument_classes`, data)
  //.then((res) => res.data.instrument_classes)
  .then((res) => res.data)
}
