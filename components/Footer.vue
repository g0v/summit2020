<template>
  <div class="footer">
    <div>
      <div class="license">
        Copyright CC by 4.0 @g0v Summit 2020
      </div>
      <div class="icon-container">
        <a href="https://www.facebook.com/g0v.tw">
          <img :src="require('~/assets/images/v2/icon-fb.svg')" alt="g0v facebook">
        </a>
        <a href="http://join.g0v.tw">
          <img :src="require('~/assets/images/v2/icon-slack.svg')" alt="g0v slack">
        </a>
        <a href="https://twitter.com/g0vtw">
          <img :src="require('~/assets/images/v2/icon-twitter.svg')" alt="g0v twitter">
        </a>
        <a href="https://github.com/g0v/summit2020">
          <img :src="require('~/assets/images/v2/icon-GitHub.svg')" alt="g0v GitHub">
        </a>
        <a href="mailto:host@summit.g0v.tw">
          <img :src="require('~/assets/images/v2/icon-email.svg')" alt="g0v email">
        </a>
      </div>
    </div>
  </div>
</template>
<i18n lang="yaml">
// ref: https://nuxt-community.github.io/nuxt-i18n/vue-i18n-loader.html
en:
  follow: Follow
  collaboration: Collab
  g0vUrl: http://g0v.tw/en-US/
zh:
  follow: 追蹤
  collaboration: 協作
  g0vUrl: http://g0v.tw/
</i18n>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.footer {
  height: 156px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: $blue-2;
  .license, .icon-container {
    max-width: 320px;
    margin: auto;
    text-align: center;
  }
  .license {
    margin-bottom: 30px;
  }
  .icon-container {
    > a {
      color: white;
      padding: 0 0.5rem;
    }
  }
}
</style>
