<template>
  <div>
    <q-badge @click.stop.prevent="test" label="Test"/>
  </div>
</template>

<script>
export default {
  name: 'ProjectForm',
  data () {
    return {
      data: {}
    }
  },
  methods: {
    test () {
      console.log('test OK')
    }
  }
}
</script>
