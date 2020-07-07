<template>
  <q-calendar
    :v-model="selectedDate"
    :view="viewMode"
    locale="en-us"
    :mini-mode="miniMode"
    :weekdays="[1, 2, 3, 4, 5, 6, 0]"
  >
    <!-- MONTH view template -->
    <template #day="{ date }">
      <template v-for="(event, index) in getEventsByDate(date)">
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

    <!-- WEEK view template -->
    <template #day-body="{ date, timeStartPos, timeDurationHeight }">
      <template v-for="(event, index) in getEventsByDate(date)">
        <q-badge
          :key="index"
          class="q-calendar-day-event justify-center"
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
    selectedDate: {
      type: Date,
      required: true
    },
    miniMode: {
      default: 'auto',
      required: false
    },
    events: {
      required: true
    }
  },
  created () {
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
      const cssColor = event.bgcolor
      const isHeader = type === 'header'
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right'
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
    }
  }
}
</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css" />
<style>
.calendar-container {
  position: relative
}

.q-calendar-day-event {
  width: 100%;
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
