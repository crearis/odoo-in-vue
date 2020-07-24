<template>
  <div>
      Task Form content here
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  data () {
    return {
      title: 'Task - Edit'
    }
  },
  mounted () {
    this.$emit('title', this.title)
  }
}
</script>
