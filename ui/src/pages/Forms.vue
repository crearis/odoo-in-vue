<template>
  <Dialog ref="dialogComp" @dialogClosed="onDialogClosed" v-if="!noFormAvailable" :title="title">

      <Contact v-if="$route.params.model === 'contacts'" @title="onTitle"/>
      <Project v-if="$route.params.model === 'projects'" @title="onTitle"/>
      <Task v-if="$route.params.model === 'tasks'" @title="onTitle"/>
      <!-- register more forms here as needed, from src/components/forms -->

  </Dialog>
</template>

<script>
import Dialog from 'components/q/Dialog.vue'
import Project from 'components/myforms/Project.vue'
import Contact from 'components/myforms/Contact.vue'
import Task from 'components/myforms/Task.vue'
// register more forms here as needed, from src/components/forms -->

export default {
  name: 'PageForms',
  components: {
    Dialog,
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
