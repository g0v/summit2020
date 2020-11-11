<template lang="pug">
  .guidelines
    health-modal(:active="true")
      covid19-guidelines(
        @fill-form="fillForm"
        @cancel="cancel"
      )
</template>
<script>
// TODO: show this when first onboard
import Covid19Guidelines from '~/components/Covid19Guidelines'
import HealthModal from '~/components/HealthModal'

export default {
  components: {
    Covid19Guidelines,
    HealthModal
  },
  methods: {
    cancel () {
      this.$router.push(this.localePath('/'))
    },
    fillForm () {
      this.$router.push(this.localePath('/building-check-in'))
    }
  }
}
</script>
