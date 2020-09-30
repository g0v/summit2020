<template lang="pug">
  a.extlink.underline.dim(:href="to" target="_blank" rel="noopener noreferrer")
    slot {{urlAbbr}}
</template>
<script>
const MAX_URL_LEN = 38
const URL_ELLIPSIS = '...'
const MIN_URL_TAIL_LEN = 5

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    urlAbbr () {
      let url = this.to
      if (!url.startsWith('http')) {
        // just to ensure it's a url
        // or become an invalid stuff
        url = 'https://' + url
      }
      if (url.length <= MAX_URL_LEN + URL_ELLIPSIS.length) {
        return url
      }
      const urlTokens = url.split('/')
      let domain = urlTokens.slice(0, 3).join('/') + '/'
      if (domain.length > MAX_URL_LEN) {
        domain = domain.slice(0, MAX_URL_LEN - MIN_URL_TAIL_LEN)
      }
      const postfix = urlTokens.slice(3).join('/')
      const lenLeft = Math.max(MAX_URL_LEN - domain.length, MIN_URL_TAIL_LEN)
      const shortUrl =
        domain + URL_ELLIPSIS + postfix.slice(postfix.length - lenLeft)
      return shortUrl
    }
  }
}
</script>
