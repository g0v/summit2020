<template lang="pug">
  .agenda
    .agenda__tooltip-wrapper.flex.justify-center.mb3.mb5-l.pv2.ph3.ph0-l.bg-white.z-5
      agenda-tooltip
    agenda-date-list(
      :show-count="isUnderSearch"
      :count-per-day="agendaCountPerDay"
    )
    .agenda__content
      .agenda__noresult.br2.center.tc(v-if="isTodayEmpty")
        | {{$t('no-result')}}&nbsp;
        button.bn.bg-transparent.underline.dim(@click="resetSearch") {{$t('clear-search')}}
      daily-agenda(v-else :agenda-per-room="agendaPerRoom")
    agenda-date-list(
      :is-slide="true"
      :show-count="isUnderSearch"
      :count-per-day="agendaCountPerDay"
    )
    nuxt
</template>
<i18n lang="yaml">
en:
  no-result: No result found. Please try another one or
  clear-search: clear search text
zh:
  no-result: 查無相符議程，請試試其他文字，或
  clear-search: 清空搜尋條件
</i18n>
<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'

import { MUTATIONS, STATES } from '~/store'
import DailyAgenda from '~/components/DailyAgenda'
import AgendaTooltip from '~/components/AgendaTooltip'
import AgendaDateList from '~/components/AgendaDateList'
import { isAgendaMatch } from '~/utils/searchUtils'
import { ALLOW_DECL_HEALTH } from '~/utils/scheduleInfo'

const OCCU_ENDPOINT = 'https://g0v-summit-2020-room-occupatio.herokuapp.com/element-log'

// update every 5 minute
const OCCU_UPDATE_PERIOD = 5 * 60 * 1000

export default {
  components: {
    DailyAgenda,
    AgendaTooltip,
    AgendaDateList
  },
  data () {
    return {
      occupationTimer: null,
      isReady: false
    }
  },
  computed: {
    ...mapState({
      query: STATES.AGENDA_QUERY,
      filter: STATES.AGENDA_FILTER
    }),
    targetDate () {
      return this.$route.params.date
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
      return this.isReady && !this.agendaCountPerDay[this.targetDate]
    },
    isUnderSearch () {
      return !!this.query || Object.keys(this.filter).length > 0
    }
  },
  watch: {
    matchedAgenda (newVal, oldVal) {
      // mark page as ready only after we have 2nd output
      this.isReady = true
    }
  },
  mounted () {
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

  &__tooltip-wrapper {
    width: 100%;
    position: sticky;
    max-width: 100vw;
    top: 0;
    left: 0;
  }
}
</style>
