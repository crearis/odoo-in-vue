<template>
    <q-card class="fit full-width">
      <div class="row no-wrap justify-between">
        <div class="q-pt-md q-pl-sm text-h5">
          {{ title }}
        </div>
        <div class="q-pa-sm">
          <q-btn @click="closeForm"
                 icon="close"
                 color="negative"
                 size="sm"
                 style="width: 30px; height: 30px; margin-right: 2px; margin-top: 2px"
          />
        </div>
      </div>
      <q-card-section class="q-pl-xs q-pr-xs" data="div-slot-start">
        <Contact v-if="$route.params.model === 'contacts'" :key="$route.params.res_id" @title="onTitle"/>
        <Project v-if="$route.params.model === 'projects'" :key="$route.params.res_id" @title="onTitle"/>
        <Task v-if="$route.params.model === 'tasks'" :key="$route.params.res_id" @title="onTitle"/>
      </q-card-section>
    </q-card>
</template>

<script>
import Project from 'components/myforms/Project.vue'
import Contact from 'components/myforms/Contact.vue'
import Task from 'components/myforms/Task.vue'
// register more forms here as needed, from src/components/forms -->

export default {
  name: 'FormLoader',
  components: {
    Contact,
    Project,
    Task
  },
  data () {
    return {
      availableForms: ['projects', 'tasks', 'contacts'],
      noFormAvailable: false,
      title: ''
    }
  },
  methods: {
    closeForm () {
      if (this.$route.query.returnTo) {
        this.$router.push(this.$route.query.returnTo.toString())
        return
      }
      this.$router.push('/' + this.$route.params.model)
    },
    onTitle (t) {
      this.title = t
    }
  },
  mounted () {
    this.noFormAvailable = !this.availableForms.includes(this.$route.params.model)
    if (this.noFormAvailable) {
      this.$router.push('/no-form-for-model/' + this.$route.params.model)
    }
  }
}
</script>
