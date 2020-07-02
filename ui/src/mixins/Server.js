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
        console.log(r)
        if (r.data.result.db === db) {
          // console.log('auth OK')
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
  /*
  Call to check if user is authenticated. Redirects to login is user is not.
   */
  redirectIfNotAuthenticated () {
    this.hasAuthenticatedSession()
      .then(r => {
        if (!r) {
          // Cookies.remove('session_id')
          window.location.href = '/#/'
          return
        }
        console.log('session_id OK; wont redirect')
      })
  },
  /*
  "Fields to QTable Column Config"
  Gets models field info from Odoo and converts it to a basic QTable column config
   */
  fields2QTableColConfig (model, fieldsArr, useStore = true) {
    if (useStore) {
      // return it from Vuex if its there
      if (store.state.qtable.columnConfig[model]) {
        return store.state.qtable.columnConfig[model]
      }
    }
    // else get it, store it, return it
    return Odoo.search_read(
      'ir.model.fields',
      ['name', 'field_description', 'ttype', 'relation', 'relation_field', 'help'],
      [['model', '=', model], ['name', 'in', fieldsArr]],
      '',
      200
    ).then(r => {
      if (r.data.result.records.length) {
        const result = []
        fieldsArr.forEach(function (fieldName) {
          r.data.result.records.forEach(function (fieldInfo) {
            if (fieldInfo.name === fieldName) {
              result.push({
                name: fieldName,
                field: fieldName,
                type: fieldInfo.ttype,
                relation: fieldInfo.relation,
                relationField: fieldInfo.relation_field,
                help: fieldInfo.help,
                label: fieldInfo.field_description,
                align: 'left'
              })
            }
          })
        })
        if (useStore) {
          // save the column config in Vuex
          store.commit('setColumnConfig', { name: model, data: result })
        }
        return result
      }
      return false
    }).catch(e => {
      console.log('fields2QTableColConfig', e)
      return false
    })
  },
  /*
  "Search-Read with Column Config"
  Return data from Odoo with column config for QTable.
  Does an Odoo search_read then does Server.fields2QTableColConfig.
  Returns object:
  {
    data: {},   // the data from the DB
    cc: []      // the column config for QTable
  }
  "ccUseStoreBool" means "Column Config [loading] Uses [Vuex] Store? (true/false)"
   */
  search_read_with_CC (modelStr, fieldsArr = [], domainArr = [], sort = '', limit = 80, contextObj = {}, ccUseStoreBool = true) {
    const result = { data: {}, cc: [] }
    return this.fields2QTableColConfig(modelStr, fieldsArr, ccUseStoreBool)
      .then(r => {
        if (r) {
          // if we can get the column config ..
          result.cc = r

          // then we can get the data
          return Odoo.search_read(
            modelStr,
            fieldsArr,
            domainArr,
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
