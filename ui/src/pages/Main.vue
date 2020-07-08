<template>
    <q-card>
      <q-card-section>
        <div class="row text-center">
          <div class="q-pa-sm q-pr-sm q-gutter-md"
               style="min-width: 400px; max-width: 500px; overflow: hidden;">
            <div class="my-title">My Projects</div>
            <Table
              v-if="projects.length"
              v-bind:data="projects"
              v-bind:columns="projectsColumns"
            />
          </div>
          <div class="q-pa-sm q-gutter-md"
               style="min-width: 400px; max-width: 500px; overflow: hidden;">
            <div class="my-title">My Events</div>
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
            <Table
              v-if="tasks.length"
              v-bind:data="tasks"
              v-bind:columns="tasksColumns"
              ></Table>
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
import Server from '../mixins/Server'
import Table from 'components/q/Table.vue'
import Calendar from 'components/q/Calendar.vue'
import { store } from '../store'
import Utilities from '../mixins/Utilities'


export default {
  name: 'PageMain',
  components: {
    Table,
    Calendar
  },
  data () {
    return {
      errorMessage: '',
      projects: {},
      projectsColumns: [],
      calendarData: [],
      calendarDataStart: false,
      calendarDataEnd: false,
      tasks: [],
      tasksColumns: []
    }
  },
  mounted () {
    Server.redirectIfNotAuthenticated()
      .then(r => {
        this.setProjectData()
        this.setCalendarData()
        this.setTaskData()
      })
  },
  methods: {
    setProjectData () {
      Server.search_read(
        'project.project',
        [
          ['user_id', '=', store.state.session.profile.uid],
          ['active', '=', true]
        ],
        ['id', 'name', 'date_start'],
        'date_start, name'
      ).then(r => {
        if (r.data.length) {
          this.projects = r.data
          this.projectsColumns = r.cc
        }
      })
    },
    setCalendarData () {
      this.calendarDataStart = Utilities.Date.currentMonthFirstDay()
      this.calendarDataEnd = Utilities.Date.currentMonthLastDay()
      Server.getCalendarEventsData(
        this.calendarDataStart,
        this.calendarDataEnd,
        store.state.session.profile.uid
      ).then(r => {
        this.calendarData = r
      })
    },
    setTaskData () {
      Server.search_read(
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
          this.tasks = r.data
          this.tasksColumns = r.cc
        }
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
