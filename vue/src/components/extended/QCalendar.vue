<template>
    <div className="row justify-center">
      <div style="display: flex; max-width: 800px; width: 100%; height: 200px;">
        <q-calendar-agenda
          v-if="viewMode == 'day' || viewMode == 'week'"
          ref="calendar"
          v-model="selectedDate"
          :view="viewMode"
          :weekdays="[1,2,3,4,5]"
          :day-min-height="100"
          bordered
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-time="onClickTime"
          @click-interval="onClickInterval"
          @click-head-intervals="onClickHeadIntervals"
          @click-head-day="onClickHeadDay"
        />
      </div>
    </div>
</template>

<script>
import {QCalendarAgenda, today} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarAgenda.sass'

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
  },
  data() {
    return {
      selectedDate: today(),
    }
  },
  methods: {
    onToday() {
      this.$refs.calendar.moveToToday()
    },
    onPrev() {
      this.$refs.calendar.prev()
    },
    onNext() {
      this.$refs.calendar.next()
    },

    onMoved(data) {
      console.log('onMoved', data)
    },
    onChange(data) {
      console.log('onChange', data)
    },
    onClickDate(data) {
      console.log('onClickDate', data)
    },
    onClickTime(data) {
      console.log('onClickTime', data)
    },
    onClickInterval(data) {
      console.log('onClickInterval', data)
    },
    onClickHeadIntervals(data) {
      console.log('onClickHeadIntervals', data)
    },
    onClickHeadDay(data) {
      console.log('onClickHeadDay', data)
    }
  }
})
</script>
