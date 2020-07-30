import Odoo from 'src/mixins/Odoo'
import OField from './OdooField'
import OdooBaseData from './OdooBaseData'
import OdooEventBus from './OdooEventBus'

export default {
  name: 'OdooBaseForm',
  extends: OdooBaseData,
  components: {
    OField
  },
  data () {
    return {
      title: '(set the "title"!)',
      domain: [['id', '=', this.$route.params.res_id]], // to filter to one record
      click: {}
    }
  },
  mounted () {
    OdooEventBus.$emit('components-forms--title', this.title)
    // this MUST also be implemented in the child to listen for click events
    OdooEventBus.$on('components-forms--click', e => { this.click = e })
  },
  destroyed () {
    OdooEventBus.$off('components-forms--click')
  },
  methods: {
    read () {
      Odoo.search_read(this.model, this.domain, this.fields, '', 1, this.context, true)
        .then(r => {
          if (r === []) {
            console.log('failed to read record') // todo
            return
          }
          this.record = r
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
