<template>
  <Table ref="tableContacts" title="Contacts" />
</template>

<script>
import Server from '../mixins/Server'
import Table from 'components/q/Table.vue'

export default {
  name: 'PageContacts',
  components: {
    Table
  },
  data () {
    return {
      errorMessage: '',
      contacts: {},
      contactsColumns: []
    }
  },
  mounted () {
    this.$refs.tableContacts.isLoading = true
    Server.redirectIfNotAuthenticated()
      .then(r => {
        Server.search_read(
          'res.partner',
          [['active', '=', true]],
          ['id', 'name', 'street', 'city', 'phone']
        ).then(r => {
          if (r.data.length) {
            this.$refs.tableContacts.setData(r.data, r.cc)
            this.$refs.tableContacts.isLoading = false
          }
        })
      })
  }
}
</script>
