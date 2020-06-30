import axios from 'axios'

export default {
  host: '',
  dbName: '',
  Client (host, dbName) {
    this.host = host
    this.dbName = dbName
    return this
  },
  call (methodStr, modelStr, fieldsArr = [], domainArr = [], argsArr = [], contextObj = {}) {
    return axios.post(
      this.host,
      {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          methodStr,
          model: modelStr,
          args: argsArr,
          kwargs: {
            domain: domainArr,
            fields: fieldsArr,
            context: contextObj
          }
        }
      },
      {
        withCredentials: true
      }
    )
  }
}
