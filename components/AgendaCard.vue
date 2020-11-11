<template lang="pug">
  nuxt-link.db.agendacard.h-100(
    :to="detailUrl"
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
        text-highlighter.agendacard__title.f5.mt3.fw5(tag="h2" :text="title")
        .agendacard__people.mt3.mb4.f6.lh-copy
          text-highlighter(v-if="speakers" :text="speakers")
        .flex
          .flex.flex-wrap.flex-grow-1-ns
            .agendacard__tag.agendacard__tag--hl.db.dn-ns.mt3(v-if="room") {{room}}
            .agendacard__tag(v-if="topic") {{topic}}
            .agendacard__tag.mt3-ns(v-if="format") {{format}}
            .agendacard__tag(v-if="lang") {{$t(lang)}}
          button.agendacard__heart(v-if="!this.agenda.isPseudo" @click="toggleFavorite")
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
import agendaMixin from '~/utils/AgendaMixin'
import TextHighlighter from '~/components/TextHighlighter'

export default {
  components: {
    TextHighlighter
  },
  mixins: [agendaMixin],
  props: {
    agenda: {
      type: Object,
      required: true
    }
  },
  data () {
    return { isFavourite: false }
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
    hasPreHeaderToShow () {
      return this.category || this.moderator
    },
    isBreak () {
      const title = this.title
      return this.agenda.isPseudo && (title.includes('休') || title.includes('break'))
    }
  },
  mounted () {
    const favouriteAgendas = JSON.parse(localStorage.getItem('favouriteAgendas')) || []
    this.isFavourite = favouriteAgendas.includes(this.agenda.id)
  },
  methods: {
    toggleFavorite (e) {
      e.preventDefault()
      const favouriteAgendas = JSON.parse(localStorage.getItem('favouriteAgendas')) || []
      const favouriteAgendaIndex = favouriteAgendas.indexOf(this.agenda.id)
      if (this.isFavourite && favouriteAgendaIndex > -1) {
        favouriteAgendas.splice(favouriteAgendaIndex, 1)
        localStorage.setItem('favouriteAgendas', JSON.stringify(favouriteAgendas))
        this.isFavourite = false
      } else if (!this.isFavourite && favouriteAgendaIndex === -1) {
        localStorage.setItem('favouriteAgendas', JSON.stringify([...favouriteAgendas, this.agenda.id]))
        this.isFavourite = true
      }
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
    top: 7.75rem;
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
    &:not(:last-child) {
      margin-right: 0.25rem;
    }
    &--hl {
      background: #509fac;
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
