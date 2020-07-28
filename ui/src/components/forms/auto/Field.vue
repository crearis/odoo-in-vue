<template>
  <div class="flex row q-mb-sm" v-if="record !== false">
    <!-- field label -->
    <q-badge :label="getLabel()+':'" color="white" text-color="black" style="min-width: 150px">
      <q-tooltip>{{schema.help}}</q-tooltip>
    </q-badge>

    <!-- char field -->
    <q-input v-if="schema.type === 'char'" class="data" outlined dense
             v-model="record.data[0][name]" :readonly="!editing"
    />

    <!-- selection field -->
    <div v-if="!editing && schema.type === 'selection'" class="data">
      {{record.data[0][name]}}
    </div>

    <!-- many2one field -->
    <div v-if="!editing && schema.type === 'many2one'" class="data">
      {{record.data[0][name][1]}}
    </div>

  </div>
</template>

<script>
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
      console.log('mode change:', this.mode)
      this.editing = this.mode === 'create' || this.mode === 'edit'
    }
  },
  data () {
    return {
      schema: false,
      editing: false
    }
  },
  methods: {
    setSchema () {
      // get the details for this field based on its name
      for (let i = 0; i < this.record.cc.length; ++i) {
        if (this.record.cc[i].name === this.name) {
          this.schema = this.record.cc[i]
          break
        }
      }
      // console.log('schema for', this.name, this.schema)
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
