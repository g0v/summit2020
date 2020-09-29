<template lang="pug">
  .dailyagenda
    template(v-for="room in regularRoom")
      .dailyagenda__header(:key="room.name")
        room-card(:name="room.name")
      .dailyagenda__item(v-for="agenda in room.agendaList" :key="agenda.id")
        agenda-card(:agenda="agenda")
</template>
<script>
import RoomCard from '~/components/RoomCard'
import AgendaCard from '~/components/AgendaCard'

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
    regularRoom () {
      return this.agendaPerRoom.filter(room => room.name !== 'ALL')
    },
    crossRoom () {
      return this.agendaPerRoom.find(room => room.name === 'ALL')
    }
  }
}
</script>
<style lang="scss" scoped>
.dailyagenda {
  display: grid;
  grid-template-columns: [room-start] repeat(auto-fill, 13rem) [room-end];
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
