const readline = require('readline')
const fs = require('fs')
const path = require('path')
const proposalMeta = require('../assets/agendas/proposals.json')

const HACKMD_SRC = path.join(__dirname, '../assets/agendas/hackmdIndex.md')
const OUTPUT_FILE = path.join(__dirname, '../assets/agendas/hackmdIndex.json')

async function genHackmdMap () {
  const input = fs.createReadStream(HACKMD_SRC)
  const reader = readline.createInterface({
    input
  })

  const titleToLinkMap = {}

  for await (const line of reader) {
    if (!line.match(/\[.+\]\(.+\)/)) {
      return
    }
    const cleanLine = line.trim().replace(/^- +\[/, '').replace(/\)$/, '')
    const [titleStr, link] = cleanLine.split('](/')
    const [titleEn, titleZh] = titleStr.split('<br />')

    if (titleEn) {
      titleToLinkMap[titleEn] = '/' + link
    }
    if (titleZh) {
      titleToLinkMap[titleZh] = '/' + link
    }
  }

  const agendaIdToLink = {}

  for (const agendaId in proposalMeta) {
    const agenda = proposalMeta[agendaId]
    const link = titleToLinkMap[agenda.title] || titleToLinkMap[agenda.title_en]
    if (link) {
      agendaIdToLink[agenda.id] = link
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(agendaIdToLink, null, '  '))
  // eslint-disable-next-line no-console
  console.info(`Successfully create ${Object.keys(agendaIdToLink).length} HackMD links`)
}

genHackmdMap()
