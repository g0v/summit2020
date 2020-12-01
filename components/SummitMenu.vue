<template lang="pug">
.menu.flex.flex-column.flex-row-l.items-center-l.h-100.h-auto-l(:class="{'menu--dark': dark}")
  .flex-auto.flex-none-l.flex-l.items-center-l
    template(v-for="menu in menuList")
      component.menu__item.dim.pa3.pa2-l.mr3-l.db.bb.bn-l.b--silver(
        :is="menu.isExt ? 'ext-link' : 'nuxt-link'"
        :key="menu.key"
        :to="genLink(menu)"
        :class="{'menu__item--cta': menu.isCta, 'dn-l': menu.dnl}"
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
  banquet: Banquet
  learningCredit: Sign In/Off
  healthDecl: Health Declaration
zh:
  lang: English
  banquet: 來辦桌
  learningCredit: 終身學習簽到退
  healthDecl: 填健康聲明
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
        { key: 'coc', url: '/code-of-conduct' },
        { key: 'agenda', url: '/agenda' },
        { key: 'moderatorsAndSpeakers', url: '/moderators-and-speakers' },
        { key: 'partners', url: '/partners' },
        { key: 'wg', url: 'working-group' },
        { key: 'transportation', url: '/transportation' },
        { key: 'conote', url: 'https://g0v.hackmd.io/c/summit20', isExt: true, isCta: true },
        { key: 'registration', url: 'https://g0v-summit-2020.kktix.cc/events/c0nf', isExt: true, dnl: true },
        { key: 'remote', url: 'https://g0v-summit-2020.kktix.cc/events/rem0te', isExt: true, dnl: true }
        // { key: 'banquet', url: 'https://g0v-summit-2020.kktix.cc/events/eat-table', isExt: true, dnl: true }
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
      min-height: 2rem;
    }

    @include large-screen {
      max-width: 7rem;
      text-align: center;
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
