<template>
  <OdooForm v-if="record || $route.params.id === '0'"
            @click="onFormClick"
            v-bind:record="record">
    <q-card class="row">

      <q-card-section class="fit">
        <field name="name" style="font-weight: bold"/>
        <field name="priority"/>
        <field name="kanban_state"/>
      </q-card-section>

      <q-card-section>
        <field name="project_id"/>
        <field name="user_id"/>
        <field name="date_deadline"/>
        <field name="time_deadline" widget="float_time"/>
        <field name="duration_deadline"/>
        <field name="tag_ids"/>
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
    onFormClick (e) {
      console.log('OdooContactForm.onFormClick', e)
    }
  }
}
</script>
