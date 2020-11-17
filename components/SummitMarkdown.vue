<template>
  <div class="summitmd">
    <vue-markdown :toc="true">
      {{ cleanMd }}
    </vue-markdown>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import { cleanMarkdown } from '~/utils/markdownUtils'

export default {
  components: {
    VueMarkdown
  },
  props: {
    content: {
      type: String,
      required: true
    },
    hideH1: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cleanMd () {
      return cleanMarkdown(this.content)
    }
  }
}
</script>

<style lang="scss" scoped>
.summitmd {
  padding: 1rem;
  /deep/ {
    ul {
      list-style: inherit;
    }
    .toc-anchor-link {
      display: none;
    }
  }
}
</style>
