<template>
  <div class="navbar" :class="{'en-css': isUseENCSS}">
    <nav class="nav">
      <button class="navbar-toggler" @click="isShowNavbarCollapse = !isShowNavbarCollapse">
        <i class="fa fa-bars" />
      </button>
      <div class="navbar-collapse" :class="{'show':isShowNavbarCollapse}">
        <template v-for="menu in menuList">
          <nuxt-link
            v-if="!menu.isExt"
            :key="menu.key"
            :to="localePath(menu.url)"
            @click.native="isShowNavbarCollapse = false"
          >
            {{ $t(menu.key) }}
          </nuxt-link>
          <a
            v-else
            :key="menu.key"
            :href="menu.url"
            rel="noopener"
            target="_blank"
            @click="isShowNavbarCollapse = !isShowNavbarCollapse"
          >
            {{ $t(menu.key) }}
          </a>
        </template>
      </div>
    </nav>
    <nuxt-link class="logo" :to="localePath('/')" @click.native="isShowNavbarCollapse = false" />
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
<script>
const MENU_LIST = [
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
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  width: 100%;
  z-index: 9999;
  background-color: #50BC83;
  border: none;
  height: $nav-height;
  > .nav {
    flex-shrink: 0;
  }
  > .logo {
    $origW: 2280px; // original w/h
    $origH: 400px;
    $h: 50px;
    display: block;
    margin: ($nav-height - $h) / 2 auto;
    flex-basis: $origW * $h / $origH;
    height: $h;
    flex-shrink: 1;
    background-image: url('../assets/images/ocean-islands/logo-singleline-simple.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  > .tail {
    flex-basis: 2.25rem;
    flex-shrink: 0;
    text-align: right;
    a {
      min-width: 4rem;
      padding: 0.75rem;
    }
  }
  a {
    color: #fff;
    text-decoration: none;
    display: inline-block;
    text-align: center;
  }
  .navbar-toggler {
    display: none;
    color: white;
    background: none;
    outline: none;
    border: none;
  }
  .navbar-collapse {
    margin-left: 0.75rem;
    display: flex;
    a {
      padding: 0.25rem;
    }
  }
}
// english css
.navbar.en-css {
  .navbar-collapse {
    a {
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
      background-color: #50BC83;
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
