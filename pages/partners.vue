<template lang="pug">
  .partners.mw8.pa3.center.mb4.mb5-ns
    .cat
      .flex.justify-center.overflow-hidden
        h2.cat__title {{headPartnerClass.name}}
      .cat__list(:class="{'cat__list--mono': headPartnerClass.partners.length === 1}")
        summit-partner(
          v-for="partner in headPartnerClass.partners"
          :key="partner.id"
          :cover="partner.logo[0].large_url"
          :name="partner.名稱"
          :link="partner.url"
          :desp="partner.說明"
        )
    .cat
      .flex.justify-center.overflow-hidden
        h2.cat__title {{$t('cohost')}}
      .cat__list
        summit-partner(
          v-for="partner in cohosts"
          :key="partner.id"
          :is-cover="!!partner.is_cover"
          :is-taller="true"
          :cover="partner.照片們[0].large_url"
          :name="partner.共同主辦名稱"
          :desp="partner.說明"
        )
    .cat(v-for="cat in tailPartnerClass")
      .flex.justify-center.overflow-hidden
        h2.cat__title {{cat.name}}
      .cat__list(:class="{'cat__list--mono': cat.partners.length === 1}")
        summit-partner(
          v-for="partner in cat.partners"
          :key="partner.id"
          :cover="partner.logo[0].large_url"
          :name="partner.名稱"
          :link="partner.url"
          :desp="partner.說明"
        )
</template>
<i18n lang="yaml">
en:
  cohost: Co-hosts
zh:
  cohost: 共同主辦
</i18n>
<script>
import { friendlyHeader } from '~/utils/crawlerFriendly'
import SummitPartner from '~/components/SummitPartner'

export default {
  components: {
    SummitPartner
  },
  data () {
    return {
      partners: this.$t('table/partners'),
      cohosts: this.$t('table/co-hosts')
    }
  },
  computed: {
    partnerPerClass () {
      return this.partners.reduce((sum, partner) => {
        let lastClass = sum[sum.length - 1]
        if (!lastClass || lastClass.name !== partner.合作角色) {
          lastClass = {
            name: partner.合作角色,
            partners: []
          }
          sum.push(lastClass)
        }
        lastClass.partners.push(partner)
        return sum
      }, [])
    },
    headPartnerClass () {
      return this.partnerPerClass[0]
    },
    tailPartnerClass () {
      return this.partnerPerClass.slice(1)
    }
  },
  head: friendlyHeader({
    title () {
      return this.$t('partners')
    }
  })
}
</script>
<style lang="scss" scoped>
.cat {
  &__title {
    margin: 2rem auto;
    font-size: 2.25rem;
    font-weight: 500;
    position: relative;
    @include not-small-screen {
      margin: 4rem auto;
    }
    &:after {
      content: " ";
      width: 168px;
      height: 73px;
      background-image: url("../assets/images/partners-banner.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      position: absolute;
      left: calc(100% - 20px);
      top: 24px;
    }
  }

  &__list {
    .partner {
      margin-bottom: 2rem;
    }

    @include not-small-screen {
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: 1fr 1fr;
      justify-content: center;

      &--mono {
        grid-template-columns: calc(50% - 1rem);
      }

      .partner {
        margin: 0;
      }
    }
  }

  &:not(:first-child) {
    .cat__title {
      @include not-small-screen {
        margin-top: 12rem;
      }
    }
  }
}

</style>
