import Odoo from 'src/mixins/Odoo'

export default {
  name: 'OdooBaseData',
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
      canDelete: false,
      recordMessage: '',
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
    setRecordMessage (text, CONST_BANNER_TYPE = '') {
      this.recordMessage = CONST_BANNER_TYPE + ": " + text
    }
  }
}
