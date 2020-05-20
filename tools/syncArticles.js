const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const tempfile = require('tempfile')
const moveFile = require('move-file')

// https://g0v.hackmd.io/@ddio/summit-2020-articles
const hackmdServer = 'https://g0v.hackmd.io'
const rootDocId = 'SphmcJemS5CyIuwa1KtN2w'
const docDir = path.join(__dirname, '../docs/articles')

const env = {
  ...process.env,
  HMD_CLI_SERVER_URL: hackmdServer
}

const rootDoc = execSync(`npx hackmd-cli export ${rootDocId}`, { env }).toString('utf8')
const articleLinks = rootDoc.matchAll(/\[[^\]]+\]\(.*\/([a-zA-Z0-9_-]+)\)/g)

for (const linkMatched of articleLinks) {
  // linkMatched[1] === 'a-hackmd-id'
  const articleLink = linkMatched[1]
  const tempDest = tempfile()
  const exportCmd = `npx hackmd-cli export ${articleLink} ${tempDest}`
  execSync(exportCmd, { env })

  fs.readFile(tempDest, 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    const content = fm(data)
    const { id, language = 'zh' } = content.attributes
    const realDest = `${id}.${language}.md`
    if (!id) {
      console.error(`Missing ID in frontmatter: ${hackmdServer}/${articleLinks}`)
    }
    // do need to wait
    moveFile(tempDest, path.join(docDir, realDest))
      .then(() => {
        // eslint-disable-next-line no-console
        console.info(`Create ${path.join('docs/articles/', realDest)}`)
      })
      .catch((err) => {
        throw err
      })
  })
}
