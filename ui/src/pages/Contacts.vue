<template>
  <Table ref="tableContacts" title="Contacts" @row-click="contactOpen"/>
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
    Server.checkSession().then(r => {
      if (!r) {
        this.$router.push('/')
        return
      }
      this.$refs.tableContacts.isLoading = true
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
  },
  methods: {
    contactOpen: function (e, row) {
      this.$router.push('/contacts/record/' + row.id)
    }
  }
}
</script>
