<template>
  <Table ref="tableProjects" title="Projects" @row-dblclick="projectOpen" />
</template>

<script>
import Server from '../mixins/Server'
import Table from 'components/q/Table.vue'

export default {
  name: 'PageProjects',
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
        this.$refs.tableProjects.isLoading = true
        Server.search_read(
          'project.project',
          [], // 'user', '=', store.state.session.profile.uid
          ['id', 'name', 'partner_id', 'date_start', 'active']
        ).then(r => {
          if (r.data.length) {
            this.$refs.tableProjects.setData(r.data, r.cc)
          }
          this.$refs.tableProjects.isLoading = false
        })
      })
  },
  methods: {
    projectOpen: function (e) {
      this.$router.push('/projects/record/' + e.row.id)
    }
  }
}
</script>
