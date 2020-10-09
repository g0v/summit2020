<template lang="pug">
  .atooltip
    .atooltip__search.br-pill.pv2.ph3.ba.flex-auto.flex.items-center
      input.flex-auto.bn.lh-solid(
        v-model.trim="curQuery"
        :placeholder="$t('search')"
      )
      button.bn.bg-transparent.flex.items-center(@click="resetSearch")
        img(v-if="!curQuery" src="~/assets/icons/search.svg")
        img(v-else src="~/assets/icons/close.svg")
</template>
<i18n lang="yaml">
en:
  search: Search agenda
zh:
  search: 搜尋議程
</i18n>
<script>
export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      curQuery: ''
    }
  },
  watch: {
    curQuery (newVal) {
      this.$emit('update:query', newVal)
    },
    query (newVal) {
      if (newVal !== this.curQuery) {
        this.curQuery = newVal
      }
    }
  },
  methods: {
    resetSearch () {
      this.curQuery = ''
    }
  }
}
</script>
<style lang="scss" scoped>

.atooltip {
  width: 100%;
  max-width: $tooltip-width;
  &__search {
    border-color: $gray-2;
    input {
      color: #6e6e6e;
    }
    img {
      width: 1.125rem;
    }
  }
}
</style>
