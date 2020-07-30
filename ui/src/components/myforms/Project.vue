<template>
  <q-card class="row">

    <q-card-section class="fit">
      <OField name="name" v-bind:record="record" style="font-weight: bold"/>
      <OField name="partner_id" v-bind:record="record"/>
      <OField name="label_tasks" v-bind:record="record"/>
    </q-card-section>

    <q-card-section>
      <OField name="user_id" v-bind:record="record"/>
      <OField name="privacy_visibility" v-bind:record="record"/>
    </q-card-section>

  </q-card>
</template>

<script>
import OdooBaseForm from '../odoo/OdooBaseForm'

export default {
  name: 'OdooProjectForm',
  extends: OdooBaseForm,
  created () {
    this.title = 'Project'
    this.model = 'project.project'
    this.fields = ['id', 'name', 'label_tasks', 'user_id', 'partner_id', 'privacy_visibility']
    this.read()
  }
}
</script>
