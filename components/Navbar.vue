<template>
  <div class="navbar flex flex-column flex-row-l justify-between items-center bb b--moon-gray shadow-1">
    <nuxt-link class="logo" :to="localePath('/')"></nuxt-link>
    <div class="head flex items-center">
      <template v-for="menu in menuList">
        <nuxt-link
          v-if="!menu.isExt"
          :key="menu.key"
          :to="localePath(menu.url)"
        >
          {{ $t(menu.key) }}
        </nuxt-link>
        <a
          v-else
          :key="menu.key"
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
        Eng
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
  { key: 'transport', url: '/transport' }
]
export default {
  data () {
    return {
      menuList: MENU_LIST,
      allMenuList: [
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
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 9999;
  font-family: Noto Sans CJK TC;
  font-size: 2rem;
  @media (max-width: 1681px) {
    font-size: 1.5625rem;
  }
  background-color: #50BC83;
  padding: 1.5rem 2rem;
  .logo {
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    // z-index: 99;
    background-image: url('../assets/images/headerLogo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 428px;
    height: 58px;
  }
  a {
    color: #fff;
    text-decoration: none;
    display: inline-block;
    width: 4em;
    text-align: center;
  }
}
</style>
