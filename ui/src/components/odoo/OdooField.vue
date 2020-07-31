<template>
  <div class="flex row q-mb-sm" v-if="record !== false">
    <!-- field label -->
    <q-badge :label="schema.label" color="white" text-color="black" style="min-width: 150px">
      <q-tooltip>{{schema.help}}</q-tooltip>
    </q-badge>

    <!-- char -->
    <q-input v-if="schema.type === 'char'" class="data" outlined dense
             v-model="record.data[0][name]" :readonly="!editing" :disable="!editing"
    />

    <!-- selection -->
    <q-select v-if="(schema.type === 'selection' || schema.type === 'many2one' )"
              class="data" outlined dense :options="options" :display-value="displayValue"
              :value="getValue()" :readonly="!editing" :disable="!editing"
    />

    <!-- date -->
    <q-input v-if="schema.type === 'date'" outlined dense v-model="record.data[0][name]"
             mask="date" :rules="['date']" :readonly="!editing" :disable="!editing">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="record.data[0][name]" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <!-- time -->
    <q-input v-if="widget === 'float_time'" outlined dense v-model="record.data[0][name]"
             mask="time" :rules="['time']" :readonly="!editing" :disable="!editing">
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
            <q-time v-model="record.data[0][name]" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

  </div>
</template>

<script>
import OdooQUtils from 'src/mixins/OdooQUtils'

export default {
  name: 'OdooField',
  props: {
    name: {
      type: String,
      required: true
    },
    widget: {
      type: String,
      required: false
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
      options: [],
      displayValue: '',
      record: false,
      schema: false
    }
  },
  computed: {
    formMode () { return this.getOdooForm().click },
    editing () { return ['create', 'edit'].includes(this.formMode) && !this.schema.readOnly }
  },
  created () {
    // get the reference to the OdooForm component
    const form = this.getOdooForm()
    // get the record from the OdooForm component
    this.record = form.record
    // set the schema for this field based on its name
    for (let i = 0; i < this.record.cc.length; ++i) {
      if (this.record.cc[i].name === this.name) {
        this.schema = this.record.cc[i]
        this.setQSelectionOptions()
        break
      }
    }
    // console.log(this.schema)
  },
  methods: {
    getOdooForm () {
      let component = null
      let parent = this.$parent
      while (parent && !component) {
        if (parent.$options.name === 'OdooForm') {
          component = parent
        }
        parent = parent.$parent
      }
      return component
    },
    getValue () {
      if (this.schema.type === 'many2one') {
        return this.record.data[0][this.name][0]
      } else {
        return this.record.data[0][this.name]
      }
    },
    setQSelectionOptions () {
      if (this.schema.type === 'selection') {
        OdooQUtils.fieldSelectionOptions(this.schema.fieldId).then(r => {
          this.options = r
        })
      } else if (this.schema.type === 'many2one') {
        OdooQUtils.fieldRelationOptions(this.schema.relation).then(r => {
          this.options = r
        })
      }
    }
  }
}
</script>
<style scoped>
.div data {
  min-width: 225px
}
</style>
