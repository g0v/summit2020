<template lang="pug">
  .checkin-page
    check-in-modal(:active="true")
</template>
<script>
import CheckInModal from '~/components/CheckInModal'

export default {
  components: {
    CheckInModal
  }
}
</script>
