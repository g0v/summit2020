const md5 = require('md5')
const yaml = require('yaml')
const { rootTableId } = require('../.docs.config')
const { tables, downloadOneTable, logError, hostImage } = require('./airtableLibs')

const AVATAR_WIDTH = 256
const TRANSFORMER_MAP = {
  md5,
  avatar: async (value) => {
    if (!Array.isArray(value) || value.length < 1) {
      return value
    }
    const avatar = value[0]
    if (!avatar.url || !avatar.type) {
      return ''
    }
    const img = await hostImage(avatar.url, AVATAR_WIDTH)
    return img
  }
};

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
        const transformStr = record.get('Transform')
        if (!id || !tableName) {
          return
        }
        // register transformer
        let transformer = {}
        if (transformStr) {
          try {
            transformer = yaml.parse(transformStr)
          } catch (error) {
            logError(`Invalid transform field: ${transformStr}`)
          }
        }
        Object.keys(transformer).forEach((field) => {
          const fnName = transformer[field]
          if (TRANSFORMER_MAP[fnName]) {
            transformer[field] = TRANSFORMER_MAP[fnName]
          } else {
            logError(`Invalid transformer: ${fnName}`)
            delete transformer[field]
          }
        })
        tableList.push({ id, tableName, view, transformer })
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
