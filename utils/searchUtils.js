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
  island: {
    field: 'topic',
    defaultOpened: false
  }
}

function isAgendaMatchFilter (agenda, filter) {
  return Object.keys(filter).every((type) => {
    // agenda should match one value in each filter type
    return filter[type].some((filterValue) => {
      const fieldValue = _.get(agenda, FILTER_MAP[type].field)
      return filterValue === fieldValue
    })
  })
}

function isAgendaMatchQuery (agenda, query) {
  if (query.trim() === '') {
    return true
  }
  // brute force tokenization, cut EVERY CJK char, 0-gram XD
  const queryTokens = query.toLowerCase()
    .replace(cjkRegex, ' $1 ')
    // eslint-disable-next-line no-irregular-whitespace
    .replace(/[ 　]+/g, ' ')
    .split(' ')

  // search agenda
  const agendaFieldToSearch = [
    'title',
    'timeSheet.分類主題',
    'timeSheet.議程長度',
    'timeSheet.主持人.display_name'
  ]
  let isMatch = agendaFieldToSearch.some((field) => {
    const value = _.get(agenda, field, '').toString().toLowerCase()
    return queryTokens.every(token => value.includes(token))
  })
  if (isMatch) {
    return true
  }

  // search speakers
  if (!agenda.speakers || !agenda.speakers.length) {
    return false
  }

  isMatch = agenda.speakers.some((speaker) => {
    const value = (speaker.display_name || '').toLowerCase()
    return queryTokens.every(token => value.includes(token))
  })

  return isMatch
}

export function isAgendaMatch (agenda, query = '', filter = {}) {
  return isAgendaMatchFilter(agenda, filter) &&
    isAgendaMatchQuery(agenda, query)
}
