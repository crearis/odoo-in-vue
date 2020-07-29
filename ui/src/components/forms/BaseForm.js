import Server from 'src/mixins/Server'
import Field from './auto/Field'
import BaseData from 'src/components/BaseData'
import EventBus from 'components/EventBus'

export default {
  extends: BaseData,
  components: {
    Field
  },
  data () {
    return {
      title: '(set the "title"!)',
      domain: [['id', '=', this.$route.params.res_id]], // to filter to one record
      click: {}
    }
  },
  mounted () {
    EventBus.$emit('components-forms--title', this.title)
    // this MUST also be implemented in the child to listen for click events
    EventBus.$on('components-forms--click', e => { this.click = e })
  },
  methods: {
    read () {
      Server.search_read(this.model, this.domain, this.fields, '', 1, this.context, true)
        .then(r => {
          if (r === []) {
            console.log('failed to read record') // todo
            return
          }
          this.record = r
        })
    },
    save () {
      console.log('save data in BaseForm.js')
    }
  },
  destroyed () {
    EventBus.$off('components-forms--click')
  }
}
