<template>
  <div class="entry-point">
    <navbar />
    <div class="pages-container">
      <nuxt />
      <Footer />
    </div>
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
body {
  overflow: hidden;
}
.entry-point {
  height: 100vh;
}
.pages-container {
  overflow: scroll;
  height: calc(100% - 62px);
  @media (min-width: 951px) {
    height: calc(100% - 78px);
  }
}
</style>
