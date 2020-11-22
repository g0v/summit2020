<template lang="pug">
  .agendatag(:class="{'agendatag--hl': highlight, truncate: truncate}")
    slot
</template>
<script>
export default {
  props: {
    highlight: {
      type: Boolean,
      default: false
    },
    truncate: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
.agendatag {
  border-radius: 999px;
  color: white;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  background: #67cddd;
  padding: 0.125rem 0.5rem;
  max-width: calc(100vw - 5rem);
  &:not(:last-child) {
    margin-right: 0.25rem;
  }
  &--hl {
    background: #509fac;
  }
}
</style>
