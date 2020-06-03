<template>
  <div class="footer">
    <div class="icon-container">
      <nuxt-link class="text" :to="'#'">
        {{ $t('follow') }}
      </nuxt-link>
      <a class="g0v-icon" :href="$t('g0vUrl')" />
      <a class="fa fa-facebook-f" href="https://www.facebook.com/g0v.tw/" />
      <a class="fa fa-twitter" href="https://twitter.com/g0vtw" />
      <nuxt-link class="text" :to="'#'">
        {{ $t('collaboration') }}
      </nuxt-link>
      <a class="fa fa-slack" href="http://join.g0v.today/" />
      <a class="fa fa-github" href="https://github.com/g0v/summit2020" />
      <!-- <nuxt-link class="fa fa-file-text" :to="'#'">
        {{ $t('') }}
      </nuxt-link> -->
      <nuxt-link class="fa fa-envelope" :to="'#'">
        {{ $t('') }}
      </nuxt-link>
    </div>
    <span class="text">
      Copyright <span class="fa fa-copyright" /> g0v Summit 2020
    </span>
  </div>
</template>
<i18n lang="yaml">
// ref: https://nuxt-community.github.io/nuxt-i18n/vue-i18n-loader.html
en:
  follow: Follow Us
  collaboration: Collaboration
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  color: #555555;
  background-color: #fff;
  padding: .5rem 2rem;
  @media (max-width: 960px) {
    flex-direction: column;
  }
  .icon-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    @media (max-width: 960px) {
      width: 70%;
      margin-bottom: 8px;
    }
    @media (max-width: 680px) {
      width: 100%;
    }
    .g0v-icon {
      background-image: url('../assets/images/scene_16.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position-x: center;
      height: 15px;
      width: 3em;
    }
  }
  a {
    flex-shrink: 0;
    color: #50BC83;
    display: inline-block;
    text-align: center;
    @media (max-width: 540px) {
      margin-top: 8px;
      width: 20%;
      &:nth-child(1) {
        width: 25%;
      }
      &:nth-child(2) {
        width: 25%;
      }
      &:nth-child(3) {
        width: 25%;
      }
      &:nth-child(4) {
        width: 25%;
      }
    }
  }
  .text {
    color: #555555;
  }
}
</style>
