<template>
  <OdooForm v-if="record || $route.params.id === '0'" @click="onFormClick">
    <q-card class="row">

      <q-card-section class="fit">
        <OdooField name="name" style="font-weight: bold"/>
        <OdooField name="partner_id"/>
        <OdooField name="label_tasks"/>
      </q-card-section>

      <q-card-section>
        <OdooField name="user_id"/>
        <OdooField name="privacy_visibility"/>
      </q-card-section>

    </q-card>
  </OdooForm>
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
    this.read()
  },
  methods: {
    onFormClick (e) {
      // console.log('OdooProjectForm.onFormClick', e)
    }
  }
}
</script>
