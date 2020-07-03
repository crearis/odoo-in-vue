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
        <EssentialLink
          v-for="link in essentialLinks"
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
import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Dashboard',
          caption: 'Dashboard',
          icon: 'dashboard',
          link: '/vue/#/main'
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
          title: 'Calendar',
          caption: 'Calendar',
          icon: 'event',
          link: '/vue/#/calendar'
        },
        {
          title: 'Wiki',
          caption: 'Online Wiki',
          icon: 'school',
          link: 'https://gitlab.com/sylnsr/odoo-dev-ez/-/wikis/home',
          target: '_blank'
        }
      ]
    }
  }
}
</script>
