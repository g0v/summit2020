<template lang="pug">
  .checkin
    h1.tc.fw5 {{title}}
    .mv4.f6
      .black.mt3.flex.items-center
        | {{$t('basicInfo')}}
        b-button.checkin__reset.ml2(
          rounded
          outlined
          size="is-small"
          type="is-success"
          @click="reset"
        )
          | {{$t('resetHealth')}}
      .mv1
        span.gray {{$t('name')}}
        span.ml2 {{healthInfo.name}}
      .mv1
        span.gray {{$t('phone')}}
        span.ml2 {{healthInfo.phone}}
    .mv4
      .f6.black.mv3 {{$t('buildingInfo')}}
      .mv2(v-for="building in buildingOptions" :key="building")
        b-radio-button(
          :native-value="building"
          type="is-primary"
          v-model="currentBuilding"
        )
          | {{building}}
    .mt4.tc
      template(v-if="needLearningCredit")
        b-button.b.mr3(
          rounded
          size="is-medium"
          type="is-primary"
          @click="submit('簽到')"
        ) {{$t('startLearning')}}
        b-button.b(
          rounded
          outlined
          size="is-medium"
          type="is-primary"
          @click="submit('簽退')"
        ) {{$t('finishLearning')}}
      b-button.b(
        v-else
        rounded
        size="is-medium"
        type="is-primary"
        @click="submit"
      ) {{$t('submit')}}

</template>
<i18n lang="yaml">
en:
  titleDefault: Building Check-In Form
  titleLearningCredit: 終身學習簽到簽退
  basicInfo: Personal Information
  name: 'Name:'
  phone: 'Phone Number:'
  buildingInfo: Building Information
  submit: Check in
  startLearning: Sign in
  finishLearning: Sign off
  noBuilding: Please select the building you are going to enter
  resetHealth: Change personal information
zh:
  titleDefault: 入館簽到
  titleLearningCredit: 終身學習簽到簽退
  basicInfo: 個人資訊
  name: 姓名：
  phone: 電話：
  buildingInfo:  場館地點
  submit: 簽到入館
  startLearning: 簽到
  finishLearning: 簽退
  noBuilding: 請選擇要進入的場館
  resetHealth: 調整個人資訊
</i18n>
<script>
import qs from 'querystring'
import axios from 'axios'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import { GETTERS } from '~/store'
import { DEFAULT_DATE, VALID_DATE_LIST } from '~/utils/scheduleInfo'

const FORM_URL = 'https://docs.google.com/forms/u/1/d/e/1FAIpQLSelVTO7MNPnRglcH12Zi-kBaqjbOi7KpU2zDaxIdBYOoENO-Q/formResponse'

const FIELD_MAPPING = {
  building: 'entry.488819449',
  hash: 'entry.1803586269',
  name: 'entry.812880642',
  phone: 'entry.876031581',
  learningCredit: 'entry.1894872452'
}

export default {
  data () {
    return {
      currentBuilding: '',
      isInProgress: false
    }
  },
  computed: {
    ...mapGetters({
      curHealthInfo: GETTERS.CUR_HEALTH_INFO
    }),
    healthInfo () {
      return this.curHealthInfo || {}
    },
    today () {
      let today = dayjs().format('YYYY-MM-DD')
      if (!VALID_DATE_LIST.includes(today)) {
        today = DEFAULT_DATE
      }
      return today
    },
    buildingOptions () {
      const buildings = {}
      const allProposals = this.$t('proposal/map')
      allProposals.forEach((proposal) => {
        const time = proposal.timeSheet
        if (time.議程日期 === this.today && time.議程場地) {
          const building = time.議程場地.split('- ')[0].trim()
          if (building && !building.startsWith('ALL')) {
            buildings[building] = true
          }
        }
      })
      return Object.keys(buildings)
    },
    needLearningCredit () {
      return !!this.healthInfo.needLearningCredit
    },
    title () {
      if (this.needLearningCredit) {
        return this.$t('titleLearningCredit')
      }
      return this.$t('titleDefault')
    }
  },
  methods: {
    reset () {
      this.$emit('reset')
    },
    async submit (signinInfo) {
      if (!this.currentBuilding) {
        this.$buefy.dialog.alert({
          type: 'is-danger',
          message: this.$t('noBuilding')
        })
        return
      }
      if (this.isInProgress) {
        return
      }
      this.isInProgress = true
      const body = {
        [FIELD_MAPPING.building]: this.currentBuilding,
        [FIELD_MAPPING.hash]: this.healthInfo.hash,
        [FIELD_MAPPING.name]: this.healthInfo.name,
        [FIELD_MAPPING.phone]: this.healthInfo.phone
      }
      if (signinInfo) {
        body[FIELD_MAPPING.learningCredit] = signinInfo
      }
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
        this.$emit('building-done', {
          building: this.currentBuilding,
          signinInfo
        })
      }
      this.isInProgress = false
    }
  }
}
</script>
<style lang="scss" scoped>
.checkin {
  &__reset {
    // padding: calc(0.5em - 1px) 1.25em;
    height: 1.75em;
  }
}
</style>
