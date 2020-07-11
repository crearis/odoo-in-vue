<template>
  <Table v-if="tasks.length"
         title="All Tasks"
         v-bind:data="tasks"
         v-bind:columns="tasksColumns"
  />
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
          this.tasks = r.data
          this.tasksColumns = r.cc
        }
      })
    }
  }
}
</script>
