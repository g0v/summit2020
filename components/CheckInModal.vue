<template lang="pug">
  .checkin-modal
    health-modal(:active.sync="isModalActive")
      component(
        :is="contentConponent"
        @reset="redeclareHealth"
        @health-done="healthDone"
        @building-done="buildingDone"
      )
</template>
<script>
import { mapGetters } from 'vuex'
import { GETTERS } from '~/store'
import HealthModal from '~/components/HealthModal'
import HealthDeclForm from '~/components/HealthDeclForm'
import BuildingCheckInForm from '~/components/BuildingCheckInForm'
import ConfirmCheckIn from '~/components/ConfirmCheckIn'

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
      isDone: false
    }
  },
  computed: {
    ...mapGetters({
      curHealthInfo: GETTERS.CUR_HEALTH_INFO
    }),
    contentConponent () {
      if (this.isDone) {
        return ConfirmCheckIn
      } else if (this.curHealthInfo && !this.hasToResetHealthDecl) {
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
      this.isDone = false
      this.hasToResetHealthDecl = false
    },
    redeclareHealth () {
      this.hasToResetHealthDecl = true
    },
    healthDone () {
      this.hasToResetHealthDecl = false
    },
    buildingDone () {
      this.isDone = true
    }
  }
}
</script>
