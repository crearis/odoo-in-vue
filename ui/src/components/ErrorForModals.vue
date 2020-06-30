<template>
  <div v-if="errorMessage" class="text-negative text-center">
    {{ errorMessage }}
    <q-separator spaced/>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      required: false
    }
  }
}
</script>

