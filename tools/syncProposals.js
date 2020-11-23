// include sentry
require('dotenv').config()

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const _ = require('lodash')
const yaml = require('yaml')
const { proposalServer } = require('../.docs.config')
const {
  downloadOneTable,
  hostImage,
  logError
} = require('./airtableLibs')
const {
  CONTENT_FIELD_DEFINITIONS,
  SPEAKER_FIELD_DEFINITIONS
} = require('./projectFields')

dayjs.extend(utc)

const EXPORT_PATH = path.join(__dirname, '../assets/agendas/proposals')
const SEC_PER_MIN = 60
const ALLOW_MERGE_SINCE = dayjs('2020-09-06T12:00:00+08:00')

const AVATAR_WIDTH = 256

async function downloadProposals () {
  const allProposals = await axios.get(`${proposalServer}/projects`)
  const acceptedProposals = allProposals.data
    .filter(proposal => proposal.selected)
    .map((proposal) => {
      const lastVersion = proposal.versions[0]
      return {
        id: proposal._id,
        ...lastVersion,
        // createdAt of last version is updatedAt of this proposal
        updatedAt: dayjs(lastVersion.createdAt)
      }
    })

  const acceptedMap = {}
  acceptedProposals.forEach((proposal) => {
    acceptedMap[proposal.id] = proposal
  })

  const additionalProposals = await downloadOneTable({
    id: 'dummy',
    tableName: '議程組覆寫專用',
    view: 'Grid view'
  }, false)

  const usedAdditionalMap = {}

  additionalProposals.forEach((row) => {
    const { proposal, speakers } = genProposalFromAdditionalTable(row)
    const existing = acceptedMap[proposal.id]
    let isAdditionNewer = false
    if (proposal.id in usedAdditionalMap) {
      throw new Error(`Duplicated proposal ID ${proposal.id} in airtable`)
    }
    usedAdditionalMap[proposal.id] = true

    if (!existing) {
      acceptedMap[proposal.id] = {
        ...proposal,
        speakers: []
      }
    } else if (proposal.updatedAt > existing.updatedAt && proposal.updatedAt > ALLOW_MERGE_SINCE) {
      isAdditionNewer = true
      acceptedMap[proposal.id] = {
        ...existing,
        ...proposal
      }
    }

    // merge non-empty speaker from additional proposals anyway
    speakers.forEach((speaker, i) => {
      if (!speaker) {
        return
      }
      if (!acceptedMap[proposal.id].speakers[i] || isAdditionNewer) {
        acceptedMap[proposal.id].speakers[i] = speaker
      }
    })

    // allow remove speaker from by crew, using `is_removed` attr
    acceptedMap[proposal.id].speakers = acceptedMap[proposal.id].speakers
      .filter((speaker) => {
        return !speaker.is_removed
      })
  })
  return Object.values(acceptedMap)
}

function genProposalFromAdditionalTable (addition) {
  // Don't forget to check if ID conflict
  const ts = dayjs(addition.updatedAt)
  const proposal = {
    id: addition.id,
    updatedAt: ts,
    // to be compatible to CFP site data structure
    createdAt: ts
  }
  const speakers = []

  CONTENT_FIELD_DEFINITIONS.forEach((field) => {
    const val = addition[field.label]
    if (val === undefined || val === '') {
      return
    }
    proposal[field.id] = addition[field.label]

    const otherId = field.otherId
    if (otherId && addition[otherId]) {
      proposal[otherId] = addition[otherId]
    }
  });

  ['講者 1', '講者 2', '講者 3'].forEach((speakerId) => {
    if (!addition[speakerId]) {
      speakers.push(undefined)
      return
    }
    try {
      const speaker = genPerson(addition[speakerId])
      if (speaker) {
        speakers.push(speaker)
      }
    } catch (err) {
      console.error(`In ${addition.id} > ${speakerId}, get invalid yaml`)
      throw err
    }
  })

  return { proposal, speakers }
}

function genPerson (personString) {
  const additionalSpeaker = yaml.parse(personString)
  const speaker = {}
  SPEAKER_FIELD_DEFINITIONS.forEach((field) => {
    const val = additionalSpeaker[field.id]
    if (val === undefined || val === '') {
      return
    }
    speaker[field.id] = val
  })
  if (Object.keys(speaker).length) {
    return speaker
  }
  return undefined
}

async function downloadTables () {
  const timeSheetRaw = await downloadOneTable({
    id: 'dummy',
    tableName: '議程時間',
    view: '別動我區'
  }, false)

  const locationRaw = await downloadOneTable({
    id: 'dummy',
    tableName: '議程場地資訊',
    view: 'Grid view'
  }, false)

  const moderatorRaw = await downloadOneTable({
    id: 'dummy',
    tableName: '主持人資訊',
    view: 'Grid view'
  }, false)

  const moderatorMap = moderatorRaw.reduce((map, moderator) => {
    if (!moderator.資訊) {
      return map
    }
    try {
      return {
        ...map,
        [moderator._id]: genPerson(moderator.資訊)
      }
    } catch (err) {
      logError(`Invalid moderator "${moderator.id}": ${err}`)
    }
    return map
  }, {})

  const locationMap = locationRaw.reduce((map, location) => {
    return {
      ...map,
      [location.id]: {
        zhName: location['場地-華語'],
        enName: location['場地-en'],
        order: location.順位,
        capacity: location.人數
      }
    }
  }, {})

  const timeSheet = timeSheetRaw
    .map(sheet => normalizeTimeSheet(sheet, locationMap, moderatorMap))
    .filter(sheet => sheet.議程長度 && sheet.議程開始時間)
  return { timeSheet }
}

function genFieldI18n (value) {
  value = (value || '').trim()
  const tokens = value.split(',')
  if (tokens.length > 1) {
    return {
      zh: tokens[0].trim(),
      en: tokens.slice(1).join(',').trim()
    }
  }
  return {
    zh: value,
    en: value
  }
}

const INTERMEDIATE_TIME_FIELDS = [
  '議程預設標題-華語',
  '議程預設標題-en',
  '分享方式',
  '翻譯方式',
  '提供手語',
  '標題對調',
  '講者 1',
  '講者 2',
  '講者 3',
  '覆寫欄位更新時間'
]

function normalizeTimeSheet (timeSheet, locationMap, moderatorMap) {
  const locationMeta = locationMap[timeSheet.議程場地] || {}
  if (!locationMeta.zhName) {
    const errmsg = `Undefined location in  ${timeSheet.id}`
    logError(errmsg)
  }
  const category = genFieldI18n(timeSheet.分類主題)
  const startHour = dayjs.unix(timeSheet.議程開始時間)
  // 主持人 could be [`id`] or undefined
  const moderatorId = timeSheet.主持人 ? timeSheet.主持人[0] : null
  const moderator = moderatorMap[moderatorId] || null

  const timeSheetFields = [
    'id',
    '議程日期',
    '最後更新時間',
    ...INTERMEDIATE_TIME_FIELDS
  ]
  const ret = {
    ..._.pick(timeSheet, timeSheetFields),
    '分類主題-華語': category.zh,
    '分類主題-en': category.en,
    '議程場地-華語': locationMeta.zhName,
    '議程場地-en': locationMeta.enName || locationMeta.zhName,
    主持人: moderator
  }
  if (startHour.isValid()) {
    ret.議程開始時間 = `${timeSheet.議程日期}T${startHour.utc().format('HH:mm')}`
  }
  if (timeSheet.議程長度) {
    ret.議程長度 = timeSheet.議程長度 / SEC_PER_MIN
  }
  if (locationMeta) {
    ret.locationMeta = _.pick(locationMeta, [
      'order',
      'capacity'
    ])
  }

  return ret
}

async function exportProposals (proposals, timeSheet) {
  const timeMap = {}
  const timeTakenMap = {}
  timeSheet.forEach((sheet) => {
    timeMap[sheet.id] = { ...sheet }
  })

  const toExport = {}
  proposals.forEach((proposal) => {
    const pid = proposal.id
    if (!(pid in timeMap)) {
      console.warn(`Proposal [${pid}] ${proposal.title} not found in time sheet`)
      return
    }
    const sheet = { ...timeMap[pid] }
    if (timeTakenMap[pid]) {
      const errMsg = `Time ${sheet.議程日期} ${sheet.議程開始時間} - ${sheet['議程場地-華語']} is taken by at least 2 proposals: ${sheet.isTakenBy.id} && ${pid}`
      logError(errMsg)
      return
    }
    timeTakenMap[pid] = proposal
    toExport[pid] = {
      ...proposal,
      timeSheet: sheet
    }
  })

  Object.keys(timeMap).forEach((pid) => {
    const timeSheet = timeMap[pid]
    const updatedAt = dayjs(timeSheet.最後更新時間)
    const overwrittenAt = dayjs(timeSheet.覆寫欄位更新時間)
    const zhTitle = _.get(timeSheet, '議程預設標題-華語', 'N/A')
    const enTitle = _.get(timeSheet, '議程預設標題-en', zhTitle)
    const richProposal = toExport[pid]

    if (!timeTakenMap[pid]) {
      // pseudo time slot!
      toExport[pid] = {
        id: pid,
        isPseudo: true,
        title: zhTitle,
        title_en: enTitle,
        updatedAt,
        createdAt: updatedAt,
        timeSheet: { ...timeSheet }
      }
    } else if (overwrittenAt > richProposal.updatedAt) {
      // summit crew prefer set some attributes from timeSheet XD
      if (enTitle && enTitle !== zhTitle) {
        richProposal.title_en = enTitle
      }

      // switch title if necessary
      if (timeSheet.標題對調) {
        [richProposal.title, richProposal.title_en] = [richProposal.title_en, richProposal.title]
      }

      // let's also allow overwrite speaker from timeSheet~
      ['講者 1', '講者 2', '講者 3'].forEach((speakerId, i) => {
        if (!timeSheet[speakerId]) {
          return
        }
        let speaker = null
        try {
          speaker = genPerson(timeSheet[speakerId])
        } catch (err) {
          console.error(`In timeSheet ${timeSheet.id} > ${speakerId}, get invalid yaml`)
          throw err
        }

        if (!speaker || !richProposal.speakers[i]) {
          return
        }
        Object.keys(speaker).forEach((attr) => {
          if (speaker[attr]) {
            console.warn('overwrite', richProposal.title, i, attr, speaker[attr])
            richProposal.speakers[i][attr] = speaker[attr]
          }
        })
      })
    }

    if (timeSheet.翻譯方式 && !timeSheet.翻譯方式.startsWith('無翻譯')) {
      toExport[pid].translation = timeSheet.翻譯方式
    }

    if (timeSheet.提供手語) {
      toExport[pid].provide_sign_language = true
    }

    // always prefer 分享方式 then presentation_method as it's defined by crew
    if (timeSheet.分享方式) {
      toExport[pid].presentation_method = timeSheet.分享方式
    }

    INTERMEDIATE_TIME_FIELDS.forEach((attr) => {
      if (attr in toExport[pid].timeSheet) {
        delete toExport[pid].timeSheet[attr]
      }
    })
  })

  // backup original proposal
  fs.writeFileSync(`${EXPORT_PATH}.orig.json`, JSON.stringify(toExport, null, '  '))

  // replace all image url
  for (const pid in toExport) {
    const project = toExport[pid]
    if (project.cover_image) {
      project.cover_image = await hostImage(project.cover_image)
    }

    if (project.speakers) {
      for (const speaker of project.speakers) {
        if (speaker.avatar_url) {
          speaker.avatar_url = await hostImage(speaker.avatar_url, AVATAR_WIDTH)
        }
      }
    }
    const moderator = _.get(project, 'timeSheet.主持人')
    if (moderator && moderator.avatar_url) {
      moderator.avatar_url = await hostImage(moderator.avatar_url, AVATAR_WIDTH)
    }
  }
  fs.writeFileSync(`${EXPORT_PATH}.json`, JSON.stringify(toExport, null, '  '))
  // eslint-disable-next-line no-console
  console.info(`Generate ${Object.keys(toExport).length} proposals`)
}

(async function syncProposals () {
  const proposals = await downloadProposals()
  const { timeSheet } = await downloadTables()
  await exportProposals(proposals, timeSheet)
})()
