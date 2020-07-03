/**
 * This file exports wrappers for communicating with the server.
 *
 * All the exported wrapper using Axios calls MUST return a Promise unless there is an
 * error or unmet condition in which case they MUST only return false (bool).
 */

import axios from 'axios'
import { store } from '../store'
import OdooRpc from './OdooRpc'
import Utilities from './Utilities'

const Odoo = OdooRpc.Client()

/** EXPORT SECTION: */

export default {
  Odoo: Odoo,

  /*
  Log a message or an error
   */
  log (value, error = null) {
    const level = error === null ? '[info] ' : '[error] '
    console.log(level, value)
    if (error !== null) {
      console.log(error)
    }
  },

  /*
  Return the health of the server.
  Requires the spa_support Odoo module installed
   */
  getHealth () {
    return axios.get('/spa-support/utility/health')
      .then(r => {
        // console.log('server health ok')
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
        if (r.data.result.db === db) {
          store.commit('setSessionProfile', r.data.result)
          return true
        }
        return false
      }).catch(e => {
        return false
      })
  },

  /*
  Returns a promise for an Odoo RPC query if the user has a session, else false.
  Also, it will refresh the users profile data from the server.
   */
  hasAuthenticatedSession () {
    return Odoo.search_count('res.partner')
      .then(r => {
        if (r.status === 200) {
          if (r.data.result) {
            // make sure that we have fresh profile data in the store
            return Odoo.rpc('/web/session/get_session_info')
              .then(r => {
                store.commit('setSessionProfile', r.data.result)
                return true
              }).catch(e => {
                this.log('hasAuthenticatedSession', e)
              })
          }
        }
        return false
      })
      .catch(e => {
        console.log('hasAuthenticatedSession', e)
        return false
      })
  },

  /*
  Call to check if user is authenticated. Redirects to login is user is not.
   */
  redirectIfNotAuthenticated () {
    return this.hasAuthenticatedSession()
      .then(r => {
        if (!r) {
          window.location.href = '/vue/#/'
          return
        }
        console.log('session_id OK; wont redirect')
      })
  },

  /*
  "Search-Read (with Column Config)"
  Gets field info from Odoo for a model and converts it to QTable column config data,
  then does Odoo.search_read for Odoo data.

  Returns Object:
  {
    data: {},   // the data from the DB
    cc: []      // the column config for QTable
  }
  "ccUseStoreBool" means "Column Config [loading] Uses [Vuex] Store? (TRUE/false)"
   */
  search_read (modelStr, domainArr = [], fieldsArr = [], sort = '', limit = 80, contextObj = {}, ccUseStoreBool = true) {
    const result = { data: {}, cc: [] }
    return Utilities.fields2QTableColConfig(modelStr, fieldsArr, ccUseStoreBool)
      .then(r => {
        if (r) {
          // if we can get the column config ..
          result.cc = r

          // then we can get the data
          return Odoo.search_read(
            modelStr,
            domainArr,
            fieldsArr,
            sort,
            limit,
            contextObj
          ).then(r => {
            if (r.data.error) {
              console.log(r.data.error)
              return false
            } else {
              result.data = r.data.result.records
            }
            return result
          })
        } else {
          return false
        }
      })
  }
}
