<template>
  <Table ref="tableTasks" title="All Tasks" @row-click="taskOpen"/>
</template>

<script>
import Odoo from '../mixins/Odoo'
import Table from 'components/q/Table.vue'

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
    Odoo.checkSession().then(r => {
      if (!r) {
        this.$router.push('/')
        return
      }
      this.setTaskData()
    })
  },
  methods: {
    setTaskData () {
      this.$refs.tableTasks.isLoading = true
      Odoo.search_read(
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
    },
    taskOpen (e, row) {
      this.$router.push('/tasks/record/' + row.id)
    }
  }
}
</script>
