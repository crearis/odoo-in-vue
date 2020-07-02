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

    const projectFields = ['id', 'name', 'active', 'date_start']
    Server.fields2QTableColConfig('project.project', projectFields)
      .then(r => {
        if (r) {
          console.log('called Server.fields2QTableColConfig', r)
          this.projectsColumns = r
        }
      })
    Server.Odoo.search_read(
      'project.project',
      projectFields,
      [],
      'name'
    ).then(r => {
      if (r.data.result.length) {
        this.projects = r.data.result.records
        console.log(r.data.result)
      }
    })
  }
}
</script>
