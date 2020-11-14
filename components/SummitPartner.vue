<template lang="pug">
  .partner(
    :class="{'partner--cover': isCover}"
  )
    img.partner__banner(
      :src="cover"
      :alt="name"
    )
    .partner__content
      h3.partner__title.f4.fw5.mv2 {{name}}
      ext-link.db.partner__link.f7.fw3(v-if="link" :to="link") {{link}}
      p.f6.partner__desp(v-if="desp") {{desp}}
</template>
<script>
import ExtLink from '~/components/ExtLink'

export default {
  components: {
    ExtLink
  },
  props: {
    cover: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: ''
    },
    desp: {
      default: '',
      validator (val) {
        return typeof val === 'string' || !val
      }
    },
    isCover: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.partner {
  border-radius: 2px;
  border: 0.125rem #c2c0c0 solid;
  padding: 1rem 1.5rem 2rem;
  @include not-small-screen {
    margin-bottom: 2rem;
  }
  &__banner {
    height: 9.25rem;
    width: 100%;
    object-fit: contain;
    object-position: center;
    display: block;
  }
  &__attr {
    color: #303030;
  }
  &__link {
    color: $blue-1;
    text-decoration: none;
    margin: 0.75rem 0;
  }
  &__desp {
    color: $gray;
  }

  &--cover {
    padding: 0;
    .partner {
      &__banner {
        height: 10.25rem;
        object-fit: cover;
      }
      &__content {
        padding: 0 1.5rem 2rem;
      }
    }
  }
}
</style>
