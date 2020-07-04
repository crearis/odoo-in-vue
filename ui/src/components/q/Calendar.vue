<template>
  <q-calendar
    :v-model="new Date()"
    :view="viewMode"
    locale="en-us"
    :mini-mode="miniMode"
  >
  </q-calendar>
</template>

<script>
import { QCalendar } from '@quasar/quasar-ui-qcalendar'

export default {
  components: {
    QCalendar
  },
  props: {
    data: {
      type: Array
    },
    viewMode: {
      type: String,
      default: 'week'
    },
    selectedDate: {
      type: String,
      required: false
    },
    miniMode: {
      default: 'auto',
      required: false
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>
