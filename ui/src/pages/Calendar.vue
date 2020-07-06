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
      <q-btn-group v-if="!viewMode">
        <q-btn flat icon="arrow_left" />
        <q-separator vertical />
        <q-btn flat>Today</q-btn>
        <q-separator vertical />
        <q-btn flat icon="arrow_right" />
      </q-btn-group>
    </q-card-actions>

    <q-separator spaced />

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
import Utilities from '../mixins/Utilities'
import Table from 'components/q/Table.vue'
import Calendar from 'components/q/Calendar.vue'
import { store } from '../store'


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
    setCalendarData (mode) {
      switch (mode) {
        case 'month':
          this.calendarDataStart = Utilities.Date.currentMonthFirstDay()
          this.calendarDataEnd = Utilities.Date.currentMonthLastDay()
          break
        case 'day':
          this.calendarDataStart = Utilities.Date.currentMonthFirstDay()
          this.calendarDataEnd = Utilities.Date.currentMonthLastDay()
          break
        case 'week':
          this.calendarDataStart = Utilities.Date.currentMonthFirstDay()
          this.calendarDataEnd = Utilities.Date.currentMonthLastDay()
          break
      }
      Server.getCalendarEventsData(
        this.calendarDataStart,
        this.calendarDataEnd
        // store.state.session.profile.uid
      ).then(r => {
        this.calendarData = r
      })
    },
    setListData () {
      Server.redirectIfNotAuthenticated()
        .then(r => {
          Server.search_read(
            'calendar.event',
            [['user_id', '=', store.state.session.profile.uid]],
            ['name', 'start', 'stop', 'location', 'duration']
          ).then(r => {
            if (r.data.length) {
              this.listData = r.data
              this.listDataColumns = r.cc
            }
          })
        })
    }
  }
}
</script>
