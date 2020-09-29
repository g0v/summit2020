<template>
  <div class="wrapper">
    <div ref="content" class="min-vh-100 flex flex-column">
      <navbar @toggle="toggleMenu" />
      <div class="page-container flex-auto">
        <nuxt />
      </div>
      <Footer />
    </div>
    <div ref="mobilemenu" class="dn bg-mid-gray">
      <summit-menu
        class="pa2"
        :dark="true"
        @link-click="closeMenu"
      />
    </div>
  </div>
</template>
<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import SummitMenu from '~/components/SummitMenu'

export default {
  components: {
    Navbar,
    Footer,
    SummitMenu
  },
  data () {
    return {
      slideout: null
    }
  },
  mounted () {
    const Slideout = require('slideout')
    this.slideout = new Slideout({
      panel: this.$refs.content,
      menu: this.$refs.mobilemenu,
      tolerance: 70,
      padding: 256
    })
  },
  beforeDestroy () {
    console.warn('destroy')
    if (this.slideout) {
      this.slideout.destroy()
    }
  },
  methods: {
    toggleMenu () {
      if (!this.slideout) {
        return
      }
      this.slideout.toggle()
    },
    closeMenu () {
      if (!this.slideout) {
        return
      }
      this.slideout.close()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
// copy from https://slideout.js.org/

.slideout-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 256px;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 0;
  display: none;
}

.slideout-menu-left {
  left: 0;
}

.slideout-menu-right {
  right: 0;
}

.slideout-panel {
  position: relative;
  z-index: 1;
  will-change: transform;
  background-color: #FFF; /* A background-color is required */
  // min-height: 100%;
}

.slideout-open,
.slideout-open body,
.slideout-open .slideout-panel {
  overflow: hidden;
}

.slideout-open .slideout-menu {
  display: block;
}
</style>
