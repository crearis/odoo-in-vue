import Vue from 'vue'
import Vuex from 'vuex'

import session from './session.js'
import qtable from './qtable.js'

Vue.use(Vuex)

// see https://forum.quasar-framework.org/topic/4685/trouble-accessing-data-from-boot-file/5
// this is not set by the CLI but is something that must be added manually
let store = null

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      session,
      qtable
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  store = Store
  return Store
}

export { store }
