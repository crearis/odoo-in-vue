<template>
  <q-table v-if="data.length"
           :title="title"
           :data="data"
           :columns="columns"
           :row-key="rowKey"
           form
  />
</template>

<script>

export default {
  components: {
  },
  props: {
    data: {
      type: Array
    },
    columns: {
      type: Array
    },
    title: {
      type: String
    },
    rowKey: {
      type: String,
      default: 'id'
    }
  },
  created () {
    this.columns.forEach((c, i) => {
      if (!c.format) {
        c.format = (val, row) => this.formatTableVal(val, row, parseInt(`${i}`))
      }
    })
  },
  methods: {
    /*
    We wrap the standard q-table with own so that we can handle Odoo specific formatting rules
     */
    formatTableVal (val, row, colIndex) {
      const colInfo = this.columns[parseInt(colIndex)]
      if (colInfo.type === 'many2one') {
        // future: I'll probably add someway to render a link to the related record
        return val[1]
      }
      if (colInfo.type === 'boolean') {
        // future: I'll probably change this to render an icon to represent true/false
        return val ? 'Y' : 'N'
      }
      if (colInfo.type !== 'boolean' && val === false) {
        return ''
      }
      return val
    }
  }
}
</script>
