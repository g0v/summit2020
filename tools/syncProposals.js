// TODO:
// 1. [x] download accepted proposal && merge time sheet info
// 2. [x] allow overwrite by summit worker using special airtable table
// 3. [x] sentry integration
// 4. [ ] host avatar ourselves

// include sentry
require('dotenv').config()

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const Sentry = require('@sentry/node')
const axios = require('axios')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const _ = require('lodash')
const yaml = require('yaml')
const md5 = require('md5')
const imageType = require('image-type')
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const { proposalServer } = require('../.docs.config')
const { downloadOneTable } = require('./airtableLibs')
const {
  CONTENT_FIELD_DEFINITIONS,
  SPEAKER_FIELD_DEFINITIONS
} = require('./projectFields')

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  })
}

dayjs.extend(utc)

const EXPORT_PATH = path.join(__dirname, '../assets/agendas/proposals')
const SEC_PER_MIN = 60
const ALLOW_MERGE_SINCE = dayjs('2020-09-06T12:00:00+08:00')
const IMG_CACHE_BASE = {
  url: '/cache/',
  path: path.join(__dirname, '../static/cache')
}
const ACCEPTED_IMAGE_TYPE = ['png', 'jpg', 'webp', 'gif']

function logError (message) {
  Sentry.captureMessage(message)
  console.error(message)
}

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
  const ts = dayjs(addition.updatedAt)
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

    const otherId = field.otherId
    if (otherId && addition[otherId]) {
      proposal[otherId] = addition[otherId]
    }
  });

  ['講者 1', '講者 2', '講者 3'].forEach((speakerId) => {
    if (!addition[speakerId]) {
      return
    }
    let additionalSpeaker = {}
    try {
      additionalSpeaker = yaml.parse(addition[speakerId])
    } catch (err) {
      console.error(`In ${addition.id} > ${speakerId}, get invalid yaml`)
      throw err
    }
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

  const locationRaw = await downloadOneTable({
    id: 'dummy',
    tableName: '議程場地資訊',
    view: 'Grid view'
  }, false)

  const locationMap = locationRaw.reduce((map, location) => {
    return {
      ...map,
      [location.場地]: {
        order: location.順位,
        capacity: location.人數
      }
    }
  }, {})

  const timeSheet = timeSheetRaw
    .map(sheet => normalizeTimeSheet(sheet, locationMap))
    .filter(sheet => sheet.議程長度 && sheet.議程開始時間)
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

function normalizeTimeSheet (timeSheet, locationMap) {
  const category = genFieldI18n(timeSheet.分類主題)
  const location = genFieldI18n(timeSheet.議程場地)
  const startHour = dayjs.unix(timeSheet.議程開始時間)
  const timeSheetFields = [
    'id',
    '議程日期',
    '議程預設標題-華語',
    '議程預設標題-en',
    '最後更新時間'
  ]
  const ret = {
    ..._.pick(timeSheet, timeSheetFields),
    '分類主題-華語': category.zh,
    '分類主題-en': category.en,
    '議程場地-華語': location.zh,
    '議程場地-en': location.en
  }
  if (startHour.isValid()) {
    ret.議程開始時間 = `${timeSheet.議程日期}T${startHour.utc().format('HH:mm')}`
  }
  if (timeSheet.議程長度) {
    ret.議程長度 = timeSheet.議程長度 / SEC_PER_MIN
  }

  const locationStr = timeSheet.議程場地
  if (locationMap[locationStr]) {
    ret.locationMeta = locationMap[locationStr]
  } else if (locationStr) {
    const errmsg = `Undefined location ${timeSheet.議程場地}`
    logError(errmsg)
  }
  delete ret.分類主題
  delete ret.議程場地
  return ret
}

async function hostImage (originalUrl, mayRetry = true) {
  // download image and return new img url, if the image is host in 3rd party
  // also optimize the image when possible

  // example exception:
  // https://drive.google.com/file/d/1MeM5enF9IfGVv-_Sgb5k_J5VC9DIETz9/view?usp=sharing
  // https://imgur.com/a/8JI5s
  originalUrl = originalUrl.trim()
  if (!originalUrl || originalUrl.startsWith('/')) {
    // in case someone overwrite url to other local path XD
    return originalUrl
  }

  const imgHash = md5(originalUrl)
  const imgDest = path.join(IMG_CACHE_BASE.path, imgHash)
  const imgUrl = `${IMG_CACHE_BASE.url}${imgHash}`

  const matchedImage = glob.sync(`${imgDest}.*`)
  if (matchedImage.length) {
    const file = path.basename(matchedImage[0])
    return `${IMG_CACHE_BASE.url}${file}`
  }

  // let Sentry catch error automatically
  // download image one by one to avoid flooding
  const img = await axios.get(originalUrl, { responseType: 'arraybuffer' })
  if (!img || !img.data) {
    logError(`Failed to download image ${originalUrl}`)
    return originalUrl
  }
  const type = imageType(img.data)

  if (!type || !ACCEPTED_IMAGE_TYPE.includes(type.ext)) {
    if (originalUrl.includes('imgur.com') && mayRetry) {
      // https://imgur.com/a/8JI5s
      const html = img.data.toString()
      const realImg = html.match(/https:\/\/i.imgur.com\/[0-9a-zA-Z.]+/)
      if (realImg) {
        return await hostImage(realImg[0], false)
      }
    }
    logError(`Invalid image url: ${originalUrl}`)
    return originalUrl
  }

  const miniImg = await imagemin.buffer(img.data, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  })

  // eslint-disable-next-line no-console
  console.info(`Host image ${originalUrl} in ${imgHash}.${type.ext}`)

  fs.writeFileSync(path.join(`${imgDest}.${type.ext}`), miniImg)
  return `${imgUrl}.${type.ext}`
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
    const sheet = timeMap[pid]
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
    if (timeTakenMap[pid]) {
      return
    }
    // pseudo time slot!
    const timeSheet = timeMap[pid]
    const updatedAt = dayjs(timeSheet.最後更新時間)
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
          speaker.avatar_url = await hostImage(speaker.avatar_url)
        }
      }
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
