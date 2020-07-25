<template>
  <div class="flex row q-mb-sm" v-if="record !== false">
    <!-- field label -->
    <q-badge :label="getLabel()+':'" color="white" text-color="black" style="min-width: 150px">
      <q-tooltip>{{schema.help}}</q-tooltip>
    </q-badge>

    <!-- char field -->
    <div v-if="!editMode && schema.type === 'char'" class="data">
      {{record.data[0][name]}}
    </div>

    <!-- selection field -->
    <div v-if="!editMode && schema.type === 'selection'" class="data">
      {{record.data[0][name]}}
    </div>

    <!-- many2one field -->
    <div v-if="!editMode && schema.type === 'many2one'" class="data">
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
    readOnly: {
      type: Boolean,
      required: false
    },
    record: {
      type: [Boolean, Object],
      required: false,
      default: false
    },
    editMode: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      schema: false
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
      console.log('schema for', this.name, this.schema)
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
