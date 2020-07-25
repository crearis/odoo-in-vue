<template>
  <q-card class="row">

    <q-card-section class="fit">
      <Field name="name" v-bind:record="record" style="font-weight: bold"/>
      <Field name="partner_id" v-bind:record="record"/>
      <Field name="label_tasks" v-bind:record="record"/>
    </q-card-section>

    <q-card-section>
      <Field name="user_id" v-bind:record="record"/>
      <Field name="privacy_visibility" v-bind:record="record"/>
    </q-card-section>

  </q-card>
</template>

<script>
import BaseForm from './BaseForm'

export default {
  name: 'ProjectForm',
  extends: BaseForm,
  created () {
    this.title = 'Project'
    this.model = 'project.project'
    this.fields = ['id', 'name', 'label_tasks', 'user_id', 'partner_id', 'privacy_visibility']
    this.read()
  }
}
</script>
