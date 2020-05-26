<template>
  <div class="summitmd">
    <vue-markdown>
      {{ cleanMd }}
    </vue-markdown>
  </div>
</template>
<script>
import * as yamlFront from 'yaml-front-matter'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    cleanMd () {
      const meta = yamlFront.loadFront(this.content)
      const content = meta.__content || ''
      // remove all quote as it's comment
      return content
        .split('\n')
        .filter(line => !line.startsWith('>'))
        .join('\n')
    }
  }
}
</script>
