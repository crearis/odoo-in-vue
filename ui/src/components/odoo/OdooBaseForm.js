import Odoo from 'src/mixins/Odoo'
import OField from './OdooField'
import OdooBaseData from './OdooBaseData'
import OdooForm from '../odoo/OdooForm'

export default {
  name: 'OdooBaseForm',
  extends: OdooBaseData,
  components: {
    OdooForm,
    OField
  },
  data () {
    return {
      title: '(set the "title"!)',
      domain: [['id', '=', this.$route.params.res_id]], // to filter to one record
      click: {}
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
            console.log('failed to read record') // todo
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
