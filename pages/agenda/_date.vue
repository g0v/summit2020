<template lang="pug">
  .agenda
    .agenda__menu.justify-center.dn.flex-l
      .datemenu.flex
        nuxt-link.datemenu__item.tc.f4.mh2(
          v-for="date in dateList"
          :key="date.index"
          :to="localePath(`/agenda/${date.date}`)"
        )
          .datemenu__title.b Day{{date.index}}
          .datemenu__date.fw5.bt {{$t(date.date)}}
    .agenda__content
      daily-agenda(:agenda-per-room="agendaPerRoom")
    .agenda__mobilemenu.mobilemenu.mt3(data-slideout-ignore)
      div
      nuxt-link.mobilemenu__item.tc.lh-title(
          v-for="date in dateList"
          :key="date.index"
          :to="localePath(`/agenda/${date.date}`)"
        )
          .mobilemenu__title.b.bt.bw1.pv2.f4 Day{{date.index}}
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
zh:
  '2020-12-03': 12/03（四）
  '2020-12-04': 12/04（五）
  '2020-12-05': 12/05（六）
  '2020-12-06': 12/06（日）
</i18n>
<script>
import DailyAgenda from '~/components/DailyAgenda'

const DEFAULT_DATE = '2020-12-04'
const VALID_DATE_LIST = ['2020-12-04', '2020-12-05', '2020-12-06']

export default {
  components: {
    DailyAgenda
  },
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
      const agendaToday = allProposals
        .filter(proposal => proposal.timeSheet.議程日期 === this.targetDate)
        .sort(proposal => proposal.timeSheet.議程開始時間)

      const agendaPerRoom = agendaToday.reduce((perRoom, agenda) => {
        const room = agenda.timeSheet.議程場地
        if (!(room in perRoom)) {
          perRoom[room] = {
            list: [],
            meta: agenda.timeSheet.locationMeta
          }
        }
        perRoom[room].list.push(agenda)
        return perRoom
      }, {})

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
  padding: 1rem 0;
  background-image: url('../../assets/images/agenda-bg-left.svg'),
      url('../../assets/images/agenda-bg-right.svg');
  background-position: left -10.5rem top 15rem, right -10em top;
  background-repeat: no-repeat;
  @include medium-screen {
    padding: 2.5rem 0;
    background-position: left -6rem top 15rem, right -4.5rem top;
  }
  @include large-screen {
    padding: 5rem 0;
    background-position: left top 15rem, right top;
  }

  &__content {
    @include large-screen {
      margin-top: 5.25rem;
    }
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
    @include large-screen {
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
    color: #c2c0c0;
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
    color: #c2c0c0;
  }
}
</style>
