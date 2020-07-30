<template>
  <q-card class="row">

    <q-card-section class="fit">
      <OField name="name" v-bind:record="record" style="font-weight: bold"/>
      <OField name="parent_id" v-bind:record="record"/>
    </q-card-section>

    <q-card-section>
      <OField name="type" v-bind:record="record"/>
      <OField name="street" v-bind:record="record"/>
      <OField name="city" v-bind:record="record"/>
      <OField name="zip" v-bind:record="record"/>
    </q-card-section>

  </q-card>
</template>

<script>
import OdooBaseForm from '../odoo/OdooBaseForm'

export default {
  name: 'OdooContactForm',
  extends: OdooBaseForm,
  created () {
    this.title = 'Contact'
    this.model = 'res.partner'
    this.fields = ['id', 'type', 'name', 'parent_id', 'street', 'city', 'zip', 'display_name']
    this.read()
  },
  watch: {
    click () {
      console.log('contact form clicked', this.click)
    }
  }
}
</script>
