import axios from 'axios'
import { ALLOW_DECL_HEALTH } from '~/utils/scheduleInfo'

const OCCU_ENDPOINT = 'https://g0v-summit-2020-room-occupatio.herokuapp.com/element-log'

// update every 5 minute
const OCCU_UPDATE_PERIOD = 5 * 60 * 1000

export default {
  data () {
    return {
      occupationTimer: null
    }
  },
  mounted () {
    this.keepUpdatingOccu()
  },
  beforeDestroy () {
    clearInterval(this.occupationTimer)
  },
  methods: {
    keepUpdatingOccu () {
      if (!ALLOW_DECL_HEALTH) {
        // we only count room status during the event
        return
      }
      this.updateOccu()
      this.occupationTimer = setInterval(() => {
        this.updateOccu()
      }, OCCU_UPDATE_PERIOD)
    },
    async updateOccu () {
      if (!ALLOW_DECL_HEALTH) {
        // we only count room status during the event
        return
      }
      try {
        const resp = await axios.get(OCCU_ENDPOINT)
        if (resp.data) {
          this.updateOccuState(resp.data)
        }
      } catch (err) {
        this.$sentry.self.captureMessage(`Error during retrieving room occupation: ${err.message}`)
      }
    }
  }
}
