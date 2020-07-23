<template>
  <Dialog ref="dialogComp" v-on:dialogClosed="onDialogClosed">
    <Forms ref="formComp">
      <Project v-if="$route.params.model = 'project'"/>
    </Forms>
  </Dialog>
</template>

<script>
import Dialog from 'components/q/Dialog.vue'
import Forms from 'components/Forms.vue'
import Project from 'components/forms/Project.vue'

export default {
  name: 'PageForms',
  components: {
    Dialog,
    Forms,
    Project
  },
  methods: {
    onDialogClosed: function () {
      this.$refs.dialogComp.showDialog = false
      window.location = window.location.toString().split('/record/')[0]
    }
  }
}
</script>
