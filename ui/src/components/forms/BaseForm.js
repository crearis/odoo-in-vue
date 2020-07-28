import Server from 'src/mixins/Server'
import Field from './auto/Field'

export default {
  components: {
    Field
  },
  props: {
    click: {
      type: Object,
      required: true
    }
  },
  watch: {
    click: function () {
      this.clicked = this.click.event
    }
  },
  data () {
    return {
      title: 'Form',
      /** these fields must be set before calling the read() method **/
      model: '', // Odoo model name
      fields: [], // fields we want to read from Odoo
      domain: [['id', '=', this.$route.params.res_id]], // to filter to one record
      /** optional field to set before calling read() **/
      context: {}, // Odoo context to send with search_read
      /** do not modify this - it will be set by read() method **/
      record: false,
      clicked: ''
    }
  },
  mounted () {
    this.$emit('title', this.title)
  },
  methods: {
    read () {
      this.clicked = 'read'
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
  }
}
