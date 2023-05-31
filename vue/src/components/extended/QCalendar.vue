<template>
    <div className="row justify-center" >
      <div style="display: flex; max-width: 800px; width: 100%; height: 100%;">

        <q-calendar-day
          ref="day"
          v-if="viewMode == 'day'"
          v-model="selectedDate"
          view="day"
          bordered
          column-header-before
          :interval-minutes="30"
          :interval-start="12"
          :interval-count="28"
          :interval-height="15"
          @change="change"
          transition-next="slide-left"
          transition-prev="slide-right"
        >
          <template #column-header-before="{ /* timestamp, index */ }">
            <div class="text-center" style="margin: 2px; width: 100%">{{ this.selectedDate }}</div>
          </template>

          <template #day-body="{ scope: { timestamp, timeStartPos, timeDurationHeight } }">
            <template v-for="event in eventsMap[timestamp.date]" :key="event.id">
              <div
                v-if="event.time !== undefined"
                class="my-event"
                :class="badgeClasses(event, 'body')"
                :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
              >
                <div class="title q-calendar__ellipsis">
                  {{ event.title }}
                  <q-tooltip>{{ event.time + ' - ' + event.details }}</q-tooltip>
                </div>
              </div>
            </template>
          </template>

        </q-calendar-day>

        <q-calendar-agenda
          ref="agenda"
          v-if="viewMode == 'week'"
          v-model="selectedDate"
          view="week"
          :weekdays="[1,2,3,4,5]"
          :day-min-height="50"
          bordered
          @change="change"
        >
          <template #day="{ scope: { timestamp } }" v-if="viewMode == 'week'" >
            <template v-for="(event, i) in eventsMap[timestamp.date]" :key="i">
              <div class="col-12 q-px-sm" style="font-size: 10px;">
                {{event.title}}
              </div>
            </template>
          </template>
        </q-calendar-agenda>

        <q-calendar-month
          ref="calendar"
          v-if="viewMode == 'month'"
          v-model="selectedDate"
          date-type="square"
          day-min-height="40"
          bordered
          month-label-size="lg"
          date-align="right"
          @change="change"
        >
          <template #day="{ scope: { timestamp } }" v-if="viewMode == 'month'">
            <template
              v-for="(event, i) in eventsMap[timestamp.date]" :key="i">
              <div class="col-12 q-px-sm" style="font-size: 10px;">
                {{event.title}}
              </div>
            </template>
          </template>
        </q-calendar-month>

      </div>
    </div>
</template>

<script>
import {
  QCalendarDay,
  QCalendarAgenda,
  QCalendarMonth,
  today,
} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarAgenda.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'
import {defineComponent} from 'vue'
import {date} from "quasar";


export default defineComponent({
  name: 'QCalendar',
  components: {
    QCalendarDay,
    QCalendarAgenda,
    QCalendarMonth,
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
  data() {
    return {
      selectedDate: today(),
    }
  },
  computed: {
    eventsMap () {
      const map = {}
      if (this.events.length > 0) {
        this.events.forEach(event => {
          let mapIdxName = date.formatDate(event.date, 'YYYY-MM-DD')
          if (!map[ mapIdxName ]) { map[ mapIdxName ] = [] }
          map[ mapIdxName ].push(event)
        })
      }
      return map
    }
  },
  methods: {

    getCurrentDisplayComponent() {
      switch (this.viewMode) {
        case 'day': return this.$refs.day; break;
        case 'week': return this.$refs.agenda; break;
        default: return this.$refs.calendar
      }
    },

    move (amount = 0) {
      if (amount === 0) {
        this.selectedDate = today()
      } else {
        this.getCurrentDisplayComponent().move(amount)
      }
    },

    change (range) {
      this.$emit('change', range)
    },

    // methods for day view
    badgeClasses (event, type) {
      const isHeader = type === 'header'
      return {
        [ `text-white bg-red` ]: true,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right',
        'rounded-border': true
      }
    },

    badgeStyles (event, type, timeStartPos = undefined, timeDurationHeight = undefined) {
      const s = {}
      if (timeStartPos && timeDurationHeight) {
        s.top = timeStartPos(event.time) + 'px'
        s.height = timeDurationHeight(event.duration) + 'px'
      }
      console.log("position:", s.top, s.height)
      s[ 'align-items' ] = 'flex-start'
      return s
    },

  }
})
</script>

<style lang="sass" scoped>
.my-event
  position: absolute
  font-size: 12px
  justify-content: center
  margin: 0 1px
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer

.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%

.text-white
  color: white

.bg-blue
  background: blue

.bg-green
  background: green

.bg-orange
  background: orange

.bg-red
  background: red

.bg-teal
  background: teal

.bg-grey
  background: grey

.bg-purple
  background: purple

.full-width
  left: 0
  width: calc(100% - 2px)

.left-side
  left: 0
  width: calc(50% - 3px)

.right-side
  left: 50%
  width: calc(50% - 3px)

.rounded-border
  border-radius: 2px
</style>
