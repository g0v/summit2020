<template lang="pug">
  nav.navbar
    .navbar__banner.flex.justify-between-l.items-center.h-100
      .db.dn-l
        button.bn.pa2.bg-white(@click="openMobileMenu")
          i.fa.fa-bars
      nuxt-link.navbar__logo.flex-auto.flex-none-l.tc(:to="localePath('/')")
        img.h-100(src="~/assets/images/v2/logo-singleline.svg")
      .dn.flex-l.items-center
        summit-menu
    .mobilemenu.fixed.top-0.db.dn-l.z-999(v-show="isMobileMenuVisible")
      .mobilemenu__wrapper.vh-100.overflow-y-auto.bg-black-50(
        @click="closeMobileMenu"
      )
        .mobilemenu__content.vh-100.w-80.ph3.pv1.flex.flex-column.justify-between(
          @click.stop
        )
          summit-menu(@click.native="closeMobileMenu")
</template>
<script>
import SummitMenu from './SummitMenu'

export default {
  components: {
    SummitMenu
  },
  data () {
    return {
      isMobileMenuVisible: false
    }
  },
  methods: {
    openMobileMenu () {
      this.isMobileMenuVisible = true
    },
    closeMobileMenu () {
      this.isMobileMenuVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  background: white;
  &__banner {
    padding: 8px 12px;
    @include large-screen {
      padding: 18px 72px 18px 80px;
    }
  }
  &__logo {
    height: 36px;
    @include large-screen {
      height: 46px;
    }
  }
}

.mobilemenu {
  &__wrapper {
    width: 100vw;
  }
  &__content {
    background: rgba(255, 255, 255, .93);
  }
}
</style>
