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
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Odoo In Vue {{ subpage ? " -> " + subpage : "" }}
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @click="this.subpage = link.title"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Main',
    caption: 'My stuff',
    icon: 'home',
    link: '#/main'
  },
  {
    title: 'Contacts',
    caption: 'Company contacts',
    icon: 'people',
    link: '#/contacts'
  },
  {
    title: 'Projects',
    caption: 'Projects',
    icon: 'build',
    link: '#/projects'
  },
  {
    title: 'Tasks',
    caption: 'Tasks',
    icon: 'task',
    link: '#/tasks'
  },
  {
    title: 'Calendar',
    caption: 'Calendar',
    icon: 'event',
    link: '#/calendar'
  },
  {
    title: 'Troubleshooting',
    caption: 'Troubleshooting guide',
    icon: 'healing',
    link: '#/troubleshooting'
  },
  {
    title: 'Debug',
    caption: 'Debug screen',
    icon: 'adb',
    link: '#/debug'
  },
  {
    title: 'Quasar',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
    target: "_blank"
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
    target: "_blank"
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data() {
    return {
      subpage: ""
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
