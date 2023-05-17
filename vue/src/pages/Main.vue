<template>
    <q-card>
      <q-card-section>
        <div class="row text-center">

          <div class="q-pa-sm q-pr-sm q-gutter-md"
               style="min-width: 400px; max-width: 500px; overflow: hidden;">
            <div class="my-title">My Projects</div>
            <Table ref="tableMyProjects" />
          </div>

          <div class="q-pa-sm q-gutter-md"
               style="min-width: 400px; max-width: 500px; overflow: hidden;">
            <div class="my-title">My Deadlines</div>
            <Calendar
              viewMode="month"
              v-bind:events="calendarData"
              v-bind:selectedDate="new Date()"
              v-bind:miniMode="true"
            >
              <template></template>
            </Calendar>
          </div>

        </div>
      </q-card-section>

      <q-card-section>
        <div>
            <div class="q-mb-sm my-title">My Tasks</div>
            <Table ref="tableMyTasks" ></Table>
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
import Odoo from '../mixins/Odoo'
import Table from 'components/q/Table.vue'
import Calendar from 'components/q/Calendar.vue'
import { store } from '../store'
import { date } from 'quasar'


export default {
  name: 'PageMain',
  components: {
    Table,
    Calendar
  },
  data () {
    return {
      errorMessage: '',
      projects: [],
      projectsColumns: [],
      calendarData: [],
      calendarDataStart: false,
      calendarDataEnd: false,
      tasks: [],
      tasksColumns: []
    }
  },
  mounted () {
    Odoo.checkSession().then(r => {
      if (!r) {
        this.$router.push('/')
        return
      }
      this.setProjectData()
      this.setCalendarData()
      this.setTaskData()
    })
  },
  methods: {
    setProjectData () {
      this.$refs.tableMyProjects.isLoading = true
      Odoo.search_read(
        'project.project',
        [
          ['user_id', '=', store.state.session.profile.uid],
          ['active', '=', true]
        ],
        ['id', 'name', 'date_start'],
        'date_start, name'
      ).then(r => {
        if (r.data.length) {
          this.$refs.tableMyProjects.setData(r.data, r.cc)
        }
        this.$refs.tableMyProjects.isLoading = false
      }).catch(e => {
        console.log(e) // todo
        this.$refs.tableMyProjects.isLoading = false
      })
    },
    setCalendarData () {
      const d = new Date()
      this.calendarDataStart = date.startOfDate(d, 'month')
      this.calendarDataEnd = date.endOfDate(d, 'month')
      Odoo.getTaskEventData(
        this.calendarDataStart,
        this.calendarDataEnd,
        store.state.session.profile.uid
      ).then(r => {
        this.calendarData = r
      })
    },
    setTaskData () {
      this.$refs.tableMyTasks.isLoading = true
      Odoo.search_read(
        'project.task',
        [
          ['user_id', '=', store.state.session.profile.uid],
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
          this.$refs.tableMyTasks.setData(r.data, r.cc)
        }
        this.$refs.tableMyTasks.isLoading = false
      })
    }
  }
}
</script>
<style>
.my-title {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
