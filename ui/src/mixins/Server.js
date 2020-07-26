/**
 * This file exports wrappers for communicating with the server.
 *
 * All the exported wrapper using Axios calls MUST return a Promise unless there is an
 * error or unmet condition in which case they MUST only return false (bool).
 */

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
  isSessionOK () {
    const errP = 'failed hasAuthenticatedSession() check'
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
                this.log(errP, e)
              })
          }
        }
        return false
      })
      .catch(e => {
        console.log(errP, e)
        return false
      })
  },

  checkSession () {
    return this.isSessionOK().then(r => {
      if (!r) {
        this.$router.push('/')
        return false
      }
      console.log('session OK')
      return true
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
  search_read (modelStr, domainArr = [], fieldsArr = [], sort = '', limit = 80,
    contextObj = {}, ccUseStoreBool = true) {
    const result = { data: {}, cc: [] }
    return Utilities.fields2QTableColConfig(modelStr, fieldsArr, ccUseStoreBool)
      .then(r => {
        if (r) {
          // if we can get the column config:
          result.cc = r
        } else {
          // if cant get the column config:
          result.cc = false
          this.log('failed to get column config for ', modelStr)
        }
        // get the data
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
            return []
          } else {
            result.data = r.data.result.records
          }
          return result
        })
      })
  },

  /*
  Returns a standard format of data from calendar.events model to be used with QCalendar component
   */
  getCalendarEventsData (start, end, userId = 0) {
    const domain = [
      ['start', '>=', Utilities.Date.getYMDString(start) + ' 00:00:00.000000'],
      ['stop', '<=', Utilities.Date.getYMDString(end) + ' 23:59:59.999999']
    ]
    // add user_id filter if needed
    if (userId !== 0) {
      domain.push(['user_id', '=', userId])
    }
    return this.search_read(
      'calendar.event',
      domain,
      ['name', 'start', 'description', 'duration', 'active', 'allday']
    ).then(r => {
      try {
        if (r.data.length) {
          return Utilities.calendarEvents2QCalendar(r.data)
        }
      } catch (e) {
        console.log(e, r)
      }
      return []
    })
  },

  /*
  Returns a standard format of data from project.task model to be used with QCalendar component
   */
  getTaskEventData (start, end, userId = 0) {
    const domain = [
      ['date_deadline', '>=', Utilities.Date.getYMDString(start) + ' 00:00:00.000000'],
      ['date_deadline', '<=', Utilities.Date.getYMDString(end) + ' 23:59:59.999999']
    ]
    // add user_id filter if needed
    if (userId !== 0) {
      domain.push(['user_id', '=', userId])
    }
    return this.search_read(
      'project.task',
      domain,
      ['name', 'date_deadline', 'description', 'duration_deadline_minutes', 'active', 'time_deadline_display',
        'duration_deadline']
    ).then(r => {
      try {
        if (r.data.length) {
          return Utilities.taskEvents2QCalendar(r.data)
        }
      } catch (e) {
        console.log(e, r)
      }
      return []
    })
  }
}
