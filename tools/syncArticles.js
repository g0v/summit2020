const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const tempfile = require('tempfile')
const moveFile = require('move-file')

// https://g0v.hackmd.io/@ddio/summit-2020-articles
const config = require('../.docs.config')
const docDir = path.join(__dirname, '../assets/articles')

const env = {
  ...process.env,
  HMD_CLI_COOKIE_PATH: path.join(__dirname, '../.hackmd.cookies.json'),
  HMD_CLI_SERVER_URL: config.hackmdServer
}

const rootDoc = execSync(`npx hackmd-cli export ${config.rootHackmdId}`, { env }).toString('utf8')
const articleLinks = rootDoc.matchAll(/\[[^\]]+\]\(.*\/([a-zA-Z0-9_-]+)\)/g)

// also put ignored link here
const existingDocs = {
  'summit-2020-articles': true,
  [config.rootHackmdId]: true
}

for (const linkMatched of articleLinks) {
  // linkMatched[1] === 'a-hackmd-id'
  const articleLink = linkMatched[1]
  // each hackmd should be downloaded only once
  if (articleLink in existingDocs) {
    continue
  }
  existingDocs[articleLink] = true

  const tempDest = tempfile()
  const exportCmd = `npx hackmd-cli export ${articleLink} ${tempDest}`

  // download synchronously to lower server loading
  execSync(exportCmd, { env })

  fs.readFile(tempDest, 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    const content = fm(data)
    const { id, language = 'zh' } = content.attributes
    const realDest = `${id}.${language}.md`
    if (!id) {
      console.error(`Missing ID in frontmatter: ${config.hackmdServer}/${articleLink}`)
      fs.unlinkSync(tempDest)
      return
    }
    // do need to wait
    moveFile(tempDest, path.join(docDir, realDest))
      .then(() => {
        // eslint-disable-next-line no-console
        console.info(`Create ${path.join('assets/articles/', realDest)}`)
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  })
}
