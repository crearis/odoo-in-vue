<template>
  <OdooForm v-if="record || $route.params.id === '0'" @click="onFormClick">
    <q-card class="row">

      <q-card-section class="fit">
        <field name="name" style="font-weight: bold"/>
        <field name="parent_id"/>
      </q-card-section>

      <q-card-section>
        <field name="type"/>
        <field name="street"/>
        <field name="city"/>
        <field name="zip"/>
      </q-card-section>

    </q-card>
  </OdooForm>
</template>

<script>
import OdooBaseForm from '../odoo/OdooBaseForm'

export default {
  name: 'OdooForm_Contact',
  extends: OdooBaseForm,
  created () {
    this.title = 'Contact'
    this.model = 'res.partner'
    this.fields = ['id', 'type', 'name', 'parent_id', 'street', 'city', 'zip', 'display_name']
    this.read()
  },
  methods: {
    onFormClick (e) {
      console.log('OdooProjectForm.onFormClick', e)
    }
  }
}
</script>
