import { defineStore } from 'pinia';

export const useOdooStateStore = defineStore('odoostate', {
  state: () => ({
    ir_model_fields: {},
    ir_model_fields_selection: {}
  }),

  actions: {
    setCacheIrModelFields (cache_id, field_data) {
      this.ir_model_fields[cache_id] = field_data
    },
    // cache_ir_model_fields_selection
    // setCacheIrModelFieldsSelection: (fieldId, options) => {
    //   this.ir_model_fields_selection[fieldId] = options
    // }
  },

});
