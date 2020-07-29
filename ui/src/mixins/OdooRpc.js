import axios from 'axios'

export default {
  Client () {
    return this
  },

  /*
  A simple wrapper for making RPC calls to the Odoo JSON-RPC 2 API
  Note, we don't use `method` in `data` because Odoo just ignores it
  Ref: https://github.com/odoo/odoo/blob/13.0/odoo/http.py#L536
   */
  rpc (path, params = {}) {
    // console.log('rpc:', path)
    return axios.post(
      path,
      { jsonrpc: '2.0', params: params, method: 'call' },
      {
        headers: { 'content-type': 'application/json' },
        withCredentials: true
      })
  },

  /*
  Wrapper for call_kw JSON-RPC call.
   */
  call_kw (methodStr, modelStr, argsArr = [[]], kwargs = {}, context = {}) {
    const path = '/web/dataset/call_kw/' + modelStr + '/' + methodStr
    kwargs.context = context
    return this.rpc(path, {
      args: argsArr,
      model: modelStr,
      method: methodStr,
      kwargs: kwargs
    })
  },

  /*
  Authenticates against Odoo. The optional `path` param is available so that you can use your
  own controller's path to custom code for authentication.
   */
  authenticate (db, login, password, path = '/web/session/authenticate') {
    return this.rpc(path, { db: db, login: login, password: password })
  },

  /*
  Ref: https://www.odoo.com/documentation/13.0/webservices/odoo.html#search-and-read
   */
  search_read (modelStr, domainArr = [], fieldsArr = [], sort = '', limit = 80, contextObj = {}) {
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

  /*
  Ref: https://www.odoo.com/documentation/13.0/webservices/odoo.html#count-records
   */
  search_count (modelStr, domainArr = [[]]) {
    return this.call_kw('search_count', modelStr, domainArr)
  }
}
