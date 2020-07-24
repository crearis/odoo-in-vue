<template>
  <div class="row justify-between q-gutter-sm q-ml-none" style="min-width: 320px">

    <!-- form header -->
    <div class="fit q-pa-none q-ma-none">
      <slot name="header">
        <q-card-actions class="q-ma-none form-header-bottom-border q-mb-sm">
          <q-btn-group>
            <q-btn push color="primary" v-if="btnEdit && $route.params.res_id !== '0'">Edit</q-btn>
            <q-btn push color="info" v-if="btnCreate && $route.params.res_id !== '0'">Create</q-btn>
            <q-btn-dropdown color="primary" label="..." v-if="btnActions.length">
            </q-btn-dropdown>
          </q-btn-group>
          <q-space/>
          <q-space/>
          <span class="q-pl-xs q-pr-sm">{{recNumCurrent}} / {{recNumTotal}}</span>
          <q-btn-group>
            <q-btn icon="chevron_left" class="btn-divider-right"></q-btn>
            <q-btn icon="chevron_right"></q-btn>
          </q-btn-group>
        </q-card-actions>
        <div v-if="showRibbon" class="form-header-bottom-border">
          <div class="q-ml-sm">
            <slot name="header-ribbon">
              <div>Some ribbon component here</div>
            </slot>
          </div>
        </div>
      </slot>
    </div>

    <!-- form body slot -->
    <div class="q-mt-none q-pa-none fit">
      <slot></slot>
    </div>

    <!-- form footer slot -->
    <div v-if="showFooter" class="q-mt-none q-pa-none fit">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script>

export default {
  name: 'CompForms',
  data () {
    return {
      btnEdit: true,
      btnCreate: true,
      showRibbon: false,
      showFooter: false,
      recNumCurrent: 0,
      recNumTotal: 0
    }
  },
  props: {
    btnActions: {
      type: Array,
      required: false,
      default: function () { return [] }
    }
  }
}
</script>
<style scoped>
.form-title {
  font-size: medium;
}
.btn-divider-right {
  border-right: #BBBBBB 1px solid
}
.form-header-bottom-border {
  border-bottom: #BBBBBB 1px solid
}
</style>
