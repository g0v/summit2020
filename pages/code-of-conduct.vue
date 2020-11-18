<template lang="pug">
  .coc.mw8.center.pa3.ph5-l
    h1.ph3 {{$t('coc')}}
    summit-markdown(:content="$t('article/summitGuidelines')")
</template>
<script>
import { friendlyHeader, summaryFromMarkdown } from '~/utils/crawlerFriendly'
export default {
  head: friendlyHeader({
    title () {
      return this.$t('coc')
    },
    description () {
      return summaryFromMarkdown(this.$t('article/summitGuidelines'))
    }
  })
}
</script>
<style lang="scss" scoped>
.coc {
  /deep/ {
    h2 {
      display: none;
    }
  }
}
</style>
