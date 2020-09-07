<template>
  <div class="proposal mw8 center ph3 mv5">
    <div
      v-for="proposal in proposals"
      :key="proposal.id"
      class="br3 ba b--moon-gray mv3 pa3 flex-l items-between"
    >
      <div class="flex-auto">
        <h2 class="f4 b flex items-center">
          {{ proposal.title }}
          <span v-if="proposal.timeSheet.分類主題" class="f6 br2 bg-light-green ml2 lh-solid pv1 ph2 normal dark-green">{{ proposal.timeSheet.分類主題 }}</span>
        </h2>
        <p class="dark-gray">
          {{ proposal.summary }}
        </p>
      </div>
      <div class="pl3-l ml3-l bl-l b--moon-gray">
        <div>{{ proposal.timeSheet.議程場地 }}</div>
        <div class="gray">{{ proposal.timeSheet.議程開始時間 }}-{{ proposal.timeSheet.議程長度 }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  data () {
    return {
      proposals: Object
        .values(this.$t('proposal/map'))
        .sort((l, r) => moment(l.timeSheet.議程開始時間) - moment(r.timeSheet.議程開始時間))
    }
  },
  methods: {
    timeSheet (proposal, field) {
      if (!proposal.timeSheet) {
        console.warn('!!', console.warn(proposal))
        return ''
      } else {
        return proposal.timeSheet[field]
      }
    }
  }
}
</script>
