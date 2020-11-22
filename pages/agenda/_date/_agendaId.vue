<template lang="pug">
  .detail.fixed.top-0.left-0.bottom-0.right-0(
    v-if="isModalVisible"
    @click="closeModal"
    data-slideout-ignore
    itemscope
    itemtype="https://schema.org/Event"
  )
    .detail__wrapper
      .detail__modal.br2.bg-white(@click.stop)
        .flex.justify-between
          .detail__start.f6
            .dib.mr2 Day{{dayN}}
            .dib.ml1(itemprop="startDate") {{$t(startDate)}}
          button.detail__close.bg-white.bn(@click="closeModal")
            img(src="~/assets/images/agenda/close.svg")
        .detail__subheader.mt3.pa3.bb.relative.flex.justify-between.items-center
          div
            .fw5 {{fromTime}} - {{toTime}}
            .f6(v-if="room" itemprop="location") {{room}}
          .detail__resource.flex.items-center
            b-tooltip.f3-l.light-silver(:label="agenda.presentation_method || $t('onSite')" type="is-dark")
              i.fas.fa-chalkboard-teacher.mr2(v-if="isPureOnSite || isPureMixed")
              i.fas.fa-video.mr2(v-if="isPureOnline || isPureMixed")
            b-tooltip(:label="$t('comment')" type="is-dark")
              ext-link.light-silver.f3.dib.ph2(v-if="commentUrl" :to="commentUrl")
                i.fas.fa-comments
        .detail__header.flex
          h1.fw5.f4.f3-ns(itemprop="name") {{title}}
        .gray(v-if="category") {{category}}
        .mt4.flex.flex-wrap
          agenda-tag(v-if="topic") {{topic}}
          agenda-tag(v-if="format") {{format}}
          language-tag(:agenda="agenda")
        h2.ttc {{$t('abstract')}}
        rich-multi-line.gray(itemprop="description" :text="agenda.summary")
        .gray.mv3(v-if="relatedInfo")
          span.mr1 {{$t('relatedInfo')}}
          ext-link(:to="relatedInfo")
        .detail__keyword.ttc.mv3.pv2(v-if="agenda.three_keywords")
          span.mr2 {{$t('keyword')}}
          | {{agenda.three_keywords}}
        .detail__people(v-if="speakers || moderator" :class="{'detail__people--mono': isMonoSpeaker}")
          summit-person(
            v-if="moderator"
            :person="moderator"
            :is-moderator="true"
            itemprop="performer"
          )
          summit-person(
            v-for="(speaker, index) in agenda.speakers"
            :key="index"
            :person="speaker"
            :is-mono-speaker="isMonoSpeaker"
            itemprop="performer"
          )
</template>
<i18n lang="yaml">
en:
  '2020-12-03': Thu, Dec 3 2020
  '2020-12-04': Fri, Dec 4 2020
  '2020-12-05': Sat, Dec 5 2020
  '2020-12-06': Sun, Dec 6 2020
  abstract: abstract
  keyword: "keywords:"
  relatedInfo: "Related info:"
  comment: "Join discussion"

zh:
  '2020-12-03': 2020/12/03（四）
  '2020-12-04': 2020/12/04（五）
  '2020-12-05': 2020/12/05（六）
  '2020-12-06': 2020/12/06（日）
  abstract: 摘要
  keyword: 關鍵字：
  relatedInfo: 相關資訊：
  comment: "參與討論"
</i18n>
<script>
import dayjs from 'dayjs'
import RichMultiLine from '~/components/RichMultiLine'
import ExtLink from '~/components/ExtLink'
import SummitPerson from '~/components/SummitPerson'
import AgendaTag from '~/components/AgendaTag'
import LanguageTag from '~/components/LanguageTag'
import agendaMixin from '~/utils/AgendaMixin'
import { DEFAULT_DATE } from '~/utils/scheduleInfo'
import commentMap from '~/assets/agendas/commentCache.json'
import { friendlyHeader } from '~/utils/crawlerFriendly'

const DAY_0_DATE = 3
const SUPER_LONG_BIO = 300

const COMMENT_BASE = 'https://discuss.summit2020.g0v.tw/topic/'

export default {
  components: {
    RichMultiLine,
    ExtLink,
    SummitPerson,
    AgendaTag,
    LanguageTag
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
      return this.$route.params.date || DEFAULT_DATE
    },
    dayN () {
      const startDate = dayjs(this.startDate)
      const dayN = startDate.date() - DAY_0_DATE
      return dayN > 0 ? dayN : 0
    },
    // superCategory () {
    //   const cats = []
    //   if (this.topic) {
    //     cats.push(this.topic)
    //   }
    //   if (this.category) {
    //     cats.push(this.category)
    //   }
    //   return cats.join(' / ')
    // },
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
      return '/og-agenda-v1.png'
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
  &__resource {
    position: relative;
    right: -0.5rem;
  }
  &__header {
    color: $blue-1;
    position: sticky;
    z-index: 1;
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
  &__keyword {
    color: $blue-1;
  }
  &__people {
    margin-bottom: 4.5rem;
    justify-content: center;

    @include not-small-screen {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 2rem;
    }

    &--mono {
      grid-template-columns: 1fr;
    }
  }
}
.gray {
  color: #555;
}

</style>
