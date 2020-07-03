<template>
  <Table v-if="projects.length"
         title="My Projects"
         v-bind:data="projects"
         v-bind:columns="projectsColumns"
  />
</template>

<script>
import Server from '../mixins/Server'
import Table from 'components/q/Table.vue'
import { store } from '../store'


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
      .then(r => {
        console.log('uid', store.state.session.profile.uid)
        Server.search_read_with_CC(
          'project.project',
          [], // 'user', '=', store.state.session.profile.uid
          ['id', 'name', 'partner_id', 'date_start', 'active']
        ).then(r => {
          if (r.data.length) {
            this.projects = r.data
            this.projectsColumns = r.cc
          }
        })
      })
  }
}
</script>
