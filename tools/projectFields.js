const _ = require('lodash')

// content info
const TOPIC_OPTIONS = [
  '「沒有人」的島 Nobody’s island',
  '島嶼大聯盟 Island’s federation',
  '大島開放 Open island',
  '沒有島是局外島 No island is outside island',
  '第四個島 The fourth island',
  '賢者之島 Academia Formosa',
  '海海人聲 Voice of the islanders'
]

const FORMAT_OPTIONS = [
  { name: '演講 （20 分鐘）Talk (20 min)', maxSpeakers: 2 },
  ...[60, 90, 120].map(minute => ({
    name: `主題論壇 （${minute} 分鐘）Panel discussion (${minute} min)`,
    maxSpeakers: 4
  })),
  ...[60, 90, 120].map(minute => ({
    name: `工作坊 （${minute} 分鐘）Workshop (${minute} min)`,
    maxSpeakers: 3
  }))
]

const ORAL_LANGUAGE_OPTIONS = ['華語', 'English', '其他 Others']

const TIPS_WE_WILL_TRANSLATE =
  '若無提供，主辦單位將代為翻譯 or we will help you translate it'

const CONTENT_FIELD_DEFINITIONS = [
  {
    label: '稿件標題 Proposal Title',
    id: 'title',
    placeholder: '請填寫稿件標題 Please enter proposal title',
    type: 'text',
    maxCount: 150,
    required: true
  },
  {
    label: '英語標題 Title in English',
    id: 'title_en',
    placeholder: '請填寫英語標題 Please enter proposal title',
    maxCount: 150,
    description: TIPS_WE_WILL_TRANSLATE,
    type: 'text'
  },
  {
    label: '摘要 Summary',
    id: 'summary',
    description: '最多 350 字 Max 350 Words',
    placeholder: '請填寫摘要 Please enter summary',
    type: 'textarea',
    maxCount: 350,
    required: true
  },
  {
    label: '英語摘要 Summary in English',
    id: 'summary_en',
    description: `最多 250 字 Max 250 Words ${TIPS_WE_WILL_TRANSLATE}`,
    maxCount: 250,
    type: 'textarea'
  },
  {
    label: '使用語言 Language',
    placeholder: '請填寫語言 Please enter language',
    id: 'oral_language',
    description: '',
    type: 'select-with-other',
    otherOption: _.last(ORAL_LANGUAGE_OPTIONS),
    otherId: 'oral_language_other',
    options: ORAL_LANGUAGE_OPTIONS,
    maxCount: 60,
    required: true
  },
  {
    label: '形式 Format',
    id: 'format',
    type: 'select',
    options: FORMAT_OPTIONS.map(format => format.name),
    required: true
  },
  {
    label: '主題分類 Topic',
    id: 'topic',
    type: 'select',
    options: TOPIC_OPTIONS,
    required: true
  },
  {
    label: '三個關鍵字 3 keywords',
    id: 'three_keywords',
    description: '',
    type: 'text',
    maxCount: 60,
    required: true
  },
  {
    label: '相關專案資訊連結 Related projects / works URL',
    id: 'related_url',
    type: 'text',
    textType: 'url'
  },
  {
    label: '主圖 Cover image',
    id: 'cover_image',
    type: 'image',
    uploadLabel: '上傳圖片 Upload image',
    changeLabel: '更改圖片 Change image',
    height: '12rem'
  },
  {
    label:
      '你的議程是否可以接受錄影、錄音、拍照、共筆、直播等形式的記錄，且以開放授權釋出？',
    labelEn:
      'Do you agree that your presentation will be live-streamed and recorded in the forms of text, photo, audio, and video, and released publicly with an CC BY 4.0 International license?',
    id: 'is_presentation_cc40',
    type: 'boolean',
    required: true
  },
  {
    label: '你的投影片是否可以以開放授權釋出？',
    labelEn:
      'Do you agree that your slides will be released publicly with an CC BY 4.0 International license',
    id: 'is_slide_cc40',
    type: 'boolean',
    required: true
  }
]

// speaker info
const PRIVATE_DESP =
  '此欄位不會公開顯示 This field is only visible to organizer'

const GENDER_OPTIONS = [
  '女 female',
  '男 male',
  '非二元性別 non-binary',
  '其它認同 other gender identity',
  '不希望透漏 prefer not to disclose'
]

const SPEAKER_FIELD_DEFINITIONS = [
  {
    label: '須移除的講者（議程組專用）',
    id: 'is_removed',
    type: 'boolean'
  },
  {
    label: '顯示於網頁的講者名稱 Speaker’s display name',
    id: 'display_name',
    type: 'text',
    maxCount: 60,
    required: true
  },
  {
    label: '顯示於網頁的講者英語名稱 Speaker’s display name in English',
    id: 'display_name_en',
    type: 'text',
    maxCount: 10,
    required: true
  },
  {
    label: '組織或社群名稱',
    labelEn: 'Speaker’s organization or community affiliation',
    id: 'organization',
    maxCount: 60,
    type: 'text',
    required: true
  },
  {
    label: '組織或社群英語名稱',
    labelEn: 'Speaker’s organization or community affiliation in English',
    id: 'organization_en',
    maxCount: 10,
    type: 'text',
    required: true
  },
  {
    label: '講者頭像 Speaker’s avatar',
    id: 'avatar_url',
    type: 'image',
    uploadLabel: '上傳照片 Upload photo',
    changeLabel: '更改照片 Change photo',
    height: '8rem',
    required: true
  },
  {
    label: '講者所在城市 Speaker’s location (city)',
    id: 'city',
    type: 'text',
    maxCount: 60,
    required: true
  },
  {
    label: '講者所在城市的英語 Speaker’s location (city) in English',
    id: 'city_en',
    type: 'text',
    maxCount: 10,
    required: true
  },
  {
    label: '講者資訊連結 Speaker info URL ',
    id: 'info_url',
    type: 'text',
    textType: 'url'
  },
  {
    label: '講者簡介 Short bio',
    id: 'bio',
    description: '最多 150 字 Max 150 words',
    maxCount: 150,
    type: 'textarea',
    required: true
  },
  {
    label: '講者英語簡介 Speaker’s bio in English',
    id: 'bio_en',
    description: `最多 100 字 Max 100 words ${TIPS_WE_WILL_TRANSLATE}`,
    maxCount: 100,
    type: 'textarea'
  }
]

module.exports = {
  TIPS_WE_WILL_TRANSLATE,
  // content
  TOPIC_OPTIONS,
  FORMAT_OPTIONS,
  ORAL_LANGUAGE_OPTIONS,
  CONTENT_FIELD_DEFINITIONS,
  // speaker
  PRIVATE_DESP,
  GENDER_OPTIONS,
  SPEAKER_FIELD_DEFINITIONS
}
