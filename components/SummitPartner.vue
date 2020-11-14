<template lang="pug">
  .partner(
    :class="{'partner--cover': isCover}"
  )
    img.partner__banner(
      :src="cover"
      :alt="name"
      :class="{'partner__banner--taller': isTaller}"
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
    },
    isTaller: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
$banner-height: 8.25rem;
$cover-banner-gap: 1rem;
$taller-height: 4rem;

.partner {
  border-radius: 2px;
  border: 0.125rem #c2c0c0 solid;
  padding: 1rem 1.5rem 2rem;
  @include not-small-screen {
    margin-bottom: 2rem;
  }
  &__banner {
    height: $banner-height;
    width: 100%;
    object-fit: contain;
    object-position: center;
    display: block;

    &--taller {
      height: $banner-height + $taller-height;
    }
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
        height: $banner-height + $cover-banner-gap;
        object-fit: cover;

        &--taller {
          height: $banner-height + $cover-banner-gap + $taller-height;
        }
      }
      &__content {
        padding: 0 1.5rem 2rem;
      }
    }
  }
}
</style>
