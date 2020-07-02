const state = {
  columnConfig: {}
}


const mutations = {
  setColumnConfig: (state, config) => {
    // console.log('setColumnConfig', config.name, config.data)
    state.columnConfig[config.name] = config.data
  }
}

export default {
  state,
  mutations
}
