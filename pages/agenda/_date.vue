<template lang="pug">
  .agenda
    .agenda__tooltip-wrapper.flex.justify-center.mb3.mb5-l.pv2.ph3.ph0-l.bg-white.z-2
      agenda-tooltip
    .agenda__menu.justify-center.dn.flex-ns
      .datemenu.flex
        nuxt-link.datemenu__item.tc.f4.mh2(
          v-for="date in dateList"
          :key="date.index"
          :to="localePath(`/agenda/${date.date}`)"
        )
          .datemenu__title.b Day{{date.index}}
            span.ml2.fw3(v-if="isUnderSearch && agendaCountPerDay[date.date]")
              | ({{agendaCountPerDay[date.date]}})
          .datemenu__date.fw5.bt {{$t(date.date)}}
    .agenda__content
      .agenda__noresult.br2.center.tc(v-if="isTodayEmpty")
        | {{$t('no-result')}}&nbsp;
        button.bn.bg-transparent.underline.dim(@click="resetSearch") {{$t('clear-search')}}
      daily-agenda(v-else :agenda-per-room="agendaPerRoom")
    .agenda__mobilemenu.mobilemenu.mt3(data-slideout-ignore)
      div
      nuxt-link.mobilemenu__item.tc.lh-title(
          v-for="date in dateList"
          :key="date.index"
          :to="localePath(`/agenda/${date.date}`)"
        )
          .mobilemenu__title.b.bt.bw1.pv2.f4 Day{{date.index}}
            span.ml2.fw3(v-if="isUnderSearch && agendaCountPerDay[date.date]")
              | ({{agendaCountPerDay[date.date]}})
          .mobilemenu__date.fw5.pb2 {{$t(date.date)}}
      div
    nuxt
</template>
<i18n lang="yaml">
en:
  '2020-12-03': Thu, Dec 3
  '2020-12-04': Fri, Dec 4
  '2020-12-05': Sat, Dec 5
  '2020-12-06': Sun, Dec 6
  no-result: No result found. Please try another one or
  clear-search: clear search text
zh:
  '2020-12-03': 12/03（四）
  '2020-12-04': 12/04（五）
  '2020-12-05': 12/05（六）
  '2020-12-06': 12/06（日）
  no-result: 查無相符議程，請試試其他文字，或
  clear-search: 清空搜尋條件
</i18n>
<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'

import { MUTATIONS, STATES } from '~/store'
import DailyAgenda from '~/components/DailyAgenda'
import AgendaTooltip from '~/components/AgendaTooltip'
import { isAgendaMatch } from '~/utils/searchUtils'
import { DEFAULT_DATE, VALID_DATE_LIST, ALLOW_DECL_HEALTH } from '~/utils/scheduleInfo'

const OCCU_ENDPOINT = 'https://g0v-summit-2020-room-occupatio.herokuapp.com/element-log'

// update every 5 minute
const OCCU_UPDATE_PERIOD = 5 * 60 * 1000

export default {
  components: {
    DailyAgenda,
    AgendaTooltip
  },
  data () {
    return {
      occupationTimer: null
    }
  },
  computed: {
    ...mapState({
      query: STATES.AGENDA_QUERY,
      filter: STATES.AGENDA_FILTER
    }),
    isDateValid () {
      return VALID_DATE_LIST.includes(this.$route.params.date)
    },
    dateList () {
      return VALID_DATE_LIST.map((date, index) => {
        return {
          index,
          date
        }
      })
    },
    targetDate () {
      if (this.isDateValid) {
        return this.$route.params.date
      }
      return DEFAULT_DATE
    },
    matchedAgenda () {
      const allProposals = this.$t('proposal/map')
      return allProposals.filter((proposal) => {
        return isAgendaMatch(proposal, this.query, this.filter)
      })
    },
    agendaCountPerDay () {
      const stats = {}
      this.matchedAgenda.forEach((agenda) => {
        const day = agenda.timeSheet.議程日期
        if (!stats[day]) {
          stats[day] = 0
        }
        stats[day] += 1
      })
      return stats
    },
    roomsToday () {
      const rooms = {}
      const allProposals = this.$t('proposal/map')
      allProposals.forEach((proposal) => {
        const time = proposal.timeSheet
        if (time.議程日期 === this.targetDate) {
          rooms[time.議程場地] = time.locationMeta
        }
      })
      return rooms
    },
    agendaPerRoom () {
      const agendaToday = this.matchedAgenda
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
    isTodayEmpty () {
      return !this.agendaCountPerDay[this.targetDate]
    },
    isUnderSearch () {
      return !!this.query || Object.keys(this.filter).length > 0
    }
  },
  watch: {
    isDateValid (newVal) {
      this.checkDate()
    }
  },
  mounted () {
    this.checkDate()
    this.keepUpdatingOccu()
  },
  beforeDestroy () {
    clearInterval(this.occupationTimer)
  },
  methods: {
    ...mapMutations({
      doResetSearch: MUTATIONS.RESET_AGENDA_SEARCH,
      updateOccuState: MUTATIONS.SET_ROOM_OCCU
    }),
    checkDate () {
      if (!this.isDateValid) {
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
    },
    resetSearch () {
      this.doResetSearch()
    },
    keepUpdatingOccu () {
      if (!ALLOW_DECL_HEALTH) {
        // we only count room status during the event
        return
      }
      this.updateOccu()
      this.occupationTimer = setInterval(() => {
        this.updateOccu()
      }, OCCU_UPDATE_PERIOD)
    },
    async updateOccu () {
      if (!ALLOW_DECL_HEALTH) {
        // we only count room status during the event
        return
      }
      try {
        const resp = await axios.get(OCCU_ENDPOINT)
        if (resp.data) {
          this.updateOccuState(resp.data)
        }
      } catch (err) {
        this.$sentry.self.captureMessage(`Error during retrieving room occupation: ${err.message}`)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.agenda {
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

  &__noresult {
    background: #e7eff0;
    color: #555;
    max-width: $tooltip-width;
    padding: 1rem 0.75rem;
  }

  &__menu {
    width: 100%;
    max-width: 100vw;
    position: sticky;
    left: 0;
  }

  &__mobilemenu {
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

  &__tooltip-wrapper {
    width: 100%;
    position: sticky;
    max-width: 100vw;
    top: 0;
    left: 0;
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
