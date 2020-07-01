<template>
  <div class="agenda" :class="{'en-css': isUseENCSS}">
    <div class="banner-container">
      <div class="banner">
        <h1>{{ $t('title') }}</h1>
        <a class="agenda-cta flex items-center justify-center" href="https://propose.summit2020.g0v.tw/" target="_blank" rel="noopener">
          {{ $t('CFPButtonText') }}
        </a>
      </div>
    </div>
    <timeline :points="cfpTimeline" />
    <div class="text-container with-bubbles">
      <div class="group">
        <summit-markdown :content="$t('article/summitAbout')" />
        <summit-markdown :content="$t('article/summitContent')" />
      </div>
      <div class="group">
        <summit-markdown :content="$t('article/summitIntro')" />
        <summit-markdown :content="$t('article/communityIntro')" />
      </div>
    </div>
  </div>
</template>
<i18n lang="yaml">
// ref: https://nuxt-community.github.io/nuxt-i18n/vue-i18n-loader.html
en:
  title: Call for Proposals
  CFPButtonText: Submit Now
zh:
  title: 議程招募
  CFPButtonText: 馬上投稿
</i18n>
<script>
import { friendlyHeader, summaryFromMarkdown } from '~/utils/crawlerFriendly'
import Timeline from '~/components/Timeline'

export default {
  components: {
    Timeline
  },
  data () {
    const cfpTimeline = [
      {
        date: '6/8',
        title: this.$t('cfp')
      },
      {
        date: '7/15',
        title: this.$t('cfpClosed'),
        description: this.$t('cfpClosedDescription')
      },
      {
        date: '8/2',
        title: this.$t('cfpFinalized')
      },
      {
        date: this.$t('eoAugust'),
        title: this.$t('programAnnouncement')
      },
      {
        date: '2020/12/3-6',
        title: 'summit 2020'
      }
    ]
    return {
      cfpTimeline
    }
  },
  computed: {
    isUseENCSS () {
      return this.$i18n.locale === 'en'
    }
  },
  head: friendlyHeader({
    title () {
      return this.$t('title')
    },
    description () {
      return summaryFromMarkdown(this.$t('article/summitIntro'))
    }
  })
}
</script>
<style lang="scss" scoped>
.agenda {
  > .banner-container {
    max-width: 800px;
    padding: 2rem 1rem;
    margin: auto;
    > .banner {
      text-align: center;
      > h1 {
        font-size: 4rem;
        line-height: 1.125;
        margin: 2rem 0;
      }
      > a.agenda-cta {
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        @media (min-width: 800px) {
          left: 36%;
          right: auto;
        }
        width: 15rem;
        height: 4rem;
        padding: 0 0.5rem;
        font-size: 1.5rem;
        font-weight: normal;
        background: white;
        border: 2px solid $green;
        border-radius: 2rem;
        color: $gray;
        transition: 0.5s;
        box-shadow: inset 0 0 0 0 $green;

        &:hover {
          color: white;
          box-shadow: 800px 0 200px -200px inset $green;
        }
      }
    }
  }
}
.agenda.en-css {
  > .text-container {
    max-width: 60rem;
  }
}
</style>
