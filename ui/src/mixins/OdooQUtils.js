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
    getYMDString (date) {
      const y = date.getFullYear()
      const m = date.getMonth() + 1
      const d = date.getDate()
      return `${y}-${m}-${d}`
    },
    /*
    start1st: start of first event
    end1st: end of first event
    start2nd: start of second event
    end2nd: end of second event
     */
    isOverlap (start1st, end1st, start2nd, end2nd) {
      // 1st event starts on or after 2nd but before 2nd event ends
      if (start1st >= start2nd) {
        if (start1st < end2nd) {
          return true
        }
      }
      // 1st even starts before 2nd but ends after start of 2nd
      if (start1st < start2nd) {
        if (end1st > start2nd) {
          return true
        }
      }
      return false
    }
  },

  /*
  Creates a cache ID for a set of field data from ir_model_fields that we store in Vuex.
  Format: <model-name>/<fields-count>-<fields-hash (number)>
   */
  cacheIdModelFields (model, fieldsArr) {
    return model + '/' + fieldsArr.length + '-' + Math.abs(this.hashString(fieldsArr.join('+')))
  },

  /*
  Gets the options for selection fields
   */
  fieldSelectionOptions (fieldId) {
    // return it from Vuex if its there
    if (store.state.odoo.ir_model_fields_selection[fieldId]) {
      return new Promise((resolve) => {
        return resolve(store.state.odoo.ir_model_fields_selection[fieldId])
      })
    }
    return Odoo.search_read(
      'ir.model.fields.selection',
      [['field_id', '=', fieldId]],
      ['name', 'value'],
      'sequence',
      1000
    ).then(r => {
      if (r.data.result.records.length) {
        const result = []
        r.data.result.records.forEach(opt => { result.push({ label: opt.name, value: opt.value }) })
        return result
      }
      return false
    })
  },

  /*
  Gets the options for selection fields
   */
  fieldRelationOptions (relation, domain = [], relationField = '') {
    // don't use Vuex store here because the source data changes more frequently
    return Odoo.search_read(
      relation,
      domain,
      ['name'],
      'name',
      1000
    ).then(r => {
      if (r.data.result.records.length) {
        const result = []
        r.data.result.records.forEach(opt => { result.push({ label: opt.name, value: opt.id }) })
        return result
      }
      return false
    })
  },

  /*
  "Fields to QTable Column Config"
  Gets models field info from Odoo and converts it to a basic QTable column config
   */
  fields2QTableColConfig (model, fieldsArr, useStore = true) {
    const cacheId = this.cacheIdModelFields(model, fieldsArr)
    if (useStore) {
      // return it from Vuex if its there
      if (store.state.odoo.ir_model_fields[cacheId]) {
        return new Promise((resolve) => {
          resolve(store.state.odoo.ir_model_fields[cacheId])
        })
      }
    }
    // else get it, store it, return it
    return Odoo.search_read(
      'ir.model.fields', [['model', '=', model], ['name', 'in', fieldsArr]],
      ['name', 'field_description', 'ttype', 'required', 'readonly', 'relation', 'relation_field',
        'relation_field_id', 'help'],
      '', 200
    ).then(r => {
      if (r.data.result.records.length) {
        const result = []
        fieldsArr.forEach(fieldName => {
          r.data.result.records.forEach(function (fieldInfo) {
            if (fieldInfo.name === fieldName) {
              // selection options
              result.push({
                fieldId: fieldInfo.id, // needed to get extended field info
                name: fieldName,
                field: fieldName,
                type: fieldInfo.ttype,
                required: fieldInfo.required,
                readOnly: fieldInfo.readonly,
                relation: fieldInfo.relation,
                relationField: fieldInfo.relation_field,
                relationFieldId: fieldInfo.relation_field_id,
                help: fieldInfo.help,
                label: fieldInfo.field_description,
                align: 'left'
              })
            }
          })
        })
        if (useStore) {
          // save the column config in Vuex
          store.commit('cache_ir_model_fields', { id: cacheId, data: result })
        }
        return result
      }
      return false
    }).catch(e => {
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
        duration: item.duration * 60,
        overlaps: 0,
        allday: item.allday,
        model: 'calendar.event',
        res_id: item.id
      })
    })
    return retVal
  },

  /*
  Convert Odoo data from project.task model to data for QCalendar (Quasar) component.
  Depends on the project_task_plan module for additional fields.
   */
  taskEvents2QCalendar (data) {
    const retVal = []
    data.forEach(item => {
      const event = {
        title: item.name,
        details: item.description ? item.description : '',
        date: item.date_deadline,
        // this data is used for week and day view
        time: item.time_deadline_display,
        duration: item.duration_deadline_minutes,
        overlaps: 0,
        allday: item.time_deadline_display === false,
        model: 'project.task',
        res_id: item.id
      }
      retVal.push(event)
    })
    return retVal
  }
}
