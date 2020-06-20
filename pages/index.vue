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

const bigTimeline = [
  {
    title: 'summit 2014'
  },
  {
    title: 'summit 2016'
  },
  {
    title: 'summit 2018'
  },
  {
    title: 'summit 2020 徵稿'
  },
  {
    date: '2020/6/30',
    title: '徵稿截止',
    class: 'large'
  },
  {
    date: '2020/7/30',
    title: ' 稿件修改截止',
    class: 'large'
  },
  {
    date: '2020/12/3-6',
    title: 'summit 2020',
    class: 'large'
  }
]

export default {
  data () {
    return {
      bigTimeline
    }
  },
  head: friendlyHeader({
    description () {
      return summaryFromMarkdown(this.$t('article/summitAbout'))
    }
  }),
  components: {
    Timeline
  }
}
</script>
<style lang="scss" scoped>
.homepage {
  padding-bottom: 4rem;
  > .landing {
    height: 45vh;
    max-height: 30rem;
    position: relative;
    background: url("../assets/images/banner.png") center center no-repeat;
    background-size: cover;
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
