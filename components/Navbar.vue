<template>
  <div class="navbar bb shadow-1" :class="{'en-css': isUseENCSS}">
    <nav>
      <button class="navbar-toggler" @click="isShowNavbarCollapse = !isShowNavbarCollapse">
        <i class="fa fa-bars" />
      </button>
      <div class="navbar-collapse" :class="{'show':isShowNavbarCollapse}">
        <template v-for="menu in menuList">
          <nuxt-link
            v-if="!menu.isExt"
            :key="menu.key"
            :to="localePath(menu.url)"
            @click.native="onClickNavItem"
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
    <div>
      <nuxt-link class="logo" :to="localePath('/')" @click.native="isShowNavbarCollapse = false" />
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
  },
  methods: {
    onClickNavItem () {
      this.isShowNavbarCollapse = !this.isShowNavbarCollapse
      if (process.client) {
        setTimeout(() => (document.querySelector('.pages-container').scrollTop = 0), 5)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  // align-items: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // position: fixed;
  top: 0;
  width: 100vw;
  z-index: 9999;
  background-color: #50BC83;
  padding: 1rem 2rem;
  border: none;
  & > * {
    width: 33.333%;
  }
  & > *:nth-child(3) {
    text-align: right;
  }
  .logo {
    // position: fixed;
    // top: 0.75rem;
    // left: 0;
    // right: 0;
    // margin: auto;
    // // z-index: 99;
    background-image: url('../assets/images/headerLogo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position-x: center;
    width: 100%;
    // width: 200px;
    height: 46px;
    display: block;
    margin: auto;
  }
  .navbar-toggler {
    display: none;
    color: #50BC83;
    background: #fff;
    outline: none;
    border: #fff solid;
    border-radius: 8px;
    padding: 5px;
  }
  a {
    color: #fff;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    width: 3em;
  }
  .navbar-collapse {
    display: flex;
    a:first-child {
      text-align: left;
    }
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
@media (max-width: 950px) {
  .navbar {
    align-items: start;
    padding: 1rem 2rem 0;
    & > *:nth-child(2) {
      // flex: 1 0 200px;
      // flex-shrink: 0;
      // width: 200px;
    }
    .logo {
      width: 200px;
      // height: 46px;
    }
    .navbar-toggler {
      display: block;
      padding: 0 5px;
      font-size: 20px;
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
      position: absolute;
      background-color: #50BC83;
      width: 100vw;
      left: 0;
      padding-left: 2rem;
      z-index: 9999;
      box-shadow: 0 4px 4px -2px rgba( 0, 0, 0, .2 );
      a {
        padding: 10px 0;
      }
    }
  }
}
@media (max-width: 720px) {
  .navbar {
    & > * {
      width: auto;
    }
    .logo {
      width: 200px;
    }
  }
}
@media (max-width: 480px) {
  .navbar {
    padding: 1rem 1rem 0;
    .logo {
      width: 160px;
    }
  }
}
</style>
