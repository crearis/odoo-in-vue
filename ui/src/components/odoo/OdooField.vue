<template>
  <div class="flex row q-mb-sm" v-if="record !== false">
    <!-- field label -->
    <q-badge :label="schema.label" color="white" text-color="black" style="min-width: 150px">
      <q-tooltip>{{schema.help}}</q-tooltip>
    </q-badge>

    <!-- char -->
    <q-input v-if="schema.type === 'char'" class="data" outlined dense
             v-model="formValue" :readonly="!editing || schema.readonly" :disable="!editing" :mask="mask"
    />

    <!-- selection -->
    <q-select v-if="(schema.type === 'selection' || schema.type === 'many2one' )" outlined dense
              :options="options" v-model="formValue" :readonly="!editing || schema.readonly" :disable="!editing"
    />

    <!-- date -->
    <q-input v-if="schema.type === 'date'" outlined dense v-model="formValue" mask="date"
             :rules="schema.required ? ['date'] : []" :readonly="!editing || schema.readonly" :disable="!editing">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="formValue" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <!-- time -->
    <q-input v-if="widget === 'float_time'" outlined dense v-model="formValue" mask="time"
             :rules="schema.required ? ['time'] : []" :readonly="!editing || schema.readonly" :disable="!editing">
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
            <q-time v-model="formValue" @input="() => $refs.qTimeProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <!-- duration -->
    <q-input v-if="schema.type === 'float' && widget === 'float_duration'" class="data" outlined dense
             v-model="formValue" :readonly="!editing || schema.readonly" :disable="!editing" mask="##.##" fill-mask="0"
    />

    <!-- todo: rating -->
    <!-- todo: color-select -->
    <!-- todo: image -->
    <!-- todo: file-upload -->
    <!-- todo: progress -->

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
    },
    mask: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      options: [],
      formValue: '',
      rawValue: '',
      record: false,
      schema: false
    }
  },
  watch: {
    formValue () {
      if (typeof this.formValue === 'object') {
        if ('label' in this.formValue && 'value' in this.formValue) {
          this.rawValue = this.formValue.value
        }
      } else {
        this.rawValue = this.formValue
      }
      // console.log('field ', this.name, ' set to', this.rawValue, ' - changed?', this.changed)
      if (this.changed) {
        // create the upsert array if its not there
        if (!('upsert' in this.record)) { this.record.upsert = [] }
        this.record.upsert[this.name] = this.rawValue
      } else {
        if ('upsert' in this.record) {
          if (this.name in this.record.upsert) {
            delete this.record.upsert[this.name]
          }
        }
      }
    }
  },
  computed: {
    formMode () { return this.getOdooForm().click.event },
    recordValue () {
      // select widget:
      if (['many2one', 'selection'].includes(this.schema.type)) {
        return { label: this.record.data[0][this.name][1], value: this.record.data[0][this.name][0] }
      }
      if (this.schema.type === 'float' && !this.record.data[0][this.name]) {
        return ''
      }
      return this.record.data[0][this.name]
    },
    editing () { return ['create', 'edit'].includes(this.formMode) && !this.schema.readOnly },
    changed () {
      // q-select uses and object for the data which we must account for
      if (this.schema.type === 'selection' || this.schema.type === 'many2one') {
        return this.formValue.value !== this.recordValue.value
      } else {
        return this.formValue !== this.recordValue
      }
    }
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
        })
      } else if (this.schema.type === 'many2one') {
        // for 'many2one' the recordValue is already an object and we don't need to know the options
        // (formValue does not depend on the promise)
        this.formValue = this.recordValue
        OdooQUtils.fieldRelationOptions(this.schema.relation).then(r => { this.options = r })
      }
    }
  }
}
</script>
