<template lang="pug">
  .bookmarks
    agenda-date-list(
      page-base="bookmarks"
      :show-count="true"
      :count-per-day="agendaCountPerDay"
    )
    .bookmarks__content
      // TODO: is today empty
      daily-agenda(:agenda-per-room="agendaPerRoom")
    agenda-date-list(
      :is-slide="true"
      page-base="bookmarks"
      :show-count="true"
      :count-per-day="agendaCountPerDay"
    )
</template>
<script>
import { mapState } from 'vuex'
import { STATES } from '~/store'
import AgendaDateList from '~/components/AgendaDateList'
import DailyAgenda from '~/components/DailyAgenda'

export default {
  components: {
    AgendaDateList,
    DailyAgenda
  },
  computed: {
    ...mapState({
      bookmarkIds: STATES.FAVOURITE_AGENDAS
    }),
    targetDate () {
      return this.$route.params.date
    },
    bookmarks () {
      const allProposals = this.$t('proposal/map')
      const targetIds = this.bookmarkIds.reduce((map, id) => {
        return {
          ...map,
          [id]: true
        }
      }, {})
      return allProposals.filter(agenda => targetIds[agenda.id])
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
    }
  }
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
}
</style>
