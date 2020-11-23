<template lang="pug">
  .mas.center.pa3.pb5
    h2.mas__title {{$t('moderators')}}
    .mas__people
      simple-person(
        v-for="(person, index) in moderators"
        :key="person.key"
        :name="person.display_name"
        :title="person.organization"
        :avatar="person.avatar_url"
        :link="person.agendaUrl"
      )
    h2.mas__title {{$t('speakers')}}
    .mas__people
      simple-person(
        v-for="(person, index) in speakers"
        :key="person.key"
        :name="person.display_name"
        :title="person.organization"
        :avatar="person.avatar_url"
        :link="person.agendaUrl"
        :to="localePath(person.agendaUrl)"
        itemscope
        itemtype="https://schema.org/Person"
      )
</template>
<script>
import { friendlyHeader } from '~/utils/crawlerFriendly'
import SimplePerson from '~/components/SimplePerson'
export default {
  components: {
    SimplePerson
  },
  computed: {
    speakers () {
      const allProposals = this.$t('proposal/map')
      const speakerMap = {}
      allProposals.forEach((proposal) => {
        if (!proposal.speakers) {
          return
        }
        proposal.speakers.forEach((speaker) => {
          // let's do a little randomize
          const key = `${speaker.avatar_url}##${speaker.display_name}`
          speakerMap[key] = {
            ...speaker,
            key,
            agendaUrl: `/agenda/${proposal.timeSheet.議程日期}/${proposal.id}`
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
        // let's do a little randomize
        const key = `${moderator.avatar_url}##${moderator.display_name}`
        moderatorMap[key] = {
          ...moderator,
          key,
          agendaUrl: `/agenda/${proposal.timeSheet.議程日期}`
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
    },
    coverUrl: '/og-moderators-n-speakers.png'
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
</style>
