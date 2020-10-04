<template lang="pug">
  .detail.fixed.top-0.left-0.bottom-0.right-0(
    v-if="isModalVisible"
    @click="closeModal"
    data-slideout-ignore
  )
    .detail__wrapper
      .detail__modal.br2.bg-white(@click.stop)
        .flex.justify-between
          .detail__start.f6
            .dib.mr2 Day{{dayN}}
            .dib.ml1 {{$t(startDate)}}
          button.detail__close.bg-white.bn(@click="closeModal")
            img(src="~/assets/images/agenda/close.svg")
        .detail__subheader.mt3.pa3.bb.relative
          .fw5 {{fromTime}} - {{toTime}}
          .f6(v-if="room") {{room}}
        .detail__header.flex
          h1.fw5.f3 {{title}}
          ext-link.f3.dib.ph3(v-if="commentUrl" :to="commentUrl" :title="$t('comment')")
            i.fa.fa-comments
        .gray {{superCategory}}
        .mt4.flex
          .detail__tag(v-if="format") {{format}}
          .detail__tag(v-if="lang") {{$t(lang)}}
        h2.ttc {{$t('abstract')}}
        rich-multi-line.gray(:text="agenda.summary")
        .gray.mv3(v-if="relatedInfo")
          span.mr1 {{$t('relatedInfo')}}
          ext-link(:to="relatedInfo")
        .detail__keyword.ttc.mv3.pv2(v-if="agenda.three_keywords")
          span.mr2 {{$t('keyword')}}
          | {{agenda.three_keywords}}
        .detail__speakers(v-if="speakers" :class="{'detail__speakers--mono': isMonoSpeaker}")
          .speaker.mb5.mb0-ns(
            v-for="(speaker, index) in agenda.speakers"
            :key="index"
          )
            img.speaker__avatar(
              v-if="speakerAvatar(speaker)"
              :src="speakerAvatar(speaker)"
              :alt="speaker.display_name"
            )
            .speaker__avatar.speaker__avatar--empty(
              v-else
              :title="speaker.display_name"
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
              ext-link.ml1(:to="speaker.info_url")
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
  relatedInfo: "Related info:"
  comment: "Join discussion"

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
  relatedInfo: 相關資訊：
  comment: "參與討論"
</i18n>
<script>
import dayjs from 'dayjs'
import RichMultiLine from '~/components/RichMultiLine'
import ExtLink from '~/components/ExtLink'
import agendaMixin from '~/utils/AgendaMixin'
import commentMap from '~/assets/agendas/commentCache.json'
import { friendlyHeader } from '~/utils/crawlerFriendly'

const DAY_0_DATE = 3
const SUPER_LONG_BIO = 300
const SUPER_SHORT_BIO = 20

const COMMENT_BASE = 'https://discuss.summit2020.g0v.tw/topic/'

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
    relatedInfo () {
      return this.agenda.related_url || ''
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
    },
    commentUrl () {
      const comment = commentMap[this.id]
      console.warn('url', commentMap, this.id, comment)
      if (comment) {
        return `${COMMENT_BASE}${comment.id}`
      }
      return ''
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
    },
    speakerAvatar (speaker) {
      return (speaker.avatar_url || '').trim()
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
  z-index: 100;
  &__wrapper {
    position: sticky;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    max-height: 100vh;
    max-width: 100vw;
    display: inline-block;
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
    @include not-small-screen {
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
  &__header {
    color: $blue-1;
    position: sticky;
    top: -2.5rem;
    @include not-small-screen {
      top: -4.5rem;
    }
    background: rgba(255, 255, 255, 0.9);
    padding-top: 2.5rem;
    margin-top: 0;
    margin-bottom: 0.25rem;

    a {
      color: $blue-1;
    }
  }
  h1 {
    margin: 0;
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
    margin-bottom: 4.5rem;
    justify-content: center;

    @include not-small-screen {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }

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
    &--empty {
      background: rgba(103, 205, 221, 0.8);
      background: linear-gradient(164deg, rgba(112, 223, 240, 0.6) 0%,rgba(103,205,221,0.12) 100%);
      display: inline-block;
    }
  }
  &__title {
    color: #303030;
  }
}
</style>
