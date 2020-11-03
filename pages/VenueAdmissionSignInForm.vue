<template lang="pug">
.sign-in-form.center.ph4
  h1.f2.fw5
    | {{$t('signInForm')}}
  div.venues.f4.fw5
    button
      | 好想工作室
    button
      | 吳園公會堂
    button
      | 成大 C-Hub
    button
      | 臺南市美術館 2 館
  div.info
    div.field
      label.fw5
        | *身分別 Identity
      input.f5(type='text', value='訪客 Visitors', disabled)
    div.field
      label.fw5
        | *姓名 Name
      input.f5(type='text')
    div.field
      label.fw5
        | *身分證/護照/居留證 ID. ID / Passport / ARC No.
      input.f5(type='text')
    div.field
      label.fw5
        | *可聯絡手機/室內電話 Cell Phone/Landline
      input.f5(type='tel')
    div.field
      label.fw5
        | *電子郵件 Email
      input.f5(type='email')
    div.field
      label.fw5
        | *來校目的與地點 Purposes & Place of Visiting
      input.f5(type='text', value='學術交流/學習活動 Academic activities', disabled)
    div.field
      label.fw5
        | *近一個月出入境台灣史 History of Entry and Departure (Taiwan)
      div.radio-group.radio-x
        div
          input.f5(type='radio',name="history", id='history-no')
          label(for='history-no')
            | 無 No
        div
          input.f5(type='radio',name="history", id='history-yes')
          label(for='history-yes')
            | 有 Yes
    h2.f5
      | 「嚴重特殊傳染性肺炎」（武漢肺炎）有關接觸史與症狀 Symptoms related to COVID-19
    div.field
      label.fw5
        | *最近14天內是否出現以下症狀（複選） Do you have any symptoms listed below in the last 14 days ? (Multiple choice)
      div.radio-group.radio-y
        div
          input.f5(v-model="symptoms", value="temperature", type='radio',name="symptoms", id='temperature')
          label(for='temperature')
            | 發燒(> 37.5度) Body temperature over 37.5 ˚C
        div
          input.f5(v-model="symptoms", value="coughs", type='radio',name="symptoms", id='coughs')
          label(for='coughs')
            | 咳嗽 Coughs
        div
          input.f5(v-model="symptoms", value="pharyngitis", type='radio',name="symptoms", id='pharyngitis')
          label(for='pharyngitis')
            | 喉嚨痛 Pharyngitis (Sore throat)
        div
          input.f5(v-model="symptoms", value="breath", type='radio',name="symptoms", id='breath')
          label(for='breath')
            | 呼吸道窘迫症狀 (呼吸急促﹑呼吸困難) Shortness of Breath
        div
          input.f5(v-model="symptoms", value="unnyNose", type='radio',name="symptoms", id='runny-nose')
          label(for='runny-nose')
            | 流鼻水 Runny nose
        div
          input.f5(v-model="symptoms", value="myalgia", type='radio',name="symptoms", id='myalgia')
          label(for='myalgia')
            | 肌肉酸痛 Myalgia (Muscle pain)
        div
          input.f5(v-model="symptoms", value="arthralgia", type='radio',name="symptoms", id='arthralgia')
          label(for='arthralgia')
            | 關節酸痛 Arthralgia (Joint pain)
        div
          input.f5(v-model="symptoms", value="asthenia", type='radio',name="symptoms", id='asthenia')
          label(for='asthenia')
            | 四肢無力 Asthenia (Weakness; weak extremities)
        div
          input.f5(v-model="symptoms", value="chest", type='radio',name="symptoms", id='chest')
          label(for='chest')
            | 胸痛 Chest Pain
        div
          input.f5(v-model="symptoms", value="ageusia", type='radio',name="symptoms", id='ageusia')
          label(for='ageusia')
            | 味覺失調或消失 Dysgeusia or Ageusia
        div
          input.f5(v-model="symptoms", value="anosmia", type='radio',name="symptoms", id='anosmia')
          label(for='anosmia')
            | 嗅覺失調或消失 Dysosmia or Anosmia
        div
          input.f5(v-model="symptoms", value="diarrhea", type='radio',name="symptoms", id='diarrhea')
          label(for='diarrhea')
            | 腹瀉 Diarrhea
        div
          input.f5(v-model="symptoms", value="hyperemia", type='radio',name="symptoms", id='hyperemia')
          label(for='hyperemia')
            | 結膜充血 Conjunctival hyperemia
        div
          input.f5(v-model="symptoms", value="eyes", type='radio',name="symptoms", id='eyes')
          label(for='eyes')
            | 眼睛癢 Itchy Eyes
        div
          input.f5(v-model="symptoms", value="blisters", type='radio',name="symptoms", id='blisters')
          label(for='blisters')
            | 腳指有紅點並起水泡 Get red spots or blisters on my toes
        div
          input.f5(v-model="symptoms", value="noneOfTheAbove", type='radio',name="symptoms", id='none-of-the-above')
          label(for='none-of-the-above')
            | 無以上任⼀症狀 None of the above
        div
          input.f5(v-model="symptoms", value="others", type='radio',name="symptoms", id='others')
          label(for='others')
            | 其他 Others
        div(v-if="symptoms === 'others'")
          input.f5(v-model="othersSymptoms", type='text', placeholder='請填寫症狀')
    div.field
      label.fw5
        | *您是否因嚴重特殊傳染性肺炎（武漢肺炎），被衛生主管機構列為防疫管制追蹤對象？ Have you been identified as a quarantined case by the Taiwan authorities ?
      div.radio-group.radio-x
        div
          input.f5(type='radio',name="quarantined", id='quarantined-no')
          label(for='quarantined-no')
            | 無 No
        div
          input.f5(type='radio',name="quarantined", id='quarantined-yes')
          label(for='quarantined-yes')
            | 有 Yes
    div.field
      label.fw5
        | *您或您家屬是否曾與感染嚴重特殊傳染性肺炎（武漢肺炎）病患有接觸嗎？ Have you ever been in any physical contact with the COVID-19 patients ?
      div.radio-group.radio-x
        div
          input.f5(type='radio',name="COVID-19-patients", id='COVID-19-patients-no')
          label(for='COVID-19-patients-no')
            | 無 No
        div
          input.f5(type='radio',name="COVID-19-patients", id='COVID-19-patients-yes')
          label(for='COVID-19-patients-yes')
            | 有 Yes
    div.field
      label.fw5
        | *近期(2週內)是否有接觸家人、親友自國外返台？ Have you been in close contact with anyone who returned from other countries in the past two weeks ?
      div.radio-group.radio-x
        div
          input.f5(type='radio',name="two-weeks", id='two-weeks-no')
          label(for='two-weeks-no')
            | 無 No
        div
          input.f5(type='radio',name="two-weeks", id='two-weeks-yes')
          label(for='two-weeks-yes')
            | 有 Yes
    div.field
      label.fw5
        | *您是否接受過新冠肺炎篩檢? Have you received a COVID-19 screen test ?
      div.radio-group.radio-x
        div
          input.f5(v-model="screenTest", value="no", type='radio',name="screen-test", id='screen-test-no')
          label(for='screen-test-no')
            | 無 No
        div
          input.f5(v-model="screenTest", value="yes", type='radio',name="screen-test", id='screen-test-yes')
          label(for='screen-test-yes')
            | 有 Yes
    div(v-if="screenTest === 'yes'")
      div.field
        label.fw5
          | *篩檢日期 Date
        input.f5(type='text', placeholder='YYYY-MM-DD')
      div.field
        label.fw5
          | *篩檢國家 Which country ?
        input.f5(type='text')
      div.field
        label.fw5
          | *篩檢單位 Which Institute ?
        input.f5(type='text')
      div.field
        label.fw5
          | *篩檢方法 Test Methods
        div.radio-group.radio-x
          div
            input.f5(v-model="testMethods", value="PCR", type='radio',name="test-methods", id='PCR')
            label(for='PCR')
              | 病毒 PCR
          div
            input.f5(v-model="testMethods", value="antibodies", type='radio',name="test-methods", id='antibodies')
            label(for='antibodies')
              | 抗體 Antibodies
      div.field
        label.fw5
          | *篩檢結果 Test Results
        div.radio-group.radio-x
          div
            input.f5(v-model="testResults", value="negative", type='radio',name="test-results", id='negative')
            label(for='negative')
              | 陰性 Negative
          div
            input.f5(v-model="testResults", value="positive", type='radio',name="test-results", id='positive')
            label(for='positive')
              | 陽性 Positive
            | 有 Yes
    div.field
      label.fw5
        | *您是否曾被確診為新冠肺炎患者? Have you ever been diagnosed with COVID-19 ?
      div.radio-group.radio-x
        div
          input.f5(v-model="diagnosed", value="no", type='radio',name="diagnosed", id='diagnosed-no')
          label(for='diagnosed-no')
            | 無 No
        div
          input.f5(v-model="diagnosed", value="yes", type='radio',name="diagnosed", id='diagnosed-yes')
          label(for='diagnosed-yes')
            | 有 Yes
    div(v-if="diagnosed === 'yes'")
      div.field
        label.fw5
          | *診斷日期 Date of Diagnosis
        input.f5(type='text', placeholder='YYYY-MM-DD')
      div.field
        label.fw5
          | *診斷國家 Which country ?
        input.f5(type='text')
      div.field
        label.fw5
          | *診斷醫院 Which Hospital ?
        input.f5(type='text')
      div.field
        label.fw5
          | *是否住院？ Have you been hospitalized for COVID-19 ?
        div.radio-group.radio-x
          div
            input.f5(v-model="hospitalized", value="no", type='radio',name="hospitalized", id='hospitalized-no')
            label(for='hospitalized-no')
              | 無 No
          div
            input.f5(v-model="hospitalized", value="yes", type='radio',name="hospitalized", id='hospitalized-yes')
            label(for='hospitalized-yes')
              | 有 Yes
    h2.f5
      | 回報今日健康資訊 Fill in today's health information
    div.field
      label.fw5
        | *是否出現新冠肺炎症狀 Symptoms
      div.radio-group.radio-x
        div
          input.f5(type='radio',name="today-symptoms", id='today-symptoms-no')
          label(for='today-symptoms-no')
            | 無 No
        div
          input.f5(type='radio',name="today-symptoms", id='today-symptoms-yes')
          label(for='today-symptoms-yes')
            | 有 Yes
    div.field
      label.fw5
        | *今天你去過的足跡待1小時以上處所 Where you stayed for more than 1 hour today ?
      input.f5(type='text')
    div.field
      label.fw5
        | *是否去篩檢 Did you take a coronavirus test ?
      div.radio-group.radio-x
        div
          input.f5(type='radio',name="today-coronavirus-test", id='today-coronavirus-test-no')
          label(for='today-coronavirus-test-no')
            | 無 No
        div
          input.f5(type='radio',name="today-coronavirus-test", id='today-coronavirus-test-yes')
          label(for='today-coronavirus-test-yes')
            | 有 Yes
    div.check-info
      button#button-check-in.fw9(
        @click="submmit"
        v-if="!isChecked"
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
  signInForm: 'Venue Admission Sign In Form'
  checkIn: 'Check In !'
  checkedIn: 'Checked In'
zh:
  signInForm: '入場打卡表單'
  checkIn: '打卡！'
  checkedIn: '完成打卡'
</i18n>
<script>
export default {
  data () {
    return {
      // when symptoms !== 'others', clean othersSymptoms
      symptoms: '',
      othersSymptoms: '',
      // when screenTest === 'no', clean testMethods、testResults
      screenTest: '',
      testMethods: '',
      testResults: '',
      // when diagnosed === 'no', clean hospitalized
      diagnosed: '',
      hospitalized: '',
      checkedTime: '',
      isChecked: false
    }
  },
  methods: {
    submmit () {
      this.checkedTime = this.timeStamp()
      this.isChecked = true
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
    button:hover {
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
    .radio--y {
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
