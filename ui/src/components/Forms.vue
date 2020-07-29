<template>
  <div class="row justify-between q-gutter-sm q-ml-none" style="min-width: 320px">

    <!-- form header -->
    <div class="fit q-pa-none q-ma-none">
      <slot name="header">
        <q-card-actions class="q-ma-none form-header-bottom-border q-mb-lg">
          <q-btn-group>
            <q-btn
              push
              color="primary"
              v-if="btnEdit && $route.params.res_id !== '0' && !hideBtnEdit"
              @click="onClick('edit')"
            >Edit</q-btn>

            <q-btn
              push
              color="info"
              v-if="btnCreate && $route.params.res_id !== '0' && !hideBtnCreate"
              @click="onClick('create')"
            >Create</q-btn>

            <q-btn
              push
              color="info"
              v-if="(btnCreate || btnEdit) && hideBtnCreate"
              @click="onClick('save')"
            >Save</q-btn>

            <q-btn
              push
              color="secondary"
              v-if="(btnCreate || btnEdit) && hideBtnCreate"
              @click="onClick('discard')"
            >Discard</q-btn>

            <q-btn-dropdown
              color="primary"
              label="..."
              @click="onClick('action')"
              v-if="btnActions.length">
            </q-btn-dropdown>

          </q-btn-group>
          <q-space/>
          <q-space/>
          <span class="q-pl-xs q-pr-sm">Rec #{{$route.params.res_id}}</span>
          <q-btn-group>
            <q-btn @click="onClick('previous')" icon="chevron_left" class="btn-divider-right"></q-btn>
            <q-btn @click="onClick('next')" icon="chevron_right"></q-btn>
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
    <div class="q-ma-none q-pa-none fit">
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
      hideBtnEdit: false,
      hideBtnCreate: false,
      hideBtnSave: false
    }
  },
  props: {
    btnActions: {
      type: [Array, Boolean],
      required: false,
      default: false
    }
  },
  methods: {
    onClick (btn, params = {}) {
      // emit the click event for the button
      this.$emit('click', { event: btn, params: params })
      // set button states
      if (btn === 'edit' || btn === 'create') {
        this.hideBtnSave = false
        this.hideBtnCreate = this.hideBtnEdit = true
      } else if (btn === 'save' || btn === 'discard') {
        this.hideBtnSave = true
        this.hideBtnCreate = this.hideBtnEdit = false
      } else if (btn === 'next' || btn === 'previous') {
        this.hideBtnSave = true
        this.hideBtnCreate = this.hideBtnEdit = false
      }
    }
  }
}
</script>
<style scoped>
.btn-divider-right {
  border-right: #BBBBBB 1px solid
}
.form-header-bottom-border {
  border-bottom: #BBBBBB 1px solid
}
</style>
