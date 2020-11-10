<template lang="pug">
.sign-in-form.center.ph4
  h1.f2.fw5
    | {{$t('signInForm')}}
  div.venues.f4.fw5
    button(
      @click="selectedVenue('GoodIdeasStudio')",
      :class="{selectedVenue: currentVenue==='GoodIdeasStudio'}"
    )
      | 好想工作室
    button(
      @click="selectedVenue('WuGarden')",
      :class="{selectedVenue: currentVenue==='WuGarden'}"
    )
      | 吳園公會堂
    button(
      @click="selectedVenue('CHub')",
      :class="{selectedVenue: currentVenue==='CHub'}"
    )
      | 成大 C-Hub
    button(
      @click="selectedVenue('TainanArtMuseumBuilding2')",
      :class="{selectedVenue: currentVenue==='TainanArtMuseumBuilding2'}"
    )
      | 臺南市美術館 2 館
  div.info
    div.field
      label.fw5
        | *身分別 Identity
      input.f5(
        type='text',
        value='訪客 Visitors',
        disabled
      )
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
        | *來校目的與地點 Purposes & Place of Visiting
      input.f5(
        type='text',
        value='學術交流/學習活動 Academic activities',
        disabled
      )
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
    h2.f5
      | 「嚴重特殊傳染性肺炎」（武漢肺炎）有關接觸史與症狀 Symptoms related to COVID-19
    div.field
      label.fw5
        | *最近14天內是否出現以下症狀（複選） Do you have any symptoms listed below in the last 14 days ? (Multiple choice)
      div.radio-group.radio-y
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="temperature",
            id='temperature'
          )
          label(for='temperature')
            | 發燒(> 37.5度) Body temperature over 37.5 ˚C
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="coughs",
            id='coughs'
          )
          label(for='coughs')
            | 咳嗽 Coughs
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="pharyngitis",
            id='pharyngitis'
          )
          label(for='pharyngitis')
            | 喉嚨痛 Pharyngitis (Sore throat)
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="breath",
            id='breath'
          )
          label(for='breath')
            | 呼吸道窘迫症狀 (呼吸急促﹑呼吸困難) Shortness of Breath
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="unnyNose",
            id='runny-nose'
          )
          label(for='runny-nose')
            | 流鼻水 Runny nose
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="myalgia",
            id='myalgia'
          )
          label(for='myalgia')
            | 肌肉酸痛 Myalgia (Muscle pain)
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="arthralgia",
            id='arthralgia'
          )
          label(for='arthralgia')
            | 關節酸痛 Arthralgia (Joint pain)
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="asthenia",
            id='asthenia'
          )
          label(for='asthenia')
            | 四肢無力 Asthenia (Weakness; weak extremities)
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="chest",
            id='chest'
          )
          label(for='chest')
            | 胸痛 Chest Pain
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="ageusia",
            id='ageusia'
          )
          label(for='ageusia')
            | 味覺失調或消失 Dysgeusia or Ageusia
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="anosmia",
            id='anosmia'
          )
          label(for='anosmia')
            | 嗅覺失調或消失 Dysosmia or Anosmia
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="diarrhea",
            id='diarrhea'
          )
          label(for='diarrhea')
            | 腹瀉 Diarrhea
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="hyperemia",
            id='hyperemia'
          )
          label(for='hyperemia')
            | 結膜充血 Conjunctival hyperemia
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="eyes",
            id='eyes'
          )
          label(for='eyes')
            | 眼睛癢 Itchy Eyes
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanThatOneChoice"
            type="checkbox",
            value="blisters",
            id='blisters'
          )
          label(for='blisters')
            | 腳指有紅點並起水泡 Get red spots or blisters on my toes
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanExceptMyselfChoices"
            type="checkbox",
            value="noneOfTheAbove",
            id='none-of-the-above'
          )
          label(for='none-of-the-above')
            | 無以上任⼀症狀 None of the above
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsInTheLast14Days",
            @change="cleanHiddenFieldValue"
            type="checkbox",
            value="others",
            id='others'
          )
          label(for='others')
            | 其他 Others
        div(v-if="venueAdmissionSignInForm.symptomsInTheLast14Days.includes('others')")
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
    h2.f5
      | 回報今日健康資訊 Fill in today's health information
    div.field
      label.fw5
        | *是否出現新冠肺炎症狀 Symptoms
      div.radio-group.radio-x
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsToday",
            type='radio',
            value="no",
            name="today-symptoms",
            id='today-symptoms-no'
          )
          label(for='today-symptoms-no')
            | 無 No
        div
          input.f5(
            v-model="venueAdmissionSignInForm.symptomsToday",
            type='radio',
            value="yes",
            name="today-symptoms",
            id='today-symptoms-yes'
          )
          label(for='today-symptoms-yes')
            | 有 Yes
    div.field
      label.fw5
        | *今天你去過的足跡待1小時以上處所 Where you stayed for more than 1 hour today ?
      input.f5(
        v-model="venueAdmissionSignInForm.stayedMoreThan1HourPlacesToday",
        type='text'
      )
    div.field
      label.fw5
        | *是否去篩檢 Did you take a coronavirus test ?
      div.radio-group.radio-x
        div
          input.f5(
            v-model="venueAdmissionSignInForm.takeACoronavirusTestToday",
            type='radio',
            value="no",
            name="today-coronavirus-test",
            id='today-coronavirus-test-no'
          )
          label(for='today-coronavirus-test-no')
            | 無 No
        div
          input.f5(
            v-model="venueAdmissionSignInForm.takeACoronavirusTestToday",
            type='radio',
            value="yes",
            name="today-coronavirus-test",
            id='today-coronavirus-test-yes'
          )
          label(for='today-coronavirus-test-yes')
            | 有 Yes
    div.check-info
      button#button-check-in.fw9(
        @click="validateFrom",
        v-if="checkedTime===''"
      )
        | {{$t('checkIn')}}
      div.checked-in(
        v-else
      )
        <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="54" cy="54" r="54" fill="#4BE2F2"/>
          <path d="M23 54L43 74L63.5 53.5L84 33" stroke="white" stroke-width="5"/>
        </svg>
        p.checked-time.fw9
          | {{checkedTime}}
        p.fw9
          | {{$t('checkedIn')}}
        button#button-checked-in
          | Enjoy !

</template>
<i18n lang="yaml">
en:
  signInForm: 'Building Check-In'
  checkIn: 'Check In !'
  checkedIn: 'Checked In'
zh:
  signInForm: '入館簽到'
  checkIn: '打卡！'
  checkedIn: '完成打卡'
</i18n>
<script>
// TODO:
// 您已於 xx:xx 在 oo場館 簽到
// You've checked into oo at xx:xx
export default {
  data () {
    return {
      venueAdmissionSignInForm: {
        identity: '訪客 Visitors',
        name: '',
        IDOrPassport: '',
        phone: '',
        email: '',
        purposesPlaceOfVisiting: '學術交流/學習活動 Academic activities',
        historyOfEntryAndDepartureTaiwan: '',
        symptomsInTheLast14Days: [],
        symptomsInTheLast14DaysOthersSymptoms: '',
        quarantined: '',
        physicalContactCOVID19Patients: '',
        closeContactWithReturnedFromOtherCountries: '',
        receivedScreenTest: '',
        receivedScreenDate: '',
        receivedScreenCountry: '',
        receivedScreenInstitute: '',
        receivedScreenTestMethods: '',
        receivedScreenTestResults: '',
        diagnosed: '',
        diagnosedDate: '',
        diagnosedCountry: '',
        diagnosedHospital: '',
        diagnosedHospitalized: '',
        symptomsToday: '',
        stayedMoreThan1HourPlacesToday: '',
        takeACoronavirusTestToday: ''
      },
      currentVenue: 'GoodIdeasStudio',
      checkedInVenues: []
    }
  },
  computed: {
    checkedTime () {
      const currentVenueCheckedInfo = this.checkedInVenues.filter((item) => {
        return item.checkedVenue === this.currentVenue
      })[0]
      return currentVenueCheckedInfo ? currentVenueCheckedInfo.checkedTime : ''
    }
  },
  mounted () {
    if (localStorage.getItem('checkedInVenues')) {
      this.checkedInVenues = [...JSON.parse(localStorage.getItem('checkedInVenues'))]
    }
    if (localStorage.getItem('venueAdmissionSignInForm')) {
      this.venueAdmissionSignInForm = { ...JSON.parse(localStorage.getItem('venueAdmissionSignInForm')) }
    }
  },
  methods: {
    selectedVenue (value) {
      this.currentVenue = value
    },
    cleanThatOneChoice () {
      const thatOneChoice = 'noneOfTheAbove'
      if (this.venueAdmissionSignInForm.symptomsInTheLast14Days.includes(thatOneChoice)) {
        const index = this.venueAdmissionSignInForm.symptomsInTheLast14Days.indexOf(thatOneChoice)
        this.venueAdmissionSignInForm.symptomsInTheLast14Days.splice(index, 1)
      }
    },
    cleanExceptMyselfChoices () {
      const thatOneChoice = 'noneOfTheAbove'
      if (this.venueAdmissionSignInForm.symptomsInTheLast14Days.includes('others')) {
        this.venueAdmissionSignInForm.symptomsInTheLast14Days = ['others']
      } else {
        this.venueAdmissionSignInForm.symptomsInTheLast14Days = []
      }
      this.venueAdmissionSignInForm.symptomsInTheLast14Days.push(thatOneChoice)
    },
    cleanHiddenFieldValue () {
      if (!this.venueAdmissionSignInForm.symptomsInTheLast14Days.includes('others')) {
        this.venueAdmissionSignInForm.symptomsInTheLast14DaysOthersSymptoms = ''
      }
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
      const isSymptomsInTheLast14DaysOthersSymptomsEmpty = this.venueAdmissionSignInForm.symptomsInTheLast14Days.includes('others') ? this.venueAdmissionSignInForm.symptomsInTheLast14DaysOthersSymptoms === '' : false
      // 驗證「是否接受過新冠肺炎篩檢」欄位為 yes 時的隱藏欄位
      let isReceivedScreenTestHiddenFieldsEmpty
      if (this.venueAdmissionSignInForm.receivedScreenTest === 'yes') {
        isReceivedScreenTestHiddenFieldsEmpty = this.venueAdmissionSignInForm.receivedScreenDate === '' ||
                this.venueAdmissionSignInForm.receivedScreenCountry === '' ||
                this.venueAdmissionSignInForm.receivedScreenInstitute === '' ||
                this.venueAdmissionSignInForm.receivedScreenTestMethods === '' ||
                this.venueAdmissionSignInForm.receivedScreenTestResults === ''
      }
      // 驗證「是否曾被確診為新冠肺炎患者」欄位為 yes 時的隱藏欄位
      let isDiagnosedHiddenFieldsEmpty
      if (this.venueAdmissionSignInForm.diagnosed === 'yes') {
        isDiagnosedHiddenFieldsEmpty = this.venueAdmissionSignInForm.diagnosedDate === '' ||
                this.venueAdmissionSignInForm.diagnosedCountry === '' ||
                this.venueAdmissionSignInForm.diagnosedHospital === '' ||
                this.venueAdmissionSignInForm.diagnosedHospitalized === ''
      }

      const specialFields = [
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
      /* eslint-disable no-console */
      return isSymptomsInTheLast14DaysEmpty ||
            isSymptomsInTheLast14DaysOthersSymptomsEmpty ||
            isReceivedScreenTestHiddenFieldsEmpty ||
            isDiagnosedHiddenFieldsEmpty ||
            isOtherFieldsEmpty
    },
    validateFrom () {
      if (this.isRequiredFieldEmpty()) {
        alert(' 必填欄位不能為空')
        return
      }
      this.submmit()
    },
    submmit () {
      this.checkedInVenues.push({
        checkedVenue: this.currentVenue,
        checkedTime: this.timeStamp()
      })
      localStorage.setItem('venueAdmissionSignInForm', JSON.stringify(this.venueAdmissionSignInForm))
      localStorage.setItem('checkedInVenues', JSON.stringify(this.checkedInVenues))
    },
    timeStamp () {
      const date = new Date()
      const YYYY = date.getFullYear()
      const MM = date.getMonth() + 1
      const DD = date.getDate()
      const hh = date.getHours()
      const mm = date.getMinutes()
      return `${YYYY}/${MM}/${DD} ${hh}:${mm}`
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
    }
    .radio-x {
      display: flex;
      align-items: center;
      > div:nth-child(2n) {
        margin-left: 30px;
      }
    }
    .radio-y {
      display: flex;
      flex-direction: column;
    }
  }
  .check-info {
    text-align: center;
    font-size: 1.125rem;
    .checked-time {
      color: #f779ee;
    }
    button {
      border-radius: 30px;
      padding: 4px 25px;
    }
    #button-check-in {
      font-size: 2rem;
      color: #fff;
      background: #0EAFC9;
    }
    #button-checked-in {
      padding: 8px 25px;
      color: #fff;
      background: #4BE2F2;
    }
  }
}
</style>
