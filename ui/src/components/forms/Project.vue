<template>
  <div>
      Project Form content here
  </div>
</template>

<script>
export default {
  name: 'ProjectForm',
  data () {
    return {
      title: 'Project - Edit'
    }
  },
  mounted () {
    this.$emit('title', this.title)
  }
}
</script>
