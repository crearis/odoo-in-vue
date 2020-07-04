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
        v-if="data.length && !viewList"
        v-bind:data="data"
        v-bind:viewMode="calendarViewMode"
        v-bind:selectedDate="calendarSelectedDate"
        />
    </q-card-section>

    <Table
      v-if="data.length && viewList"
      title="All Events"
      v-bind:data="data"
      v-bind:columns="dataColumns"
    />
  </q-card>
</template>

<script>
import Server from '../mixins/Server'
import Table from 'components/q/Table.vue'
import Calendar from 'components/q/Calendar.vue'

export default {
  name: 'PageCalendar',
  components: {
    Table,
    Calendar
  },
  data () {
    return {
      errorMessage: '',
      data: {},
      dataColumns: [],
      calendarSelectedDate: '',
      calendarViewMode: 'month',
      viewList: false
    }
  },
  mounted () {
    Server.redirectIfNotAuthenticated()
      .then(r => {
        Server.search_read(
          'calendar.event',
          [], // 'user', '=', store.state.session.profile.uid
          ['name', 'start', 'stop', 'partner_ids', 'location', 'duration']
        ).then(r => {
          if (r.data.length) {
            this.data = r.data
            this.dataColumns = r.cc
          }
        })
      })
  },
  methods: {
    changeView (mode) {
      this.viewList = mode === 'list'
      if (mode !== 'list') {
        this.calendarViewMode = mode
      }
      switch (mode) {
        case 'list':
          console.log('load all events')
          break
        case 'day':
          console.log('load day events')
          break
        case 'week':
          console.log('load week events')
          break
        case 'month':
          console.log('load month events')
          break
      }
    }
  }
}
</script>
