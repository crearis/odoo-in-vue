<template>
  <div class="flex row q-mb-sm" v-if="record !== false">
    <!-- field label -->
    <q-badge :label="getLabel()+':'" color="white" text-color="black" style="min-width: 150px">
      <q-tooltip>{{schema.help}}</q-tooltip>
    </q-badge>

    <!-- char field -->
    <q-input v-if="schema.type === 'char'" class="data" outlined dense
             v-model="record.data[0][name]" :readonly="!editing" :disable="!editing"
    />

    <!-- selection field -->
    <q-select v-if="(schema.type === 'selection' || schema.type === 'many2one' )"
              class="data" outlined dense :options="options" :display-value="displayValue"
              :value="getValue()" :readonly="!editing" :disable="!editing"
    />

  </div>
</template>

<script>
import Utilities from 'src/mixins/Utilities'
import EventBus from 'src/components/EventBus'

export default {
  name: 'AutoField',
  props: {
    name: {
      type: String,
      required: true
    },
    record: {
      type: [Boolean, Object],
      required: false,
      default: false
    },
    modes: { // indicates the modes the field must support
      type: Array, // can have one or more of the following: 'read', 'edit', 'create'
      required: false,
      default: function () { return ['read', 'edit'] }
    }
  },
  watch: {
    formMode () {
      this.editing = ['create', 'edit'].includes(this.formMode)
    },
    options () {
      this.options.forEach(opt => {
        const val = this.getValue()
        if (val === opt.value) {
          this.displayValue = opt.label
        }
      })
    }
  },
  data () {
    return {
      schema: false,
      editing: false,
      options: [],
      displayValue: '',
      formMode: 'read'
    }
  },
  methods: {
    getValue () {
      if (this.schema.type === 'many2one') {
        return this.record.data[0][this.name][0]
      } else {
        return this.record.data[0][this.name]
      }
    },
    setSchema () {
      // get the details for this field based on its name
      for (let i = 0; i < this.record.cc.length; ++i) {
        if (this.record.cc[i].name === this.name) {
          this.schema = this.record.cc[i]
          this.setSelectionOptions()
          break
        }
      }
      // console.log(this.schema)
    },
    setSelectionOptions () {
      // set the options for 'selection'
      if (this.schema.type === 'selection') {
        Utilities.fieldOptions(this.schema.field_id).then(r => {
          this.options = r
        })
      } else if (this.schema.type === 'many2one') {
        Utilities.fieldRelationOptions(this.schema.relation).then(r => {
          this.options = r
        })
      }
    },
    getLabel () {
      if (this.schema === false) { this.setSchema() }
      return this.schema.label
    }
  },
  mounted () {
    EventBus.$on('components-forms--click', e => { this.formMode = e.event })
  },
  destroyed () {
    EventBus.$off('components-forms--click')
  }
}
</script>
<style scoped>
.div data {
  min-width: 225px
}
</style>
