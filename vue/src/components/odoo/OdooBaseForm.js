import Odoo from 'src/mixins/Odoo'
import OdooBaseData from './OdooBaseData'
import OdooFormFrame from '../odoo/OdooFormFrame'
import OdooField from './OdooField'

export default {
  name: 'OdooBaseForm',
  extends: OdooBaseData,
  components: {
    OdooFormFrame,
    OdooField
  },
  data () {
    return {
      title: '(set the "title"!)',
      click: {},
    }
  },
  watch: {
    title () { this.$emit('title', this.title) }
  },
  methods: {
    read () {
      let res_id = this.$route.params.res_id
      this.domain = [['id', '=', res_id]]
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
