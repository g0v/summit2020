<template>
  <div class="navbar flex flex-column flex-row-l justify-between items-center pa3 bb b--moon-gray shadow-1 bg-white relative z-1">
    <div class="head flex items-center">
      <nuxt-link class="pv2 ph3 ba b--moon-gray dib mr3" :to="localePath('/')">
        LOGO
      </nuxt-link>
      <nuxt-link class="dim black no-underline" :to="localePath('/example')">
        {{ $t('example') }}
      </nuxt-link>
    </div>
    <div class="tail">
      <nuxt-link v-if="$i18n.locale === 'zh'" :to="switchLocalePath('en')">
        En
      </nuxt-link>
      <nuxt-link v-else :to="switchLocalePath('zh')">
        華
      </nuxt-link>
    </div>
  </div>
</template>
<i18n lang="yaml">
// ref: https://nuxt-community.github.io/nuxt-i18n/vue-i18n-loader.html
en:
  example: Example Page
zh:
  example: 範例頁面
</i18n>
<script>
export default {

}
</script>
