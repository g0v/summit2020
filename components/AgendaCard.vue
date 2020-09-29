<template lang="pug">
  .agendacard.br2.h-100
    .agendacard__wrapper
      .agendacard__time.flex.justify-between.mb3.lh-solid
        .f7 {{fromTime}} - {{toTime}}
        .f7 {{duration}}{{$t('minuteUnit')}}
      .mb2.mt3.f6.fw5(v-if="hasPreHeaderToShow")
        .agendacard__topic(v-if="topic") {{topic}}
        .agendacard__category(v-if="category") {{category}}
      h2.agendacard__title.f5.mt3.fw5 {{title}}
      .agendacard__speakers.mt3.f6.lh-title(v-if="speakers") {{speakers}}
      .flex.flex-wrap.mt4(v-if="hasTagsToShow")
        .agendacard__tag(v-if="lang") {{$t(lang)}}
        .agendacard__tag(v-if="format") {{format}}
</template>
<i18n lang="yaml">
en:
  minuteUnit: mins
  華語: Mandarin
  English: English
zh:
  minuteUnit: 分鐘
  English: English
  華語: 華語
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
</script>
<style lang="scss" scoped>
.agendacard {
  background: #f8f8f8;
  padding: 1rem 0.75rem;
  &__wrapper {
    position: sticky;
    top: 0.5rem;
  }
  &__time {
    color: #303030;
  }
  &__topic {
    color: $blue-1;
  }
  &__category {
    color: #555;
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
