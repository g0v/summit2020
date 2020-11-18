<template lang="pug">
  .checkin-modal
    health-modal(:active.sync="isModalActive")
      component(
        :is="contentConponent"
        :payload="buildingPayload"
        @reset="redeclareHealth"
        @health-done="healthDone"
        @building-done="buildingDone"
        @confirm-done="confirmDone"
      )
</template>
<i18n lang="yaml">
en:
  healthDone: Health form submitted. See you in g0v Summit!
zh:
  healthDone: 已送出健康聲明書。g0v Summit 時見！
</i18n>
<script>
import { mapGetters } from 'vuex'
import { GETTERS } from '~/store'
import HealthModal from '~/components/HealthModal'
import HealthDeclForm from '~/components/HealthDeclForm'
import BuildingCheckInForm from '~/components/BuildingCheckInForm'
import ConfirmCheckIn from '~/components/ConfirmCheckIn'
import { ALLOW_CHECK_IN } from '~/utils/scheduleInfo'

export default {
  components: {
    HealthModal
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: this.active,
      hasToResetHealthDecl: false,
      buildingPayload: null
    }
  },
  computed: {
    ...mapGetters({
      curHealthInfo: GETTERS.CUR_HEALTH_INFO
    }),
    contentConponent () {
      if (this.buildingPayload) {
        return ConfirmCheckIn
      } else if (this.curHealthInfo && !this.hasToResetHealthDecl && ALLOW_CHECK_IN) {
        return BuildingCheckInForm
      }
      return HealthDeclForm
    }
  },
  watch: {
    active (newVal) {
      this.isModalActive = newVal
    },
    isModalActive (isActive) {
      if (isActive) {
        this.reset()
      }
      this.$emit('update:active', isActive)
    }
  },
  methods: {
    reset () {
      this.buildingPayload = null
      this.hasToResetHealthDecl = false
    },
    redeclareHealth () {
      this.hasToResetHealthDecl = true
    },
    healthDone () {
      this.hasToResetHealthDecl = false
      if (!ALLOW_CHECK_IN) {
        this.isModalActive = false
        this.$buefy.dialog.alert({
          message: this.$t('healthDone')
        })
      }
    },
    buildingDone (payload) {
      this.buildingPayload = payload
    },
    confirmDone () {
      this.isModalActive = false
    }
  }
}
</script>
