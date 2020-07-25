<template>
  <q-card class="row">

    <q-card-section class="fit">
      <Field name="name" v-bind:record="record" style="font-weight: bold"/>
      <Field name="parent_id" v-bind:record="record"/>
    </q-card-section>

    <q-card-section>
      <Field name="type" v-bind:record="record"/>
      <Field name="street" v-bind:record="record"/>
      <Field name="city" v-bind:record="record"/>
      <Field name="zip" v-bind:record="record"/>
    </q-card-section>

  </q-card>
</template>

<script>
import BaseForm from './BaseForm'

export default {
  name: 'ContactForm',
  extends: BaseForm,
  created () {
    this.title = 'Contact'
    this.model = 'res.partner'
    this.fields = ['id', 'type', 'name', 'parent_id', 'street', 'city', 'zip', 'display_name']
    this.read()
  }
}
</script>
