const {
  extractLanguageFromTable,
  extractLanguageFromProposals
} = require('./utils')

export default {
  // cfp schedule
  cfp: '議程徵集',
  cfpClosed: '投稿截止',
  cfpClosedDescription: '繼續修改稿件內容',
  cfpFinalized: '稿件修改截止',
  eoAugust: '8 月底',
  programAnnouncement: '公布議程',

  // date
  cfpDate: '06/08',
  cfpClosedDate: '07/15',
  cfpFinalizedDate: '08/02',
  summitDate: '2020/12/03~06',

  // navbar
  coc: ' 行為準則',
  agenda: '議程',
  partners: '合作夥伴',
  cosponsor: '共同主辦',
  transportation: '交通',
  live: '直播',
  feed: '社群動態',
  staff: '工作人員',
  registration: '立即購票',
  speakers: '講者',
  covid19Guidelines: '防疫守則',
  buildingCheckIn: '入館簽到',

  // transportation
  venuelocationName: '地點名稱-華語',
  venuelocationNameShort: '地點名稱-短-華語',
  venuelocationAddress: '地址-華語',
  venuelocationEventName: '活動名稱-華語',
  venuelocationSubEventName: '子活動名稱-華語',
  events: '活動',
  driveToVenue: '開車前往',
  publicTransportationToVenue: '搭乘大眾交通工具',
  noContentYet: '尚無內容',
  locations: '活動地點',
  rental: '租車資訊',

  // articles
  'article/example': require('~/assets/articles/範例文案1.zh.md').default,
  'article/cohostIntro': require('~/assets/articles/共同主辦介紹.zh.md').default,
  'article/communityIntro': require('~/assets/articles/社群簡介.zh.md').default,
  'article/summitIntro': require('~/assets/articles/雙年會簡介.zh.md').default,
  'article/summitContent': require('~/assets/articles/雙年會內容.zh.md').default,
  'article/summitAbout': require('~/assets/articles/關於雙年會.zh.md').default,
  'article/summitGuidelines': require('~/assets/articles/行為準則.zh.md').default,
  'article/healthGuidelines': require('~/assets/articles/健康聲明.zh.md').default,

  // tables
  'table/roughSchedule': extractLanguageFromTable({
    rows: require('~/assets/tables/首頁大時程.json'),
    isEn: false
  }),
  'table/location': extractLanguageFromTable({
    rows: require('~/assets/tables/交通地理位置.json'),
    isEn: false
  }),
  'table/co-hosts': extractLanguageFromTable({
    rows: require('~/assets/tables/共同主辦介紹.json'),
    isEn: false
  }),
  'table/partners': extractLanguageFromTable({
    rows: require('~/assets/tables/合作夥伴介紹.json'),
    isEn: false
  }),

  // proposal
  English: 'English',
  華語: '華語',
  moderator: '主持人',
  speaker: '講者',
  colon: '：',
  '其他 Others': '其他',
  'proposal/map': extractLanguageFromProposals({
    proposals: require('~/assets/agendas/proposals.json'),
    isEn: false
  }),

  // meta
  'article/summitMeta': require('~/assets/articles/meta.zh.md').default
}
