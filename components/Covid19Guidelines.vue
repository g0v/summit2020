<template lang="pug">
  .guideline
    h1.ph3 {{$t('title')}}
    summit-markdown(:content="$t('article/healthGuidelines')")
    .flex.flex-column.flex-row-l.justify-center.items-center.mt3
      b-button(@click="cancel") {{$t('cancel')}}
      b-button.mt3.mt0-l.ml3-l(
        v-if="allowCheckIn"
        type="is-primary"
        @click="fillForm"
      ) {{fillFormStr}}
</template>
<i18n lang="yaml">
en:
  title: Guidelines for Prevention and Protection of COVID-19 during g0v Summit
  cancel: Visit g0v Summit 2020
  fillHealth: Fill Health Declaration Form
  fillBuilding: Check info a Building
zh:
  title: g0v Summit COVID-19 防疫守則
  cancel: 瀏覽活動網頁
  fillHealth: 填寫健康聲明
  fillBuilding: 登記入館
</i18n>
<script>
import { mapGetters } from 'vuex'
import { GETTERS } from '~/store'

export default {
  computed: {
    ...mapGetters({
      hasHealthInfo: GETTERS.CUR_HEALTH_INFO,
      allowCheckIn: GETTERS.ALLOW_CHECK_IN
    }),
    fillFormStr () {
      if (this.hasHealthInfo) {
        return this.$t('fillBuilding')
      }
      return this.$t('fillHealth')
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    fillForm () {
      this.$emit('fill-form')
    }
  }
}
</script>
