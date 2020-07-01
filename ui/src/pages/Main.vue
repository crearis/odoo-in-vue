<template>
  <q-page class="flex flex-center">
    <List />
  </q-page>
</template>

<script>

import List from 'components/List.vue'

export default {
  name: 'PageMain',
  components: {
    List
  },
  data () {
    return {
      authorized: true,
      errorMessage: ''
    }
  },
  mounted () {

  }
}
</script>
