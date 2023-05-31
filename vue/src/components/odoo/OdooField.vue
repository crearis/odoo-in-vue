<template>
  <div class="flex row q-mb-sm" v-if="schema !== false">
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
    <q-input v-if="schema.type === 'date'" outlined dense v-model="formValue" mask="date" :disable="!editing"
             :rules="schema.required || [] ? ['date'] : ''" :readonly="!editing || schema.readonly">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="formValue" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <!-- time -->
    <q-input v-if="widget === 'float_time'" outlined dense v-model="formValue" mask="time" :disable="!editing"
             :rules="schema.required || [] ? ['time'] : ''" :readonly="!editing || schema.readonly">
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
      schema: false
    }
  },
  // watch: {
  //   formValue () { console.log('field `', this.name, '` set to', this.formValue) }
  // },
  computed: {
    formMode () { return this.getOdooForm().click.event },
    editing () { return ['create', 'edit'].includes(this.formMode) && !this.schema.readOnly },
    changed () { return this.formValue === this.rawValue },
    // float2Time () {},
  },
  created () {
    let record = this.getOdooForm().record
    this.formValue = this.rawValue = record.data[0][this.name]
    this.schema = record.cc.filter(f => { return f.name === this.name })[0] // cc == column config
    // adjust formValue for special fields according to field type
    if (['many2one', 'selection'].includes(this.schema.type)) {
      this.setQSelectionData()
    } else if (this.schema.type === 'float' && !this.rawValue) {
      this.rawValue = this.formValue = 0
    } else if (this.schema.type === 'char' && this.rawValue === false) {
      this.rawValue = this.formValue = ''
    }
    console.log("field", this.name)
    console.log("schema", JSON.stringify(this.schema))
    console.log("formValue", JSON.stringify(this.formValue))
    console.log("rawValue", JSON.stringify(this.rawValue))
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
          // For 'selection' Odoo gives data as a primitive value. It MUST be changed to an array like a 'many2one' field
          // That way, we have just one paradigm here to handle both in the same type of component
          // The promise MUST resolve first, then we can set this.rawValue and recordValue works right
          r.forEach(i => {
            if (i.value === this.rawValue) { // (this.rawValue gives the record value)
              this.rawValue = [i.value, i.label] // here we make it resembles a many2one value
              this.formValue = this.rawValue[1] // now we can set the formValue
            }
          })
        })
      } else if (this.schema.type === 'many2one') {
        // for 'many2one' the recordValue is already an object and we don't need to know the options
        // (formValue does not depend on the promise)
        this.formValue = this.rawValue[1]
        OdooQUtils.fieldRelationOptions(this.schema.relation).then(r => { this.options = r })
      }
    }
  }
}
</script>
