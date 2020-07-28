<template>
  <Dialog ref="dialogComp" @dialogClosed="onDialogClosed" v-if="!noFormAvailable" :title="title">
    <Forms ref="formComp" @click="onClick">
      <Contact v-if="$route.params.model === 'contacts'" @title="onTitle" v-bind:click="click"/>
      <Project v-if="$route.params.model === 'projects'" @title="onTitle" v-bind:click="click"/>
      <Task v-if="$route.params.model === 'tasks'" @title="onTitle" v-bind:click="click"/>
      <!-- register more forms here as needed, from src/components/forms -->
    </Forms>
  </Dialog>
</template>

<script>
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
      title: 'Odoo In Vue - Form',
      click: {}
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
    },
    onClick (e) {
      this.click = e
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
