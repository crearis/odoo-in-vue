import axios from 'axios'

export default {
  host: '',
  Client () {
    return this
  },

  rpc (path, params) {
    console.log('rpc:', location.hostname + path)
    return axios.post(
      path,
      { jsonrpc: '2.0', params: params },
      {
        headers: { 'content-type': 'application/json' },
        withCredentials: true
      })
  },

  search_read (modelStr, fieldsArr = [], domainArr = [], sort = '', limit = 80, contextObj = {}) {
    return this.rpc(
      '/web/dataset/search_read',
      {
        model: modelStr,
        fields: fieldsArr,
        domain: domainArr,
        sort: sort,
        limit: limit,
        context: contextObj
      }
    )
  },

  login (path, db, login, password) {
    return this.rpc(path, { db: db, login: login, password: password })
  }
}
