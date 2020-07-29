<template>
  <Dialog ref="dialogComp" @dialogClosed="onDialogClosed" v-if="!noFormAvailable" :title="title">
    <Forms ref="formComp">
      <Contact v-if="$route.params.model === 'contacts'"/>
      <Project v-if="$route.params.model === 'projects'"/>
      <Task v-if="$route.params.model === 'tasks'"/>
      <!-- register more forms here as needed, from src/components/forms -->
    </Forms>
  </Dialog>
</template>

<script>
import EventBus from 'components/EventBus'
import Dialog from 'components/q/Dialog.vue'
import Forms from 'components/Forms.vue'
import Project from 'components/forms/Project.vue'
import Contact from 'components/forms/Contact.vue'
import Task from 'components/forms/Task.vue'
// register more forms here as needed, from src/components/forms -->

export default {
  name: 'PageForms',
  components: {
    Dialog,
    Forms,
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
    onDialogClosed () {
      this.$refs.dialogComp.showDialog = false
      if (this.$route.query.returnTo) {
        this.$router.push(this.$route.query.returnTo.toString()) // back to the standard page for the model
        return
      }
      this.$router.push('/' + this.$route.params.model) // back to the standard page for the model
    }
  },
  mounted () {
    this.noFormAvailable = !this.availableForms.includes(this.$route.params.model)
    if (this.noFormAvailable) {
      this.$router.push('/no-form-for-model/' + this.$route.params.model)
      return
    }
    // wire the 'title' from a forms sub-component into the dialog
    EventBus.$on('components-forms--title', t => { this.title = t })
  },
  destroyed () {
    EventBus.$off('components-forms--title')
  }
}
</script>
