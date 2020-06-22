<template>
  <div class="footer">
    <div class="icon-container">
      <a class="g0v-icon" :href="$t('g0vUrl')" />
      <a class="fa fa-facebook-f" href="https://www.facebook.com/g0v.tw" />
      <a class="fa fa-twitter" href="https://twitter.com/g0vtw" />
      <a class="fa fa-slack" href="http://join.g0v.tw" />
      <a class="fa fa-github" href="https://github.com/g0v/summit2020" />
      <a class="fa fa-envelope" href="mailto:host@summit.g0v.tw" />
    </div>
    <div class="license">
      CC BY 4.0
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
  height: $footer-height;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-wrap: no-wrap;
  justify-content: space-between;
  color: $gray;
  background-color: white;
  z-index: 9999;
  .icon-container {
    display: flex;
    flex-wrap: no-wrap;
    flex-grow: 1;
    padding: 0 0.5rem;
    max-width: 320px;
    > a {
      flex-shrink: 0;
      flex-grow: 1;
      color: #50BC83;
      display: inline-block;
      text-align: center;
      padding: 0.5rem;
    }
    > a.g0v-icon {
      background-image: url('../assets/images/scene_16.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 75%;
      width: 64px;
      height: 32px;
    }
  }
  .license {
    display: none;
    flex-grow: 0;
    @media (min-width: 640px) {
      display: block;
    }
    line-height: 32px;
    font-size: 14px;
    padding: 0 16px;
  }
}
</style>
