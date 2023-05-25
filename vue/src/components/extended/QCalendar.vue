<template>
    <div className="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%; height: 200px;">


        <q-calendar-agenda
          ref="calendar-agenda"
          enable-outside-days
          v-if="viewMode == 'day' || viewMode == 'week'"
          v-model="selectedDate"
          :view="viewMode"
          :weekdays="[1,2,3,4,5,6,0]"
          :day-min-height="100"
          bordered
        >
          <template #day="{ scope: { timestamp } }">
            <template v-for="(event, index) in getEventsByDate(timestamp.date)" :key="index">
              <div class="col-12 q-px-sm" style="font-size: 10px;">
                {{event.title}}
              </div>
            </template>
          </template>
        </q-calendar-agenda>



      </div>
    </div>
</template>

<script>
import {QCalendarAgenda, today} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarAgenda.sass'
import OdooQUtils from '../../mixins/OdooQUtils'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'DayFirstDayMonday',
  components: {
    QCalendarAgenda
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
            if (OdooQUtils.Date.isOverlap(start1, end1, start2, end2)) {
              overlaps[i1] = overlaps[i1] + 1
            }
          }
        }
      }
      overlaps.forEach((o, i) => { returns[i].overlaps = o })
      return returns
    },

    getSelectedDate () {
      const parts = this.selectedDate.split('-')
      const retval = new Date(parts[0], parts[1] - 1, parts[2])
      return retval
    },

  }
})
</script>
