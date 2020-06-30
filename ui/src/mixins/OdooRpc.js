import axios from 'axios'

export default {
  host: '',
  Client (host) {
    this.host = host
    return this
  },

  rpc (path, params) {
    return axios.post(
      this.host + path,
      { jsonrpc: '2.0', params: params },
      {
        headers: { 'content-type': 'application/json' }
      })
  },

  call (path, methodStr, modelStr, fieldsArr = [], domainArr = [], argsArr = [], contextObj = {}) {
    return axios.post(
      this.host + path,
      {
        jsonrpc: '2.0',
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
  },

  login (path, db, login, password) {
    return this.rpc(path, { db: db, login: login, password: password })
  }
}
