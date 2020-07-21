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
          v-if="!event.allday"
          :key="index"
          class="text-black"
          multi-line
          :class="weekViewBadgeClasses(event, 'body')"
          :style="weekViewBadgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
        >
          <span class="ellipsis">
              {{ event.title }}
          </span>
        </q-badge>
      </template>
    </template>

    <!-- header view template -->
    <template #day-header="{ timestamp }">
      <div class="row justify-center">
        <template v-for="(event, index) in eventsMap[timestamp.date]">
          <q-badge
            multi-line
            v-if="event.allday"
            :key="index"
            :style="weekViewBadgeStyles(event, 'header')"
            class="q-pa-xs q-mb-xs q-calendar-header"
          >
            <span class="">{{ event.title }}</span>
          </q-badge>
        </template>
      </div>
    </template>

  </q-calendar>
</template>

<script>
import { QCalendar } from '@quasar/quasar-ui-qcalendar'
import Utilities from '../../mixins/Utilities'

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
  computed: {
    eventsMap () {
      const map = {}
      this.events.forEach((event) => (map[event.date] = map[event.date] || []).push(event))
      return map
    }
  },
  methods: {
    getEventsByDate (matchDate) {
      const returns = []
      const overlaps = []
      let counter = 0
      if (typeof this.events === 'object') {
        this.events.forEach(event => {
          if (event.date === matchDate) {
            event.number = counter++
            returns.push(event)
          }
        })
      }
      // look for time overlaps
      for (let i1 = 0; i1 < returns.length; ++i1) {
        const start1 = Date.parse(returns[i1].date + ' ' + returns[i1].time)
        const end1 = Math.round(start1 + (returns[i1].duration * 60000))
        overlaps[i1] = 0
        for (let i2 = 0; i2 < returns.length; ++i2) {
          if (i1 !== i2) {
            const start2 = Date.parse(returns[i2].date + ' ' + returns[i2].time)
            const end2 = Math.round(start2 + (returns[i2].duration * 60000))
            if (Utilities.Date.isOverlap(start1, end1, start2, end2)) {
              overlaps[i1] = overlaps[i1] + 1
            }
          }
        }
      }
      overlaps.forEach((o, i) => { returns[i].overlaps = o })
      return returns
    },

    weekViewBadgeClasses (event, type) {
      const isHeader = type === 'header'
      return {
        [`q-calendar-day-event-${this.viewMode}-mode`]: !isHeader,
        'q-calendar-day': !isHeader
      }
    },

    weekViewBadgeStyles (event, type, timeStartPos, timeDurationHeight) {
      const s = {}
      // header styling:
      if (type === 'header') {
        if (this.viewMode === 'week') {
          s.width = '100%'
        } else {
          s['margin-right'] = '5px'
        }
        s.cursor = 'pointer'

      // body styling:
      } else if (type === 'body') {
        console.log(event)
        s['align-items'] = 'flex-start'
        if (event.time) { s.top = Math.round(timeStartPos(event.time)) + 'px' }

        // conditional width and position for overlaps
        if (event.overlaps > 0) {
          s.left = Math.round(event.number * (this.viewMode === 'day' ? 10 : event.overlaps * 3)) + '%'
          s.width = Math.round(80 / event.overlaps) + '%'
        } else {
          s.left = '0px'
          s.width = '100%'
        }

        // conditional height calculation
        if (event.duration) {
          s.height = Math.round(timeDurationHeight(event.duration)) + 'px'
        } else { // if no duration is provided, the assume 60, as most calendars do
          s.height = Math.round(timeDurationHeight(60)) + 'px'
        }
      }
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

.q-calendar-header:hover {
  overflow: unset!important;
}

.q-calendar-day:hover {
  opacity: 1;
  border: none;
  color: white!important;
  z-index: 9999999!important;
  min-width: 100px!important;
}

.q-calendar-day-event-week-mode {
  width: 50%;
  position: absolute;
  font-size: 12px;
  z-index: 999999!important;
}

.q-calendar-day-event-day-mode {
  max-width: 200px;
  position: absolute;
  font-size: 12px;
  z-index: 999999!important;
}

.q-calendar-allday {
  color: #000000;
  display: block;
  text-align: center;
  width: 100%;
  padding-left: 10px;
}
</style>
