<template>
  <div>
    <q-table
      :title="title"
      :row-key="rowKey"
      :rows="rows"
      :columns="columns"
    />
  </div>
</template>

<script>



export default {
  props: {
    title: {
      type: String,
      default: "Table"
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    initData: {
      type: [Boolean, Object],
      default: false
    }
  },

  mounted () {
    if (this.initData) {
      this.rows = this.initData.data
      this.columns = this.initData.cc
    }
  },

  data () {
    return {
      isLoading: false,
      rows: [],
      columns: []
    }
  },

  methods: {
    /*
    We extend the standard q-table so that we can handle Odoo specific formatting rules
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
    },

    /*
    This method takes the data for the table and the configuration of columns at the same time
     */
    setData (data, columns = []) {
      this.rows = data
      if (columns) {
        this.columns = columns
        this.columns.forEach((c, i) => {
          if (!c.format) {
            c.format = (val, row) => this.formatTableVal(val, row, parseInt(`${i}`))
          }
        })
      }
    },

    rowClick (evt, row) {
      this.$emit('row-click', evt, row)
    }
  }
}
</script>
