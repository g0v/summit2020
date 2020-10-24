<template lang="pug">
  .person
    img.person__avatar(
      v-if="speakerAvatar"
      :src="speakerAvatar"
      :alt="person.display_name"
    )
    .person__avatar.person__avatar--empty(
      v-else
      :title="person.display_name"
    )
    .person__title.mv3
      .fw54
        span(v-if="isModerator") {{$t('moderator')}}{{$t('colon')}}
        | {{person.display_name}}
        span(v-if="person.city.trim()") &nbsp;/ {{person.city}}
      .f6 {{person.organization}}
    rich-multi-line.gray.mv3.fw3(
      :text="person.bio"
      :class="{tl: isSpeakerBioTl}"
    )
    .fw3.mv3(v-if="isUrl(person.info_url)" :class="{tl: isSpeakerBioTl}")
      | {{$t('moreInfo')}}
      ext-link.ml1(:to="person.info_url")
</template>
<i18n lang="yaml">
en:
  moreInfo: "More info:"
zh:
  moreInfo: 更多資訊：
</i18n>
<script>
import RichMultiLine from '~/components/RichMultiLine'
import ExtLink from '~/components/ExtLink'

const SUPER_SHORT_BIO = 20

export default {
  components: {
    RichMultiLine,
    ExtLink
  },
  props: {
    person: {
      type: Object,
      required: true
    },
    isMonoSpeaker: {
      type: Boolean,
      default: false
    },
    isModerator: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isSpeakerBioTl () {
      return this.isMonoSpeaker || this.person.bio.length > SUPER_SHORT_BIO
    },
    speakerAvatar () {
      return (this.person.avatar_url || '').trim()
    }
  },
  methods: {
    isUrl (url) {
      if (!url) {
        return false
      }
      const tokens = url.split('.')
      return tokens.length > 1 && tokens.every(token => !!token)
    }
  }
}
</script>
<style lang="scss" scoped>
.person {
  margin-top: 3rem;
  margin-bottom: 4rem;
  text-align: center;
  @include not-small-screen {
    margin-bottom: 0;
  }
  &__avatar {
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
  &__title {
    color: #303030;
  }
}
</style>
