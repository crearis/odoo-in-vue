<template>
    <q-card>
      <q-card-section>
        <div class="row text-center">
          <div class="q-pa-sm q-pr-sm q-gutter-md"
               style="min-width: 400px; max-width: 500px; overflow: hidden;">
            <div>My Projects</div>
            <Table v-if="projects.length"
                   v-bind:data="projects"
                   v-bind:columns="projectsColumns"
            />
          </div>
          <div class="q-pa-sm q-gutter-md"
               style="min-width: 400px; max-width: 500px; overflow: hidden;">
            <div>My Events</div>
            <Calendar
              v-bind:data="events"
              viewMode="month"
              v-bind:miniMode="true"
            >
              <template></template>
            </Calendar>
          </div>
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
import Server from '../mixins/Server'
import Table from 'components/q/Table.vue'
import Calendar from 'components/q/Calendar.vue'
import { store } from '../store'


export default {
  name: 'PageMain',
  components: {
    Table,
    Calendar
  },
  data () {
    return {
      errorMessage: '',
      projects: {},
      projectsColumns: [],
      events: []
    }
  },
  mounted () {
    Server.redirectIfNotAuthenticated()
      .then(r => {
        // my projects
        Server.search_read(
          'project.project',
          [
            ['user_id', '=', store.state.session.profile.uid],
            ['active', '=', true]
          ],
          ['id', 'name', 'date_start'],
          'date_start, name'
        ).then(r => {
          if (r.data.length) {
            this.projects = r.data
            this.projectsColumns = r.cc
          }
        })
      })
  }
}
</script>
