<template lang="pug">
  .roomcard.tc.pb2.pr2
    .roomcard__occu.f6.fw3(v-if="!isFto" :class="{'roomcard__occu--full': isRoomFull}")
      i.fas.mr2(:class="{'fa-door-closed': isRoomFull, 'fa-door-open': !isRoomFull}")
      | {{roomOccuStr}}
    .b.f4 {{code}}
    .fw5 {{building}}
    .fw3 {{room}}
</template>
<script>
import { mapState } from 'vuex'
import { STATES } from '~/store'

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      occuState: STATES.ROOM_OCCU_STATE
    }),
    isFto () {
      return this.name.startsWith('B - ')
    },
    isRoomFull () {
      const field = `${this.$i18n.locale}Name`
      const roomState = this.occuState.find(item => item[field] === this.name)
      return roomState && roomState.isFull
    },
    roomOccuStr () {
      if (this.isRoomFull) {
        return this.$t('isRoomFull')
      }
      return this.$t('isRoomNotFull')
    },
    roomToken () {
      return this.name.split(' - ')
    },
    code () {
      if (this.roomToken.length) {
        return this.roomToken[0].trim()
      }
      return ''
    },
    building () {
      if (this.roomToken.length >= 2) {
        return this.roomToken[1].trim()
      }
      return ''
    },
    room () {
      if (this.roomToken.length >= 3) {
        return this.roomToken[2].trim()
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.roomcard {
  color: #555;
  position: relative;
  top: 0;

  &__occu {
    color: $blue-1;
    &--full {
      color: #888;
    }
  }
}
</style>
