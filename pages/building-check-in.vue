<template lang="pug">
  .checkin-page
    check-in-modal(:active.sync="active")
</template>
<script>
import CheckInModal from '~/components/CheckInModal'
import { friendlyHeader } from '~/utils/crawlerFriendly'

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
        this.$router.push(this.localePath('/'))
      }
    }
  },
  head: friendlyHeader({
    title () {
      return this.$t('buildingCheckIn')
    }
  })
}
</script>
