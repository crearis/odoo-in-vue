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
      <q-btn-group v-if="viewMode !== 'list'">
        <q-btn flat icon="arrow_left" @click="changeViewSelectedDate('prev')"/>
        <q-separator vertical />
        <q-btn flat  @click="changeViewSelectedDate('today')">Today</q-btn>
        <q-separator vertical />
        <q-btn flat icon="arrow_right"  @click="changeViewSelectedDate('next')"/>
      </q-btn-group>
    </q-card-actions>

    <q-card-section>
      <div v-if="viewMode !== 'list'">{{ getDisplayDate() }}</div>
    </q-card-section>

    <q-card-section>
      <Calendar
        v-if="viewMode !== 'list'"
        v-bind:viewMode="viewMode"
        v-bind:selectedDate="calendarSelectedDate"
        v-bind:events="calendarData"
        />
    </q-card-section>

    <Table
      v-if="listData.length && viewMode === 'list'"
      title="All Events"
      v-bind:data="listData"
      v-bind:columns="listDataColumns"
    />
  </q-card>
</template>

<script>
import Server from '../mixins/Server'
import Table from 'components/q/Table.vue'
import Calendar from 'components/q/Calendar.vue'
import { date } from 'quasar'


export default {
  name: 'PageCalendar',
  components: {
    Table,
    Calendar
  },
  data () {
    return {
      errorMessage: '',
      viewMode: 'month',
      calendarData: [],
      listData: [],
      listDataColumns: [],
      calendarSelectedDate: new Date(),
      calendarDataStart: null,
      calendarDataEnd: null
    }
  },
  mounted () {
    this.changeViewMode('month')
  },
  methods: {
    changeViewMode (mode) {
      console.log(`pages/calendar.changeView(${mode})`)
      this.viewMode = mode
      if (mode === 'list') {
        this.setListData()
      } else {
        this.setCalendarData(mode)
      }
    },
    changeViewSelectedDate (change) {
      if (change === 'today') {
        this.calendarSelectedDate = new Date()
      } else {
        this.calendarSelectedDate = Calendar.getPrevOrNext(
          this.calendarSelectedDate,
          this.viewMode,
          change === 'next'
        )
      }
      this.setCalendarData(this.viewMode)
    },
    setCalendarData (mode) {
      const d = this.calendarSelectedDate
      let sow = d // start of week
      switch (mode) {
        case 'month':
          this.calendarDataStart = date.startOfDate(d, 'month')
          this.calendarDataEnd = date.endOfDate(d, 'month')
          break
        case 'day':
          this.calendarDataStart = d
          this.calendarDataEnd = d
          break
        case 'week':
          sow = date.subtractFromDate(d, { days: date.getDayOfWeek(d) - 1 })
          sow = new Date(sow.getFullYear(), sow.getMonth(), sow.getDate())
          this.calendarDataStart = sow
          this.calendarDataEnd = date.addToDate(sow, { days: 6 })
          break
      }
      Calendar.selectedDate = this.calendarSelectedDate
      Server.getCalendarEventsData(
        this.calendarDataStart,
        this.calendarDataEnd
      ).then(r => {
        this.calendarData = r
      })
    },
    setListData () {
      Server.redirectIfNotAuthenticated()
        .then(r => {
          Server.search_read(
            'calendar.event',
            [],
            ['name', 'display_start', 'user_id', 'location', 'duration'],
            'start'
          ).then(r => {
            if (r.data.length) {
              this.listData = r.data
              this.listDataColumns = r.cc
            }
          })
        })
    },
    getDisplayDate () {
      if (this.viewMode === 'list') { return '' }
      if (this.viewMode === 'day') { return date.formatDate(this.calendarSelectedDate, 'D MMMM YYYY') }
      if (this.viewMode === 'month') { return date.formatDate(this.calendarSelectedDate, 'MMMM YYYY') }
      return (
        date.formatDate(this.calendarDataStart, 'MMMM YYYY') +
        ', ' +
        date.formatDate(this.calendarDataStart, 'D') + ' to ' + date.formatDate(this.calendarDataEnd, 'D')
      )
    }
  }
}
</script>
