<template lang="pug">
  .roomcard.tc.pb2.pr2
    .b.f4 {{code}}
    .fw5 {{building}}
    .fw3 {{room}}
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
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
}
</style>
