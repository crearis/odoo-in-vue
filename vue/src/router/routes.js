
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/main', component: () => import('pages/Main.vue') },
      { path: '/contacts', component: () => import('pages/Contacts.vue') },
      { path: '/projects', component: () => import('pages/Projects.vue') },
      { path: '/tasks', component: () => import('pages/Tasks.vue') },
      { path: '/:model/record/:res_id(\\d+)', component: () => import('pages/FormLoader.vue'), name: 'record' },
      { path: '/calendar', component: () => import('pages/Calendar.vue') },
      { path: '/debug', component: () => import('pages/Debug.vue') },
      { path: '/scratch', component: () => import('pages/ScratchPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
