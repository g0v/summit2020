<template lang="pug">
  .agenda
    .agenda__menu.flex.justify-center
      .datemenu.flex
        nuxt-link.datemenu__item.tc.f4.mh2(
          v-for="date in dateList"
          :key="date.index"
          :to="localePath(`/agenda/${date.date}`)"
        )
          .datemenu__title.b Day{{date.index}}
          .datemenu__date.fw5.bt {{$t(date.date)}}
    .agenda__content.outline
      h1.pa3 {{targetDate}}
      .pa3.mv3.bt.bb(v-for="room in agendaPerRoom" :key="room.name")
        .b.f4 {{room.name}}
        .pa3
          .pv2.gray(v-for="agenda in room.agendaList" :key="agenda.id")
            | {{agenda.title}} - {{agenda.timeSheet.議程開始時間}}
</template>
<i18n lang="yaml">
en:
  '2020-12-03': Thu, Dec 3
  '2020-12-04': Fri, Dec 4
  '2020-12-05': Sat, Dec 5
  '2020-12-06': Sun, Dec 6
zh:
  '2020-12-03': 12/03 （四）
  '2020-12-04': 12/04 （五）
  '2020-12-05': 12/05 （六）
  '2020-12-06': 12/06 （日）
</i18n>
<script>
const DEFAULT_DATE = '2020-12-04'
const VALID_DATE_LIST = ['2020-12-04', '2020-12-05', '2020-12-06']

export default {
  computed: {
    isDateValid () {
      return VALID_DATE_LIST.includes(this.$route.params.date)
    },
    dateList () {
      return VALID_DATE_LIST.map((date, index) => {
        return {
          index: index + 1,
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
    agendaPerRoom () {
      const allProposals = this.$t('proposal/map')
      const agendaToday = Object
        .values(allProposals)
        .filter(proposal => proposal.timeSheet.議程日期 === this.targetDate)
        .sort(proposal => proposal.timeSheet.議程開始時間)

      const agendaPerRoom = agendaToday.reduce((perRoom, agenda) => {
        const room = agenda.timeSheet.議程場地
        if (!(room in perRoom)) {
          perRoom[room] = []
        }
        perRoom[room].push(agenda)
        return perRoom
      }, {})

      return Object.keys(agendaPerRoom).map((room) => {
        return {
          name: room,
          agendaList: agendaPerRoom[room]
        }
      })
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
      if (!this.isDateValid) {
        this.$router.replace({
          name: this.$route.name,
          params: {
            ...this.$route.params,
            date: DEFAULT_DATE
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.agenda {
  padding: 1rem;
  background-image: url('../../assets/images/agenda-bg-left.svg'),
      url('../../assets/images/agenda-bg-right.svg');
  background-position: left -10.5rem top 15rem, right -10em top;
  background-repeat: no-repeat;
  @include medium-screen {
    padding: 3.5rem 6.5rem;
    background-position: left -6rem top 15rem, right -4.5rem top;
  }
  @include large-screen {
    padding: 7rem 12rem;
    background-position: left top 15rem, right top;
  }
}

.datemenu {
  .nuxt-link-exact-active {
    .datemenu__date {
      border-color: $pink-1;
      color: $pink-1;
    }
  }
  &__title {
    color: #6e6e6e;
  }
  &__date {
    color: #c2c0c0;
    min-width: 10.5rem;
    padding: 0.625rem 1.375rem 0;
    margin-top: 0.75rem;
    border-color: transparent;
  }
}
</style>
