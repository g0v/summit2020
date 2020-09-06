// TODO:
// 1. [x] download accepted proposal && merge time sheet info
// 2. [ ] allow overwrite by summit worker using special airtable table
// 3. [ ] host avatar ourselves

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const moment = require('moment')
const { proposalServer } = require('../.docs.config')
const { downloadOneTable } = require('./airtableLibs')

const EXPORT_PATH = path.join(__dirname, '../assets/proposals.json')
const SEC_PER_MIN = 60

async function downloadProposals () {
  const allProposals = await axios.get(`${proposalServer}/projects`)
  return allProposals.data
    .filter(proposal => proposal.selected)
    .map((proposal) => {
      return {
        id: proposal._id,
        ...proposal.versions[0]
      }
    })
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
  const ret = {
    ...timeSheet,
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

function exportProposals (origProposals, timeSheet) {
  const timeMap = {}
  timeSheet.forEach((sheet) => {
    timeMap[sheet.id] = { ...sheet }
  })

  const toExport = {}
  origProposals.forEach((proposal) => {
    if (!(proposal.id in timeMap)) {
      console.warn(`Proposal [${proposal.id}] ${proposal.title} not found in time sheet`)
      return
    }
    const sheet = timeMap[proposal.id]
    if (sheet.isTakenBy) {
      console.warn(`Time ${sheet.議程日期} ${sheet.議程開始時間} - ${sheet['議程場地-華語']} is taken by at least 2 proposals:`)
      console.warn(`    ${sheet.isTakenBy.id} && ${proposal.id}`)
      return
    }
    sheet.isTakenBy = proposal
    toExport[proposal.id] = {
      ...proposal,
      timeSheet: sheet
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
  const origProposals = await downloadProposals()
  const { timeSheet } = await downloadTables()
  exportProposals(origProposals, timeSheet)
})()
