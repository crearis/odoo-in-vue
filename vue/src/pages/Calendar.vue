<template>
  <q-card>

    <q-card-actions>
      <q-btn-group>
        <q-btn stretch flat @click="changeViewMode('day')">Day</q-btn>
        <q-separator vertical />
        <q-btn stretch flat @click="changeViewMode('week')">Week</q-btn>
        <q-separator vertical />
        <q-btn stretch flat @click="changeViewMode('month')">Month</q-btn>
        <q-separator vertical />
        <q-btn stretch flat @click="changeViewMode('list')">List</q-btn>
      </q-btn-group>
      <q-space />
      <q-banner>
        <div v-if="viewMode == 'week'">{{ this.displayDate }}</div>
      </q-banner>
      <q-space />
      <q-btn-group v-if="viewMode !== 'list'">
        <q-btn flat icon="arrow_left" @click="moveCalendar(-1)"/>
        <q-separator vertical />
        <q-btn flat  @click="moveCalendar(0)">Today</q-btn>
        <q-separator vertical />
        <q-btn flat icon="arrow_right"  @click="moveCalendar(1)"/>
      </q-btn-group>
    </q-card-actions>

    <q-card-section class="q-pa-none q-card--bordered">
      <QCalendar
        ref="calendar"
        v-if="viewMode !== 'list'"
        v-bind:viewMode="viewMode"
        v-bind:events="calendarData"
        @event-click="onEventClick"
        @change="setCalendarData"
        />
    </q-card-section>

    <QTable
      v-if="viewMode === 'list'"
      ref="table"
      title="All Events"
      @row-click="taskOpen"
    />
  </q-card>
</template>

<script>
import Odoo from '../mixins/Odoo'
import QTable from 'components/extended/QTable.vue'
import QCalendar from 'components/extended/QCalendar.vue'
import { date } from 'quasar'


export default {
  name: 'PageCalendar',
  components: {
    QTable,
    QCalendar
  },
  data () {
    return {
      errorMessage: '',
      viewMode: 'month',
      calendarData: [],
      calendarDataStart: null,
      calendarDataEnd: null,
    }
  },
  mounted () {
    Odoo.checkSession().then(r => {
      if (!r) {
        this.$router.push('/')
        return
      }
      this.changeViewMode('month')
    })
  },
  computed: {
    displayDate() {
      return date.formatDate(this.calendarDataStart, 'YYYY-MM-DD') + ' to ' +
            date.formatDate(this.calendarDataEnd, 'YYYY-MM-DD')
    }
  },
  methods: {
    onEventClick (e) {
      this.$router.push('/tasks/record/' + e.res_id + '?returnTo=/calendar')
    },

    changeViewMode (mode) {
      this.viewMode = mode
      if (mode === 'list') {
        this.setListData()
      } else {
        this.setCalendarData()
      }
    },

    moveCalendar (change) {
      this.$refs.calendar.move(change)
    },

    setCalendarData (range) {
      if (range) {
        let start = date.extractDate(range.start, 'YYYY-MM-DD')
        let end = date.extractDate(range.end, 'YYYY-MM-DD')
        if (this.calendarDataStart != start && this.calendarDataEnd != end) {
          this.calendarDataStart = start
          this.calendarDataEnd = end
          Odoo.getTaskEventData(start, end).then(r => {
            this.calendarData = r
            if (this.calendarData.length) {
              this.calendarData.forEach(function(i) {
                i.date = date.extractDate(i.date, "YYYY-MM-DD")
                // bug fix for backend time format issue (minutes only might only have 1 number)
                if (i.time) {
                  if (i.time.split(":")[1].length < 2) { i.time = i.time + "0" }
                }
              }) // end bug fix
            }
          })
        }
      }
    },

    setListData () {
      Odoo.search_read(
        'project.task',
        [],
        ['id', 'name', 'project_id', 'user_id', 'stage_id'],
        'date_deadline'
      ).then(r => {
        if (r.data.length) {
          this.$refs.table.setData(r.data, r.cc)
        }
      })
    },

    taskOpen (e, row) {
      this.$router.push('/tasks/record/' + row.id)
    }
  }
}
</script>
