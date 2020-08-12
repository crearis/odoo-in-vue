import Odoo from 'src/mixins/Odoo'
import Utils from 'src/mixins/Utils'

export default {
  name: 'OdooBaseData',
  data () {
    return {
      /** these fields must be set before calling the read() method */
      model: '', // Odoo model name
      fields: [], // fields we want to read from Odoo
      domain: [],
      /** optional field to set before calling read() */
      context: {}, // Odoo context to send with search_read
      /** dont modify this - it will be set by read() method */
      record: false,
      canRead: false,
      canWrite: false,
      canDelete: false,
      /** dont modify this directly - call setMessage */
      message: null
    }
  },
  mounted () {
    // first we make sure the session is OK - this will also update profile data in Vuex store
    Odoo.checkSession().then(r => {
      if (!r) {
        this.$router.push('/')
        return
      }
      // session is OK so next we can check permissions based model and on data in Vuex Store
      Odoo.check_access_rights(this.model, 'read').then(r => {
        this.canRead = r
        return Odoo.check_access_rights(this.model, 'write').then(r => {
          this.canWrite = r
          return Odoo.check_access_rights(this.model, 'unlink').then(r => {
            this.canDelete = r
            // console.log('permissions for', this.model, ':', this.canRead, this.canWrite, this.canDelete)
          })
        })
      })
    })
  },
  methods: {
    /*
    Set a message object for the record which can be used by other components to display the message to the user.
     */
    setMessage (text, CONST_BANNER_TYPE = '') {
      console.log(CONST_BANNER_TYPE, 'OdooBaseData.message:', text)
      // then set it according to type
      this.message = { text: text, type: CONST_BANNER_TYPE }
    },

    /*
    Call setMessage appropriately depending on the result of a insert / update / delete call.
     */
    digestCallResult (result, callType) {
      callType = Utils.UCFirst(callType)
      if (result === false) {
        this.setMessage(callType + ' error. Check console for details', Odoo.CONST.BANNER_TYPE_FAIL)
      } else {
        this.setMessage('Saved & record reloaded.')
        this.saveCompleted()
      }
    },

    /*
    Read one record. Typically called from a form component which extends OdooBaseForm.
     */
    readOne () {
      this.record = null
      return Odoo.search_read(this.model, this.domain, this.fields, '', 1, this.context, true)
        .then(r => {
          if (r === []) {
            this.record = {}
            this.setMessage('Failed to read the record', Odoo.CONST.BANNER_TYPE_FAIL)
            return false
          }
          this.record = r
          this.message = null
          return true
        })
    },

    /*
    Save a record. Typically called from a form component which extends OdooBaseForm.
     */
    save () {
      if ('upsert' in this.record) {
        const data = {}
        Object.keys(this.record.upsert).forEach(k => {
          if (this.fields.includes(k)) { data[k] = this.record.upsert[k] }
        })
        if (Object.keys(data).length) {
          if ('res_id' in this.record) { // we have the resource (record) ID for the record being updated
            Odoo.write(this.model, this.record.res_id, data).then(r => { this.digestCallResult(r, 'update') })
          } else { // no res_id means we must create the record
            Odoo.create(this.model, data).then(r => { this.digestCallResult(r, 'create') })
          }
        }
      }
    },

    /*
    Call that needs to be be implemented in components that extend this one
     */
    saveCompleted () {
      console.log('[ERROR] Please implement saveCompleted() in the sub-component')
    }
  }
}
