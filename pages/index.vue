<template>
  <div class="homepage">
    <div class="landing flex justify-center">
      <img :src="require('~/assets/images/v2/banner-2.svg')">
    </div>
    <div class="text-container article article-1">
      <summit-markdown :content="$t('article/communityIntro')" />
      <summit-markdown :content="$t('article/summitAbout')" />
      <summit-markdown :content="$t('article/summitIntro')" />
      <summit-markdown :content="$t('article/summitContent')" />
    </div>
    <div class="timeline-container">
      <timeline :points="bigTimeline" />
    </div>
    <div class="text-container article article-2">
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
        title: 'Summit 2014',
        class: 'small'
      },
      {
        title: 'Summit 2016',
        class: 'small'
      },
      {
        title: 'Summit 2018',
        class: 'small'
      },
      {
        title: 'Summit 2020' + ' ' + this.$t('cfp'),
        class: 'small'
      },
      {
        date: '7/15',
        title: this.$t('cfpClosed'),
        // description: this.$t('cfpClosedDescription'),
        class: 'small'
      },
      {
        date: '8/2',
        title: this.$t('cfpFinalized'),
        class: 'small'
      },
      {
        date: '12/3 - 6',
        title: 'Summit 2020',
        class: 'small'
      }
    ]
    return {
      bigTimeline
    }
  },
  head: friendlyHeader({
    description () {
      return summaryFromMarkdown(this.$t('article/summitMeta'))
    }
  })
}
</script>
<style lang="scss" scoped>
.homepage {
  max-width: 100vw;
  overflow-x: hidden;

  > .landing {
    background-color: #fff;
    margin-bottom: 2rem;

    img {
      min-height: 70vh;
      object-fit: cover;

      @include not-small-screen {
        height: calc(100vh - #{$nav-height});
      }
    }
  }

  .text-container {
    padding: 0;
    max-width: 760px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
  .article {
    &:before, &:after {
      content: '';
      display: block;
      position: absolute;
      z-index: -1;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .article-1 {
    &:before {
      width: 196px;
      height: 110px;
      top: 2rem;
      left: -260px;
      background-image: url('../assets/images/v2/island-1.svg');
    }
    &:after {
      width: 123px;
      height: 50px;
      bottom: 29rem;
      right: -123px;
      background-image: url('../assets/images/v2/island-2.svg');
    }
  }
  .article-2 {
    padding-bottom: 395px;
    &:before {
      width: 162px;
      height: 83px;
      top: 2rem;
      left: -195px;
      background-image: url('../assets/images/v2/island-3.svg');
    }
    &:after {
      width: 487px;
      height: 178px;
      bottom: 10rem;
      right: -244px;
      background-image: url('../assets/images/v2/island-4.svg');
    }
  }
  .timeline-container {
    padding-top: 163px;
  }

}
</style>
