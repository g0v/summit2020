<template>
  <div class="navbar flex flex-column flex-row-l justify-between items-center pa3 bb b--moon-gray shadow-1 bg-white relative z-1">
    <div class="head flex items-center">
      <nuxt-link class="pv2 ph3 ba b--moon-gray dib mr3" :to="localePath('/')">
        LOGO
      </nuxt-link>
      <template v-for="menu in menuList">
        <nuxt-link
          v-if="!menu.isExt"
          :key="menu.key"
          class="dim black fw5 mr3 no-underline bb b--silver pb1"
          :to="localePath(menu.url)"
        >
          {{ $t(menu.key) }}
        </nuxt-link>
        <a
          v-else
          :key="menu.key"
          class="dim black no-underline fw5 mr3 bb b--silver pb1"
          :href="menu.url"
          rel="noopener"
          target="_blank"
        >
          {{ $t(menu.key) }}
        </a>
      </template>
    </div>
    <div class="tail">
      <nuxt-link v-if="$i18n.locale === 'zh'" :to="switchLocalePath('en')">
        English
      </nuxt-link>
      <nuxt-link v-else :to="switchLocalePath('zh')">
        華語
      </nuxt-link>
    </div>
  </div>
</template>
<i18n lang="yaml">
// ref: https://nuxt-community.github.io/nuxt-i18n/vue-i18n-loader.html
en:
  example: Example Page
  speakers: Speakers
  agenda: Agenda
  partners: Partners
  transport: Transport
  live: Live
  feed: Feed
  staff: Staff
  registration: Registration
zh:
  example: 範例頁面
  speakers: 講者
  agenda: 投稿
  partners: 合作夥伴
  transport: 交通
  live: 直播
  feed: 社群動態
  staff: 工作人員
  registration: 立即購票

</i18n>
<script>
const MENU_LIST = [
  { key: 'example', url: '/example' },
  { key: 'speakers', url: '/speakers' },
  { key: 'agenda', url: '/agenda' },
  { key: 'partners', url: '/partners' },
  { key: 'transport', url: '/transport' },
  { key: 'live', url: 'https://some.live.url.com', isExt: true },
  { key: 'feed', url: 'https://some.feed.url.com', isExt: true },
  { key: 'staff', url: '/staff' },
  { key: 'registration', url: 'https://xxx.kktix.com', isExt: true }
]
export default {
  data () {
    return {
      menuList: MENU_LIST
    }
  }
}
</script>
