<template lang="pug">
  component.texthl(:is="tag")
    component(
      v-for="(token, i) in matchedTokens"
      :key="i"
      :is="token.isMatched ? 'mark' : 'span'"
    ) {{token.text}}
</template>
<script>
import { mapState } from 'vuex'
import { STATES } from '~/store'
import { markMatchedText } from '~/utils/searchUtils'

export default {
  props: {
    text: {
      type: [String, Number],
      default: ''
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    ...mapState({
      query: STATES.AGENDA_QUERY
    }),
    matchedTokens () {
      return markMatchedText(this.text, this.query)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
