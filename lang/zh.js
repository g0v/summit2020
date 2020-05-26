const { extractLanguageFromTable } = require('./utils')

export default {
  welcome: '你好',

  // articles
  'article/example': require('~/assets/articles/範例文案1.zh.md').default,
  'article/cohostIntro': require('~/assets/articles/共同主辦介紹.zh.md').default,
  'article/coc': require('~/assets/articles/行為準則.zh.md').default,
  'article/communityIntro': require('~/assets/articles/社群簡介.zh.md').default,
  'article/summitIntro': require('~/assets/articles/雙年會簡介.zh.md').default,

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
