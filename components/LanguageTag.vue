<template lang="pug">
  agenda-tag.langtag.flex.items-center(v-if="lang" :truncate="false")
    .truncate {{$t(lang)}}
    template(v-if="agenda.translation")
      .items-center.flex(:class="{'dn-ns': isMini}")
        | &nbsp;{{$t('with')}} {{agenda.translation}}
      .langtag__translation.br-pill.br--right.flex.items-center
        b-tooltip(:label="agenda.translation" type="is-dark")
          .flex.items-center
            img.w1(src="~/assets/images/translate_logo.svg")
</template>
<i18n lang="yaml">
en:
  with: w/
zh:
  with: /
</i18n>
<script>
import AgendaTag from '~/components/AgendaTag'
export default {
  components: {
    AgendaTag
  },
  props: {
    agenda: {
      type: Object,
      required: true
    },
    isMini: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lang () {
      return this.agenda.oral_language_other || this.agenda.oral_language
    }
  }
}
</script>
<style lang="scss" scoped>
.langtag {
  &__translation {
    background: rgba(0,0,0,0.25);
    position: relative;
    right: -0.5rem;
    margin-left: -0.25rem;
    height: calc(100% + 0.25rem);
    padding: 0 0.25rem;
    /deep/ .tooltip-trigger {
      height: 100%;
    }
  }
}
</style>
