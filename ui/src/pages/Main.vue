<template>
  <QTable v-bind:data="projects" v-bind:title="Projects"/>
</template>

<script>

import QTable from 'components/sub/QTable.vue'
import Server from '../mixins/Server'

export default {
  name: 'PageMain',
  components: {
    QTable
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
        this.projects = r.data.result.records
      }
    })
  }
}
</script>
