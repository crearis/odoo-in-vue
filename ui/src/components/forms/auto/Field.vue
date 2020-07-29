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
              v-model="record.data[0][name]" :readonly="!editing" :disable="!editing"
    />

  </div>
</template>

<script>
import Utilities from 'src/mixins/Utilities'

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
    },
    mode: {
      type: String,
      required: true
    }
  },
  watch: {
    mode: function () {
      this.editing = this.mode === 'create' || this.mode === 'edit'
    }
  },
  data () {
    return {
      schema: false,
      editing: false,
      options: [],
      displayValue: ''
    }
  },
  methods: {
    getValue () {
      return this.record.data[0][this.name]
    },
    setSchema () {
      // get the details for this field based on its name
      for (let i = 0; i < this.record.cc.length; ++i) {
        if (this.record.cc[i].name === this.name) {
          this.schema = this.record.cc[i]
          // set the options for 'selection'
          if (this.schema.type === 'selection') {
            Utilities.fieldOptions(this.schema.field_id).then(r => {
              this.options = r
              r.forEach(opt => { if (this.getValue() === opt.value) { this.displayValue = opt.label } })
            })
          }
          // set options for 'many2one' (todo)
          break
        }
      }
    },
    getLabel () {
      if (this.schema === false) { this.setSchema() }
      return this.schema.label
    }
  }
}
</script>
<style scoped>
.div data {
  min-width: 225px
}
</style>
