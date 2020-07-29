const state = {
  fieldsConfig: {},
  fieldOptions: {}
}


const mutations = {
  setColumnConfig: (state, config) => {
    state.fieldsConfig[config.name] = config.data
  },
  setFieldOptions: (state, fieldId, options) => {
    state.fieldOptions[fieldId] = options
  }
}

export default {
  state,
  mutations
}
