<template>
  <div class="footer flex flex-column flex-row-l justify-between items-center bb b--moon-gray shadow-1">
    <div class="icon-container">
      <nuxt-link class="text" :to="'#'">
        {{ $t('example') }}
      </nuxt-link>
      <nuxt-link :to="'#'">
        <img src="https://fakeimg.pl/50x50/" alt="img">
      </nuxt-link>
      <nuxt-link class="fa fa-facebook-f" :to="'#'">
        {{ $t('') }}
      </nuxt-link>
      <nuxt-link class="fa fa-twitter" :to="'#'">
        {{ $t('') }}
      </nuxt-link>
      <nuxt-link class="text" :to="'#'">
        {{ $t('speakers') }}
      </nuxt-link>
      <nuxt-link class="fa fa-slack" :to="'#'">
        {{ $t('') }}
      </nuxt-link>
      <nuxt-link class="fa fa-github" :to="'#'">
        {{ $t('') }}
      </nuxt-link>
      <nuxt-link class="fa fa-file-text" :to="'#'">
        {{ $t('') }}
      </nuxt-link>
      <nuxt-link class="fa fa-envelope" :to="'#'">
        {{ $t('') }}
      </nuxt-link>
    </div>
    <nuxt-link class="text" :to="'#'">
      Copyright <span class="fa fa-copyright" /> g0v Summit 2020
    </nuxt-link>
  </div>
</template>
<i18n lang="yaml">
// ref: https://nuxt-community.github.io/nuxt-i18n/vue-i18n-loader.html
en:
  example: xxx
  speakers: xx
zh:
  example: 追蹤
  speakers: 協作

</i18n>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: 9999;
  font-family: Noto Sans CJK TC;
  font-size: 2rem;
  @media (max-width: 1681px) {
    font-size: 1.5625rem;
  }
  background-color: #fff;
  padding: 1.5rem 2rem;
  .icon-container {
    display: flex;
    align-items: center;
    a {
      width: 3em;
      @media (max-width: 1681px) {
        font-size: 1.5625rem;
      }
    }
  }
  a {
    font-size: 2rem;
    @media (max-width: 1681px) {
      font-size: 1.5625rem;
    }
    color: #50BC83;
    text-decoration: none;
    display: inline-block;
    text-align: center;
  }
  .text {
    color: #555555;
  }
}
</style>
