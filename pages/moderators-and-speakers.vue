<template lang="pug">
  .mas.center.pa3.pb5
    h2.mas__title {{$t('moderators')}}
    .mas__people
      .mas__person.person(
        v-for="(person, index) in moderators"
        :key="person.key"
        itemscope
        itemtype="https://schema.org/Person"
      )
        .person__avatar-wrapper.relative
          img.person__avatar(
            v-if="person.avatar_url"
            :src="person.avatar_url"
            :alt="person.display_name"
            itemprop="image"
          )
          .person__avatar.person__avatar--empty(
            v-else
            :title="person.display_name"
          )
          .person__bg(:class="[`person__bg--${index % 3}`]")
        .person__org(itemprop="affiliation") {{person.organization}}
        .person__name(itemprop="name") {{person.display_name}}
    h2.mas__title {{$t('speakers')}}
    .mas__people
      .mas__person.person(
        v-for="(person, index) in speakers"
        :key="person.key"
        itemscope
        itemtype="https://schema.org/Person"
      )
        .person__avatar-wrapper.relative
          img.person__avatar(
            v-if="person.avatar_url"
            :src="person.avatar_url"
            :alt="person.display_name"
            itemprop="image"
          )
          .person__avatar.person__avatar--empty(
            v-else
            :title="person.display_name"
          )
          .person__bg(:class="[`person__bg--${index % 3}`]")
        .person__org(itemprop="affiliation") {{person.organization}}
        .person__name(itemprop="name") {{person.display_name}}
</template>
<script>
import { friendlyHeader } from '~/utils/crawlerFriendly'
export default {
  computed: {
    speakers () {
      const allProposals = this.$t('proposal/map')
      const speakerMap = {}
      allProposals.forEach((proposal) => {
        if (!proposal.speakers) {
          return
        }
        proposal.speakers.forEach((speaker) => {
          const key = `${speaker.display_name}##${speaker.organization}`.toLowerCase().trim()
          speakerMap[key] = {
            key,
            ...speaker
          }
        })
      })
      const speakerList = Object.keys(speakerMap)
      speakerList.sort()
      return speakerList.map(key => speakerMap[key])
    },
    moderators () {
      const allProposals = this.$t('proposal/map')
      const moderatorMap = {}
      allProposals.forEach((proposal) => {
        if (!proposal.timeSheet || !proposal.timeSheet.主持人) {
          return
        }
        const moderator = proposal.timeSheet.主持人
        const key = `${moderator.display_name}##${moderator.organization}`.toLowerCase().trim()
        moderatorMap[key] = {
          key,
          ...moderator
        }
      })
      const moderatorList = Object.keys(moderatorMap)
      moderatorList.sort()
      return moderatorList.map(key => moderatorMap[key])
    }
  },
  head: friendlyHeader({
    title () {
      return this.$t('moderatorsAndSpeakers')
    },
    description () {
      return this.$t('moderatorsAndSpeakers')
    }
  })
}
</script>
<style lang="scss" scoped>
.mas {
  max-width: 82rem;
  &__title {
    font-size: 2.25rem;
    font-weight: 500;
    padding: 3rem 0;
    background-image: url('~assets/images/people-banner.png');
    background-position: bottom calc(50% - 1.5rem) right calc(50% - 7rem);
    background-repeat: no-repeat;
    text-align: center;
    // background-size
    @include not-small-screen {
      margin-top: 3rem;
      margin-bottom: 2rem;
    }
  }
  &__people {
    display: grid;
    grid-template-columns: repeat(auto-fit, 8rem);
    column-gap: 2rem;
    row-gap: 2rem;
    justify-content: center;
    @include not-small-screen {
      grid-template-columns: repeat(auto-fit, 12rem);
      column-gap: 5rem;
      row-gap: 3.5rem;
    }
  }
}
.person {
  text-align: center;
  &__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    background-position: bottom center;
    background-repeat: no-repeat;
    &--0 {
      background-image: url('~assets/images/person-bg0.png')
    }
    &--1 {
      background-image: url('~assets/images/person-bg1.png')
    }
    &--2 {
      background-image: url('~assets/images/person-bg2.png')
    }
  }
  &__avatar {
    z-index: 0;
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
  &__org {
    font-size: 0.75rem;
    color: $pink-1;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  &__name {
    font-size: 0.875rem;
    color: #303030;
  }
}
</style>
