<template>
  <q-card>

    <q-card-actions>
      <q-btn-group>
        <q-btn stretch flat @click="changeView('day')">Day</q-btn>
        <q-separator vertical />
        <q-btn stretch flat @click="changeView('week')">Week</q-btn>
        <q-separator vertical />
        <q-btn stretch flat @click="changeView('month')">Month</q-btn>
        <q-separator vertical />
        <q-btn stretch flat @click="changeView('list')">List</q-btn>
      </q-btn-group>
      <q-space />
      <q-btn-group v-if="!viewList">
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
        v-if="calendarData && !viewList"
        v-bind:viewMode="calendarViewMode"
        v-bind:selectedDate="calendarSelectedDate"
        />
      <template #day v-if="calendarViewMode === 'month'">
        <template v-for="(calendarEvent, calendarEventIndex) in calendarData">
          <q-badge
            :key="calendarEventIndex"
            style="width: 100%; cursor: pointer; height: 16px; max-height: 16px"
            class="q-event"
          >
            <span class="ellipsis">{{ calendarEvent.title }}</span>
          </q-badge>
        </template>

      </template>
    </q-card-section>

    <Table
      v-if="listData.length && viewList"
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
      listData: {},
      listDataColumns: [],
      calendarSelectedDate: '',
      calendarViewMode: 'month',
      viewList: false,
      calendarData: false,
      calendarDataStart: null,
      calendarDataEnd: null
    }
  },
  mounted () {
    Server.redirectIfNotAuthenticated()
      .then(r => {
        // list data
        Server.search_read(
          'calendar.event',
          [], // 'user', '=', store.state.session.profile.uid
          ['name', 'start', 'stop', 'partner_ids', 'location', 'duration']
        ).then(r => {
          if (r.data.length) {
            this.listData = r.data
            this.listDataColumns = r.cc
          }
        })
      })
    this.changeView('month')
  },
  methods: {
    changeView (mode) {
      this.viewList = mode === 'list'
      if (mode !== 'list') {
        this.calendarViewMode = mode
        this.getCalendarData(mode)
      } else {
        console.log('viewing all listed events')
      }
    },
    getCalendarData (mode) {
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
        this.calendarDataEnd,
        store.state.session.profile.uid
      ).then(r => {
        this.calendarData = r
      })
    }
  }
}
</script>
