<template>
  <q-calendar
    ref="calendar"
    enable-outside-days
    v-model="selectedDate"
    :view="viewMode"
    locale="en-us"
    :mini-mode="miniMode"
    :weekdays="[1, 2, 3, 4, 5, 6, 0]"
  >
    <!-- MONTH view template -->
    <template #day="{ timestamp }">
      <template v-for="(event, index) in getEventsByDate(timestamp.date)">
        <q-badge
          :key="index"
          style="width: 100%; cursor: pointer; height: 16px; max-height: 16px"
          class="q-event"
        >
          <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon>
          <span class="ellipsis">{{ event.title }}</span>
        </q-badge>
      </template>
    </template>

    <!-- WEEK / DAY view template -->
    <template #day-body="{ timestamp, timeStartPos, timeDurationHeight }">
      <template v-for="(event, index) in getEventsByDate(timestamp.date)">
        <q-badge
          :key="index"
          class="text-black"
          :class="weekViewBadgeClasses(event, 'body')"
          :style="weekViewBadgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
        >
          <span class="ellipsis" :data="event.time + '/' + event.duration">{{ event.title }}</span>
        </q-badge>
      </template>
    </template>

  </q-calendar>
</template>

<script>
import { QCalendar } from '@quasar/quasar-ui-qcalendar'

export default {
  components: {
    QCalendar
  },
  props: {
    viewMode: {
      type: String,
      default: 'week'
    },
    miniMode: {
      default: 'auto',
      required: false
    },
    events: {
      required: true
    }
  },
  data () {
    return {
      selectedDate: ''
    }
  },
  created () {
    const dt = new Date()
    this.selectedDate = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
  },
  methods: {
    getEventsByDate (matchDate) {
      const returns = []
      if (typeof this.events === 'object') {
        this.events.forEach(event => { if (event.date === matchDate) { returns.push(event) } })
      }
      return returns
    },
    weekViewBadgeClasses (event, type) {
      const isHeader = type === 'header'
      return {
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right',
        // 'full-width': !isHeader && (!event.side || event.side === 'full'),
        [`q-calendar-day-event-${this.viewMode}-mode`]: !isHeader,
        'q-calendar-day': !isHeader
      }
    },
    weekViewBadgeStyles (event, type, timeStartPos, timeDurationHeight) {
      const s = {}
      if (timeStartPos) {
        s.top = Math.round(timeStartPos(event.time)) + 'px'
      }
      if (timeDurationHeight) {
        s.height = Math.round(timeDurationHeight(event.duration)) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },
    move (amount = 0) {
      if (amount === 0) {
        const dt = new Date()
        this.selectedDate = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
      } else {
        this.$refs.calendar.move(amount)
      }
    },
    getSelectedDate () {
      const parts = this.selectedDate.split('-')
      const retval = new Date(parts[0], parts[1] - 1, parts[2])
      return retval
    }
  }
}
</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css" />
<style>
/*.calendar-container {*/
/*  position: relative*/
/*}*/

.q-calendar-day {
  opacity: 0.7;
  border: thin solid #1D1D1D;
}

.q-calendar-day:hover {
  opacity: 1;
  border: none;
  color: white!important;
  z-index: 9999999!important;
}
.q-calendar-day-event-week-mode:hover { width: 100%; }
.q-calendar-day-event-day-mode:hover { width: 50%; }

.q-calendar-day-event-week-mode {
  width: 50%;
  position: absolute;
  font-size: 12px;
}

.q-calendar-day-event-day-mode {
  width: 20%;
  position: absolute;
  font-size: 12px;
}

.full-width {
  left: 0;
  width: 100%
}

.left-side {
  left: 0;
  width: 49.75%
}

.right-side {
  left: 50.25%;
  width: 49.75%
}
</style>
