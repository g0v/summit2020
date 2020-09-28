<template lang="pug">
  nav.navbar
    .navbar__banner.flex.justify-between-l.items-center.h-100
      .db.dn-l
        button.bn.pa2.bg-white(@click="toggleMobileMenu")
          i.fa.fa-bars
      nuxt-link.navbar__logo.flex-auto.flex-none-l.tc(:to="localePath('/')")
        img.h-100(src="~/assets/images/logo-singleline.svg")
      .dn.flex-l.items-center
        summit-menu
</template>
<script>
import SummitMenu from './SummitMenu'

export default {
  components: {
    SummitMenu
  },
  methods: {
    toggleMobileMenu () {
      this.$emit('toggle')
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
