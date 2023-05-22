<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-h6">Odoo Session Profile:<hr></div>
        <q-list>
          <q-item dense v-for="i in this.sessionData" :key="i">
            <span class="col-3">{{ i.n }}:</span><span>{{ i.v }}</span>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import Odoo from '../mixins/Odoo'
import {useSessionStore} from "stores/sessions";

import { defineComponent } from 'vue'

const session = useSessionStore()

export default defineComponent({
  name: 'DebugPage',
  data () {
    return {
      authorized: false,
      errorMessage: '',
      sessionData: []
    }
  },
  mounted () {
    Odoo.isSessionOK()
      .then(r => { if (r) {
        console.log("Authentication OK")
        console.log(session.profile)
        this.sessionData = [
          { n: "Database", v: session.profile.db },
          { n: "Server Version", v: session.profile.server_version },
          { n: "Admin", v: session.profile.is_admin ? "Yes" : "No" },
          { n: "User ID", v: session.profile.uid },
          { n: "Partner ID", v: session.profile.partner_id },
          { n: "Company ID", v: session.profile.company_id },
          { n: "Name", v: session.profile.name },
          { n: "Company switch", v: session.profile.display_switch_company_menu ? "Yes" : "No" },
        ]
        console.log(this.sessionData)
      } else {
        console.log('Not logged in')}
      })
  },
})
</script>
