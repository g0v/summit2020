<template lang="pug">
  .atooltip.flex.items-center
    .atooltip__search.br-pill.pv2.ph3.ba.bw1.flex-auto.flex.items-center
      input.flex-auto.bn.lh-solid(
        v-model.trim="curQuery"
        :placeholder="$t('search')"
      )
      button.bn.bg-transparent.flex.items-center(@click="resetQuery")
        img(v-if="!curQuery" src="~/assets/icons/search.svg")
        img(v-else src="~/assets/icons/close.svg")
    .atooltip__filter.filter.ml4
      b-dropdown(
        aria-role="list"
        multiple v-model="filterOptions"
      )
        button.bn.bg-transparent.flex.items-center.pv2(slot="trigger")
          img.mr2(src="~/assets/icons/filter.svg")
          span.dn.di-l.pl1 {{$t('filter')}}
            span.ml2(v-show="totalFilterCount") ({{totalFilterCount}})
        b-dropdown-item.filter__reset(
          :custom="true"
          @click.native="resetFilter"
        )
          .flex.items-center.justify-end(
            :class="resetItemClass"
          )
            img.mr2(src="~/assets/icons/close.svg")
            span {{$t('clearFilter')}}
        template(v-for="type in filterTypes")
          b-dropdown-item.filter__header(
            :custom="true"
            @click.native="toggleTypeFilter(type)"
          )
            .flex.justify-between
              div
                | {{$t(type)}}
                span.ml2(v-show="filterTypesCount[type]") ({{filterTypesCount[type]}})
              div
                img(v-show="!isTypesOpened[type]" src="~/assets/icons/arrow-down.svg")
                img(v-show="isTypesOpened[type]" src="~/assets/icons/arrow-right.svg")
          b-dropdown-item.filter__item.ttc(
            aira-role="list-item"
            v-for="item in filterTypesList[type]"
            :key="`${type}:${item}`"
            :value="`${type}:${item}`"
            v-show="isTypesOpened[type]"
          )
            .dim.flex.items-center
              .filter__check
                img.dn(src="~/assets/icons/check.svg")
              .filter__content {{item}}
</template>
<i18n lang="yaml">
en:
  search: Search agenda
  filter: Filter agenda
  format: Format
  location: Location
  island: Topic
  clearFilter: Reset filter
zh:
  search: 搜尋議程
  filter: 篩選議程
  format: 形式
  location: 場地
  island: 主題
  clearFilter: 清除條件
</i18n>
<script>
import _ from 'lodash'
import { mapMutations, mapState } from 'vuex'
import { MUTATIONS, STATES } from '~/store'

function uniqBy (agendas, field) {
  const valueMap = {}
  agendas.forEach((agenda) => {
    const value = _.get(agenda, field, '')
    if (value) {
      valueMap[value] = true
    }
  })
  return Object.keys(valueMap)
}

export default {
  data () {
    const filterOptions = []
    const filter = this.$store.state[STATES.AGENDA_FILTER]
    Object.keys(filter).forEach((type) => {
      filter[type].forEach((filterValue) => {
        filterOptions.push(`${type}:${filterValue}`)
      })
    })
    return {
      curQuery: this.$store.state[STATES.AGENDA_QUERY],
      filterTypes: ['format', 'location', 'island'],
      filterOptions,
      isTypesOpened: {
        format: true,
        location: false,
        island: false
      }
    }
  },
  computed: {
    ...mapState({
      storeQuery: STATES.AGENDA_QUERY,
      storeFilter: STATES.AGENDA_FILTER
    }),
    agendas () {
      return this.$t('proposal/map')
    },
    filterTypesList () {
      return {
        format: uniqBy(this.agendas, 'format'),
        location: uniqBy(this.agendas, 'timeSheet.議程場地'),
        island: uniqBy(this.agendas, 'topic')
      }
    },
    filterTypesCount () {
      const counts = {}
      this.filterOptions.forEach((value) => {
        const type = value.split(':')[0]
        if (!counts[type]) {
          counts[type] = 0
        }
        counts[type] += 1
      })
      return counts
    },
    totalFilterCount () {
      return Object.values(this.filterTypesCount)
        .reduce((sum, count) => sum + count, 0)
    },
    resetItemClass () {
      if (this.filterOptions.length) {
        return ['o-100', 'pointer', 'dim']
      }
      return ['o-50']
    }
  },
  watch: {
    curQuery (newVal) {
      this.setQuery(newVal)
    },
    filterOptions (newVal) {
      const newFilter = newVal.reduce((filter, value) => {
        const tokens = value.split(':')
        const type = tokens[0]
        const typeValue = tokens.slice(1).join(':')
        if (!filter[type]) {
          filter[type] = []
        }
        filter[type].push(typeValue)
        return filter
      }, {})
      this.setFilter(newFilter)
    },
    storeQuery () {
      this.resetSearchIfEmpty()
    },
    storeFilter () {
      this.resetSearchIfEmpty()
    }
  },
  methods: {
    ...mapMutations({
      setQuery: MUTATIONS.SET_AGENDA_QUERY,
      setFilter: MUTATIONS.SET_AGENDA_FILTER
    }),
    resetQuery () {
      this.curQuery = ''
    },
    resetFilter () {
      this.filterOptions = []
    },
    toggleTypeFilter (type) {
      this.isTypesOpened[type] = !this.isTypesOpened[type]
    },
    resetSearchIfEmpty () {
      const isStoreEmpty = !this.storeQuery && !Object.keys(this.storeFilter).length
      const isMeEmpty = !this.curQuery && !this.filterOptions.length
      if (isStoreEmpty && !isMeEmpty) {
        this.curQuery = ''
        this.filterOptions = []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.atooltip {
  width: 100%;
  max-width: $tooltip-width;
  &__search {
    border-color: $gray-2;
    input {
      color: #6e6e6e;
    }
    img {
      width: 1.125rem;
    }
  }
}

.filter {
  button {
    color: $blue-1;
  }

  &__header {
    color: $blue-1;
    padding: 0.5rem 0.75rem !important;
    cursor: pointer;
  }

  &__reset {
    color: #555;
    padding: 0.5rem 0.75rem !important;
    img {
      width: 0.75rem;
    }
  }

  &__item {
    padding: 0 !important;
    &:hover {
      background: none;
    }
    > div {
      color: #c2c0c0;
      padding: 0.5rem 0.75rem;
    }
    &.is-active {
      background: none;
      > div {
        color: #6e6e6e;
      }
      .filter__check {
        img {
          display: block;
        }
      }
    }
  }

  &__check {
    width: 1.25rem;
  }
  &__content {
    width: calc(100% - 1.25rem);
  }

  /deep/ {
    .dropdown-menu {
      width: 16rem;
      max-width: calc(100vw - 6rem);
      @include not-small-screen {
        max-height: calc(100vh - 20rem);
        overflow-y: auto;
      }
    }
    .dropdown-content {
      padding: 0;
      box-shadow: none;
      border: 2px solid $gray-2;
      border-bottom: none;
      border-radius: 0;
    }
    .dropdown-item {
      line-height: 1.5rem;
      white-space: inherit;
      border-bottom: 2px solid $gray-2;
    }
  }
}
</style>
