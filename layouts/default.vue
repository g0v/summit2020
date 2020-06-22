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
  padding-top: 54px;
  padding-bottom: 48px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
