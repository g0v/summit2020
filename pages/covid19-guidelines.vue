<template lang="pug">
  .guidelines
    health-modal(:active="true")
      covid19-guidelines(
        @fill-form="fillForm"
        @cancel="cancel"
      )
</template>
<script>
import Covid19Guidelines from '~/components/Covid19Guidelines'
import HealthModal from '~/components/HealthModal'
import { friendlyHeader, summaryFromMarkdown } from '~/utils/crawlerFriendly'

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
  },
  head: friendlyHeader({
    title () {
      return this.$t('covid19Guidelines')
    },
    description () {
      return summaryFromMarkdown(this.$t('article/healthGuidelines'))
    }
  })
}
</script>
