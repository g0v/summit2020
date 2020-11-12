import _ from 'lodash'
import dayjs from 'dayjs'

const EN_TERMS = {
  en: true,
  英語: true,
  英文: true,
  英: true
}

const LANG_SPLITTER = '-'

function extractLanguageFromTable ({ rows, isEn = true }) {
  // extract info for given language, so we can import table into i18n definition
  // 時間文字-華語 => isZh
  // 時間文字-en => !isZh
  return rows.map((row) => {
    const perLangRow = {}
    for (const key in row) {
      const keyToken = key.split(LANG_SPLITTER)
      if (keyToken.length < 2) {
        // no lang specific token
        perLangRow[key] = row[key]
        continue
      }
      const isKeyEn = _.last(keyToken) in EN_TERMS
      if ((isEn && isKeyEn) || (!isEn && !isKeyEn)) {
        const nonLangKey = keyToken.slice(0, -1).join(LANG_SPLITTER)
        perLangRow[nonLangKey] = row[key]
      }
    }
    return perLangRow
  })
}

function extractLanguageFromItem ({ item, isEn }) {
  Object.keys(item).forEach((key) => {
    if (key.endsWith('_en')) {
      const val = (item[key] || '').trim()
      if (isEn && val) {
        const zhKey = key.split('_').slice(0, -1).join('_')
        item[zhKey] = val
      }
      delete item[key]
    }
  })
}

function extractLanguageFromProposals ({ proposals, isEn = true }) {
  return Object.values(proposals).map((proposal) => {
    const timeSheetWrapper = extractLanguageFromTable({ rows: [proposal.timeSheet], isEn })
    const timeSheet = timeSheetWrapper[0]
    if (timeSheet.主持人) {
      const moderator = { ...timeSheet.主持人 }
      extractLanguageFromItem({
        item: moderator,
        isEn
      })
      timeSheet.主持人 = moderator
    }
    // quick hack for search
    if (timeSheet.議程開始時間) {
      const fromTime = timeSheet.議程開始時間
      const duration = timeSheet.議程長度
      timeSheet.fromTimeStr = dayjs(fromTime).format('HH:mm')
      timeSheet.toTimeStr = dayjs(fromTime).add(duration, 'm').format('HH:mm')
    }
    const perLangProposal = {
      ...proposal,
      timeSheet
    }

    extractLanguageFromItem({ item: perLangProposal, isEn })
    if (perLangProposal.speakers) {
      perLangProposal.speakers = perLangProposal.speakers.map((speaker) => {
        return {
          ...speaker
        }
      })
      perLangProposal.speakers.forEach((speaker) => {
        extractLanguageFromItem({ item: speaker, isEn })
      })
    }

    // format: <zh format> （...） <en format> (...)
    // ex:演講 （20 分鐘）Talk (20 min)
    if (perLangProposal.format) {
      const format = perLangProposal.format
        .replace(/（[^）]+）/, '')
        .replace(/\([^)]+\)/, '')
      const tokens = format.split(' ')
      if (isEn) {
        perLangProposal.format = tokens.slice(1).join(' ').trim()
      } else {
        perLangProposal.format = tokens[0].trim()
      }
    }

    // topic
    if (perLangProposal.topic) {
      const tokens = perLangProposal.topic.split(' ')
      if (isEn) {
        perLangProposal.topic = tokens.slice(1).join(' ').trim()
      } else {
        perLangProposal.topic = tokens[0].trim()
      }
    }

    return perLangProposal
  })
}

export {
  extractLanguageFromTable,
  extractLanguageFromProposals
}
