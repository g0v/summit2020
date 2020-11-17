export const DEFAULT_DATE = '2020-12-04'
export const VALID_DATE_LIST = ['2020-12-04', '2020-12-05', '2020-12-06']

export default {
  computed: {
    time () {
      return this.agenda.timeSheet || {}
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
    title () {
      return this.agenda.title || ''
    },
    speakers () {
      const speakers = this.agenda.speakers || []
      return speakers.map(speaker => speaker.display_name).join(' / ')
    },
    lang () {
      return this.agenda.oral_language_other || this.agenda.oral_language
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
