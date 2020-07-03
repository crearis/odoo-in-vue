<template>
  <Table v-if="data.length"
         title="Calendar"
         v-bind:data="data"
         v-bind:columns="dataColumns"
  />
</template>

<script>
import Server from '../mixins/Server'
import Table from 'components/q/Table.vue'

export default {
  name: 'PageCalendar',
  components: {
    Table
  },
  data () {
    return {
      errorMessage: '',
      data: {},
      dataColumns: []
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
  }
}
</script>
