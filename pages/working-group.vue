<template lang="pug">
  .wg.center.pa3.pb5(:class="{'wg--en': isEn}")
    template(v-for="group in peroplePerGroup")
      h2.wg__title {{$t(group.name)}}
      .wg__people
        simple-person(
          v-for="(person, index) in group.people"
          :key="person.id"
          :name="person.顯示名稱"
          :title="person.職稱 || '組員'"
          :avatar="avatar(person)"
          :style-index="index"
        )
</template>
<i18n lang="yaml">
en:
  總籌組: General Preparatory Task Force
  財務組: Finance Task Force
  議程組: Programming Task Force
  議程委員: Programming Committee
  宣傳組: Marketing Task Force
  設計組: Design Task Force
  票務組: Ticketing Task Force
  場務組: Logistics Task Force
  直播組: Live-streaming Task Force
  紀錄組: Photography Task Force
  口譯組: Interpretation Task Force
  設備組: Infrastructure Task Force
zh:
  總籌組: 總籌組
  財務組: 財務組
  議程組: 議程組
  議程委員: 議程委員
  宣傳組: 宣傳組
  設計組: 設計組
  票務組: 票務組
  場務組: 場務組
  直播組: 直播組
  紀錄組: 紀錄組
  口譯組: 口譯組
  設備組: 設備組
</i18n>
<script>
import SimplePerson from '~/components/SimplePerson'
import { friendlyHeader } from '~/utils/crawlerFriendly'

const GROUP_LIST = [
  '總籌組',
  '財務組',
  '議程組',
  '議程委員',
  '宣傳組',
  '票務組',
  '直播組',
  '紀錄組',
  '口譯組',
  '場務組',
  '設備組'
]

const GRAVATAR_BASE = 'https://www.gravatar.com/avatar/'

export default {
  components: {
    SimplePerson
  },
  computed: {
    peroplePerGroup () {
      const wg = this.$t('table/wg').reduce((perGroup, row) => {
        const groupName = row.組別
        if (!perGroup[groupName]) {
          perGroup[groupName] = []
        }
        perGroup[groupName].push(row)
        return perGroup
      }, {})
      return GROUP_LIST.reduce((list, groupName) => {
        if (wg[groupName] && wg[groupName].length) {
          list.push({
            name: groupName,
            people: this.sortPeople(wg[groupName])
          })
        }
        return list
      }, [])
    },
    isEn () {
      return this.$i18n.locale === 'en'
    }
  },
  methods: {
    comparePeople (peopleA, peopleB) {
      const keyA = peopleA.id
      const keyB = peopleB.id
      return keyA.localeCompare(keyB)
    },
    sortPeople (people) {
      const headList = []
      const tailList = []
      people.forEach((person) => {
        if (person.是頭頭) {
          headList.push(person)
        } else {
          tailList.push(person)
        }
      })
      headList.sort(this.comparePeople)
      tailList.sort(this.comparePeople)
      return [...headList, ...tailList]
    },
    avatar (person) {
      if (person.大頭照) {
        return person.大頭照
      } else if (person['Gravatar 信箱']) {
        return `${GRAVATAR_BASE}${person['Gravatar 信箱']}?s=256&d=retro`
      }
    }
  },
  head: friendlyHeader({
    title () {
      return this.$t('wg')
    },
    description () {
      return this.$t('wg')
    },
    coverUrl: '/og-moderators-n-speakers.png'
  })
}
</script>
<style lang="scss" scoped>
.wg {
  max-width: 82rem;
  &__title {
    font-size: 2.25rem;
    font-weight: 500;
    padding: 3rem 0;
    background-image: url('~assets/images/wg-banner.png');
    background-position: bottom calc(50% - 1.5rem) right calc(50% - 9rem);
    background-repeat: no-repeat;
    text-align: center;
    @include not-small-screen {
      margin-top: 3rem;
      margin-bottom: 2rem;
    }
  }
  &--en {
    .wg__title {
      background-position: bottom calc(50% - 1.5rem) right calc(50% - 21rem);
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
