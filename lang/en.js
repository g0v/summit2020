const { extractLanguageFromTable } = require('./utils')

export default {
  welcome: 'Welcome',
  venuelocation: 'Venue location',
  venuelocationName: '地點名稱-en',
  venuelocationAddress: '地址-en',
  venuelocationEventName: '活動名稱-en',
  events: 'events',
  driveToVenue: 'Drive to',
  publicTransportationToVenue: 'Take public transportation',
  noContentYet: 'No content yet',

  // articles
  'article/example': require('~/assets/articles/範例文案1.en.md').default,
  'article/cohostIntro': require('~/assets/articles/共同主辦介紹.en.md').default,
  'article/coc': require('~/assets/articles/行為準則.en.md').default,
  'article/communityIntro': require('~/assets/articles/社群簡介.en.md').default,
  'article/summitIntro': require('~/assets/articles/雙年會簡介.en.md').default,
<<<<<<< HEAD
  'article/summitAbout': require('~/assets/articles/關於雙年會.en.md').default,
  'article/summitGuidelines': require('~/assets/articles/行為準則.en.md').default,
=======
  'article/aboutSummit': require('~/assets/articles/關於雙年會.en.md').default,
>>>>>>> 56e0c7f7c91a0ed7a77e1708754a8a55651a4621

  // tables
  'table/roughSchedule': extractLanguageFromTable({
    rows: require('~/assets/tables/首頁大時程.json'),
    isEn: true
  }),
  'table/location': extractLanguageFromTable({
    rows: require('~/assets/tables/交通地理位置.json'),
    isEn: true
  })
}
