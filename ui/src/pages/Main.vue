<template>
  <Table v-if="projects.length"
         title="Projects"
         v-bind:data="projects"
         v-bind:columns="projectsColumns"
  />
</template>

<script>
import Server from '../mixins/Server'
import Table from 'components/q/Table.vue'

export default {
  name: 'PageMain',
  components: {
    Table
  },
  data () {
    return {
      errorMessage: '',
      projects: {},
      projectsColumns: []
    }
  },
  mounted () {
    Server.redirectIfNotAuthenticated()
    Server.search_read_with_CC(
      'project.project',
      ['id', 'name', 'partner_id', 'date_start', 'active']
    ).then(r => {
      if (r.data.length) {
        this.projects = r.data
        this.projectsColumns = r.cc
      }
    })
  }
}
</script>
