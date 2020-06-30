const state = {
  session: {
    profile: {}
  }
}


const mutations = {
  setSessionProfile: (state, data) => {
    state.session.profile = data
  }
}


export default {
  state,
  mutations
}
