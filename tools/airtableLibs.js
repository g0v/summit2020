// load Airtable key
require('dotenv').config()

const fs = require('fs')
const path = require('path')
const Airtable = require('airtable')

// https://g0v.hackmd.io/@ddio/summit-2020-articles
const { airtableBaseId } = require('../.docs.config')
const docDir = path.join(__dirname, '../assets/tables')

if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('Require environment variable: AIRTABLE_API_KEY')
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
    }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        rows.push({
          // `id` may be used in fields
          _id: record.id,
          id: record.id,
          ...record.fields
        })
      })
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

module.exports = {
  tables,
  downloadOneTable
}
