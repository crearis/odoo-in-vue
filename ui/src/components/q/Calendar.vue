<template>
  <q-calendar
    :v-model="selectedDate"
    :view="viewMode"
    locale="en-us"
    :mini-mode="miniMode"
  >
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
    }
  }
}
</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>
