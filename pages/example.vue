<template>
  <div class="example pa3 ma4 mw7 center">
    <h2>{{ $t('articleHeader') }}</h2>
    <summit-markdown :content="$t('article/example')" />
    <h2 class="mt5 pv3 bt">
      {{ $t('tableHeader') }}
    </h2>
    <ul>
      <li v-for="event in location" :key="event.id" class="mv3">
        <div class="silver f6">
          {{ event.日期 }}
        </div>
        <div class="b">
          {{ event.活動名稱 }}
          <span v-if="event.子活動名稱"> - {{ event.子活動名稱 }}</span>
        </div>
        <div class="dark-green f6">
          {{ event.地點名稱 }}-{{ event.地址 }}
        </div>
      </li>
    </ul>
  </div>
</template>
<i18n lang="yaml">
// ref: https://nuxt-community.github.io/nuxt-i18n/vue-i18n-loader.html
en:
  articleHeader: Example Hackmd Article
  tableHeader: Example Airtable Table
zh:
  articleHeader: Hackmd 範例文章
  tableHeader: Airtable 範例表格
</i18n>
<script>
export default {
  data () {
    return {
      location: this.$t('table/location')
    }
  }
}
</script>
