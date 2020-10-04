<template lang="pug">
.menu.flex.flex-column.flex-row-l.h-100.h-auto-l(:class="{'menu--dark': dark}")
  .flex-auto.flex-none-l
    template(v-for="menu in menuList")
      component.menu__item.dim-l.pa3.pa2-l.mr3-l.db.dib-l.bb.bn-l.b--silver(
        :is="menu.isExt ? 'ext-link' : 'nuxt-link'"
        :key="menu.key"
        :to="genLink(menu)"
        @click.native="sthClick"
      )
        | {{ $t(menu.key) }}
  nuxt-link.menu__lang.pa3.pa2-l.dim-l(
    :to="switchLocalePath(isZh ? 'en' : 'zh')"
    @click.native="sthClick"
  )
    | {{$t('lang')}}
</template>
<i18n lang="yaml">
en:
  lang: '華語'
  cfp: 'Get Latest Proposals'
  registration: 'Registration'
zh:
  lang: 'English'
  cfp: '看議程投稿'
  registration: '立刻報名'
</i18n>
<script>
import ExtLink from '~/components/ExtLink'

export default {
  components: {
    ExtLink
  },
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menuList: [
        { key: 'transport', url: '/transport' },
        // { key: 'cfp', url: 'https://propose.summit2020.g0v.tw/proposal-list', isExt: true },
        // { key: 'speakers', url: '/speakers' },
        { key: 'agenda', url: '/agenda' },
        { key: 'registration', url: 'https://g0v-summit-2020.kktix.cc/events/c0nf', isExt: true }
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
    sthClick () {
      this.$emit('link-click')
    }
  }
}
</script>
<style lang="scss" scoped>
.menu {
  &__item {
    color: #6e6e6e;
    text-decoration: none;

    &.nuxt-link-active {
      font-weight: bold;
    }
  }
  &__lang {
    color: #f779ee;
  }
  &--dark {
    .menu {
      &__item {
        color: #f6f6f6;
      }
      &__lang {
        color: #f7dc79;
      }
    }
  }
}
</style>
