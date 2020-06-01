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
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 85px;
  padding-bottom: 85px;
  min-height: calc(100% - 85px - 85px);
  @media (max-width: 1375px) {
    padding-bottom: 140px;
  }
  @media (max-width: 735px) {
    padding-top: 125px;
  }
  @media (max-width: 457px) {
    padding-bottom: 167px;
  }
}
</style>
