<template>
  <q-page class="flex flex-center">
    <Login :authorized="authorized" :errorMessage="errorMessage" v-on:authOK="doAuthOK"/>
  </q-page>
</template>

<script>
import Login from 'components/Login.vue'
import Server from '../mixins/Server.js'

export default {
  name: 'PageIndex',
  components: {
    Login
  },
  data () {
    return {
      authorized: false,
      errorMessage: ''
    }
  },
  mounted () {
    if (!Server.hasSession()) {
      console.log('not logged in')
    }
  },
  methods: {
    doAuthOK () {
      console.log('authorized!')
    }
  }
}
</script>
