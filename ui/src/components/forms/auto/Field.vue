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
    }
  },
  watch: {
    options () {
      const val = this.getValue()
      if (val) {
        this.options.forEach(opt => {
          if (val === opt.value) {
            this.displayValue = opt.label
          }
        })
      }
    }
  },
  data () {
    return {
      schema: false,
      options: [],
      displayValue: '',
      formMode: 'read'
    }
  },
  computed: {
    editing () { return ['create', 'edit'].includes(this.formMode) && !this.schema.readOnly }
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
          this.setQSelectionOptions()
          break
        }
      }
      // console.log(this.schema)
    },
    setQSelectionOptions () {
      if (this.schema.type === 'selection') {
        Utilities.fieldSelectionOptions(this.schema.fieldId).then(r => {
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
