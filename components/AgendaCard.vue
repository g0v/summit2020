<template lang="pug">
  component.db.agendacard.h-100(
    :is="isFto ? 'ext-link' : 'nuxt-link'"
    :to="detailUrl"
    :class="{'agendacard--en': isEn}"
  )
    .agendacard__wrapper.br2.h-100(:class="{'agendacard__wrapper--break': isBreak}")
      .agendacard__content
        .agendacard__time.flex.justify-between.mb3.lh-solid
          text-highlighter.f7(:text="`${fromTime} - ${toTime}`")
          .f7
            text-highlighter(tag="span" :text="duration")
            | {{$t('minuteUnit')}}
        .mb2.mt3.f6(v-if="hasPreHeaderToShow")
          text-highlighter.agendacard__category.fw5(v-if="category" :text="category")
          .agendacard__moderator(v-if="moderator")
            span {{$t('moderator')}} /&nbsp;
            text-highlighter(tag="span" :text="moderator.display_name")
        .flex.items-center
          text-highlighter.agendacard__title.f5.mt3.fw5(tag="h2" :text="title")
          i.moon-gray.ml2.f6.fas.fa-external-link-alt(v-if="isFto")
          b-tooltip.agendacard__present.ml2(v-if="isPureOnline" type="is-dark" :label="agenda.presentation_method")
            i.fas.fa-video
          .agendacard__roomoccu.db.dn-l.ml2(:title="roomOccuStr" v-if="!agenda.isPseudo")
            i.fas(:class="{'fa-door-closed': isRoomFull, 'fa-door-open': !isRoomFull}")
        .agendacard__people.mt3.mb4.f6.lh-copy
          text-highlighter(v-if="speakers" :text="speakers")
        .flex
          .flex.flex-wrap.flex-grow-1-ns
            .agendacard__tag.agendacard__tag--hl.db.dn-ns.truncate.mt3(v-if="room") {{room}}
            .agendacard__tag.truncate(v-if="topic") {{topic}}
            .agendacard__tag.truncate.mt3-ns(v-if="format") {{format}}
            .agendacard__tag.flex.items-center(
              v-if="lang"
              :class="{'agendacard__tag--trans': agenda.translation}"
            )
              span.truncate {{$t(lang)}}
              template(v-if="agenda.translation")
                .flex.dn-l.items-center
                  | &nbsp;{{$t('with')}} {{agenda.translation}}
                .agendacard__translation.br-pill.br--right.flex.items-center
                  b-tooltip(:label="agenda.translation" type="is-dark")
                    .flex.items-center
                      img.w1(src="~/assets/images/translate_logo.svg")
          button.agendacard__heart(v-if="!this.agenda.isPseudo" @click.stop.prevent="toggleFavouriteAgenda({agendaId: id})")
            img(v-if="isFavourite" src="~/assets/icons/heart-full.svg")
            img(v-else src="~/assets/icons/heart-empty.svg")

</template>
<i18n lang="yaml">
en:
  minuteUnit: min
zh:
  minuteUnit: 分鐘
</i18n>
<script>
import { mapState, mapMutations } from 'vuex'
import { STATES, MUTATIONS } from '~/store'
import agendaMixin from '~/utils/AgendaMixin'
import TextHighlighter from '~/components/TextHighlighter'
import ExtLink from '~/components/ExtLink'

export default {
  components: {
    TextHighlighter,
    ExtLink
  },
  mixins: [agendaMixin],
  props: {
    agenda: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      isFavourite (state) {
        return state[STATES.FAVOURITE_AGENDAS].includes(this.agenda.id)
      },
      occuState: STATES.ROOM_OCCU_STATE
    }),
    isFto () {
      // special case, no need for general solution
      return this.agenda.id === '1203-abreak-0'
    },
    isRoomFull () {
      const field = `${this.$i18n.locale}Name`
      const myRoom = this.room
      const roomState = this.occuState.find(item => item[field] === myRoom)
      return roomState && roomState.isFull
    },
    roomOccuStr () {
      if (this.isRoomFull) {
        return this.$t('isRoomFull')
      }
      return this.$t('isRoomNotFull')
    },
    detailUrl () {
      if (this.isFto) {
        return 'https://fto.asia/'
      } else if (!this.agenda.isPseudo && this.$route.params.date) {
        return this.localePath(`/agenda/${this.$route.params.date}/${this.agenda.id}`)
      } else {
        return '#'
      }
    },
    hasTagsToShow () {
      return !this.isPseudo && (this.lang || this.format || this.room)
    },
    hasPreHeaderToShow () {
      return this.category || this.moderator
    },
    isBreak () {
      const title = this.title
      return this.agenda.isPseudo && (title.includes('休') || title.includes('break'))
    },
    isEn () {
      return this.$i18n.locale === 'en'
    }
  },
  methods: {
    ...mapMutations({ toggleFavouriteAgenda: MUTATIONS.TOGGLE_FAVOURITE_AGENDA })
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
    // header search bar 3.5rem, locaion bar 7.75rem
    top: 11.25rem;
    left: 1.25rem;
    display: inline-block;
    width: 100%;
    // 2.5rem: 1.25 * 2
    max-width: calc(100vw - 2.5rem);
  }
  &--en {
    .agendacard__content {
      // en location will be 4 lines
      top: 13rem;
    }
  }
  &__roomoccu {
    .fa-door-open {
      color: $blue-1;
    }
    .fa-door-closed {
      color: #888;
    }
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
  &__present {
    color: $blue-1;
  }
  &__moderator {
    color: $blue-2;
  }
  &__tag {
    border-radius: 999px;
    color: white;
    font-size: 0.75rem;
    margin-top: 0.25rem;
    background: #67cddd;
    padding: 0.125rem 0.5rem;
    max-width: calc(100vw - 5rem);
    &:not(:last-child) {
      margin-right: 0.25rem;
    }
    &--hl {
      background: #509fac;
    }
    &--trans {
      // padding-top: 0rem;
      // padding-bottom: 0rem;
    }
  }
  &__translation {
    background: rgba(0,0,0,0.25);
    position: relative;
    right: -0.5rem;
    margin-left: -0.25rem;
    padding: 0 0.25rem;
    height: calc(100% + 0.25rem);
    /deep/ .tooltip-trigger {
      height: 100%;
    }
  }
  &__heart {
    background-color: transparent;
    border: none;
    flex: 0 0 1.125rem;
    /* margin-top of agendacard__tag */
    margin-top: 0.25rem;
    /* height of agendacard__tag */
    height: 1.4375rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
