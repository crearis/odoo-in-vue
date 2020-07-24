<template>
    <div>Field here</div>
</template>

<script>
export default {
  name: 'AutoField',
  props: {
    value: {},
    schema: { // field schema
      type: Object,
      required: true
    },
    readOnly: {
      type: Boolean,
      required: false
    }
  }
}
</script>
