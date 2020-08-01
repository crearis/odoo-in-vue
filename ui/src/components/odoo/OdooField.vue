<template>
  <div class="flex row q-mb-sm" v-if="record !== false">
    <!-- field label -->
    <q-badge :label="schema.label" color="white" text-color="black" style="min-width: 150px">
      <q-tooltip>{{schema.help}}</q-tooltip>
    </q-badge>

    <!-- char -->
    <q-input v-if="schema.type === 'char'" class="data" outlined dense
             v-model="formValue" :readonly="!editing" :disable="!editing"
    />

    <!-- selection -->
    <q-select v-if="(schema.type === 'selection' || schema.type === 'many2one' )" outlined dense
              :options="options" v-model="formValue" :readonly="!editing" :disable="!editing"
    />

    <!-- date -->
    <q-input v-if="schema.type === 'date'" outlined dense v-model="formValue"
             mask="date" :rules="['date']" :readonly="!editing" :disable="!editing">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="formValue" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <!-- time -->
    <q-input v-if="widget === 'float_time'" outlined dense v-model="formValue"
             mask="time" :rules="['time']" :readonly="!editing" :disable="!editing">
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
            <q-time v-model="formValue" @input="() => $refs.qDateProxy.hide()" />
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
    formValue () { this.setQSelectionDisplayValue() }
  },
  data () {
    return {
      options: [],
      formValue: '',
      displayValue: '',
      record: false,
      schema: false
    }
  },
  computed: {
    formMode () { return this.getOdooForm().click.event },
    recordValue () {
      // select widget:
      if (['many2one', 'selection'].includes(this.schema.type)) {
        console.log(this.name, '=', this.record.data[0][this.name])
        return { label: this.record.data[0][this.name][1], value: this.record.data[0][this.name][0] }
      }
      return this.record.data[0][this.name]
    },
    editing () { return ['create', 'edit'].includes(this.formMode) && !this.schema.readOnly },
    changed () { return this.formValue === this.recordValue }
  },
  created () {
    this.record = this.getOdooForm().record
    for (let i = 0; i < this.record.cc.length; ++i) {
      if (this.record.cc[i].name === this.name) { // set the schema for this field based on its name
        this.schema = this.record.cc[i]
        if (['many2one', 'selection'].includes(this.schema.type)) {
          this.setQSelectionData()
        } else {
          this.formValue = this.recordValue
        }
        break
      }
    }
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
    setQSelectionData () {
      if (this.schema.type === 'selection') {
        OdooQUtils.fieldSelectionOptions(this.schema.fieldId).then(r => {
          this.options = r
          // For 'selection' Odoo gives data as a primitive value. It MUST be change to an array like a 'many2one' field
          // That way, we have just one paradigm here to handle both in the same type of component
          // The promise MUST resolve first, then we can set this.record.data[0][this.name] and recordValue works right
          for (let i = 0; i < r.length; ++i) {
            if (r[i].value === this.record.data[0][this.name]) { // (this.record.data[0][this.name] gives the record value)
              this.record.data[0][this.name] = [r[i].value, r[i].label] // here we make it resemble a many2one value
              this.formValue = this.recordValue // now we can set the formValue
              break
            }
          }
          // After we change this.record.data[0][this.name] we can set the options and displayValue
          this.setQSelectionDisplayValue()
        })
      } else if (this.schema.type === 'many2one') {
        // for 'many2one' the recordValue is already an object and we don't need to know the options
        // (formValue does not depend on the promise)
        this.formValue = this.recordValue
        OdooQUtils.fieldRelationOptions(this.schema.relation).then(r => { this.options = r })
        this.setQSelectionDisplayValue()
      }
    },
    setQSelectionDisplayValue () {
      if (this.options.length) {
        if (!this.formValue) {
          this.displayValue = '(select one)'
        } else {
          this.options.forEach(opt => { if (this.formValue.value === opt.value) { this.displayValue = opt.label } })
        }
      }
    }
  }
}
</script>
