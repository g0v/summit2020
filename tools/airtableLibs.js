// load Airtable key
require('dotenv').config()

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const axios = require('axios')
const md5 = require('md5')
const sharp = require('sharp')
const imageType = require('image-type')
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const Airtable = require('airtable')
const Sentry = require('@sentry/node')

const IMG_CACHE_BASE = {
  url: 'cache/',
  path: path.join(__dirname, '../static/cache')
}
const MAX_IMG_WIDTH = 1280
const ACCEPTED_IMAGE_TYPE = ['png', 'jpg', 'webp', 'gif']

// https://g0v.hackmd.io/@ddio/summit-2020-articles
const { airtableBaseId } = require('../.docs.config')
const docDir = path.join(__dirname, '../assets/tables')

if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('Require environment variable: AIRTABLE_API_KEY')
}

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  })
}

function logError (message) {
  Sentry.captureMessage(message)
  console.error(message)
}

const tables = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(airtableBaseId)

// tableInfo: {
//   id: <file name of table>
//   tableName: <table name in Airtable>
//   view: <view name in Airtable>
// }
function downloadOneTable (tableInfo, toFile = true) {
  const rows = []
  return new Promise((resolve, reject) => {
    tables(tableInfo.tableName).select({
      view: tableInfo.view
    }).eachPage(async (records, fetchNextPage) => {
      for (const record of records) {
        // cache image to local
        const fields = record.fields
        const fieldKeys = Object.keys(fields)
        for (const attr of fieldKeys) {
          if (!Array.isArray(fields[attr])) {
            continue
          }
          const attrList = fields[attr]
          fields[attr] = []
          for (const item of attrList) {
            if (item.url && item.type && item.url) {
              // looks like an image
              const cacheItem = {
                id: item.id,
                filename: item.filename,
                type: item.type
              }
              if (item.thumbnails) {
                cacheItem.large_url = await hostImage(item.thumbnails.large.url)
              } else {
                cacheItem.large_url = await hostImage(item.url)
              }
              fields[attr].push(cacheItem)
            } else {
              fields[attr].push(item)
            }
          }
        }
        if (Object.keys(fields).length) {
          rows.push({
            // `id` may be used in fields
            _id: record.id,
            id: record.id,
            ...fields
          })
        }
      }
      fetchNextPage()
    }, (err) => {
      if (err) {
        console.error(err)
      } else {
        if (toFile) {
          const dest = path.join(docDir, `${tableInfo.id}.json`)
          fs.writeFile(dest, JSON.stringify(rows, null, '  '), (err) => {
            if (err) {
              console.error(err)
              reject(err)
              return
            }
            // eslint-disable-next-line no-console
            console.info(`Download table ${tableInfo.tableName} to ${dest}`)
          })
        }
        resolve(rows)
      }
    })
  })
}

async function hostImage (originalUrl, maxWidth = MAX_IMG_WIDTH, mayRetry = true) {
  // download image and return new img url, if the image is host in 3rd party
  // also optimize the image when possible

  // example exception:
  // https://drive.google.com/file/d/1MeM5enF9IfGVv-_Sgb5k_J5VC9DIETz9/view?usp=sharing
  // https://imgur.com/a/8JI5s
  originalUrl = originalUrl.trim()
  if (!originalUrl || originalUrl.startsWith('/') || originalUrl.startsWith(IMG_CACHE_BASE.url)) {
    // in case someone overwrite url to other local path XD
    return originalUrl
  }

  const imgHash = md5(originalUrl)
  const imgDest = path.join(IMG_CACHE_BASE.path, imgHash)
  const imgUrl = `${IMG_CACHE_BASE.url}${imgHash}`

  const matchedImage = glob.sync(`${imgDest}.*`)
  if (matchedImage.length) {
    const ext = path.extname(matchedImage[0])
    return `${imgUrl}${ext}`
  }

  // download image one by one to avoid flooding
  let img = null
  try {
    img = await axios.get(originalUrl, { responseType: 'arraybuffer' })
  } catch (err) {
    logError(`Error fetching ${originalUrl}: ${err}`)
  }
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
        return await hostImage(realImg[0], maxWidth, false)
      }
    }
    logError(`Invalid image url: ${originalUrl}`)
    return originalUrl
  }

  const origImg = await sharp(img.data)
  const imgMeta = await origImg.metadata()
  let normalizedBuffer = null
  if (imgMeta.width > maxWidth) {
    // eslint-disable-next-line no-console
    console.info(`Image ${originalUrl} too large, will resize it to ${maxWidth}px width.`)
    normalizedBuffer = await origImg.resize(maxWidth).toBuffer()
  } else {
    normalizedBuffer = img.data
  }

  const miniImg = await imagemin.buffer(normalizedBuffer, {
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

module.exports = {
  tables,
  downloadOneTable,
  hostImage,
  logError
}
