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
        <div v-if="viewMode !== 'list'">{{ getDisplayDate() }}</div>
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
  methods: {
    onEventClick (e) {
      this.$router.push('/tasks/record/' + e.res_id + '?returnTo=/calendar')
    },

    changeViewMode (mode) {
      // console.log(`pages/calendar.changeView(${mode})`)
      this.viewMode = mode
      if (mode === 'list') {
        this.setListData()
      } else {
        this.setCalendarData(mode)
      }
    },

    moveCalendar (change) {
      console.log("move calendar: " + change)
      this.$refs.calendar.move(change)
      this.setCalendarData()
    },

    setCalendarData (mode = this.viewMode) {
      const d = this.$refs.calendar ? this.$refs.calendar.getSelectedDate() : new Date()
      let sow = d // start of week
      switch (mode) {
        case 'month':
          this.calendarDataStart = date.startOfDate(d, 'month')
          this.calendarDataEnd = date.endOfDate(d, 'month')
          break
        case 'day':
          this.calendarDataStart = d
          this.calendarDataEnd = d // todo: add the hours to make this the end of the day (?)
          break
        case 'week':
          sow = date.subtractFromDate(d, { days: date.getDayOfWeek(d) - 1 })
          sow = new Date(sow.getFullYear(), sow.getMonth(), sow.getDate())
          this.calendarDataStart = sow
          this.calendarDataEnd = date.addToDate(sow, { days: 6 })
          break
      }
      Odoo.getTaskEventData(
        this.calendarDataStart,
        this.calendarDataEnd
      ).then(r => {
        console.log('calendar data range: ' + this.calendarDataStart + ' - ' + this.calendarDataEnd)
        this.calendarData = r
      })
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

    getDisplayDate () {
      try {
        return date.formatDate(this.$refs.calendar.getSelectedDate(), 'MMMM YYYY')
      } catch {
        return ''
      }
    },

    taskOpen (e, row) {
      this.$router.push('/tasks/record/' + row.id)
    }
  }
}
</script>
