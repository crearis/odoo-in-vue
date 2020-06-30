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
const ServerPathSpaSupport = '/spa-support'
const ServerUrlSpaSupport = ServerUrlBase + ServerPathSpaSupport
const Odoo = OdooRpc.Client(ServerUrlBase)

/** EXPORT SECTION: */

export default {
  /*
  Return the health of the server.
  Requires the spa_support Odoo module installed
   */
  getHealth () {
    axios.get(ServerUrlSpaSupport + '/utility/health')
      .then(r => {
        console.log('server health ok')
      }).catch(e => {
        console.log('server health:', e)
      })
  },
  /*
  Authenticates against the Odoo server. If OK, stores the session_id in a cookie and profile in Vuex.
  Requires the spa_support Odoo module installed
   */
  getSessionId (db, login, password) {
    return Odoo.login(ServerPathSpaSupport + '/web/session/authenticate', db, login, password)
      .then(r => {
        if (r.status === 200) {
          if (r.data.result.ok) {
            Cookies.set('session_id', r.data.result.session_id)
            store.commit('setSessionProfile', r.data.result.profile)
            return true
          }
        }
      }).catch(e => {
        console.log(e)
        return false
      })
  },

  hasSession () {
    return Cookies.has('session_id')
  },

  getProjects () {
    OdooRpc.call('search_read', 'project.project')
  }
}
