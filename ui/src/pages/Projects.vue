<template>
  <Table ref="tableProjects" title="Projects" @row-click="projectOpen" />
</template>

<script>
import Odoo from '../mixins/Odoo'
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
    Odoo.checkSession().then(r => {
      if (!r) {
        this.$router.push('/')
        return
      }
      this.$refs.tableProjects.isLoading = true
      Odoo.search_read(
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
    projectOpen: function (e, row) {
      this.$router.push('/projects/record/' + row.id)
    }
  }
}
</script>
