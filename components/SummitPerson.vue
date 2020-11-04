<template lang="pug">
  .person.pa3.br1.relative(:class="{'person--speaker': isModerator}")
    img.person__avatar(
      v-if="speakerAvatar"
      :src="speakerAvatar"
      :alt="person.display_name"
    )
    .person__avatar.person__avatar--empty(
      v-else
      :title="person.display_name"
    )
    .person__type.pv1.ph2.f6.absolute.br1.br--right.top-0.left-0(v-if="isModerator") {{$t('moderator')}}
    .person__title.mv3
      .fw54
        | {{person.display_name}}
        span(v-if="city") &nbsp;/ {{city}}
      .f6 {{person.organization}}
    rich-multi-line.gray.mt3.fw3(
      :text="bio"
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
    bio () {
      return this.person.bio || ''
    },
    isSpeakerBioTl () {
      return this.isMonoSpeaker || this.bio.length > SUPER_SHORT_BIO
    },
    speakerAvatar () {
      return (this.person.avatar_url || '').trim()
    },
    city () {
      if (this.person && this.person.city) {
        return this.person.city.trim()
      }
      return ''
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
  &--speaker {
    background: rgba(112, 223, 240, 0.2);
  }
  &__type {
    margin-top: 1rem;
    background: rgba(112, 223, 240, 0.5);
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
