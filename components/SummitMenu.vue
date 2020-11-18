<template lang="pug">
.menu.flex.flex-column.flex-row-l.items-center-l.h-100.h-auto-l(:class="{'menu--dark': dark}")
  .flex-auto.flex-none-l
    template(v-for="menu in menuList")
      component.menu__item.dim.pa3.pa2-l.mr3-l.db.dib-l.bb.bn-l.b--silver(
        :is="menu.isExt ? 'ext-link' : 'nuxt-link'"
        :key="menu.key"
        :to="genLink(menu)"
        :class="{'menu__item--cta': menu.isCta}"
        @click.native="sthClick"
      )
        | {{ $t(menu.key) }}
  button.menu__item.menu__item--checkin.pa3.pv0-l.dim.bb.bt.bn-l.b--silver.mr3-l.br-pill-l(
    @click="openCheckIn"
  ) {{$t(checkInType)}}
  nuxt-link.menu__lang.pa3.pa2-l.dim(
    :to="switchLocalePath(isZh ? 'en' : 'zh')"
    @click.native="sthClick"
  )
    | {{$t('lang')}}
</template>
<i18n lang="yaml">
en:
  lang: 華語
  registration: Registration
  banquet: Banquet
  learningCredit: Sign In/Off
  buildingCheckIn: Check In
  healthDecl: Health Declaration
  covid19Guidelines: COVID19 Guideline
zh:
  lang: English
  registration: 立刻報名
  banquet: 來辦桌
  learningCredit: 終身學習簽到退
  buildingCheckIn: 入館簽到
  healthDecl: 填健康聲明
  covid19Guidelines: 防疫守則
</i18n>
<script>
import { mapGetters } from 'vuex'
import { GETTERS } from '~/store'
import ExtLink from '~/components/ExtLink'
import { ALLOW_CHECK_IN, ALLOW_DECL_HEALTH } from '~/utils/scheduleInfo'

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
        // { key: 'venueAdmissionSignIn', url: '/VenueAdmissionSignInForm' },
        // { key: 'speakers', url: '/speakers' },
        { key: 'coc', url: '/code-of-conduct' },
        { key: 'agenda', url: '/agenda' },
        { key: 'partners', url: '/partners' },
        { key: 'transportation', url: '/transportation' },
        { key: 'registration', url: 'https://g0v-summit-2020.kktix.cc/events/c0nf', isExt: true, isCta: true },
        { key: 'banquet', url: 'https://g0v-summit-2020.kktix.cc/events/eat-table', isExt: true, isCta: true }
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
    ...mapGetters({
      curHealthInfo: GETTERS.CUR_HEALTH_INFO
    }),
    isZh () {
      return this.$i18n.locale === 'zh'
    },
    checkInType () {
      if (this.curHealthInfo && ALLOW_CHECK_IN) {
        if (this.curHealthInfo.needLearningCredit) {
          return 'learningCredit'
        }
        return 'buildingCheckIn'
      }
      if (ALLOW_DECL_HEALTH) {
        return 'healthDecl'
      }
      return 'covid19Guidelines'
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
    },
    openCheckIn () {
      if (this.curHealthInfo && ALLOW_CHECK_IN) {
        this.$emit('building-open')
      } else {
        this.$emit('guidelines-open')
      }
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

    &--cta {
      color: #333;
    }

    &--checkin {
      border-left: none;
      border-right: none;
      outline: none;
      background: #77efff;
      text-align: left;
      height: 2rem;
    }
  }
  &__lang {
    color: #f779ee;
  }
  &--dark {
    .menu {
      &__item {
        color: #f6f6f6;
        &--cta {
          color: #f6f6f6;
        }
        &--checkin {
          color: white;
          background: transparent;
          height: auto;
        }
      }
      &__lang {
        color: #f7dc79;
      }
    }
  }
}
</style>
