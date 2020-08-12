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
    onFormClick (e) {
      if (e.event === 'save') {
        this.save()
      }
    },

    saveCompleted () {
      this.readOne()
    },

    unlink () {
      console.log('todo: unlink record')
    },

    archive () {
      console.log('todo: archive record')
    }
  ///
  }
}
