import { cleanMarkdown } from './markdownUtils'

const PROD_URL = process.env.SITE_BASE
const TITLE_TAIL = ' | g0v Summit 台灣零時政府雙年會'

export function summaryFromMarkdown (content, max = 100) {
  const text = cleanMarkdown(content, true, true)
  if (text.length > max) {
    return text.slice(0, max) + '...'
  }
  return text
}

// all three attribute can be either static string or callback that use vue instance as this
export function friendlyHeader ({ title, description, coverUrl }) {
  function getContentAtBest (sth) {
    if (typeof sth === 'string') {
      return sth
    } else if (typeof sth === 'function') {
      return sth.call(this)
    } else {
      return sth.toString()
    }
  }
  function genMeta (name, content) {
    return {
      hid: name,
      name,
      content
    }
  }
  // return a head function
  return function () {
    const getContentWithThis = getContentAtBest.bind(this)
    const head = { meta: [] }

    if (title) {
      const titleStr = `${getContentWithThis(title)}${TITLE_TAIL}`

      head.title = titleStr
      head.meta.push(genMeta('og:title', titleStr))
      head.meta.push(genMeta('twitter:title', titleStr))
    }
    if (description) {
      const despStr = getContentWithThis(description)
      head.meta.push(genMeta('description', despStr))
      head.meta.push(genMeta('og:description', despStr))
      head.meta.push(genMeta('twitter:description', despStr))
    }
    if (coverUrl) {
      let coverUrlStr = getContentWithThis(coverUrl)
      if (coverUrlStr.startsWith('/')) {
        coverUrlStr = `${PROD_URL}${coverUrl}`
      }
      head.meta.push(genMeta('og:image', coverUrlStr))
      head.meta.push(genMeta('twitter:image', coverUrlStr))
      head.meta.push(genMeta('twitter:card', 'summary_large_image'))
    }
    if (title || description || coverUrl) {
      const url = `${PROD_URL}${this.$route.path}`
      head.meta.push(genMeta('og:url', url))
    }
    return head
  }
}
