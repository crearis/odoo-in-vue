const state = {
  profile: {}
}


const mutations = {
  setSessionProfile: (state, data) => {
    state.profile = data
  }
}


export default {
  state,
  mutations
}
