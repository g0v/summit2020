<template>
  <div class="entry-point">
    <div class="page-container">
      <nuxt />
    </div>
    <navbar />
    <Footer />
  </div>
</template>
<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<style lang="scss">
body, .entry-point, .page-container {
  width: 100%;
}
.page-container {
  padding-top: $nav-height;
  padding-bottom: ($footer-height + 16px);
}
</style>
