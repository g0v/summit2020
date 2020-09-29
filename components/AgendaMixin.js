import dayjs from 'dayjs'

export default {
  computed: {
    time () {
      return this.agenda.timeSheet || {}
    },
    fromTime () {
      return dayjs(this.time.議程開始時間).format('HH:mm')
    },
    duration () {
      return this.time.議程長度
    },
    toTime () {
      return dayjs(this.time.議程開始時間).add(this.duration, 'm').format('HH:mm')
    },
    title () {
      return this.agenda.title
    },
    speakers () {
      const speakers = this.agenda.speakers || []
      return speakers.map(speaker => speaker.display_name).join(' / ')
    },
    hasTagsToShow () {
      return !this.isPseudo && (this.lang || this.format)
    },
    lang () {
      return this.agenda.oral_language_other || this.agenda.oral_language
    },
    format () {
      return this.agenda.format
    },
    hasPreHeaderToShow () {
      return this.topic || this.category
    },
    topic () {
      return this.agenda.topic
    },
    category () {
      return this.agenda.timeSheet.分類主題
    }
  }
}
