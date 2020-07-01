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

const Odoo = OdooRpc.Client()

/** EXPORT SECTION: */

export default {
  /*
  Return the health of the server.
  Requires the spa_support Odoo module installed
   */
  getHealth () {
    axios.get('/spa-support/utility/health')
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
    return Odoo.login('/spa-support/web/session/authenticate', db, login, password)
      .then(r => {
        if (r.data.result.ok) {
          Cookies.set('session_id', r.data.result.session_id)
          store.commit('setSessionProfile', r.data.result.profile)
          return true
        }
        return false
      }).catch(e => {
        return false
      })
  },

  hasSession () {
    return Cookies.has('session_id')
  },

  getProjects () {
    OdooRpc.search_read(
      'project.project',
      ['id', 'name']
    ).then(r => {
      console.log(r)
    }).catch(e => {
      console.log(e)
    })
  }
}
