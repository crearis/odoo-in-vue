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
        <q-btn flat icon="arrow_left" @click="moveCalendar(-1)"/>
        <q-separator vertical />
        <q-btn flat  @click="moveCalendar(0)">Today</q-btn>
        <q-separator vertical />
        <q-btn flat icon="arrow_right"  @click="moveCalendar(1)"/>
      </q-btn-group>
    </q-card-actions>

    <q-card-section>
      <div v-if="viewMode !== 'list'">future</div>
    </q-card-section>

    <q-card-section>
      <Calendar
        ref="calendar"
        v-if="viewMode !== 'list'"
        v-bind:viewMode="viewMode"
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
    moveCalendar (change) {
      this.$refs.calendar.move(change)
      this.setCalendarData()
    },
    setCalendarData (mode = this.viewMode) {
      const parts = this.$refs.calendar.selectedDate.split('-')
      const d = new Date(parts[0], parts[1] - 1, parts[2])
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
    }
  }
}
</script>
