<template lang="pug">
  .confirm-checkin.tc
    svg(width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg")
      circle(cx="54" cy="54" r="54" fill="#4BE2F2")
      path(d="M23 54L43 74L63.5 53.5L84 33" stroke="white" stroke-width="5")
    .f3.mv4.center(v-html="message")
    b-button(
      rounded
      type="is-primary"
      @click="close"
    )
      | {{$t('confirm')}}
</template>
<i18n lang="yaml">
en:
  confirm: Got it!
zh:
  confirm: 了解！
</i18n>
<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
import { GETTERS } from '~/store'

export default {
  props: {
    payload: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters({
      curHealthInfo: GETTERS.CUR_HEALTH_INFO
    }),
    healthInfo () {
      return this.curHealthInfo || {}
    },
    needLearningCredit () {
      return !!this.healthInfo.needLearningCredit
    },
    message () {
      const now = dayjs().format('HH:mm')
      const isSignin = this.payload.signinInfo === '簽到'
      if (this.$i18n.locale === 'zh') {
        let verb = '簽到'
        if (this.needLearningCredit && !isSignin) {
          verb = '簽退'
        }
        return `您已於 ${now} 在<br /> ${this.payload.building} ${verb}`
      }
      let verb = 'checked into'
      if (this.needLearningCredit) {
        verb = isSignin ? 'signned-in to' : 'signned-out to'
      }
      return `Yov've ${verb}<br /> ${this.payload.building} at ${now}`
    }
  },
  methods: {
    close () {
      this.$emit('confirm-done')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
