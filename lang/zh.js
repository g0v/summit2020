const { extractLanguageFromTable } = require('./utils')

export default {
  welcome: '你好',
  venuelocation: '場地位置',
  venuelocationName: '地點名稱-華語',
  venuelocationAddress: '地址-華語',
  venuelocationEventName: '活動名稱-華語',
  venuelocationSubEventName: '子活動名稱-華語',
  events: '活動',
  driveToVenue: '開車前往',
  publicTransportationToVenue: '搭乘大眾交通工具',
  noContentYet: '尚無內容',

  // articles
  'article/example': require('~/assets/articles/範例文案1.zh.md').default,
  'article/cohostIntro': require('~/assets/articles/共同主辦介紹.zh.md').default,
  'article/communityIntro': require('~/assets/articles/社群簡介.zh.md').default,
  'article/summitIntro': require('~/assets/articles/雙年會簡介.zh.md').default,
  'article/summitContent': require('~/assets/articles/雙年會內容.zh.md').default,
  'article/summitAbout': require('~/assets/articles/關於雙年會.zh.md').default,
  'article/summitGuidelines': require('~/assets/articles/行為準則.zh.md').default,

  // tables
  'table/roughSchedule': extractLanguageFromTable({
    rows: require('~/assets/tables/首頁大時程.json'),
    isEn: false
  }),
  'table/location': extractLanguageFromTable({
    rows: require('~/assets/tables/交通地理位置.json'),
    isEn: false
  })
}
