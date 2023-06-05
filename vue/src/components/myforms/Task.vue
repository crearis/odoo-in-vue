<template>
  <OdooFormFrame v-if="record.data || recordMessage" :key="$route.params.res_id">
    <q-card v-if="record.data" class="row">

      <q-card-section class="fit">
        <OdooField name="name" style="font-weight: bold"/>
        <OdooField name="priority"/>
        <OdooField name="kanban_state"/>
      </q-card-section>

      <q-card-section>
        <OdooField name="project_id"/>
        <OdooField name="user_id"/>
        <OdooField name="date_deadline"/>
        <OdooField name="time_deadline" widget="float_time"/>
        <OdooField name="duration_deadline" widget="float_duration"/>
        <OdooField name="tag_ids"/>
      </q-card-section>

    </q-card>
  </OdooFormFrame>
</template>

<script>
import OdooBaseForm from '../odoo/OdooBaseForm'

export default {
  name: 'OdooForm_Task',
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
