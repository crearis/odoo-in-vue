<template>
  <q-page class="flex flex-center">
    <List v-mo/>
  </q-page>
</template>

<script>

import List from 'components/List.vue'
import Server from '../mixins/Server'

export default {
  name: 'PageMain',
  components: {
    List
  },
  data () {
    return {
      authorized: true,
      errorMessage: '',
      projects: {}
    }
  },
  mounted () {
    Server.redirectIfNotAuthenticated()
    Server.Odoo.search_read(
      'project.project',
      ['id', 'name'],
      [],
      'name'
    ).then(r => {
      if (r.data.result.length) {
        this.projects = r.data.result
      }
    })
  }
}
</script>
