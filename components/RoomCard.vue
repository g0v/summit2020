<template lang="pug">
  .roomcard.tc
    .fw5.f4 {{building}}
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
    building () {
      if (this.roomToken.length > 1) {
        return this.roomToken.slice(0, -1).join('-').trim()
      }
      return this.name.trim()
    },
    room () {
      if (this.roomToken.length > 1) {
        return this.roomToken[this.roomToken.length - 1].trim()
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
