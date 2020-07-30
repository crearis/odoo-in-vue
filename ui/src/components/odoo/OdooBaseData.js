import Server from 'src/mixins/Server'
import OdooEventBus from './OdooEventBus'

export default {
  data () {
    return {
      /** these fields must be set before calling the read() method **/
      model: '', // Odoo model name
      fields: [], // fields we want to read from Odoo
      domain: [],
      /** optional field to set before calling read() **/
      context: {}, // Odoo context to send with search_read
      /** do not modify this - it will be set by read() method **/
      record: false,
      canRead: false,
      canWrite: false,
      canDelete: false
    }
  },
  mounted () {
    // first we make sure the session is OK - this will also update profile data in Vuex store
    Server.checkSession().then(r => {
      if (!r) {
        this.$router.push('/')
        return
      }
      // session is OK so next we can check permissions based model and on data in Vuex Store
      Server.check_access_rights(this.model, 'read').then(r => {
        this.canRead = r
        return Server.check_access_rights(this.model, 'write').then(r => {
          this.canWrite = r
          return Server.check_access_rights(this.model, 'unlink').then(r => {
            this.canDelete = r
            // console.log('permissions for', this.model, ':', this.canRead, this.canWrite, this.canDelete)
            OdooEventBus.$emit('access-rights', {
              read: this.canRead,
              write: this.canWrite,
              delete: this.canDelete
            })
          })
        })
      })
    })
  }
}
