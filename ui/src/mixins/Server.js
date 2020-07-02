/**
 * This file exports wrappers for communicating with the server.
 *
 * All the exported wrapper using Axios calls MUST return a Promise unless there is an
 * error or unmet condition in which case they MUST only return false (bool).
 */

import axios from 'axios'
import { store } from '../store'
import OdooRpc from './OdooRpc'

const Odoo = OdooRpc.Client()

/** EXPORT SECTION: */

export default {
  Odoo: Odoo,

  /*
  Return the health of the server.
  Requires the spa_support Odoo module installed
   */
  getHealth () {
    return axios.get('/spa-support/utility/health')
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
    return Odoo.authenticate(db, login, password)
      .then(r => {
        console.log(r)
        if (r.data.result.db === db) {
          console.log('auth OK')
          store.commit('setSessionProfile', r.data.result)
          return true
        }
        return false
      }).catch(e => {
        return false
      })
  },
  /*
  Returns a promise for an Odoo RPC query if the user has a session, else false
   */
  hasAuthenticatedSession () {
    return Odoo.search_count('res.partner')
      .then(r => {
        console.log('hasAuthenticatedSession', r)
        if (r.status === 200) {
          if (r.data.result) {
            return true
          }
        }
        return false
      })
      .catch(e => {
        console.log('hasAuthenticatedSession', e)
        return false
      })
  },

  redirectIfNotAuthenticated () {
    this.hasAuthenticatedSession()
      .then(r => {
        if (!r) {
          // Cookies.remove('session_id')
          window.location.href = '/vue/#/'
          return
        }
        console.log('session_id OK; wont redirect')
      })
  }
}
