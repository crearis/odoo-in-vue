<template>
  <div class="row">
    <Field :schema="schema" :value="data"/>
  </div>
</template>

<script>
import Field from './auto/Field'
export default {
  name: 'ContactForm',
  components: {
    Field
  },
  data () {
    return {
      title: 'Contact - Edit',
      schema: {}, // model schema
      data: {},
      fields: []
    }
  },
  created () {
    // get the model schema
    // get the data
  },
  mounted () {
    this.$emit('title', this.title)
  }
}
</script>
