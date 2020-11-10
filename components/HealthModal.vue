<template lang="pug">
  .healthmodal(data-slideout-ignore)
    b-modal(
      width="calc(100vw - 2rem)"
      :active="active"
      @update:active="updateActive"
    )
      .pa3.pa5-l
        slot
</template>
<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateActive (isActive) {
      this.$emit('update:active', isActive)
      if (!isActive) {
        this.$emit('closed')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.healthmodal {
  /deep/ {
    .modal-content {
      width: 65rem;
      border: 1px solid $pink-1;
      background: white;
      border-radius: 0.25rem;
      max-height: calc(100vh - 4rem);

      @include not-small-screen {
        max-height: calc(100vh - 6rem);
      }

      h1:first-child {
        margin-top: 0;
      }
      h1 {
        font-size: 2rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
    .modal-background {
      background: rgba(198, 198, 198, 0.8);
    }
  }
}
</style>
