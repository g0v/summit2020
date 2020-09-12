<template>
  <div class="navbar">
    <nav class="nav mr2">
      <button class="navbar-toggler" @click="isShowNavbarCollapse = !isShowNavbarCollapse">
        <i class="fa fa-bars" />
      </button>
      <div class="navbar-collapse" :class="{'show':isShowNavbarCollapse}">
        <template v-for="menu in menuList">
          <component
            :is="menu.isExt ? 'ext-link' : 'nuxt-link'"
            :key="menu.key"
            :to="genLink(menu)"
            @click.native="isShowNavbarCollapse = false"
          >
            {{ $t(menu.key) }}
          </component>
        </template>
      </div>
    </nav>
    <nuxt-link class="logo w4 w5-l h-100" :to="localePath('/')" @click.native="isShowNavbarCollapse = false" />
    <div class="tail">
      <nuxt-link v-if="$i18n.locale === 'zh'" :to="switchLocalePath('en')">
        English
      </nuxt-link>
      <nuxt-link v-else :to="switchLocalePath('zh')">
        中文
      </nuxt-link>
    </div>
  </div>
</template>
<i18n lang="yaml">
en:
  speakers: 'Speakers'
  cfp: 'Get Latest Proposals'
  agenda: 'Agenda'
  partners: 'Partners'
  cosponsor: 'Cosponsor'
  transport: 'Transportation'
  live: 'Live'
  feed: 'Feed'
  staff: 'Staff'
  registration: 'Registration'
zh:
  speakers: '講者'
  cfp: '看議程投稿'
  agenda: '議程'
  partners: '合作夥伴'
  cosponsor: '共同主辦'
  transport: '交通'
  live: '直播'
  feed: '社群動態'
  staff: '工作人員'
  registration: '立即購票'
</i18n>
<script>
import ExtLink from '~/components/ExtLink'

const MENU_LIST = [
  { key: 'transport', url: '/transport' },
  { key: 'cfp', url: 'https://propose.summit2020.g0v.tw/proposal-list', isExt: true }
]
export default {
  components: {
    ExtLink
  },
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
  methods: {
    genLink (menu) {
      if (menu.isExt) {
        return menu.url
      }
      return this.localePath(menu.url)
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 9999;
  background-color: #fff;
  border: none;
  height: $nav-height;
  border-bottom: 1.5px solid $pink-1;
  > .logo {
    background-image: url('../assets/images/v2/logo-singleline.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  > .tail {
    a {
      min-width: 4rem;
      padding: 0.75rem;
      color: $pink-1;
    }
    a:hover {
      color: $gray-1;
    }
  }
  a {
    color: $gray-1;
    text-decoration: none;
    display: inline-block;
    text-align: center;
  }
  a:hover {
    color: $pink-1;
  }
  .navbar-toggler {
    display: none;
    color: $gray;
    background: none;
    outline: none;
    border: none;
  }
  .navbar-collapse {
    margin-left: 0.75rem;
    display: flex;
    a {
      padding: 0.25rem 0.5rem;
      &:not(:first-child) {
        margin-left: 0.5rem;
      }
    }
  }
}

// mobile navbar
@media (max-width: 640px) {
  .navbar {
    .navbar-toggler {
      display: block;
      padding: 0.5rem 1rem;
      font-size: 1.5rem;
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
      background-color: white;
      width: 100vw;
      position: absolute;
      top: $nav-height;
      left: 0;
      z-index: 9999;
      margin: 0;
      padding: 0.25rem 0;
      > a {
        margin: 0;
        padding: 0.25rem;
      }
    }
  }
}
</style>
