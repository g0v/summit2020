<template lang="pug">
  component.simpleperson(
    :is="isLink ? 'nuxt-link' : 'div'"
    :to="localePath(link)"
    itemscope
    itemtype="https://schema.org/Person"
    :class="{dim: link}"
  )
    .simpleperson__avatar-wrapper.relative
      img.simpleperson__avatar(
        v-if="avatar"
        :src="avatar"
        :alt="name"
        itemprop="image"
      )
      .simpleperson__avatar.simpleperson__avatar--empty(
        v-else
        :title="name"
      )
      .simpleperson__bg(:class="[`simpleperson__bg--${styleIndexWrap}`]")
    .simpleperson__org(itemprop="affiliation") {{title}}
    .simpleperson__name(itemprop="name") {{name}}
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    styleIndex: {
      type: Number,
      default: -1
    },
    link: {
      type: String,
      default: ''
    }
  },
  computed: {
    isLink () {
      return this.link && this.link.trim()
    },
    styleIndexWrap () {
      if (!this.styleIndex < 0) {
        return ''
      }
      return this.styleIndex % 3
    }
  }
}
</script>
<style lang="scss" scoped>
.simpleperson {
  text-align: center;
  &__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    background-position: bottom center;
    background-repeat: no-repeat;
    &--0 {
      background-image: url('~assets/images/person-bg0.png')
    }
    &--1 {
      background-image: url('~assets/images/person-bg1.png')
    }
    &--2 {
      background-image: url('~assets/images/person-bg2.png')
    }
  }
  &__avatar {
    z-index: 0;
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
  &__org {
    font-size: 0.75rem;
    color: $pink-1;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  &__name {
    font-size: 0.875rem;
    color: #303030;
  }
}
</style>
