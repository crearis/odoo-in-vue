<template>
  <q-card class="row">

    <q-card-section class="fit">
      <OField name="name" v-bind:record="record" style="font-weight: bold"/>
      <OField name="priority" v-bind:record="record"/>
      <OField name="kanban_state" v-bind:record="record"/>
    </q-card-section>

    <q-card-section>
      <OField name="project_id" v-bind:record="record"/>
      <OField name="user_id" v-bind:record="record"/>
      <OField name="date_deadline" v-bind:record="record"/>
      <OField name="time_deadline" v-bind:record="record"/>
      <OField name="duration_deadline" v-bind:record="record"/>
      <OField name="tag_ids" v-bind:record="record"/>
    </q-card-section>

  </q-card>
</template>

<script>
import OdooBaseForm from '../odoo/OdooBaseForm'

export default {
  name: 'OdooContactForm',
  extends: OdooBaseForm,
  created () {
    this.title = 'Task'
    this.model = 'project.task'
    this.fields = [
      'id', 'name', 'project_id', 'user_id', 'date_deadline', 'time_deadline',
      'duration_deadline', 'tag_ids', 'priority', 'kanban_state'
    ]
    this.read()
  }
}
</script>
