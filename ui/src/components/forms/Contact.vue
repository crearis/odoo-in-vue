<template>
  <q-card class="row">

    <q-card-section class="fit">
      <Field name="name" v-bind:record="record" :mode="clicked" style="font-weight: bold"/>
      <Field name="parent_id" v-bind:record="record" :mode="clicked"/>
    </q-card-section>

    <q-card-section>
      <Field name="type" v-bind:record="record" :mode="clicked"/>
      <Field name="street" v-bind:record="record" :mode="clicked"/>
      <Field name="city" v-bind:record="record" :mode="clicked"/>
      <Field name="zip" v-bind:record="record" :mode="clicked"/>
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
  },
  watch: {
    click: function (e) {
      console.log('contact component click', e.event)
    }
  }
}
</script>
