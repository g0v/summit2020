<template lang="pug">
  .detail.fixed.top-0.left-0.bottom-0.right-0(
    v-if="isModalVisible"
    @click="closeModal"
  )
    .detail__wrapper
      .detail__modal.br2.bg-white(@click.stop data-slideout-ignore)
        .flex.justify-between
          .detail__start.f6
            .dib.mr2 Day{{dayN}}
            .dib.ml1 {{$t(startDate)}}
          button.detail__close.bg-white.bn(@click="closeModal")
            img(src="~/assets/images/agenda/close.svg")
        .detail__subheader.mt3.pa3.bb.relative
          .fw5 {{fromTime}} - {{toTime}}
          .f6(v-if="room") {{room}}
        h1.fw5.f3 {{title}}
        .gray {{superCategory}}
        .mt4.flex
          .detail__tag(v-if="format") {{format}}
          .detail__tag(v-if="lang") {{$t(lang)}}
        h2.ttc {{$t('abstract')}}
        rich-multi-line.gray(:text="agenda.summary")
        .detail__keyword.ttc.mv3.pv2(v-if="agenda.three_keywords")
          span.mr2 {{$t('keyword')}}
          | {{agenda.three_keywords}}
        .detail__speakers(v-if="speakers" :class="{'detail__speakers--mono': isMonoSpeaker}")
          .speaker(
            v-for="(speaker, index) in agenda.speakers"
            :key="index"
          )
            img.speaker__avatar(
              :src="speaker.avatar_url"
              :alt="speaker.display_name"
            )
            .speaker__title.mv3
              .fw5
                | {{speaker.display_name}}
                span(v-if="speaker.city.trim()") &nbsp;/ {{speaker.city}}
              .f6 {{speaker.organization}}
            rich-multi-line.gray.mv3.fw3(
              :text="speaker.bio"
              :class="{tl: isSpeakerBioTl(speaker)}"
            )
            .fw3.mv3(v-if="isUrl(speaker.info_url)" :class="{tl: isSpeakerBioTl(speaker)}")
              | {{$t('moreInfo')}}
              ext-link.ml2(:to="speaker.info_url")
</template>
<i18n lang="yaml">
en:
  '2020-12-03': Thu, Dec 3 2020
  '2020-12-04': Fri, Dec 4 2020
  '2020-12-05': Sat, Dec 5 2020
  '2020-12-06': Sun, Dec 6 2020
  abstract: abstract
  keyword: "keywords:"
  華語: Mandarin
  English: English
  moreInfo: "More info:"

zh:
  '2020-12-03': 2020/12/03（四）
  '2020-12-04': 2020/12/04（五）
  '2020-12-05': 2020/12/05（六）
  '2020-12-06': 2020/12/06（日）
  abstract: 摘要
  keyword: 關鍵字：
  English: English
  華語: 華語
  moreInfo: 更多資訊：
</i18n>
<script>
import dayjs from 'dayjs'
import RichMultiLine from '~/components/RichMultiLine'
import ExtLink from '~/components/ExtLink'
import agendaMixin from '~/utils/AgendaMixin'
import { friendlyHeader } from '~/utils/crawlerFriendly'

const DAY_0_DATE = 3
const SUPER_LONG_BIO = 300
const SUPER_SHORT_BIO = 20

export default {
  components: {
    RichMultiLine,
    ExtLink
  },
  mixins: [agendaMixin],
  computed: {
    id () {
      return this.$route.params.agendaId
    },
    agenda () {
      const allProposals = this.$t('proposal/map')
      return allProposals.find(agenda => agenda.id === this.id) || {}
    },
    isModalVisible () {
      return !!this.id && 'title' in this.agenda
    },
    startDate () {
      if (this.isModalVisible) {
        return this.agenda.timeSheet.議程日期
      }
      return this.$route.params.date
    },
    dayN () {
      const startDate = dayjs(this.startDate)
      const dayN = startDate.date() - DAY_0_DATE
      return dayN > 0 ? dayN : 0
    },
    superCategory () {
      const cats = []
      if (this.topic) {
        cats.push(this.topic)
      }
      if (this.category) {
        cats.push(this.category)
      }
      return cats.join(' / ')
    },
    isMonoSpeaker () {
      // example: 1204-jothon-1
      const speakers = this.agenda.speakers || []
      if (!speakers.length || speakers.length > 1) {
        return false
      }
      return speakers[0].bio.length > SUPER_LONG_BIO
    }
  },
  methods: {
    closeModal () {
      this.$router.push({
        ...this.$route,
        params: {
          date: this.$route.params.date
        }
      })
    },
    isUrl (url) {
      if (!url) {
        return false
      }
      const tokens = url.split('.')
      return tokens.length > 1 && tokens.every(token => !!token)
    },
    isSpeakerBioTl (speaker) {
      return this.isMonoSpeaker || speaker.bio.length > SUPER_SHORT_BIO
    }
  },
  head: friendlyHeader({
    title () {
      if (this.title) {
        return this.title
      }
      return `Day ${this.dayN} ${this.$t('agenda')}`
    },
    description () {
      if (this.agenda && this.agenda.summary) {
        return this.agenda.summary
      }
      return `Day ${this.dayN} ${this.$t('agenda')}`
    },
    coverUrl () {
      if (this.agenda && this.agenda.cover_image) {
        return this.agenda.cover_image
      }
      return '/og-agenda.png'
    }
  })
}
</script>
<style lang="scss" scoped>
.detail {
  background: rgba(198, 198, 198, 0.8);
  &__wrapper {
    position: sticky;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    max-height: 100vh;
    max-width: 100vw;
  }
  &__modal {
    max-width: calc(100vw - 2rem);
    width: 65rem;
    border: 1px solid $pink-1;
    padding: 1rem 1rem 1rem 2rem;
    margin: auto;
    position: relative;
    top: 1rem;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    @include large-screen {
      padding: 4.5rem 5.5rem;
      margin: auto;
      top: 3rem;
      max-height: calc(100vh - 6rem);
    }
  }
  &__start {
    .mr2 {
      color: #555;
    }
    color: #6e6e6e;
  }
  &__close {
    width: 1.25rem;
  }
  &__subheader {
    border-color: $pink-1;
    color: #6e6e6e;
    left: -1rem;
    width: calc(100% + 1rem);
  }
  h1 {
    padding-top: 2.5rem;
    margin-top: 0;
    margin-bottom: 0.25rem;
    color: $blue-1;
    position: sticky;
    background: rgba(255, 255, 255, 0.9);
    top: -2.5rem;
    @include large-screen {
      top: -4.5rem;
    }
  }
  h2 {
    margin-top: 4rem;
    margin-bottom: 1rem;
    color: $blue-1;
    font-size: 1.25rem;
    font-weight: 500;
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
  &__keyword {
    color: $blue-1;
  }
  &__speakers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
    margin-bottom: 4.5rem;
    justify-content: center;

    &--mono {
      grid-template-columns: 1fr;
    }
  }
}
.gray {
  color: #555;
}
.speaker {
  margin-top: 3rem;
  text-align: center;
  &__avatar {
    width: 7.5rem;
    height: 7.5rem;
    object-fit: cover;
    border-radius: 100%;
  }
  &__title {
    color: #303030;
  }
}
</style>
