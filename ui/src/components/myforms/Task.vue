<template>
  <OdooForm v-if="record || $route.params.id === '0'"
            @click="onClick"
            v-bind:record="record">
    <q-card class="row">

      <q-card-section class="fit">
        <OField name="name" style="font-weight: bold"/>
        <OField name="priority"/>
        <OField name="kanban_state"/>
      </q-card-section>

      <q-card-section>
        <OField name="project_id"/>
        <OField name="user_id"/>
        <OField name="date_deadline"/>
        <OField name="time_deadline" widget="float_time"/>
        <OField name="duration_deadline"/>
        <OField name="tag_ids"/>
      </q-card-section>

    </q-card>
  </OdooForm>
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
  },
  methods: {
    onClick (e) {
      console.log('form clicked', e)
    }
  }
}
</script>
