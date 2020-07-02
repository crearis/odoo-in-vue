<template>
  <q-table v-if="projects.length"
    title="Projects"
    :data="projects"
    :columns="projectsColumns"
    row-key="id"
  />
</template>

<script>
import Server from '../mixins/Server'

export default {
  name: 'PageMain',
  components: {
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
      ['id', 'name', 'date_start', 'active']
    ).then(r => {
      if (r.data.length) {
        this.projects = r.data
        this.projectsColumns = r.cc
      }
    })
  }
}
</script>
