<template lang="pug">
  .dailyagenda(:style="gridStyle" data-slideout-ignore)
    .dailyagenda__gutter.dailyagenda__gutter--left
    .dailyagenda__gutter.dailyagenda__gutter--right
    .dailyagenda__item(
      v-for="agenda in crossRoom.agendaList"
      :key="agenda.id"
      :style="agendaStyle(agenda)"
    )
      agenda-card(:agenda="agenda")
    .dailyagenda__item.dn.db-l(
      v-for="agenda in shadowRoom.agendaList"
      :key="agenda.id"
      :style="agendaStyle(agenda)"
    )
      agenda-card(:agenda="agenda")
    template(v-for="room in regularRooms")
      .dailyagenda__header.dn.db-ns.mb2(:key="room.name")
        room-card(:name="room.name")
      .dailyagenda__item(
        v-for="agenda in room.agendaList"
        :key="agenda.id"
        :style="agendaStyle(agenda)"
      )
        agenda-card(:agenda="agenda")
</template>
<script>
import dayjs from 'dayjs'
import { mapMutations } from 'vuex'
import { MUTATIONS } from '~/store'

import RoomCard from '~/components/RoomCard'
import AgendaCard from '~/components/AgendaCard'

const CARD_WIDTH = 13
const GUTTER_WIDTH = 4
const GAP_WIDTH = 0.5

// each row is 5 min
const ROW_SIZE_MIN = 5
const ROW_SIZE_MS = ROW_SIZE_MIN * 60 * 1000

export default {
  components: {
    RoomCard,
    AgendaCard
  },
  props: {
    agendaPerRoom: {
      type: Array,
      required: true,
      validator (list) {
        return list.every(perRoom => perRoom.name && Array.isArray(perRoom.agendaList))
      }
    }
  },
  computed: {
    regularRooms () {
      return this.agendaPerRoom
        .filter(room => !room.name.startsWith('ALL'))
        .map((perRoom, index) => {
          return this.decorateLayout(perRoom, index)
        })
    },
    shadowRoom () {
      const room = this.agendaPerRoom.find(room => room.name === 'ALL-SHADOW')
      if (room) {
        return this.decorateLayout(room, 1, this.regularRooms.length - 1)
      }
      return {}
    },
    crossRoom () {
      const room = this.agendaPerRoom.find(room => room.name === 'ALL')
      if (room) {
        return this.decorateLayout(room, 0, this.regularRooms.length)
      }
      return {}
    },
    columnNumber () {
      return this.regularRooms.length
    },
    gridStyle () {
      const gutter = `minmax(${GUTTER_WIDTH}rem, 1fr)`
      const agendaColumn = `repeat(${this.columnNumber}, ${CARD_WIDTH}rem)`
      return {
        gridTemplateColumns: `${gutter} ${agendaColumn} ${gutter}`
      }
    },
    eventStartTime () {
      return Math.min(
        ...this.agendaPerRoom
          .filter(perRoom => perRoom.agendaList.length)
          .map(perRoom => dayjs(perRoom.agendaList[0].timeSheet.議程開始時間))
      )
    }
  },
  watch: {
    columnNumber () {
      this.updatePageWidth()
    }
  },
  beforeDestroy () {
    this.setPageWidth('0')
  },
  mounted () {
    this.updatePageWidth()
    this.initFavouriteAgendas()
  },
  methods: {
    ...mapMutations({
      setPageWidth: MUTATIONS.SET_PAGE_WIDTH,
      initFavouriteAgendas: MUTATIONS.INIT_FAVOURITE_AGENDAS
    }),
    updatePageWidth () {
      const totalWidth = this.columnNumber * CARD_WIDTH + (this.columnNumber + 1) * GAP_WIDTH + GUTTER_WIDTH * 2
      this.setPageWidth(`${totalWidth}rem`)
    },
    agendaStyle (agenda) {
      // order for mobile
      // smaller start time come first
      // shorter period come first
      const flexOrder = agenda.layout.rowStart * 100 + agenda.layout.rowSpan
      return {
        gridColumn: `${agenda.layout.columnStart} / span ${agenda.layout.columnSpan}`,
        gridRow: `${agenda.layout.rowStart} / span ${agenda.layout.rowSpan}`,
        order: flexOrder
      }
    },
    decorateLayout (perRoom, index, columnSpan = 1) {
      const roomIndex = index + 2
      return {
        name: perRoom.name,
        index: roomIndex,
        agendaList: perRoom.agendaList.map((agenda) => {
          const startRowIndex = (dayjs(agenda.timeSheet.議程開始時間) - this.eventStartTime) / ROW_SIZE_MS + 2
          const rowSpan = agenda.timeSheet.議程長度 / ROW_SIZE_MIN
          return {
            ...agenda,
            layout: {
              columnStart: roomIndex,
              columnSpan,
              rowStart: startRowIndex,
              rowSpan
            }
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dailyagenda {
  display: flex;
  flex-direction: column;
  @include not-small-screen {
    display: grid;
  }
  align-items: stretch;
  // don't use gap to get shorter search result
  // column-gap: 0.5rem;
  // row-gap: 0.5rem;
  width: auto;

  &__header {
    grid-row-start: 1;
    position: sticky;
    top: calc(3.5rem - 1px);
    z-index: 1;
    background: white;
    background: linear-gradient(180deg, white 0%, white 87%, rgba(255,255,255,0.1) 100%);
  }

  &__item {
    padding: 0 0.5rem;
    @include not-small-screen {
      padding: 0;
    }
  }

  &__gutter {
    grid-row: 1 / 10;
    &--left {
      grid-column: 1 / 2;
    }
    &--right {
      grid-column: -2 / -1
    }
  }
}
</style>
