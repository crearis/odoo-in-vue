<template>
  <OdooFormFrame :key="$route.params.res_id">
    <q-card v-if="record.data" class="row">

      <q-card-section class="fit">
        <OdooField name="name" style="font-weight: bold"/>
        <OdooField name="parent_id"/>
      </q-card-section>

      <q-card-section>
        <OdooField name="type"/>
        <OdooField name="street"/>
        <OdooField name="city"/>
        <OdooField name="zip"/>
      </q-card-section>

    </q-card>
  </OdooFormFrame>
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
  }
}
</script>
