<template>
  <div class="row items-start q-gutter-md" style="min-width: 420px">

    <!-- form header -->
    <div class="fit">
      <slot name="header">
        <div v-if="title" class="q-pt-sm q-pl-sm q-pr-sm q-pb-none q-mb-none form-title">
          {{ title }}
        </div>
        <q-card-actions class="q-mb-sm form-header-bottom-border">
          <q-btn-group>
            <q-btn push color="primary" v-if="btnEdit">Edit</q-btn>
            <q-btn push color="info" v-if="btnCreate">Create</q-btn>
            <q-btn-dropdown color="primary" label="More" v-if="btnMore">
            </q-btn-dropdown>
          </q-btn-group>
          <q-space/>
          <q-space/>
          <span class="q-pl-sm q-pr-sm">{{recNumCurrent}} / {{recNumTotal}}</span>
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
      title: 'Odoo In Vue / Form',
      btnEdit: true,
      btnCreate: true,
      btnMore: true,
      showRibbon: false,
      showFooter: false,
      recNumCurrent: 0,
      recNumTotal: 0
    }
  }
}
</script>
<style scoped>
.form-title {
  font-size-adjust: inherit;
  font-min-size: small;
  font-max-size: medium;
}
.btn-divider-right {
  border-right: #BBBBBB 1px solid
}
.form-header-bottom-border {
  border-bottom: #BBBBBB 1px solid
}
</style>
