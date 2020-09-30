<template lang="pug">
  .footer
    .footer__content.h-100.flex.flex-column.justify-center.items-center
      .license
        ext-link.white(to="https://creativecommons.org/licenses/by-sa/4.0/deed.zh_TW") CC by 4.0
        | &nbsp;g0v Summit 2020
      .icon-container
        ext-link(to="https://www.facebook.com/g0v.tw")
          img(:src="require('~/assets/images/icon-fb.svg')" alt="g0v Facebook")
        ext-link(to="http://join.g0v.tw")
          img(:src="require('~/assets/images/icon-slack.svg')" alt="Join g0v Slack")
        ext-link(to="https://twitter.com/g0vtw")
          img(:src="require('~/assets/images/icon-twitter.svg')" alt="g0v Twitter")
        ext-link(to="https://github.com/g0v/summit2020")
          img(:src="require('~/assets/images/icon-GitHub.svg')" alt="Source Code")
        a(href="mailto:host@summit.g0v.tw")
          img(:src="require('~/assets/images/icon-email.svg')" alt="g0v Summit 2020 Email")
</template>
<i18n lang="yaml">
// ref: https://nuxt-community.github.io/nuxt-i18n/vue-i18n-loader.html
en:
  g0vUrl: http://g0v.tw/en-US/
zh:
  g0vUrl: http://g0v.tw/
</i18n>
<script>
import ExtLink from '~/components/ExtLink'
export default {
  components: {
    ExtLink
  }
}
</script>
<style lang="scss" scoped>
.footer {
  height: 156px;
  color: white;
  background-color: $blue-2;
  &__content {
    position: sticky;
    left: 0;
    width: 100%;
    max-width: 100vw;
  }
  .license, .icon-container {
    max-width: 320px;
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
