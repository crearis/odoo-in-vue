<template>
    <q-card>
      <q-card-section>
        <div class="row text-center">

          <div class="q-pa-sm q-pr-sm q-gutter-md" style="min-width: 400px; max-width: 500px; overflow: hidden;">
            <QTable ref="tableMyProjects" title="My Projects" />
          </div>

          <div class="q-pa-sm q-gutter-md" style="min-width: 400px; max-width: 500px; overflow: hidden;">
            <div class="my-title">Agenda for Today</div>
            <QCalendar
              viewMode="day"
              v-bind:events="calendarData"
              v-bind:selectedDate="new Date()"
            >
            </QCalendar>
          </div>

        </div>
      </q-card-section>

      <q-card-section>
        <div>
            <QTable ref="tableMyTasks" title="My Tasks" />
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
import Odoo from '../mixins/Odoo'
import {useSessionStore} from "stores/sessions";
import QTable from 'components/extended/QTable.vue'
import QCalendar from 'components/extended/QCalendar.vue'
import { date } from 'quasar'

const session = useSessionStore()

export default {
  name: 'PageMain',
  components: {
    QTable,
    QCalendar
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
      this.setTaskData()
      // this.setCalendarData()
    })
  },
  methods: {

    setProjectData () {
      this.$refs.tableMyProjects.isLoading = true
      Odoo.search_read(
        'project.project',
        [
          ['user_id', '=', session.profile.uid],
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


    setTaskData () {
      this.$refs.tableMyTasks.isLoading = true
      Odoo.search_read(
        'project.task',
        [
          ['user_id', '=', session.profile.uid]
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
    },


    setCalendarData () {
      const d = new Date()
      this.calendarDataStart = date.startOfDate(d, 'month')
      this.calendarDataEnd = date.endOfDate(d, 'month')
      Odoo.getTaskEventData(
        this.calendarDataStart,
        this.calendarDataEnd,
        session.profile.uid
      ).then(r => {
        this.calendarData = r
      })
    },


  }
}
</script>

<style>
.my-title {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
