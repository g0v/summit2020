<template lang="pug">
  .checkin-page
    check-in-modal(:active.sync="active")
</template>
<script>
import CheckInModal from '~/components/CheckInModal'

export default {
  components: {
    CheckInModal
  },
  data () {
    return {
      active: true
    }
  },
  watch: {
    active (isActive) {
      if (!isActive) {
        this.$router.push('/')
      }
    }
  }
}
</script>
