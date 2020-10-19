<template lang="pug">
  nuxt-link.db.agendacard.h-100(
    :to="detailUrl"
  )
    .agendacard__wrapper.br2.h-100(:class="{'agendacard__wrapper--break': isBreak}")
      .agendacard__content
        .agendacard__time.flex.justify-between.mb3.lh-solid
          .f7 {{fromTime}} - {{toTime}}
          .f7 {{duration}}{{$t('minuteUnit')}}
        .mb2.mt3.f6.fw5(v-if="hasPreHeaderToShow")
          .agendacard__category(v-if="category") {{category}}
        h2.agendacard__title.f5.mt3.fw5 {{title}}
        .agendacard__speakers.mt3.mb4.f6.lh-title(v-if="speakers") {{speakers}}
        .flex.flex-wrap
          .agendacard__tag.agendacard__tag--hl.db.dn-ns.mt3(v-if="room") {{room}}
          .agendacard__tag(v-if="topic") {{topic}}
          .agendacard__tag.mt3-ns(v-if="format") {{format}}
          .agendacard__tag(v-if="lang") {{$t(lang)}}
</template>
<i18n lang="yaml">
en:
  minuteUnit: min
zh:
  minuteUnit: 分鐘
</i18n>
<script>
import agendaMixin from '~/utils/AgendaMixin'

export default {
  mixins: [agendaMixin],
  props: {
    agenda: {
      type: Object,
      required: true
    }
  },
  computed: {
    detailUrl () {
      if (!this.agenda.isPseudo && this.$route.params.date) {
        return this.localePath(`/agenda/${this.$route.params.date}/${this.agenda.id}`)
      } else {
        return '#'
      }
    },
    hasTagsToShow () {
      return !this.isPseudo && (this.lang || this.format || this.room)
    },
    isBreak () {
      return this.agenda.isPseudo && this.title.includes('休')
    }
  }
}
</script>
<style lang="scss" scoped>
.agendacard {
  padding-bottom: 0.5rem;
  padding-right: 0.5rem;

  &__wrapper {
    background: #f8f8f8;
    padding: 1rem 0.75rem;
    &--break {
      background: #e7eff0;
      cursor: default;
      .agendacard__title {
        color: #555;
      }
    }
  }
  &__content {
    position: sticky;
    top: 3.5rem;
    left: 1.25rem;
    display: inline-block;
    width: 100%;
    // 2.5rem: 1.25 * 2
    max-width: calc(100vw - 2.5rem);
  }
  &__time {
    color: #303030;
  }
  &__topic {
    color: $blue-1;
  }
  &__category {
    color: #555;
  }
  &__title {
    color: $blue-1;
  }
  &__tag {
    border-radius: 999px;
    color: white;
    font-size: 0.75rem;
    margin-top: 0.25rem;
    background: #67cddd;
    padding: 0.125rem 0.5rem;
    &:not(:last-child) {
      margin-right: 0.25rem;
    }
    &--hl {
      background: #509fac;
    }
  }
}
</style>
