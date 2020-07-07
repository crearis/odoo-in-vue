import { store } from 'src/store'
import Odoo from './OdooRpc.js'


export default {
  /*
  Creates a short and simple hash of a string
   */
  hashString (valueStr) {
    let strChar = ''
    let hash = 0
    if (valueStr.length === 0) {
      return hash
    }
    for (let i = 0; i < valueStr.length; i++) {
      strChar = valueStr.charCodeAt(i)
      hash = ((hash << 5) - hash) + strChar
      hash = hash & hash // Convert to 32bit integer
    }
    return hash
  },

  /*
  Date functions
   */
  Date: {
    currentMonthFirstDay () {
      const date = new Date()
      return new Date(date.getFullYear(), date.getMonth(), 1)
    },
    currentMonthLastDay () {
      const date = new Date()
      return new Date(date.getFullYear(), date.getMonth() + 1, 0)
    },
    currentWeekFirstDay () {
      const date = new Date()
      return new Date(date.getFullYear(), date.getMonth(), 1)
    },
    currentWeekLastDay () {
      const date = new Date()
      return new Date(date.getFullYear(), date.getMonth() + 1, 0)
    },
    getYMDString (date) {
      const y = date.getFullYear()
      const m = date.getMonth() + 1
      const d = date.getDate()
      return `${y}-${m}-${d}`
    }
  },

  /*
  Creates a name for a menu QTable column config that we store in Vuex.
  Format: <model-name>/<fields-count>-<fields-hash (number)>
   */
  colConfName (model, fieldsArr) {
    return model + '/' + fieldsArr.length + '-' + Math.abs(this.hashString(fieldsArr.join('+')))
  },

  /*
  "Fields to QTable Column Config"
  Gets models field info from Odoo and converts it to a basic QTable column config
   */
  fields2QTableColConfig (model, fieldsArr, useStore = true) {
    const configName = this.colConfName(model, fieldsArr)
    if (useStore) {
      // return it from Vuex if its there
      if (store.state.qtable.columnConfig[configName]) {
        return new Promise((resolve) => {
          resolve(store.state.qtable.columnConfig[configName])
        })
      }
    }
    // else get it, store it, return it
    return Odoo.search_read(
      'ir.model.fields',
      [['model', '=', model], ['name', 'in', fieldsArr]],
      ['name', 'field_description', 'ttype', 'relation', 'relation_field', 'help'],
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
          store.commit('setColumnConfig', { name: configName, data: result })
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
  Convert Odoo data from calendar.events model to data for QCalendar (Quasar) component
   */
  calendarEvents2QCalendar (data) {
    const retVal = []
    data.forEach(item => {
      retVal.push({
        title: item.name,
        details: item.description ? item.description : '',
        date: item.start.split(' ')[0],
        // this data is used for week and day view
        time: item.start.split(' ')[1].substr(0, 5),
        duration: item.duration * 60
      })
    })
    return retVal
  }
}
