<template>
  <div class="row justify-between q-gutter-sm q-ml-none" style="min-width: 320px">

    <!-- form header -->
    <div class="fit q-pa-none q-ma-none">

      <q-banner v-if="bannerText" dense rounded :class="'bg-' + (bannerColor || 'blue-1') + ' fit'">
        <template v-slot:avatar>
          <q-icon :name="bannerIcon" color="primary" />
        </template>
        {{ bannerText }}
        <template v-slot:action>
          <q-btn flat color="white" class="bg-red" label="Close" @click="bannerText = ''; bannerColor = ''" />
        </template>
      </q-banner>

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
          <q-btn-group v-if="btnEdit && !hideBtnEdit">
            <q-btn @click="onClick('previous')" icon="chevron_left" class="btn-divider-right"/>
            <q-btn @click="onClick('next')" icon="chevron_right"/>
          </q-btn-group>
          <q-space/>
          <span class="q-pl-xs q-pr-sm">Rec #{{$route.params.res_id}}</span>
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
import Odoo from 'src/mixins/Odoo'

export default {
  name: 'OdooFormFrame',
  data () {
    return {
      btnEdit: true,
      btnCreate: true,
      showRibbon: false,
      showFooter: false,
      hideBtnEdit: false,
      hideBtnCreate: false,
      hideBtnSave: false,
      bannerText: '',
      bannerColor: '',
      bannerIcon: '',
      click: {},
    }
  },
  props: {
    btnActions: {
      type: [Array, Boolean],
      required: false,
      default: false
    },
    recordMessage: {
      type: [String, String],
      required: false,
      default: ''
    }
  },

  watch: {
    record () {
      if (this.recordMessage) {
        const { text, type } = this.recordMessage
        this.showBannerText(text, type)
      }
    }
  },

  methods: {
    onClick (btn, params = {}) {
      this.click = { event: btn, args: params === {} ? params : false }
      this.$emit('click', this.click)
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
        this.$router.push({name: 'record', params: { model: this.$route.params.model, res_id: this.nextResId(btn) }})
      }
    },

    nextResId (direction) {
      let resId = 0
      try {
        resId = parseInt(this.$route.params.res_id)
      } catch { }
      resId = Math.abs(direction === 'next' ? resId + 1 : resId - 1)
      return resId === 0 ? 1 : resId
    },

    showBannerText (text, type) {
      if (text) {
        this.bannerText = text
        switch (type) {
          case Odoo.CONST.BANNER_TYPE_PASS: this.bannerColor = 'green-3'; this.bannerIcon = 'done'; break
          case Odoo.CONST.BANNER_TYPE_INFO: this.bannerColor = 'blue-3'; this.bannerIcon = 'info'; break
          case Odoo.CONST.BANNER_TYPE_WARN: this.bannerColor = 'yellow-3'; this.bannerIcon = 'report_problem'; break
          case Odoo.CONST.BANNER_TYPE_FAIL: this.bannerColor = 'red-3'; this.bannerIcon = 'bug_report'; break
          default: this.bannerColor = 'grey-5'; this.bannerIcon = 'info'; break
        }
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
