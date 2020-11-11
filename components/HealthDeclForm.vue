<template lang="pug">
.sign-in-form.center.ph4
  h1.fw5 {{$t('title')}}
  div.info
    // div.field
    //   label.fw5
    //     | *身分別 Identity
    //   input.f5(
    //     type='text',
    //     value='訪客 Visitors',
    //     disabled
    //   )
    div.field
      label.fw5
        | *姓名 Name
      input.f5(
        v-model="venueAdmissionSignInForm.name",
        type='text'
      )
    div.field
      label.fw5
        | *身分證/護照/居留證 ID. ID / Passport / ARC No.
      input.f5(
        v-model="venueAdmissionSignInForm.IDOrPassport",
        type='text'
      )
    div.field
      label.fw5
        | *可聯絡手機/室內電話 Cell Phone/Landline
      input.f5(
        v-model="venueAdmissionSignInForm.phone",
        type='tel'
      )
    div.field
      label.fw5
        | *電子郵件 Email
      input.f5(
        v-model="venueAdmissionSignInForm.email",
        type='email'
      )
    div.field
      label.fw5
        | 需申請公務員終身學習時數 Applying lifelong learning credit
      div.radio-group.radio-x
        div
          input.f5(
            v-model="venueAdmissionSignInForm.needLearningCredit",
            type='radio',
            value="no",
            name="learning-credit",
            id='learning-credit-no'
          )
          label(for='learning-credit-no')
            | 不需要 No
        div
          input.f5(
            v-model="venueAdmissionSignInForm.needLearningCredit",
            type='radio',
            value="yes",
            name="learning-credit",
            id='learning-credit-yes'
          )
          label(for='learning-credit-yes')
            | 需要 Yes
    // div.field
    //   label.fw5
    //     | *來校目的與地點 Purposes & Place of Visiting
    //   input.f5(
    //     type='text',
    //     value='學術交流/學習活動 Academic activities',
    //     disabled
    //   )
    div.field
      label.fw5
        | *近一個月出入境台灣史 History of Entry and Departure (Taiwan)
      div.radio-group.radio-x
        div
          input.f5(
            v-model="venueAdmissionSignInForm.historyOfEntryAndDepartureTaiwan",
            type='radio',
            value="no",
            name="history",
            id='history-no'
          )
          label(for='history-no')
            | 無 No
        div
          input.f5(
            v-model="venueAdmissionSignInForm.historyOfEntryAndDepartureTaiwan",
            type='radio',
            value="yes",
            name="history",
            id='history-yes'
          )
          label(for='history-yes')
            | 有 Yes
    h2 {{$t('titleSymptoms')}}
    div.field
      label.fw5
        | *最近14天內是否出現以下症狀（複選） Do you have any symptoms listed below in the last 14 days ? (Multiple choice)
      div.radio-group.radio-y
        div(v-for="(symptom, i) in symptomOptions" :key="symptom")
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="keepSymptomConsistent"
            type="checkbox",
            :value="symptom",
            :id="`symptom-${i}`"
          )
          label(:for="`symptom-${i}`")
            | {{symptom}}
        div(v-if="isSymptomMiscVisible")
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14DaysOthersSymptoms",
            type='text',
            placeholder='*請填寫症狀'
          )
    div.field
      label.fw5
        | *您是否因嚴重特殊傳染性肺炎（武漢肺炎），被衛生主管機構列為防疫管制追蹤對象？ Have you been identified as a quarantined case by the Taiwan authorities ?
      div.radio-group.radio-x
        div
          input.f5(
            v-model="venueAdmissionSignInForm.quarantined",
            type='radio',
            value="no",
            name="quarantined",
            id='quarantined-no'
          )
          label(for='quarantined-no')
            | 無 No
        div
          input.f5(
            v-model="venueAdmissionSignInForm.quarantined",
            type='radio',
            value="yes",
            name="quarantined",
            id='quarantined-yes'
          )
          label(for='quarantined-yes')
            | 有 Yes
    div.field
      label.fw5
        | *您或您家屬是否曾與感染嚴重特殊傳染性肺炎（武漢肺炎）病患有接觸嗎？ Have you ever been in any physical contact with the COVID-19 patients ?
      div.radio-group.radio-x
        div
          input.f5(
            v-model="venueAdmissionSignInForm.physicalContactCOVID19Patients",
            type='radio',
            value="no",
            name="physical-contact-COVID-19-patients",
            id='physical-contact-COVID-19-patients-no'
          )
          label(for='physical-contact-COVID-19-patients-no')
            | 無 No
        div
          input.f5(
            v-model="venueAdmissionSignInForm.physicalContactCOVID19Patients",
            type='radio',
            value="yes",
            name="physical-contact-COVID-19-patients",
            id='physical-contact-COVID-19-patients-yes'
          )
          label(for='physical-contact-COVID-19-patients-yes')
            | 有 Yes
    div.field
      label.fw5
        | *近期(2週內)是否有接觸家人、親友自國外返台？ Have you been in close contact with anyone who returned from other countries in the past two weeks ?
      div.radio-group.radio-x
        div
          input.f5(
            v-model="venueAdmissionSignInForm.closeContactWithReturnedFromOtherCountries",
            type='radio',
            value="no",
            name="close-contact-with-returned-from-other-countries",
            id='close-contact-with-returned-from-other-countries-no'
          )
          label(for='close-contact-with-returned-from-other-countries-no')
            | 無 No
        div
          input.f5(
            v-model="venueAdmissionSignInForm.closeContactWithReturnedFromOtherCountries",
            type='radio',
            value="yes",
            name="close-contact-with-returned-from-other-countries",
            id='close-contact-with-returned-from-other-countries-yes'
          )
          label(for='close-contact-with-returned-from-other-countries-yes')
            | 有 Yes
    div.field
      label.fw5
        | *您是否接受過新冠肺炎篩檢? Have you received a COVID-19 screen test ?
      div.radio-group.radio-x
        div
          input.f5(
            v-model="venueAdmissionSignInForm.receivedScreenTest",
            @change="cleanHiddenFieldValue"
            value="no",
            type='radio',
            name="received-screen-test",
            id='received-screen-test-no'
          )
          label(for='received-screen-test-no')
            | 無 No
        div
          input.f5(
            v-model="venueAdmissionSignInForm.receivedScreenTest",
            value="yes",
            type='radio',
            name="received-screen-test",
            id='received-screen-test-yes'
          )
          label(for='received-screen-test-yes')
            | 有 Yes
    div(v-if="venueAdmissionSignInForm.receivedScreenTest === 'yes'")
      div.field
        label.fw5
          | *篩檢日期 Date
        input.f5(
          v-model="venueAdmissionSignInForm.receivedScreenDate",
          type='text',
          placeholder='YYYY-MM-DD'
        )
      div.field
        label.fw5
          | *篩檢國家 Which country ?
        input.f5(
          v-model="venueAdmissionSignInForm.receivedScreenCountry",
          type='text'
        )
      div.field
        label.fw5
          | *篩檢單位 Which Institute ?
        input.f5(
          v-model="venueAdmissionSignInForm.receivedScreenInstitute",
          type='text'
        )
      div.field
        label.fw5
          | *篩檢方法 Test Methods
        div.radio-group.radio-x
          div
            input.f5(
              v-model="venueAdmissionSignInForm.receivedScreenTestMethods",
              value="PCR",
              type='radio',
              name="test-methods",
              id='PCR'
            )
            label(for='PCR')
              | 病毒 PCR
          div
            input.f5(
              v-model="venueAdmissionSignInForm.receivedScreenTestMethods",
              value="antibodies",
              type='radio',
              name="test-methods",
              id='antibodies'
            )
            label(for='antibodies')
              | 抗體 Antibodies
      div.field
        label.fw5
          | *篩檢結果 Test Results
        div.radio-group.radio-x
          div
            input.f5(
              v-model="venueAdmissionSignInForm.receivedScreenTestResults",
              value="negative",
              type='radio',
              name="test-results",
              id='negative'
            )
            label(for='negative')
              | 陰性 Negative
          div
            input.f5(
              v-model="venueAdmissionSignInForm.receivedScreenTestResults",
              value="positive",
              type='radio',
              name="test-results",
              id='positive'
            )
            label(for='positive')
              | 陽性 Positive
    div.field
      label.fw5
        | *您是否曾被確診為新冠肺炎患者? Have you ever been diagnosed with COVID-19 ?
      div.radio-group.radio-x
        div
          input.f5(
            v-model="venueAdmissionSignInForm.diagnosed",
            @change="cleanHiddenFieldValue"
            value="no",
            type='radio',
            name="diagnosed",
            id='diagnosed-no'
          )
          label(for='diagnosed-no')
            | 無 No
        div
          input.f5(
            v-model="venueAdmissionSignInForm.diagnosed",
            value="yes",
            type='radio',
            name="diagnosed",
            id='diagnosed-yes'
          )
          label(for='diagnosed-yes')
            | 有 Yes
    div(v-if="venueAdmissionSignInForm.diagnosed === 'yes'")
      div.field
        label.fw5
          | *診斷日期 Date of Diagnosis
        input.f5(
          v-model="venueAdmissionSignInForm.diagnosedDate",
          type='text',
          placeholder='YYYY-MM-DD'
        )
      div.field
        label.fw5
          | *診斷國家 Which country ?
        input.f5(
          v-model="venueAdmissionSignInForm.diagnosedCountry",
          type='text'
        )
      div.field
        label.fw5
          | *診斷醫院 Which Hospital ?
        input.f5(
          v-model="venueAdmissionSignInForm.diagnosedHospital",
          type='text'
        )
      div.field
        label.fw5
          | *是否住院？ Have you been hospitalized for COVID-19 ?
        div.radio-group.radio-x
          div
            input.f5(
              v-model="venueAdmissionSignInForm.diagnosedHospitalized",
              value="no",
              type='radio',
              name="hospitalized",
              id='hospitalized-no'
            )
            label(for='hospitalized-no')
              | 無 No
          div
            input.f5(
              v-model="venueAdmissionSignInForm.diagnosedHospitalized",
              value="yes",
              type='radio',
              name="hospitalized",
              id='hospitalized-yes'
            )
            label(for='hospitalized-yes')
              | 有 Yes
    // h2
    //   | 回報今日健康資訊 Fill in today's health information
    // div.field
    //   label.fw5
    //     | *是否出現新冠肺炎症狀 Symptoms
    //   div.radio-group.radio-x
    //     div
    //       input.f5(
    //         v-model="venueAdmissionSignInForm.symptomsToday",
    //         type='radio',
    //         value="no",
    //         name="today-symptoms",
    //         id='today-symptoms-no'
    //       )
    //       label(for='today-symptoms-no')
    //         | 無 No
    //     div
    //       input.f5(
    //         v-model="venueAdmissionSignInForm.symptomsToday",
    //         type='radio',
    //         value="yes",
    //         name="today-symptoms",
    //         id='today-symptoms-yes'
    //       )
    //       label(for='today-symptoms-yes')
    //         | 有 Yes
    // div.field
    //   label.fw5
    //     | *今天你去過的足跡待1小時以上處所 Where you stayed for more than 1 hour today ?
    //   input.f5(
    //     v-model="venueAdmissionSignInForm.stayedMoreThan1HourPlacesToday",
    //     type='text'
    //   )
    // div.field
    //   label.fw5
    //     | *是否去篩檢 Did you take a coronavirus test ?
    //   div.radio-group.radio-x
    //     div
    //       input.f5(
    //         v-model="venueAdmissionSignInForm.takeACoronavirusTestToday",
    //         type='radio',
    //         value="no",
    //         name="today-coronavirus-test",
    //         id='today-coronavirus-test-no'
    //       )
    //       label(for='today-coronavirus-test-no')
    //         | 無 No
    //     div
    //       input.f5(
    //         v-model="venueAdmissionSignInForm.takeACoronavirusTestToday",
    //         type='radio',
    //         value="yes",
    //         name="today-coronavirus-test",
    //         id='today-coronavirus-test-yes'
    //       )
    //       label(for='today-coronavirus-test-yes')
    //         | 有 Yes
    .tc.mt5
      b-button(
        type="is-primary"
        rounded
        @click="validateFrom"
      )
        | {{$t('submit')}}
</template>
<i18n lang="yaml">
en:
  title: Health Declaration Form
  titleSymptoms: Symptoms related to COVID-19
  submit: Submit
  someFieldEmpty: 'Please fill in all fields'
  submitFailed: Fail to submit Health Declaration Form. Please try again later
zh:
  title: 健康聲明書
  titleSymptoms: 「嚴重特殊傳染性肺炎」（武漢肺炎）有關接觸史與症狀
  submit: 送出健康聲明
  someFieldEmpty: '請填寫所有欄位'
  submitFailed: 聲明書傳送失敗，請稍後再重新嘗試
</i18n>
<script>
import qs from 'querystring'
import axios from 'axios'
import md5 from 'md5'
import { mapMutations } from 'vuex'
import { MUTATIONS } from '~/store'

const FORM_URL = 'https://docs.google.com/forms/u/1/d/e/1FAIpQLSewrwiopO6HiuCL5Ff0L8Xg8UjbMyjE5QJXq1T3MsZ-eJbDKw/formResponse'

const SYMPTOM_OPTIONS = [
  '發燒(> 37.5度) Body temperature over 37.5 ˚C',
  '咳嗽 Coughs',
  '喉嚨痛 Pharyngitis (Sore throat)',
  '呼吸道窘迫症狀 (呼吸急促﹑呼吸困難) Shortness of Breath',
  '流鼻水 Runny nose',
  '肌肉酸痛 Myalgia (Muscle pain)',
  '關節酸痛 Arthralgia (Joint pain)',
  '四肢無力 Asthenia (Weakness; weak extremities)',
  '胸痛 Chest Pain',
  '味覺失調或消失 Dysgeusia or Ageusia',
  '嗅覺失調或消失 Dysosmia or Anosmia',
  '腹瀉 Diarrhea',
  '結膜充血 Conjunctival hyperemia',
  '眼睛癢 Itchy Eyes',
  '腳指有紅點並起水泡 Get red spots or blisters on my toes',
  '無以上任⼀症狀 None of the above',
  '其他 Others'
]

const SYMPTOM_MISC = SYMPTOM_OPTIONS[SYMPTOM_OPTIONS.length - 1]
const SYMPTOM_NULL = SYMPTOM_OPTIONS[SYMPTOM_OPTIONS.length - 2]

const FORM_HASH_KEY = 'entry.442735562'

const FORM_FIELDS = [
  {
    name: 'name',
    default: '',
    key: 'entry.660004461'
  },
  {
    name: 'IDOrPassport',
    default: '',
    key: 'entry.553859736'
  },
  {
    name: 'phone',
    default: '',
    key: 'entry.479158093'
  },
  {
    name: 'email',
    default: '',
    key: 'entry.1619087838'
  },
  {
    name: 'needLearningCredit',
    default: '',
    key: 'entry.1306117304'
  },
  {
    name: 'historyOfEntryAndDepartureTaiwan',
    default: '',
    key: 'entry.1562638894'
  },
  {
    name: 'symptomsInTheLast14Days',
    default: [],
    key: 'entry.1411713175'
  },
  {
    name: 'symptomsInTheLast14DaysOthersSymptoms',
    default: '',
    key: 'entry.707341411'
  },
  {
    name: 'quarantined',
    default: '',
    key: 'entry.1816027399'
  },
  {
    name: 'physicalContactCOVID19Patients',
    default: '',
    key: 'entry.906781877'
  },
  {
    name: 'closeContactWithReturnedFromOtherCountries',
    default: '',
    key: 'entry.25409996'
  },
  {
    name: 'receivedScreenTest',
    default: '',
    key: 'entry.129802636'
  },
  {
    name: 'receivedScreenDate',
    default: '',
    key: 'entry.2137916666'
  },
  {
    name: 'receivedScreenCountry',
    default: '',
    key: 'entry.1521882388'
  },
  {
    name: 'receivedScreenInstitute',
    default: '',
    key: 'entry.1800852332'
  },
  {
    name: 'receivedScreenTestMethods',
    default: '',
    key: 'entry.1826409970'
  },
  {
    name: 'receivedScreenTestResults',
    default: '',
    key: 'entry.1774182199'
  },
  {
    name: 'diagnosed',
    default: '',
    key: 'entry.53211377'
  },
  {
    name: 'diagnosedDate',
    default: '',
    key: 'entry.1138488582'
  },
  {
    name: 'diagnosedCountry',
    default: '',
    key: 'entry.1835565540'
  },
  {
    name: 'diagnosedHospital',
    default: '',
    key: 'entry.643806537'
  },
  {
    name: 'diagnosedHospitalized',
    default: '',
    key: 'entry.1208089477'
  }
]

export default {
  data () {
    return {
      venueAdmissionSignInForm: FORM_FIELDS.reduce((form, field) => {
        form[field.name] = field.default
        return form
      }, {}),
      symptomOptions: SYMPTOM_OPTIONS
    }
  },
  computed: {
    isSymptomMiscVisible () {
      return this.venueAdmissionSignInForm.symptomsInTheLast14Days.includes(
        SYMPTOM_MISC
      )
    }
  },
  methods: {
    ...mapMutations({
      declareHealth: MUTATIONS.DECLARE_HEALTH
    }),
    keepSymptomConsistent (e) {
      const value = e.target.value
      const isChecked = e.target.checked
      const form = this.venueAdmissionSignInForm
      if (!isChecked) {
        return
      }
      if (value === SYMPTOM_NULL) {
        const newOptions = []
        if (this.isSymptomMiscVisible) {
          newOptions.push(SYMPTOM_MISC)
        }
        newOptions.push(SYMPTOM_NULL)
        form.symptomsInTheLast14Days = newOptions
      } else if (value !== SYMPTOM_MISC) {
        const index = form.symptomsInTheLast14Days.indexOf(SYMPTOM_NULL)
        if (index >= 0) {
          form.symptomsInTheLast14Days.splice(index, 1)
        }
      }
    },
    // cleanThatOneChoice () {
    //   const thatOneChoice = SYMPTOM_NULL
    //   if (this.venueAdmissionSignInForm.symptomsInTheLast14Days.includes(thatOneChoice)) {
    //     const index = this.venueAdmissionSignInForm.symptomsInTheLast14Days.indexOf(thatOneChoice)
    //     this.venueAdmissionSignInForm.symptomsInTheLast14Days.splice(index, 1)
    //   }
    // },
    // cleanExceptMyselfChoices () {
    //   const thatOneChoice = SYMPTOM_NULL
    //   if (this.isSymptomMiscVisible) {
    //     this.venueAdmissionSignInForm.symptomsInTheLast14Days = [SYMPTOM_MISC]
    //   } else {
    //     this.venueAdmissionSignInForm.symptomsInTheLast14Days = []
    //   }
    //   this.venueAdmissionSignInForm.symptomsInTheLast14Days.push(thatOneChoice)
    // },
    cleanHiddenFieldValue () {
      // don't need to clean it as user might just want to hide it temporary
      // if (!this.isSymptomMiscVisible) {
      //   this.venueAdmissionSignInForm.symptomsInTheLast14DaysOthersSymptoms = ''
      // }
      if (this.venueAdmissionSignInForm.receivedScreenTest === 'no') {
        this.venueAdmissionSignInForm.receivedScreenDate = ''
        this.venueAdmissionSignInForm.receivedScreenCountry = ''
        this.venueAdmissionSignInForm.receivedScreenInstitute = ''
        this.venueAdmissionSignInForm.receivedScreenTestMethods = ''
        this.venueAdmissionSignInForm.receivedScreenTestResults = ''
      }
      if (this.venueAdmissionSignInForm.diagnosed === 'no') {
        this.venueAdmissionSignInForm.diagnosedDate = ''
        this.venueAdmissionSignInForm.diagnosedCountry = ''
        this.venueAdmissionSignInForm.diagnosedHospital = ''
        this.venueAdmissionSignInForm.diagnosedHospitalized = ''
      }
    },
    isRequiredFieldEmpty () {
      // 驗證複選欄位
      const isSymptomsInTheLast14DaysEmpty = this.venueAdmissionSignInForm.symptomsInTheLast14Days.length === 0
      // 驗證複選欄位包含 others 時的隱藏欄位
      const isSymptomsInTheLast14DaysOthersSymptomsEmpty = this.isSymptomMiscVisible ? this.venueAdmissionSignInForm.symptomsInTheLast14DaysOthersSymptoms === '' : false
      // 驗證「是否接受過新冠肺炎篩檢」欄位為 yes 時的隱藏欄位
      // > ddio: 不用驗證，不然切回 yes 之前要逼使用者手動清空所有欄位 XD
      // let isReceivedScreenTestHiddenFieldsEmpty
      // if (this.venueAdmissionSignInForm.receivedScreenTest === 'yes') {
      //   isReceivedScreenTestHiddenFieldsEmpty = this.venueAdmissionSignInForm.receivedScreenDate === '' ||
      //           this.venueAdmissionSignInForm.receivedScreenCountry === '' ||
      //           this.venueAdmissionSignInForm.receivedScreenInstitute === '' ||
      //           this.venueAdmissionSignInForm.receivedScreenTestMethods === '' ||
      //           this.venueAdmissionSignInForm.receivedScreenTestResults === ''
      // }
      // 驗證「是否曾被確診為新冠肺炎患者」欄位為 yes 時的隱藏欄位
      // > ddio: 理由同上
      // let isDiagnosedHiddenFieldsEmpty
      // if (this.venueAdmissionSignInForm.diagnosed === 'yes') {
      //   isDiagnosedHiddenFieldsEmpty = this.venueAdmissionSignInForm.diagnosedDate === '' ||
      //           this.venueAdmissionSignInForm.diagnosedCountry === '' ||
      //           this.venueAdmissionSignInForm.diagnosedHospital === '' ||
      //           this.venueAdmissionSignInForm.diagnosedHospitalized === ''
      // }

      const specialFields = [
        'needLearningCredit',
        'symptomsInTheLast14Days',
        'symptomsInTheLast14DaysOthersSymptoms',
        'receivedScreenDate',
        'receivedScreenCountry',
        'receivedScreenInstitute',
        'receivedScreenTestMethods',
        'receivedScreenTestResults',
        'diagnosedDate',
        'diagnosedCountry',
        'diagnosedHospital',
        'diagnosedHospitalized'
      ]
      // 驗證其他欄位
      const isOtherFieldsEmpty = Object.keys(this.venueAdmissionSignInForm).some((key) => {
        if (!specialFields.includes(key)) {
          return this.venueAdmissionSignInForm[key] === ''
        }
      })
      return isSymptomsInTheLast14DaysEmpty ||
            isSymptomsInTheLast14DaysOthersSymptomsEmpty ||
            // isReceivedScreenTestHiddenFieldsEmpty ||
            // isDiagnosedHiddenFieldsEmpty ||
            isOtherFieldsEmpty
    },
    validateFrom () {
      if (this.isRequiredFieldEmpty()) {
        this.$buefy.dialog.alert({
          message: this.$t('someFieldEmpty')
        })
        return
      }
      this.submmit()
    },
    async submmit () {
      const form = this.venueAdmissionSignInForm
      const hash = md5([
        form.name,
        form.phone,
        form.email,
        form.IDOrPassport
      ].join('##'))

      const body = FORM_FIELDS.reduce((cache, field) => {
        cache[field.key] = form[field.name]
        return cache
      }, {
        [FORM_HASH_KEY]: hash
      })
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      let isSuccessed = false
      try {
        await axios.post(FORM_URL, qs.stringify(body), config)
        isSuccessed = true
      } catch (error) {
        if (error.message === 'Network Error' && error.isAxiosError) {
          // ignore CORS warning <3
          // is could also be 400, but there's no way to distinguish them
          isSuccessed = true
        } else {
          this.$sentry.captureException(error)
        }
      }

      if (isSuccessed) {
        const visiblePhone = '●●●●●●' + form.phone.slice(-3)
        this.declareHealth({
          hashKey: hash,
          meta: {
            hash,
            needLearningCredit: form.needLearningCredit === 'yes',
            name: form.name,
            phone: visiblePhone
          }
        })
        this.$emit('health-done')
      } else {
        this.$buefy.dialog.alert({
          message: this.$t('submitFailed')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-in-form {
  max-width: 960px;
  padding-bottom: 30px;
  h1 {
    text-align: center;
    color: #0EAFC9;
  }
  button {
    border: 0;
  }
  .venues {
    @media screen and (min-width: 800px) {
      text-align: center;
    }
    button {
      margin-right: 15px;
      margin-bottom: 15px;
      padding: 8px 5px;
      color: #0EAFC9;
      background: #fff;
      border: 1px solid #0EAFC9;
      border-radius: 4px;
      @media screen and (min-width: 800px) {
        padding: 13px;
      }
    }
    button:hover,.selectedVenue {
      color: #fff;
      background: #0EAFC9;
    }
  }
  .info {
    input[type=text],input[type=email],input[type=tel] {
      width: 100%;
      padding: 9px;
      border: 0;
      color: #555555;
    }
    .field  {
      margin-bottom: 1rem;
      border-bottom: 1px solid #555555;
    }
    .radio-group {
      padding: 9px;
      > div {
        display: flex;
        align-items: center;

        > * {
          &:not(:first-child) {
            margin-left: 0.25rem;
          }
        }
      }
    }
    .radio-x {
      display: flex;
      align-items: center;
      > div:nth-child(2n) {
        margin-left: 30px;
      }
    }
    .radio-y {
      flex-direction: column;
      > div {
        padding: 0.125rem;
        margin-bottom: 0.125rem;
      }
    }
  }
}
</style>
