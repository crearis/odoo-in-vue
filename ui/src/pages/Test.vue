<template>
  <Dialog>
    <Forms>
      <Project></Project>
    </Forms>
  </Dialog>
</template>

<script>
import Dialog from 'components/q/Dialog.vue'
import Forms from 'components/Forms.vue'
import Project from 'components/forms/Project.vue'

export default {
  name: 'PageTest',
  components: {
    Dialog,
    Forms,
    Project
  }
}
</script>
