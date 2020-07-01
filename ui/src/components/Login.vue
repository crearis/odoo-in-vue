<template>
  <div class="q-pa-sm row items-start q-gutter-sm">
    <q-dialog v-model="confirm" persistent>
      <q-card style="width: 400px">
        <q-card-section v-if="authenticating">
          <div>
            <q-form
              @submit.prevent="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >

              <q-input
                filled
                v-model.lazy="login"
                label="Login"
                lazy-rules
                :rules="[ val => val && val.length > 4 || 'Please type something']"
              />

              <q-input
                filled
                v-model.lazy="password"
                label="Password"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[ val => val && val.length > 4 || 'Please type something']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <q-input
                filled
                v-model.lazy="database"
                label="Database"
                lazy-rules
                :rules="[ val => val && val.length > 2 || 'Please type something']"
              />

              <Error :errorMessage="authenticationError"/>
              <div>
                <q-btn label="Login" type="submit" color="primary"/>
                <q-btn label="Clear" type="reset" color="primary" class="q-ml-lg" />
              </div>
            </q-form>
          </div>
        </q-card-section>
        <q-card-section v-else>
          <WorkingSpinner/>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import Server from '../mixins/Server'
import Error from './ErrorForModals.vue'
import WorkingSpinner from './WorkingSpinner'

export default {
  components: {
    Error,
    WorkingSpinner
  },
  props: {
    errorMessage: {
      type: String
    }
  },
  data () {
    return {
      login: 'admin',
      password: 'admin',
      database: 'demo',
      isPwd: true,
      confirm: true,
      authenticating: true,
      authenticationError: ''
    }
  },
  mounted () {
    Server.getHealth()
  },
  methods: {
    onSubmit () {
      Server.getSessionId(this.database, this.login, this.password)
        .then(r => {
          if (r) {
            console.log('logged in and session_id captured')
            this.authenticating = false
            this.$emit('authOK')
          } else {
            this.authenticationError = 'Login failed.'
          }
        })
    },
    onReset () {
      this.login = ''
      this.password = ''
      this.authenticationError = ''
    }
  }
}
</script>
