<template>
  <div>
    <q-table
      :title="title"
      :rows="rows"
      :columns="columns"
      :row-key="rowKey"
      :loading="isLoading"
      :no-data-label="'No data to show.'"
      @row-click="rowClick"
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
    This method takes the rows for the table and the config of columns at the same time
     */
    setData (rows, columns = []) {
      this.rows = rows
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
