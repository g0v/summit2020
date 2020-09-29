<template lang="pug">
  .dailyagenda.relative(:style="gridStyle")
    template(v-for="room in regularRooms")
      .dailyagenda__header.mb2(:key="room.name")
        room-card(:name="room.name")
      .dailyagenda__item(
        v-for="agenda in room.agendaList"
        :key="agenda.id"
        :style="agendaStyle(agenda)"
      )
        agenda-card(:agenda="agenda")
    .dailyagenda__item(
      v-for="agenda in crossRoom.agendaList"
      :key="agenda.id"
      :style="agendaStyle(agenda)"
    )
      agenda-card(:agenda="agenda")
</template>
<script>
import dayjs from 'dayjs'

import RoomCard from '~/components/RoomCard'
import AgendaCard from '~/components/AgendaCard'

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
        .filter(room => room.name !== 'ALL')
        .map((perRoom, index) => {
          return this.decorateLayout(perRoom, index)
        })
    },
    crossRoom () {
      const room = this.agendaPerRoom.find(room => room.name === 'ALL')
      if (room) {
        return this.decorateLayout(room, 0, this.regularRooms.length)
      }
      return {}
    },
    gridStyle () {
      const columnNumber = this.agendaPerRoom.filter(room => room.name !== 'ALL').length
      return {
        gridTemplateColumns: `repeat(${columnNumber}, 13rem)`
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
  methods: {
    agendaStyle (agenda) {
      return {
        gridColumn: `${agenda.layout.columnStart} / span ${agenda.layout.columnSpan}`,
        gridRow: `${agenda.layout.rowStart} / span ${agenda.layout.rowSpan}`
      }
    },
    decorateLayout (perRoom, index, columnSpan = 1) {
      const roomIndex = index + 1
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
  display: grid;
  justify-content: center;
  align-items: stretch;
  column-gap: 0.5rem;
  row-gap: 0.5rem;

  &__header {
    grid-row-start: 1;
  }

  &__all {
    grid-column-start: room-start;
    grid-column-end: room-end;
  }

  &__body3 {
    grid-row-start: 3;
    grid-row-end: span 3;
    // min-height: 5rem;
  }

  &__body2 {
    grid-row-start: 7;
    grid-row-end: span 2;
  }
}
</style>
