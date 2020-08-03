import Odoo from 'src/mixins/Odoo'
import OdooBaseData from './OdooBaseData'
import OdooForm from '../odoo/OdooForm'
import field from './OdooField'

export default {
  name: 'OdooBaseForm',
  extends: OdooBaseData,
  components: {
    OdooForm,
    field
  },
  data () {
    return {
      title: '(set the "title"!)',
      domain: [['id', '=', this.$route.params.res_id]], // to filter to one record
      click: {},
      form: false
    }
  },
  watch: {
    title () { this.$emit('title', this.title) }
  },
  methods: {
    read () {
      return Odoo.search_read(this.model, this.domain, this.fields, '', 1, this.context, true)
        .then(r => {
          if (r === []) {
            this.setRecordMessage('Failed to read the record', Odoo.CONST.BANNER_TYPE_FAIL)
            return false
          }
          this.record = r
          return true
        })
    },
    save () {
      console.log('todo: save record')
    },
    unlink () {
      console.log('todo: unlink record')
    },
    archive () {
      console.log('todo: archive record')
    }
  }
}
