<template>
  <div></div>
</template>

<script>
import Odoo from '../mixins/Odoo'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DebugPage',
  data () {
    return {
      authorized: false,
      errorMessage: ''
    }
  },
  mounted () {
    Odoo.isSessionOK()
      .then(r => { if (r) { this.doAuthOK() } else {console.log('Not logged in')} })
  },
  methods: {
    doAuthOK () {
      window.location.href = '/vue/#/main'
    }

  }
})
</script>
