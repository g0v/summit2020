<template>
  <div class="homepage">
    <div class="landing flex justify-center items-center bg-near-white">
      <img class="g0v-logo" :src="require('~/assets/images/g0v-logo.svg')">
    </div>
    <div class="homepage__cfp pv3 pv4-l mb3 mb4-l shadow-3">
      <div class="flex flex-column flex-row-l items-center justify-center">
        <span class="f4 f3-l white tc lh-title">
          {{ $t('CFP_TITLE') }}
          <i class="fa fa-heart red" />
        </span>
        <a
          class="pv1 ph3 mv3 mv0-l mh3-l f5 bg-white shadow-1 br-pill mid-gray hover-black"
          href="https://propose.summit2020.g0v.tw/proposal-list"
          rel="noopener"
          target="_blank"
        >
          {{ $t('CFP_GOTO_LIST') }}
        </a>
        <a
          class="pv1 ph3 f5 bg-mid-gray white shadow-1 br-pill hover-bg-dark-green"
          href="https://discuss.summit2020.g0v.tw/"
          rel="noopener"
          target="_blank"
        >
          {{ $t('CFP_GOTO_FORUM') }}
        </a>
      </div>
    </div>
    <div class="text-container with-bubbles">
      <summit-markdown :content="$t('article/communityIntro')" />
      <summit-markdown :content="$t('article/summitAbout')" />
      <summit-markdown :content="$t('article/summitIntro')" />
      <summit-markdown :content="$t('article/summitContent')" />
    </div>
    <timeline :points="bigTimeline" />
    <div class="text-container with-bubbles">
      <summit-markdown :content="$t('article/summitGuidelines')" />
    </div>
  </div>
</template>
<i18n lang="yaml">
en:
  CFP_TITLE: All proposals open for comment
  CFP_GOTO_LIST: Read Proposals
  CFP_GOTO_FORUM: Join Discussion
zh:
  CFP_TITLE: 投稿截止，討論進行中
  CFP_GOTO_LIST: 看投稿
  CFP_GOTO_FORUM: 參與討論
</i18n>
<script>
import { friendlyHeader, summaryFromMarkdown } from '~/utils/crawlerFriendly'
import Timeline from '~/components/Timeline'

export default {
  components: {
    Timeline
  },
  data () {
    const bigTimeline = [
      {
        title: 'summit 2014',
        class: 'small'
      },
      {
        title: 'summit 2016',
        class: 'small'
      },
      {
        title: 'summit 2018',
        class: 'small'
      },
      {
        title: 'summit 2020' + ' ' + this.$t('cfp'),
        class: 'large'
      },
      {
        date: '7/15',
        title: this.$t('cfpClosed'),
        description: this.$t('cfpClosedDescription'),
        class: 'large'
      },
      {
        date: '8/2',
        title: this.$t('cfpFinalized'),
        class: 'large'
      },
      {
        date: '12/3-6',
        title: 'summit 2020',
        class: 'large'
      }
    ]
    return {
      bigTimeline
    }
  },
  head: friendlyHeader({
    description () {
      return summaryFromMarkdown(this.$t('article/summitAbout'))
    }
  })
}
</script>
<style lang="scss" scoped>
.homepage {
  max-width: 100vw;
  overflow-x: hidden;
  &__cfp {
    background: $green;

    a {
      letter-spacing: 2px;
      transition: 300ms ease-in-out;
    }
  }

  > .landing {
    height: 45vh;
    max-height: 30rem;
    position: relative;
    background: url("../assets/images/banner.png");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    margin-bottom: 2rem;
    .g0v-logo {
      width: 28vw;
      min-width: 10rem;
      max-width: 30rem;
      filter: drop-shadow(0 0 0.25rem #fff);
      @media (max-width: 800px) {
        width: 50vw;
      }
    }
  }
}
</style>
