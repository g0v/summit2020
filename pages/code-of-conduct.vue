<template lang="pug">
  .coc.mw8.center.pa3.ph5-l
    h1.ph3 {{$t('coc')}}
    summit-markdown(:content="$t('article/summitGuidelines')")
</template>
<style lang="scss" scoped>
.coc {
  /deep/ {
    h2 {
      display: none;
    }
  }
}
</style>
