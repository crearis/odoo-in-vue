<template>
  <q-card class="row">

    <q-card-section class="fit">
      <Field name="name" v-bind:record="record" style="font-weight: bold"/>
      <Field name="priority" v-bind:record="record"/>
      <Field name="kanban_state" v-bind:record="record"/>
    </q-card-section>

    <q-card-section>
      <Field name="project_id" v-bind:record="record"/>
      <Field name="user_id" v-bind:record="record"/>
      <Field name="date_deadline" v-bind:record="record"/>
      <Field name="time_deadline" v-bind:record="record"/>
      <Field name="duration_deadline" v-bind:record="record"/>
      <Field name="tag_ids" v-bind:record="record"/>
    </q-card-section>

  </q-card>
</template>

<script>
import BaseForm from './BaseForm'

export default {
  name: 'ContactForm',
  extends: BaseForm,
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
