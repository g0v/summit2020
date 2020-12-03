<template lang="pug">
  .agendadate(:class="rootClass" data-slideout-ignore)
    template(v-if="!isSlide")
      .datemenu.flex
        nuxt-link.datemenu__item.tc.f4.mh2(
          v-for="date in dateList"
          :key="date.index"
          :to="localePath(`/${pageBase}/${date.date}`)"
        )
          .datemenu__title.b Day{{date.index}}
            span.ml2.fw3(v-if="showCount && countPerDay[date.date]")
              | ({{countPerDay[date.date]}})
          .datemenu__date.fw5.bt {{$t(date.date)}}
    template(v-else)
      div
      nuxt-link.mobilemenu__item.tc.lh-title(
        v-for="date in dateList"
        :key="date.index"
        :to="localePath(`/${pageBase}/${date.date}`)"
      )
        .mobilemenu__title.b.bt.bw1.pv2.f4 Day{{date.index}}
          span.ml2.fw3(v-if="showCount && countPerDay[date.date]")
            | ({{countPerDay[date.date]}})
        .mobilemenu__date.fw5.pb2 {{$t(date.date)}}
      div
</template>
<script>
import { DEFAULT_DATE, VALID_DATE_LIST } from '~/utils/scheduleInfo'

export default {
  props: {
    pageBase: {
      type: String,
      default: 'agenda'
    },
    isSlide: {
      type: Boolean,
      default: false
    },
    showCount: {
      type: Boolean,
      default: false
    },
    countPerDay: {
      type: Object,
      default () {
        return {}
      }
    },
    noDay0: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isDateValid () {
      return VALID_DATE_LIST.includes(this.$route.params.date)
    },
    dateList () {
      const list = VALID_DATE_LIST.map((date, index) => {
        return {
          index,
          date
        }
      })
      if (this.noDay0) {
        return list.slice(1)
      }
      return list
    },
    targetDate () {
      if (this.isDateValid) {
        return this.$route.params.date
      }
      return DEFAULT_DATE
    },
    rootClass () {
      if (this.isSlide) {
        return ['mobilemenu', 'mt3', 'z-2']
      }
      return ['menu', 'justify-center', 'dn', 'flex-ns']
    }
  },
  watch: {
    isDateValid (newVal) {
      this.checkDate()
    }
  },
  mounted () {
    this.checkDate()
  },
  methods: {
    checkDate () {
      if (!this.isDateValid && !this.isSlide) {
        // just trigger route once in each page
        // this component will always be included twice in a page
        this.$router.replace({
          name: this.$route.name,
          params: {
            ...this.$route.params,
            date: DEFAULT_DATE
          }
        }).catch(() => {
          // #80, avoid change route at the same time when in non-default lang browser
          // nothing to do, we will be redirect to non-default lang and rerun this check soon
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.agendadate {
  &.menu {
    width: 100%;
    max-width: 100vw;
    position: sticky;
    left: 0;
  }

  &.mobilemenu {
    display: grid;
    grid-template-columns: 0 repeat(3, 35vw) 0;
    column-gap: 1rem;
    width: 100%;
    max-width: 100vw;
    overflow-x: auto;
    position: sticky;
    bottom: 0;
    background: white;
    @include not-small-screen {
      display: none;
    }
  }
}

.datemenu {
  .nuxt-link-active {
    .datemenu__date {
      border-color: $pink-1;
      color: $pink-1;
    }
  }
  &__title {
    color: #6e6e6e;
  }
  &__date {
    color: $gray-2;
    min-width: 10.5rem;
    padding: 0.5rem 1.375rem 0;
    margin-top: 0.875rem;
    border-color: transparent;
  }
}

.mobilemenu {
  .nuxt-link-active {
    .mobilemenu__title {
      border-color: $pink-1;
      color: $pink-1;
    }
  }
  &__title {
    color: #6e6e6e;
    border-color: transparent;
  }
  &__date {
    color: $gray-2;
  }
}
</style>
