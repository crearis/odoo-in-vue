<template>
  <q-table v-if="data.length"
           :title="title"
           :data="data"
           :columns="columns"
           :row-key="rowKey"
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
  }
}
</script>
