<template>
  <div class="q-pa-sm row items-start q-gutter-sm">
    <div v-if="this.working">
      <WorkingSpinner />
    </div>
    <div v-if="this.errorStr">
      <Error />
    </div>
    <q-card style="width: 400px" v-else>
      <q-card-section >
        List data here
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Error from './ErrorForModals.vue'
import WorkingSpinner from './WorkingSpinner'

export default {
  components: {
    Error,
    WorkingSpinner
  },
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      working: false,
      errorStr: '',
      records: {},
      length: 0
    }
  }
}
</script>
