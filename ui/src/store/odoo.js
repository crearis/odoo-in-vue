const state = {
  ir_model_fields: {},
  ir_model_fields_selection: {}
}


const mutations = {
  cache_ir_model_fields: (state, cache) => {
    state.ir_model_fields[cache.id] = cache.data
  },
  cache_ir_model_fields_selection: (state, fieldId, options) => {
    state.ir_model_fields_selection[fieldId] = options
  }
}

export default {
  state,
  mutations
}
