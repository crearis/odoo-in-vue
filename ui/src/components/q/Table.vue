<template>
  <div>
    <q-table
      :title="title"
      :data="data"
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
  components: {
  },
  props: {
    title: {
      type: String
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
      this.data = this.initData.data
      this.columns = this.initData.cc
    }
  },
  data () {
    return {
      isLoading: false,
      data: [],
      columns: []
    }
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
    },
    setData (data, columns = false) {
      this.data = data
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
