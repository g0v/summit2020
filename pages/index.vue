<template>
  <div>
    <div class="landing flex justify-center items-center bg-near-white">
      <img class="g0v-logo" :src="require('~/assets/images/g0v-logo.svg')">
    </div>
    <div class="content">
      <div class="article">
        <img class="blue-circle" :src="require('~/assets/images/blue-circle.svg')">
        <summit-markdown :content="$t('article/communityIntro')" />
      </div>
      <div class="article">
        <img class="green-circle" :src="require('~/assets/images/green-circle.svg')">
        <summit-markdown :content="$t('article/summitAbout')" />
        <summit-markdown :content="$t('article/summitIntro')" />
        <summit-markdown :content="$t('article/summitContent')" />
      </div>
      <div class="article">
        <img class="blue-circle" :src="require('~/assets/images/blue-circle.svg')">
        <img class="green-circle" :src="require('~/assets/images/green-circle.svg')">
        <summit-markdown :content="$t('article/summitGuidelines')" />
      </div>
    </div>
    <div>
      <img :src="require('~/assets/images/timeline.svg')">
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
/deep/ * {
  color: #555555;
  line-height: 1.7;
}
.landing {
  min-height: 90vh;
  max-height: 922px;
  position: relative;
  background: url("../assets/images/banner.png") center center no-repeat;
  background-size: cover;
  .g0v-logo {
    width: 25vw;
  }
}
.content {
  margin: auto;
  max-width: 970px;
  /deep/ h1 {
    color: #50bc83;
    font-size: 1.5em;
  }
  /deep/ h2 {
    font-weight: normal;
    color: #50bc83;
    font-size: 1.3em;
  }
  .article {
    margin: 150px 0;
    position: relative;
    &:first-of-type {
      margin-top: 0;
    }
  }
  .blue-circle,
  .green-circle {
    position: absolute;
    width: 15vw;
  }
  .blue-circle {
    left: -20vw;
    top: 5vh;
    transform: rotate(180deg);
  }
  .green-circle {
    right: -20vw;
    bottom: 20vh;
  }
}
</style>
