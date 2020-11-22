<template lang="pug">
  b-tooltip.langtag(:label="label" type="is-dark")
    agenda-tag.flex.items-center(
      v-if="lang"
      :truncate="false"
      :class="{'agendatag--ext': hasExt}"
    )
      .truncate {{$t(lang)}}
      template(v-if="hasExt")
        .items-center.flex(:class="{'dn-ns': isMini}")
          | {{extLabel}}
        .langtag__translation.br-pill.br--right.flex.items-center
          img.w1(v-if="supportTrans" src="~/assets/images/translate_logo.svg")
          img.w1(v-if="supportTSL" src="~/assets/images/sign-language.png")
</template>
<i18n lang="yaml">
en:
  with: w/
  tsl: TSL
zh:
  with: /
  tsl: 手語
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
    },
    supportTrans () {
      return !!this.agenda.translation
    },
    supportTSL () {
      return !!this.agenda.provide_sign_language
    },
    hasExt () {
      return this.supportTSL || this.supportTrans
    },
    extLabel () {
      if (!this.hasExt) {
        return ''
      }
      const ext = []
      const t = (...args) => this.$t(...args)
      if (this.supportTrans) {
        ext.push(this.agenda.translation)
      }
      if (this.supportTSL) {
        ext.push(t('tsl'))
      }
      return `${t('with')} ${ext.join(' & ')}`
    },
    label () {
      const lang = this.$t(this.lang)
      if (!this.extLabel) {
        return lang
      }
      return `${lang} ${this.extLabel}`
    }
  }
}
</script>
<style lang="scss" scoped>
.langtag {
  .agendatag {
    padding: 0 0.5rem;
    &--ext {
      padding-right: 0;
    }
  }
  &__translation {
    background: rgba(0,0,0,0.25);
    padding: 0.125rem 0.375rem 0.125rem 0.25rem;
    margin-left: 0.25rem;

    > *:not(:first-child) {
      margin-left: 0.125rem;
    }
  }
}
</style>
