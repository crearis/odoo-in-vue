/**
 * This file is exports wrappers for communicating with the server.
 *
 * NEVER may any of these exported wrappers update store data. If store data
 * needs to be updated then the code in the store must use these wrappers
 * to get server data then the store code can update itself.
 *
 * All the exported wrapper calls MUST return a Promise
 */

import axios from 'axios'
import { store } from '../store'
import { Cookies } from 'quasar'
import OdooRpc from './OdooRpc'

const HostnameParts = location.hostname.split('.')
const ServerHost = 'server.' + HostnameParts[1] + '.' + HostnameParts[2]
const ServerUrlBase = 'http://' + ServerHost
const ServerUrlSpaSupport = ServerUrlBase + '/spa-support'

// OdooRpc.init(ServerUrlBase)

/** EXPORT SECTION: */

export default {
  constants: {
    ServerHost: ServerHost,
    ServerUrlBase: ServerUrlBase,
    ServerUrlSpaSupport: ServerUrlSpaSupport
  },
  urls: {
    utility (path) {
      return ServerUrlSpaSupport + '/utility' + path
    }
  },

  getHealth () {
    axios.get(this.urls.utility('/health'))
      .then(r => {
        console.log('server health ok')
      }).catch(e => {
        console.log('server health:', e)
      })
  },

  doLogin (db, login, password) {
    const data = { jsonrpc: '2.0', method: 'call', params: { db: db, login: login, password: password } }
    axios.post(
      this.constants.ServerUrlSpaSupport + '/web/session/authenticate',
      data,
      {
        headers: { 'content-type': 'application/json' }
      })
      .then(r => {
        if (r.data.result) {
          if (r.data.result.ok) {
            store.commit('setSessionId', {
              id: r.data.result.session_id,
              domain: HostnameParts[1] + '.' + HostnameParts[2]
            })
            store.commit('setSessionProfile', r.data.result.profile)
            return true
          }
        } else {
          return false
        }
      })
      .catch(e => { return false })
  },

  hasSession () {
    return Cookies.has('session_id')
  },

  getProjects () {
    OdooRpc.call('search_read', 'project.project')
  }
}
