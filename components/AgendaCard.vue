<template lang="pug">
  .agendacard.br2.h-100
    .agendacard__time.flex.justify-between.mb3
      .f7 {{fromTime}} - {{toTime}}
      .f7 {{duration}}{{$t('minuteUnit')}}
    .agendacard__title.mv2.f6.fw5 {{title}}
    .agendacard__speakers.mv2.f7 {{speakers}}
    .flex.mt4
      .agendacard__tag(v-if="lang") {{lang}}
</template>
<i18n lang="yaml">
en:
  minuteUnit: mins
zh:
  minuteUnit: 分鐘
</i18n>
<script>
import dayjs from 'dayjs'

export default {
  props: {
    agenda: {
      type: Object,
      required: true
    }
  },
  computed: {
    time () {
      if (!this.agenda.timeSheet) {
        console.warn(this.agenda, this.agenda.timeSheet)
      }
      return this.agenda.timeSheet
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
      return speakers.map(speaker => speaker.display_name).join(' ')
    },
    lang () {
      return this.agenda.oral_language_other || this.agenda.oral_language
    }
  }
}
</script>
<style lang="scss" scoped>
.agendacard {
  background: #f8f8f8;
  padding: 1rem 0.75rem;
  &__time {
    color: #303030;
  }
  &__title {
    color: $blue-1;
  }
  &__tag {
    border-radius: 999px;
    color: white;
    font-size: 0.75rem;
    margin-top: 0.25rem;
    background: #67cddd;
    padding: 0.125rem 0.5rem;
    &:not(:first-child) {
      margin-left: 0.25rem;
    }
  }
}
</style>
