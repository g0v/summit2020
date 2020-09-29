<template>
  <div class="richmultiline">
    <p
      v-for="(paragraph, i) in paragraphList"
      :key="i"
      class="richmultiline__paragraph"
    >
      {{ paragraph }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    paragraphList () {
      // remove empty line
      if (!this.text) {
        return []
      }
      const text = this.text.replace(/^"/, '').replace(/"$/, '')
      return text.split('\n').filter(line => !!line)
    }
  }
}
</script>
<style lang="scss" scoped>
.richmultiline {
  &__paragraph {
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0rem !important;
    }
  }
}
</style>
