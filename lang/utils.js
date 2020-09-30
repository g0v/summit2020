import _ from 'lodash'

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
    const perLangProposal = {
      ...proposal,
      timeSheet: timeSheetWrapper[0]
    }

    extractLanguageFromItem({ item: perLangProposal, isEn })
    if (perLangProposal.speakers) {
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
        perLangProposal.format = tokens.slice(1).join(' ')
      } else {
        perLangProposal.format = tokens[0]
      }
    }

    // topic
    if (perLangProposal.topic) {
      const tokens = perLangProposal.topic.split(' ')
      if (isEn) {
        perLangProposal.topic = tokens.slice(1).join(' ')
      } else {
        perLangProposal.topic = tokens[0]
      }
    }

    return perLangProposal
  })
}

export {
  extractLanguageFromTable,
  extractLanguageFromProposals
}
