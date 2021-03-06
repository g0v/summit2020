import dayjs from 'dayjs'
import { DEFAULT_DATE } from './scheduleInfo'
const DAY_0_DATE = 3

const PRESENT_MAP = {
  遠端連線: 'online',
  online: 'online',
  現場報告: 'on-site',
  'on-site': 'on-site',
  遠端現場混合: 'mixed',
  mixed: 'mixed'
}
export default {
  computed: {
    time () {
      if (this.agenda) {
        return this.agenda.timeSheet || {}
      }
      return {}
    },
    room () {
      const room = this.time.議程場地
      if (!room || room.startsWith('ALL')) {
        return ''
      }
      return room
    },
    fromTime () {
      return this.time.fromTimeStr
    },
    duration () {
      return this.time.議程長度
    },
    toTime () {
      return this.time.toTimeStr
    },
    startDate () {
      return this.time.議程日期 || this.$route.params.date || DEFAULT_DATE
    },
    dayN () {
      const startDate = dayjs(this.startDate)
      const dayN = startDate.date() - DAY_0_DATE
      return dayN > 0 ? dayN : 0
    },
    presentationMethod () {
      const method = this.agenda.presentation_method
      return PRESENT_MAP[method] || 'on-site'
    },
    isPureOnline () {
      return this.presentationMethod === 'online'
    },
    isPureOnSite () {
      return this.presentationMethod === 'on-site'
    },
    isPureMixed () {
      return this.presentationMethod === 'mixed'
    },
    title () {
      if (this.agenda) {
        return this.agenda.title || ''
      }
      return ''
    },
    speakers () {
      const speakers = this.agenda.speakers || []
      return speakers.map(speaker => speaker.display_name).join(' / ')
    },
    format () {
      return this.agenda.format
    },
    topic () {
      return this.agenda.topic
    },
    category () {
      return this.agenda.timeSheet.分類主題
    },
    moderator () {
      return this.agenda.timeSheet.主持人
    }
  }
}
