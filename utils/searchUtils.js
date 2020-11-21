import _ from 'lodash'

// ref: https://stackoverflow.com/a/21113538/1465158
const CJK_RANGE = '\u4E00-\u9FCC'
const cjkRegex = new RegExp(`([${CJK_RANGE}])`, 'g')

export const FILTER_MAP = {
  format: {
    field: 'format',
    defaultOpened: true
  },
  language: {
    field: 'oral_language',
    i18n: true,
    defaultOpened: false
  },
  location: {
    field: 'timeSheet.議程場地',
    defaultOpened: false
  },
  presentMethod: {
    field: 'presentation_method',
    defaultOpened: false,
    defaultValue: ['現場報告', 'on-site'],
    ignorePseudo: true
  },
  island: {
    field: 'topic',
    defaultOpened: false
  }
}

const AGENDA_FIELD_TO_SEARCH = [
  'title',
  'timeSheet.分類主題',
  'timeSheet.議程長度',
  'timeSheet.fromTimeStr',
  'timeSheet.toTimeStr',
  'timeSheet.主持人.display_name'
]

function isAgendaMatchFilter (agenda, filter) {
  return Object.keys(filter).every((type) => {
    // agenda should match one value in each filter type
    return filter[type].some((filterValue) => {
      const def = FILTER_MAP[type]
      const fieldValue = _.get(agenda, def.field)
      // when defaultValue is given, use it when get empty value
      if (fieldValue || !def.defaultValue) {
        return filterValue === fieldValue
      }
      if (def.ignorePseudo && agenda.isPseudo) {
        return false
      }
      return def.defaultValue.includes(filterValue)
    })
  })
}

function normalizeQuery (query) {
  if (query.trim() === '') {
    return []
  }
  // brute force tokenization, cut EVERY CJK char, 0-gram XD
  return query.toLowerCase()
    .replace(cjkRegex, ' $1 ')
    // eslint-disable-next-line no-irregular-whitespace
    .replace(/[ 　]+/g, ' ')
    .split(' ')
}

export function markMatchedText (text, query) {
  const queryTokens = normalizeQuery(query)

  if (!queryTokens.length) {
    return [{ text, isMatched: false }]
  }

  // text won't be too long, say, less than 20 chars,
  // use simple O(m*n) alg without complex data structure such as interval tree XD
  text = text.toString()
  const normalizedText = text.toLowerCase()
  const matchedMap = _.repeat(' ', text.length).split('').map(() => false)
  queryTokens.forEach((token) => {
    for (const matched of normalizedText.matchAll(token)) {
      for (let i = 0; i < token.length; i++) {
        matchedMap[i + matched.index] = true
      }
    }
  })
  return matchedMap.reduce((textTokens, isMatched, index) => {
    const tokenLen = textTokens.length
    const theChar = text[index]
    if (!tokenLen) {
      return [{ text: theChar, isMatched }]
    }
    if (textTokens[tokenLen - 1].isMatched !== isMatched) {
      textTokens.push({ text: theChar, isMatched })
    } else {
      textTokens[tokenLen - 1].text += theChar
    }
    return textTokens
  }, [])
}

function isAgendaMatchQuery (agenda, query) {
  const queryTokens = normalizeQuery(query)

  if (!queryTokens.length) {
    return true
  }

  // search agenda
  let isMatched = AGENDA_FIELD_TO_SEARCH.some((field) => {
    const value = _.get(agenda, field, '').toString().toLowerCase()
    return queryTokens.every(token => value.includes(token))
  })
  if (isMatched) {
    return true
  }

  // search speakers
  if (!agenda.speakers || !agenda.speakers.length) {
    return false
  }

  isMatched = agenda.speakers.some((speaker) => {
    const value = (speaker.display_name || '').toLowerCase()
    return queryTokens.every(token => value.includes(token))
  })

  return isMatched
}

export function isAgendaMatch (agenda, query = '', filter = {}) {
  return isAgendaMatchFilter(agenda, filter) &&
    isAgendaMatchQuery(agenda, query)
}
