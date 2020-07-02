<template>
  <q-table
    :title="title"
    :data="data"
    :columns="columns"
    :row-key="rowKey"
  />
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    rowKey: {
      type: String,
      required: false,
      default: 'id'
    },
    columns: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      working: false
    }
  }
}
</script>
