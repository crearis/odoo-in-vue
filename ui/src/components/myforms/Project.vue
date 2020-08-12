<template>
  <form v-if="record || $route.params.id === '0'" @click="onFormClick">
    <q-card class="row">

      <q-card-section class="fit">
        <field name="name" style="font-weight: bold"/>
        <field name="partner_id"/>
        <field name="label_tasks"/>
      </q-card-section>

      <q-card-section>
        <field name="user_id"/>
        <field name="privacy_visibility"/>
      </q-card-section>

    </q-card>
  </form>
</template>

<script>
import OdooBaseForm from '../odoo/OdooBaseForm'

export default {
  name: 'OdooForm_Project',
  extends: OdooBaseForm,
  created () {
    this.title = 'Project'
    this.model = 'project.project'
    this.fields = ['id', 'name', 'label_tasks', 'user_id', 'partner_id', 'privacy_visibility']
    this.readOne()
  },
  methods: {
    onFormClick (e) {
      console.log('OdooProjectForm.onFormClick', e)
    }
  }
}
</script>
