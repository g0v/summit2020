import _ from 'lodash'

// ref: https://stackoverflow.com/a/21113538/1465158
const CJK_RANGE = '\u4E00-\u9FCC'
const cjkRegex = new RegExp(`([${CJK_RANGE}])`, 'g')

export function isAgendaMatch (agenda, query = '') {
  if (query.trim() === '') {
    return true
  }
  // brute force tokenization, cut EVERY CJK char, 0-gram XD
  const queryTokens = query
    .replace(cjkRegex, ' $1 ')
    // eslint-disable-next-line no-irregular-whitespace
    .replace(/[ 　]+/g, ' ')
    .split(' ')

  // search agenda
  const agendaFieldToSearch = [
    'title',
    'timeSheet.分類主題',
    'timeSheet.議程長度'
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
