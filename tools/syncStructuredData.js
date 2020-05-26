// load Airtable key
require('dotenv').config()

const fs = require('fs')
const path = require('path')
const Airtable = require('airtable')

// https://g0v.hackmd.io/@ddio/summit-2020-articles
const { airtableBaseId, rootTableId } = require('../.docs.config')
const docDir = path.join(__dirname, '../assets/tables')

if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('Require environment variable: AIRTABLE_API_KEY')
}

const tables = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(airtableBaseId)

function downloadOneTable (tableInfo) {
  const rows = []
  return new Promise((resolve, reject) => {
    tables(tableInfo.tableName).select({
      view: tableInfo.view
    }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        rows.push(record.fields)
      })
      fetchNextPage()
    }, (err) => {
      if (err) {
        console.error(err)
      } else {
        const dest = path.join(docDir, `${tableInfo.id}.json`)
        fs.writeFile(dest, JSON.stringify(rows, null, '  '), (err) => {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          // eslint-disable-next-line no-console
          console.info(`Download table ${tableInfo.tableName} to ${dest}`)
          resolve()
        })
      }
    })
  })
}

(async function downloadAllTables () {
  const tableList = []
  await new Promise((resolve) => {
    tables(rootTableId).select({
      view: 'Grid view'
    }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const id = record.get('ID')
        const tableName = record.get('表格名')
        const view = record.get('View') || 'Grid view'
        if (!id || !tableName) {
          return
        }
        tableList.push({ id, tableName, view })
      })
      fetchNextPage()
    }, (err) => {
      if (err) {
        console.error(err)
      } else {
        resolve(tableList)
      }
    })
  })
  for (const tableInfo of tableList) {
    await downloadOneTable(tableInfo)
  }
})()
