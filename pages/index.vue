<template>
  <div class="homepage">
    <div class="landing flex justify-center items-center bg-near-white">
      <img class="g0v-logo" :src="require('~/assets/images/g0v-logo.svg')">
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
        date: '6/30',
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
