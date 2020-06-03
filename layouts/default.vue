<template>
  <div class="entry-point">
    <navbar />
    <div class="pages-container">
      <nuxt />
    </div>
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
.entry-point {
  height: 100vh;
}
.pages-container {
  padding-top: 85px;
  min-height: calc(100% - 85px - 85px);
  @media (max-width: 735px) {
    padding-top: 125px;
  }
}
</style>
