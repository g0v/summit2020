const { rootTableId } = require('../.docs.config')
const { tables, downloadOneTable } = require('./airtableLibs');

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
