import { Cookies } from 'quasar'

const state = {
  session: {
    profile: {}
  }
}


const mutations = {
  setSessionProfile: (state, data) => {
    state.session.profile = data
  },
  setSessionId: (state, data) => {
    console.log('session_id for ', data)
    Cookies.set('session_id', data.id, {
      expires: 5,
      path: '/',
      domain: data.domain
    })
  }
}


export default {
  state,
  mutations
}
