<template>
  <div>
    <div class="landing flex justify-center items-center bg-near-white">
      <h1>{{ $t('welcome') }}</h1>
    </div>
    <div class="content">
      <div>
        <summit-markdown :content="$t('article/communityIntro')"></summit-markdown>
      </div>
      <div>
        <summit-markdown :content="$t('article/summitIntro')"></summit-markdown>
      </div>
      <div>
        <summit-markdown :content="$t('article/summitGuidelines')"></summit-markdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
/deep/ *{
  color:#555555;
  line-height: 1.7;
}
.landing {
  min-height: 50vh;
  max-height: 922px;
}
.content {
  width: 100%;
  padding: 0 20%;
  /deep/ h1 {
    color:#50BC83;
    font-size: 32px;
  }
}

</style>
