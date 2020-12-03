<template lang="pug">
  .bookmarks
    agenda-date-list(
      page-base="bookmarks"
      :show-count="true"
      :no-day0="true"
      :count-per-day="agendaCountPerDay"
    )
    .bookmarks__content
      .bookmarks__empty.mw6.ph3.center(v-if="isTodayEmpty")
        .gray
          | {{$t('addSomeBookmarkHead')}}
          nuxt-link.underline.dim(:to="todayAgendayUrl") {{$t('agenda')}}
          | {{$t('addSomeBookmarkTail')}}
        .mw5-l.center.mt3(v-if="randomAgendaToday")
          agenda-card(
            :agenda="randomAgendaToday"
            :is-routable="false"
          )
      daily-agenda(
        v-else
        :agenda-per-room="agendaPerRoom"
        :is-routable="false"
        @select="focusAgenda"
      )
    agenda-date-list(
      :is-slide="true"
      page-base="bookmarks"
      :show-count="true"
      :count-per-day="agendaCountPerDay"
    )
    agenda-detail(
      :id="focusedAgendaId"
      @closed="blurAgenda"
    )
</template>
<i18n lang="yaml">
en:
  agenda: agenda page
  addSomeBookmarkHead: "No agenda has been bookmarked today. Let's click 💙 below to create your first bookmark! You can find more agnedas in "
  addSomeBookmarkTail: " ."
zh:
  agenda: 議程頁面
  addSomeBookmarkHead: 書籤內尚無本日議程，要不要試著按下 💙，建立第一張書籤？你可以在「
  addSomeBookmarkTail: 」找到更多議程。
</i18n>
<script>
import { mapState } from 'vuex'
import { STATES } from '~/store'
import AgendaDateList from '~/components/AgendaDateList'
import DailyAgenda from '~/components/DailyAgenda'
import AgendaDetail from '~/components/AgendaDetail'
import AgendaCard from '~/components/AgendaCard'
import { friendlyHeader } from '~/utils/crawlerFriendly'
import roomMixin from '~/utils/roomMixin'

export default {
  components: {
    AgendaDateList,
    AgendaCard,
    DailyAgenda,
    AgendaDetail
  },
  mixins: [roomMixin],
  data () {
    return {
      focusedAgenda: null,
      isMounted: false
    }
  },
  computed: {
    ...mapState({
      bookmarkIds: STATES.FAVOURITE_AGENDAS
    }),
    targetDate () {
      return this.$route.params.date
    },
    bookmarkIdMap () {
      return this.bookmarkIds.reduce((map, id) => {
        return {
          ...map,
          [id]: true
        }
      }, {})
    },
    bookmarks () {
      const allProposals = this.$t('proposal/map')
      return allProposals.filter(agenda => this.bookmarkIdMap[agenda.id])
    },
    agendaCountPerDay () {
      const counts = {}
      this.bookmarks.forEach((proposal) => {
        const date = proposal.timeSheet.議程日期
        if (!counts[date]) {
          counts[date] = 0
        }
        counts[date] += 1
      })
      return counts
    },
    isTodayEmpty () {
      return !this.agendaCountPerDay[this.targetDate]
    },
    randomAgendaToday () {
      if (!this.isMounted) {
        return undefined
      }
      const availableAgendas = this.$t('proposal/map')
        .filter((agenda) => {
          return agenda.timeSheet.議程日期 === this.targetDate &&
            !this.bookmarkIdMap[agenda.id] &&
            !agenda.isPseudo
        })

      // it's safe to be empty array
      const randomIndex = Math.floor(Math.random() * availableAgendas.length)
      return availableAgendas[randomIndex]
    },
    todayAgendayUrl () {
      return this.localePath(`/agenda/${this.targetDate}`)
    },
    roomsToday () {
      const rooms = {}
      this.bookmarks.forEach((proposal) => {
        const time = proposal.timeSheet
        if (time.議程日期 === this.targetDate) {
          rooms[time.議程場地] = time.locationMeta
        }
      })
      return rooms
    },
    agendaPerRoom () {
      const agendaToday = this.bookmarks
        .filter(agenda => agenda.timeSheet.議程日期 === this.targetDate)
        .sort((l, r) => l.timeSheet.議程開始時間.localeCompare(r.timeSheet.議程開始時間))

      const agendaPerRoom = {}
      Object.keys(this.roomsToday).forEach((name) => {
        agendaPerRoom[name] = {
          list: [],
          meta: this.roomsToday[name]
        }
      })

      agendaToday.forEach((agenda) => {
        const room = agenda.timeSheet.議程場地
        if (agendaPerRoom[room]) {
          agendaPerRoom[room].list.push(agenda)
        }
      })

      return Object.keys(agendaPerRoom)
        .map((room) => {
          return {
            name: room,
            meta: agendaPerRoom[room].meta,
            agendaList: agendaPerRoom[room].list
          }
        })
        .sort((l, r) => {
          return l.meta.order - r.meta.order
        })
    },
    focusedAgendaId () {
      if (this.focusedAgenda) {
        return this.focusedAgenda.id
      }
      return ''
    }
  },
  mounted () {
    // avoid ssr confusion as we provide random content
    this.isMounted = true
  },
  methods: {
    focusAgenda (agenda) {
      if (!agenda.isPseudo) {
        this.focusedAgenda = agenda
      }
    },
    blurAgenda () {
      this.focusedAgenda = null
    }
  },
  head: friendlyHeader({
    title () {
      return this.$t('bookmark')
    }
  })
}
</script>
<style lang="scss" scoped>
.bookmarks {
  padding: 1rem 0;
  background-image: url('../../assets/images/agenda-bg-left.svg'),
      url('../../assets/images/agenda-bg-right.svg');
  background-position: left -10.5rem top 15rem, right -10em top;
  background-repeat: no-repeat;
  @include medium-screen {
    padding: 2.5rem 0;
    background-position: left -6rem top 15rem, right -4.5rem top;
  }
  @include not-small-screen {
    padding: 5rem 0;
    background-position: left top 15rem, right top;
  }

  &__content {
    @include not-small-screen {
      margin-top: 5.25rem;
    }
  }
  &__empty {
    line-height: 2;
  }
}
</style>
