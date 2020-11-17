const {
  extractLanguageFromTable,
  extractLanguageFromProposals
} = require('./utils')

export default {
  // cfp schedule
  cfp: 'Call for proposals',
  cfpClosed: 'End of submission',
  cfpClosedDescription: 'Continue to modify proposals',
  cfpFinalized: 'Proposals finalized',
  eoAugust: 'End of August',
  programAnnouncement: 'Announce programming',

  // date
  cfpDate: 'Jun 08',
  cfpClosedDate: 'Jul 15',
  cfpFinalizedDate: 'Aug 02',
  summitDate: 'Dec 03-06, 2020',

  // navbar
  coc: 'Code of Conduct',
  agenda: 'Agenda',
  partners: 'Partners',
  cosponsor: 'Cosponsor',
  transport: 'Transportation',
  live: 'Live',
  feed: 'Feed',
  staff: 'Staff',
  registration: 'Registration',
  speakers: 'Speakers',

  // transportation
  venuelocationName: '地點名稱-en',
  venuelocationNameShort: '地點名稱-短-en',
  venuelocationAddress: '地址-en',
  venuelocationEventName: '活動名稱-en',
  venuelocationSubEventName: '子活動名稱-en',
  events: 'Events',
  driveToVenue: 'Drive to',
  publicTransportationToVenue: 'Take public transportation',
  noContentYet: 'No content yet',
  locations: 'Locations',
  rental: 'Rental',

  // articles
  'article/example': require('~/assets/articles/範例文案1.en.md').default,
  'article/cohostIntro': require('~/assets/articles/共同主辦介紹.en.md').default,
  'article/coc': require('~/assets/articles/行為準則.en.md').default,
  'article/communityIntro': require('~/assets/articles/社群簡介.en.md').default,
  'article/summitIntro': require('~/assets/articles/雙年會簡介.en.md').default,
  'article/summitContent': require('~/assets/articles/雙年會內容.en.md').default,
  'article/summitAbout': require('~/assets/articles/關於雙年會.en.md').default,
  'article/summitGuidelines': require('~/assets/articles/行為準則.en.md').default,
  'article/healthGuidelines': require('~/assets/articles/健康聲明.en.md').default,

  // tables
  'table/roughSchedule': extractLanguageFromTable({
    rows: require('~/assets/tables/首頁大時程.json'),
    isEn: true
  }),
  'table/location': extractLanguageFromTable({
    rows: require('~/assets/tables/交通地理位置.json'),
    isEn: true
  }),
  'table/co-hosts': extractLanguageFromTable({
    rows: require('~/assets/tables/共同主辦介紹.json'),
    isEn: true
  }),
  'table/partners': extractLanguageFromTable({
    rows: require('~/assets/tables/合作夥伴介紹.json'),
    isEn: true
  }),

  // proposal
  華語: 'Mandarin',
  English: 'English',
  '其他 Others': 'Others',
  moderator: 'Moderator',
  speaker: 'Speaker',
  colon: ': ',
  'proposal/map': extractLanguageFromProposals({
    proposals: require('~/assets/agendas/proposals.json'),
    isEn: true
  })
}
