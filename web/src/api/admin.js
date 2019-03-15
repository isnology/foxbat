import { api, setHeaders } from './auth'


export function uploadInstrumentImage(data) {
  setHeaders()
  return api.post('/api/v1/admin', data)
  .then((res) => {
    //return res.data.admin
    return res.data
  })
}
