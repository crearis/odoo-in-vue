<template>
  <q-dialog v-model="showDialog" full-width full-height>
    <q-card class="fit full-width">
      <div class="row">
        <q-space/>
        <q-btn @click="$emit('dialogClosed')"
               icon="close"
               color="negative"
               size="md"
               style="width: 30px; height: 30px; vertical-align: center"
               class="float-right"
        />
      </div>
      <q-card-section>
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      showDialog: true
    }
  }
}
</script>


