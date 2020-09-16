<template lang="pug">
  nav.navbar
    .navbar__banner.flex.justify-between-l.items-center.h-100
      .db.dn-l
        button.bn.pa2.bg-white(@click="openMobileMenu")
          i.fa.fa-bars
      nuxt-link.navbar__logo.flex-auto.flex-none-l.tc(:to="localePath('/')")
        img.h-100(src="~/assets/images/v2/logo-singleline.svg")
      .dn.flex-l.items-center
        template(v-for="menu in menuList")
          component.navbar__item.dim.pa2.mr3(
            :is="menu.isExt ? 'ext-link' : 'nuxt-link'"
            :key="menu.key"
            :to="genLink(menu)"
          )
            | {{ $t(menu.key) }}
        nuxt-link.navbar__lang.pa2(:to="switchLocalePath(isZh ? 'en' : 'zh')")
          | {{$t('lang')}}
    .mobilemenu.fixed.top-0.db.dn-l.z-999(v-show="isMobileMenuVisible")
      .mobilemenu__wrapper.vh-100.overflow-y-auto.bg-black-50(
        @click="closeMobileMenu"
      )
        .mobilemenu__content.vh-100.w-80.ph3.pv1.flex.flex-column.justify-between(
          @click.stop
        )
          div.flex.flex-column.flex-auto
            template(v-for="menu in menuList")
              component.navbar__item.dim.ph2.pv3.bb.b--moon-gray(
                :is="menu.isExt ? 'ext-link' : 'nuxt-link'"
                :key="menu.key"
                :to="genLink(menu)"
                @click.native="closeMobileMenu"
              )
                | {{ $t(menu.key) }}
          nuxt-link.navbar__lang.ph2.pv3.bt.b--moon-gray(
            :to="switchLocalePath(isZh ? 'en' : 'zh')"
            @click.native="closeMobileMenu"
          )
            | {{$t('lang')}}
</template>
<i18n lang="yaml">
en:
  lang: '華語'
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
  lang: 'English'
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

export default {
  components: {
    ExtLink
  },
  data () {
    return {
      isMobileMenuVisible: false,
      menuList: [
        { key: 'transport', url: '/transport' },
        { key: 'cfp', url: 'https://propose.summit2020.g0v.tw/proposal-list', isExt: true }
        // { key: 'speakers', url: '/speakers' },
        // { key: 'agenda', url: '/agenda' },
        // { key: 'partners', url: '/partners' },
        // { key: 'transport', url: '/transport' },
        // { key: 'live', url: 'https://some.live.url.com', isExt: true },
        // { key: 'feed', url: 'https://some.feed.url.com', isExt: true },
        // { key: 'staff', url: '/staff' },
        // { key: 'registration', url: 'https://xxx.kktix.com', isExt: true }
      ]
    }
  },
  computed: {
    isZh () {
      return this.$i18n.locale === 'zh'
    }
  },
  methods: {
    genLink (menu) {
      if (menu.isExt) {
        return menu.url
      }
      return this.localePath(menu.url)
    },
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
  &__item {
    color: #6e6e6e;
    text-decoration: none;
  }
  &__lang {
    color: #f779ee;
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
