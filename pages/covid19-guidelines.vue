<template lang="pug">
  .guidelines
    health-modal(:active="true")
      covid19-guidelines
</template>
<script>
import Covid19Guidelines from '~/components/Covid19Guidelines'
import HealthModal from '~/components/HealthModal'

export default {
  components: {
    Covid19Guidelines,
    HealthModal
  }
}
</script>
