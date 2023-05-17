<template>
  <q-dialog v-model="showDialog" full-width full-height>
    <q-card class="fit full-width">
      <div class="row no-wrap justify-between">
        <div class="q-pt-md q-pl-sm q-pr-md q-pb-none q-mb-none">
          {{ title }}
        </div>
        <div>
          <q-btn @click="$emit('dialogClosed')"
                 icon="close"
                 color="negative"
                 size="sm"
                 style="width: 30px; height: 30px; margin-right: 2px; margin-top: 2px"
          />
        </div>
      </div>
      <q-card-section class="q-pl-xs q-pr-xs" data="div-slot-start">
        <!-- dialog slot start -->
        <slot></slot>
        <!-- dialog slot end -->
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
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>


