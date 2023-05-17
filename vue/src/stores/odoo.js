import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', {
  state: () => ({
    ir_model_fields: {},
    ir_model_fields_selection: {}
  }),

  actions: {
    setCacheIrModelFields: (cache) => {
      this.ir_model_fields[cache.id] = cache.data
    },
    // cache_ir_model_fields_selection
    // setCacheIrModelFieldsSelection: (fieldId, options) => {
    //   this.ir_model_fields_selection[fieldId] = options
    // }
  },

});
