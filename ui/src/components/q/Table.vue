<template>
  <div>
    <q-table
      v-if="data.length"
      :title="title"
      :data="data"
      :columns="columns"
      :row-key="rowKey"
    />
    <div v-else class="align-middle align-center q-pb-lg q-mb-lg">
      <q-btn color="primary">
        <q-icon left size="2em" name="find_in_page" />
        <div style="font-size: 0.75em">No data to show</div>
      </q-btn>
    </div>
  </div>
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
