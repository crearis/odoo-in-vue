<template>
    <div className="row justify-center" >
      <div style="display: flex; max-width: 800px; width: 100%; height: 100%;">

        <q-calendar-agenda
          ref="agenda"
          v-if="viewMode == 'day' || viewMode == 'week'"
          v-model="selectedDate"
          :view="viewMode"
          :weekdays="[1,2,3,4,5,6,0]"
          :day-min-height="100"
          bordered
        >
          <template #day="{ scope: { timestamp } }" v-if="viewMode == 'day' || viewMode == 'week'" >
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
          :day-min-height="40"
          bordered
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
  QCalendarAgenda,
  QCalendarMonth,
  today,
  addToDate,
  parseTimestamp,
} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarAgenda.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'
import {defineComponent} from 'vue'


export default defineComponent({
  name: 'DayFirstDayMonday',
  components: {
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
          (map[ event.date ] = (map[ event.date ] || [])).push(event)
          if (event.days !== undefined) {
            let timestamp = parseTimestamp(event.date)
            let days = event.days
            // add a new event for each day
            // skip 1st one which would have been done above
            do {
              timestamp = addToDate(timestamp, { day: 1 })
              if (!map[ timestamp.date ]) {
                map[ timestamp.date ] = []
              }
              map[ timestamp.date ].push(event)
              // already accounted for 1st day
            } while (--days > 1)
          }
        })
      }
      console.log(map)
      return map
    }
  },
  methods: {

    getSelectedDate () {
      const parts = this.selectedDate.split('-')
      const retval = new Date(parts[0], parts[1] - 1, parts[2])
      return retval
    },

    getCurrentDisplayComponent() {
      return this.viewMode == "month" ? this.$refs.calendar : this.$refs.agenda
    },

    move (amount = 0) {
      if (amount === 0) {
        this.selectedDate = today()
      } else {
        this.getCurrentDisplayComponent().move(amount)
      }
    },

  }
})
</script>
