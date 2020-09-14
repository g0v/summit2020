// TODO:
// 1. [x] download accepted proposal && merge time sheet info
// 2. [x] allow overwrite by summit worker using special airtable table
// 3. [ ] host avatar ourselves

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const moment = require('moment')
const _ = require('lodash')
const yaml = require('yaml')
const { proposalServer } = require('../.docs.config')
const { downloadOneTable } = require('./airtableLibs')
const {
  CONTENT_FIELD_DEFINITIONS,
  SPEAKER_FIELD_DEFINITIONS
} = require('./projectFields')

const EXPORT_PATH = path.join(__dirname, '../assets/proposals.json')
const SEC_PER_MIN = 60
const ALLOW_MERGE_SINCE = moment('2020-09-06T12:00:00+08:00')

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
        updatedAt: moment(lastVersion.createdAt)
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
    const proposal = genProposalFromAdditionalTable(row)
    const existing = acceptedMap[proposal.id]
    if (proposal.id in usedAdditionalMap) {
      throw new Error(`Duplicated proposal ID ${proposal.id} in airtable`)
    }
    usedAdditionalMap[proposal.id] = true

    if (!existing) {
      acceptedMap[proposal.id] = proposal
    } else if (proposal.updatedAt > existing.updatedAt && proposal.updatedAt > ALLOW_MERGE_SINCE) {
      acceptedMap[proposal.id] = {
        ...existing,
        ...proposal
      }
    }
  })
  return Object.values(acceptedMap)
}

function genProposalFromAdditionalTable (addition) {
  // Don't forget to check if ID conflict
  const ts = moment(addition.updatedAt)
  const proposal = {
    id: addition.id,
    speakers: [],
    updatedAt: ts,
    // to be compatible to CFP site data structure
    createdAt: ts
  }

  CONTENT_FIELD_DEFINITIONS.forEach((field) => {
    const val = addition[field.label]
    if (val === undefined || val === '') {
      return
    }
    proposal[field.id] = addition[field.label]
  });

  ['講者 1', '講者 2', '講者 3'].forEach((speakerId) => {
    if (!addition[speakerId]) {
      return
    }
    const additionalSpeaker = yaml.parse(addition[speakerId])
    const speaker = {}
    SPEAKER_FIELD_DEFINITIONS.forEach((field) => {
      const val = additionalSpeaker[field.id]
      if (val === undefined || val === '') {
        return
      }
      speaker[field.id] = val
    })
    if (Object.keys(speaker).length) {
      proposal.speakers.push(speaker)
    }
  })

  return proposal
}

async function downloadTables () {
  const timeSheetRaw = await downloadOneTable({
    id: 'dummy',
    tableName: '議程時間',
    view: 'Grid view'
  }, false)
  const timeSheet = timeSheetRaw.map(sheet => normalizeTimeSheet(sheet))
  return { timeSheet }
}

function genFieldI18n (value) {
  value = (value || '').trim()
  const tokens = value.split(',')
  if (tokens.length > 1) {
    return {
      zh: tokens[0].trim(),
      en: tokens[1].trim()
    }
  }
  return {
    zh: value,
    en: value
  }
}

function normalizeTimeSheet (timeSheet) {
  const category = genFieldI18n(timeSheet.分類主題)
  const location = genFieldI18n(timeSheet.議程場地)
  const startHour = moment.unix(timeSheet.議程開始時間).utc().format('HH:mm')
  const timeSheetFields = [
    'id',
    '議程日期',
    '議程預設標題-華語',
    '議程預設標題-en',
    '最後更新時間'
  ]
  const ret = {
    ..._.pick(timeSheet, timeSheetFields),
    議程開始時間: `${timeSheet.議程日期}T${startHour}`,
    議程長度: timeSheet.議程長度 / SEC_PER_MIN,
    '分類主題-華語': category.zh,
    '分類主題-en': category.en,
    '議程場地-華語': location.zh,
    '議程場地-en': location.en
  }
  delete ret.分類主題
  delete ret.議程場地
  return ret
}

function exportProposals (proposals, timeSheet) {
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
    const sheet = timeMap[pid]
    if (timeTakenMap[pid]) {
      console.warn(`Time ${sheet.議程日期} ${sheet.議程開始時間} - ${sheet['議程場地-華語']} is taken by at least 2 proposals:`)
      console.warn(`    ${sheet.isTakenBy.id} && ${pid}`)
      return
    }
    timeTakenMap[pid] = proposal
    toExport[pid] = {
      ...proposal,
      timeSheet: sheet
    }
  })

  Object.keys(timeMap).forEach((pid) => {
    if (timeTakenMap[pid]) {
      return
    }
    // pseudo time slot!
    const timeSheet = timeMap[pid]
    const updatedAt = moment(timeSheet.最後更新時間)
    const zhTitle = _.get(timeSheet, '議程預設標題-華語', 'N/A')
    const enTitle = _.get(timeSheet, '議程預設標題-en', zhTitle)
    toExport[pid] = {
      id: pid,
      isPseudo: true,
      title: zhTitle,
      title_en: enTitle,
      updatedAt,
      createdAt: updatedAt,
      timeSheet
    }
  })

  fs.writeFile(EXPORT_PATH, JSON.stringify(toExport, null, '  '), (err) => {
    if (err) {
      console.error(err)
      return
    }
    // eslint-disable-next-line no-console
    console.info(`Generate ${Object.keys(toExport).length} proposals`)
  })
}

(async function syncProposals () {
  const proposals = await downloadProposals()
  const { timeSheet } = await downloadTables()
  exportProposals(proposals, timeSheet)
})()
