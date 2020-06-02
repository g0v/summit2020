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
    },
    hideH1: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cleanMd () {
      const meta = yamlFront.loadFront(this.content)
      let content = meta.__content || ''

      // remove all quote as it's comment
      content = content
        .split('\n')
        .filter(line => !line.startsWith('>'))
        .join('\n')

      if (this.hideH1) {
        content = content
          // remove atx format H1, aka `# This is H1`
          .replace(/\n# [^\n]+\n/g, '\n')
          // remove Setext format H1, aka `This is H1\n======`
          .replace(/\n[^\n]+\n=+\n/g, '\n')
      }

      return content
    }
  }
}
</script>
