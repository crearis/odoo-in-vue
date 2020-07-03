<template>
  <Table v-if="contacts.length"
         title="Contacts"
         v-bind:data="contacts"
         v-bind:columns="contactsColumns"
  />
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
    Server.redirectIfNotAuthenticated()
      .then(r => {
        Server.search_read(
          'res.partner',
          [['active', '=', true]],
          ['id', 'name', 'street', 'city', 'phone']
        ).then(r => {
          if (r.data.length) {
            this.contacts = r.data
            this.contactsColumns = r.cc
          }
        })
      })
  }
}
</script>
