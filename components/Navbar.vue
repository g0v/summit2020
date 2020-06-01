<template>
  <div class="navbar flex flex-row-l justify-between items-center bb b--moon-gray shadow-1" :class="{'en-css': isUseENCSS}">
    <nuxt-link class="logo" @click.native="isShowNavbarCollapse = !isShowNavbarCollapse" :to="localePath('/')"></nuxt-link>
    <nav>
      <button @click="isShowNavbarCollapse = !isShowNavbarCollapse" class="navbar-toggler">
        <i class="fa fa-bars"></i>
      </button>
      <div class="navbar-collapse head flex items-center" :class="{'show':isShowNavbarCollapse}">
        <template v-for="menu in menuList">
          <nuxt-link
            v-if="!menu.isExt"
            :key="menu.key"
            :to="localePath(menu.url)"
            @click.native="isShowNavbarCollapse = !isShowNavbarCollapse"
          >
            {{ $t(menu.key) }}
          </nuxt-link>
          <a
            v-else
            :key="menu.key"
            :href="menu.url"
            @click="isShowNavbarCollapse = !isShowNavbarCollapse"
            rel="noopener"
            target="_blank"
          >
            {{ $t(menu.key) }}
          </a>
        </template>
      </div>
    </nav>
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
  { key: 'speakers', url: '/speakers' },
  { key: 'agenda', url: '/agenda' },
  { key: 'transport', url: '/transport' }
]
export default {
  data () {
    return {
      isShowNavbarCollapse: false,
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
  },
  computed: {
    isUseENCSS () {
      return this.$i18n.locale === 'en'
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
    top: 0.75rem;
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
  .navbar-toggler {
    display: none;
    color: #50BC83;
    background: #fff;
    outline: none;
    border: #fff solid;
    border-radius: 8px;
  }
  a {
    color: #fff;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    width: 3em;
  }
  a:first-child {
    text-align: left;
  }
  .tail {
    a {
      text-align: right;
    }
  }
}
// english css
.navbar.en-css {
  .navbar-collapse {
    a {
      width: 5em;
    }
  }
}
// mobile navbar
@media (max-width: 1375px) {
  .navbar {
    align-items: start;
    .navbar-toggler {
      display: block;
    }
    .navbar-collapse {
      display: none;
      a:first-child {
        text-align: center;
      }
    }
    .navbar-collapse.show {
      display: flex;
      flex-direction: column;
      a {
        padding: 1.5rem 0;
      }
    }
  }
}
@media (max-width: 735px) {
  .navbar {
    justify-content: center;
    padding-top: 4rem;
    .logo {
      width: 300px;
      height: 40px;
    }
  }
}
</style>
