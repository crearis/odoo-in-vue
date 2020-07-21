<template>
  <Table ref="tableTasks" title="All Tasks" />
</template>

<script>
import Server from '../mixins/Server'
import Table from 'components/q/Table.vue'
// import { store } from '../store'

export default {
  name: 'PageTasks',
  components: {
    Table
  },
  data () {
    return {
      errorMessage: '',
      tasks: {},
      tasksColumns: []
    }
  },
  mounted () {
    Server.redirectIfNotAuthenticated()
      .then(r => {
        this.setTaskData()
      })
  },
  methods: {
    setTaskData () {
      this.$refs.tableTasks.isLoading = true
      Server.search_read(
        'project.task',
        [
          ['stage_id', '=', 5]
        ],
        [
          'name',
          'project_id',
          'date_deadline',
          'stage_id'
        ],
        'date_deadline'
      ).then(r => {
        if (r.data.length) {
          this.$refs.tableTasks.setData(r.data, r.cc)
          this.$refs.tableTasks.isLoading = false
        }
      })
    }
  }
}
</script>
