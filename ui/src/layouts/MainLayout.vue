<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Odoo in Vue
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Nav Menu
        </q-item-label>
        <NavLinks
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import NavLinks from 'components/NavLinks.vue'

export default {
  name: 'MainLayout',
  components: {
    NavLinks
  },

  data () {
    return {
      leftDrawerOpen: false,
      navLinks: [
        {
          title: 'Main',
          caption: 'Your Dashboard',
          icon: 'dashboard',
          link: '/vue/#/main'
        },
        {
          title: 'Calendar',
          caption: 'Company Calendar',
          icon: 'event',
          link: '/vue/#/calendar'
        },
        {
          title: 'Contacts',
          caption: 'All Contacts',
          icon: 'people',
          link: '/vue/#/contacts'
        },
        {
          title: 'Projects',
          caption: 'All Projects',
          icon: 'build',
          link: '/vue/#/projects'
        },
        {
          title: 'Projects Tasks',
          caption: 'All Project Tasks',
          icon: 'build',
          link: '/vue/#/tasks'
        },
        {
          title: 'Issues',
          caption: 'Report any issues',
          icon: 'bug_report',
          link: 'https://gitlab.com/sylnsr/odoo-in-vue/-/issues',
          target: '_blank'
        }
      ]
    }
  }
}
</script>
