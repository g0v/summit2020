<template>
  <div class="agenda" :class="{'en-css': isUseENCSS}">
    <div class="banner-container">
      <div class="banner">
        <div class="text">
          <h1>{{ $t('title') }}</h1>
          <p>
            {{ $t('subTitle') }}
          </p>
        </div>
        <button>
          {{ $t('CFPButtonText') }}
        </button>
      </div>
      <summit-markdown :content="$t('article/summitAbout')" />
    </div>
    <div class="context-container">
      <div class="item">
        <summit-markdown :content="$t('article/summitIntro')" />
      </div>
      <div class="item">
        <summit-markdown :content="$t('article/summitContent')" />
        <summit-markdown :content="$t('article/communityIntro')" />
      </div>
    </div>
    <div class="agenda-time-container">
      <!-- <p class="title">
        {{ $t('agendaTime') }}
      </p> -->
      <div class="time" />
    </div>
  </div>
</template>
<i18n lang="yaml">
// ref: https://nuxt-community.github.io/nuxt-i18n/vue-i18n-loader.html
en:
  title: agenda
  subTitle: Call For Paper
  CFPButtonText: Submit a paper, NOW!
  agendaTime: Agenda Time
zh:
  title: 議程招募
  subTitle: Call For Paper
  CFPButtonText: 我願意，馬上投稿
  agendaTime: 投稿時程
</i18n>
<script>
export default {
  computed: {
    isUseENCSS () {
      return this.$i18n.locale === 'en'
    }
  }
}
</script>
<style lang="scss" scoped>
.agenda {
  .banner-container {
    display: flex;
    flex-wrap: wrap;
    padding-top: 5%;
    /deep/ .summitmd {
      width: 50%;
      @media (max-width: 1325px) {
        width: 100%;
        margin-top: 100px;
      }
      div {
        width: 27em;
      }
    }
  }
  .banner {
    width: 50%;
    @media (max-width: 1325px) {
      width: 100%;
    }
    flex: 0 0 auto;
    text-align: center;
    .text {
      display: inline-block;
      margin-top: 3vw;
      text-align: center;
      font-size: 3em;
      @media (max-width: 1325px) {
        text-align: left;
        text-align: center;
      }
      @media (max-width: 950px) {
        text-align: center;
      }
      h1 {
        margin: 0;
        font-size: 2em;
      }
      p {
        margin: 0;
        font-size: 1.2em;
      }
      position: relative;
      &::before {
        position: absolute;
        bottom: 1em;
        right: 5em;
        z-index: -1;
        display: block;
      }

      &::before {
        content: '';
        background-image: url('../assets/images/scene_14.svg');
        background-size: contain;
        background-repeat: no-repeat;
        width: 230px;
        height: 280px;
        transform: rotate(180deg);
      }
    }
    position: relative;
    button {
      position: absolute;
      bottom: 0;
      right: 25%;
      width: 250px;
      height: 70px;
      font-size: 1.5em;
      font-weight: 300;
      background: #fff;
      border: 2px solid #50BC83;
      border-radius: 9999px;
      color: #555555;
    }
  }

  .context-container {
    margin-top: 280px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    @media (max-width: 1325px) {
      margin-top: 150px;
    }
    .item {
      width: 50%;
      @media (max-width: 1325px) {
        width: 100%;
      }
    }
    /deep/ .summitmd {
      div {
        a {
          color: #555555;
        }
      }
    }
  }
  .context-container::before, .context-container::after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    background-size: cover;
    background-repeat: no-repeat;
    width: 112px;
    height: 135px;
  }
  .context-container::before {
    top: -6rem;
    left: -7rem;
    background-image: url('../assets/images/scene_15.svg');
    @media (max-width: 1325px) {
      left: -3rem;
    }
    @media (max-width: 950px) {
      top: -6rem;
      left: -3rem;
    }
  }
  .context-container::after {
    bottom: -6rem;
    right: -7rem;
    background-image: url('../assets/images/scene_14.svg');
    @media (max-width: 1325px) {
      left: -3rem;
    }
    transform: rotate(180deg);
    @media (max-width: 950px) {
      right: -3rem;
    }
  }
  .agenda-time-container {
    background-color: #50BC83;
    padding: 20px;
    text-align: center;
    margin-top: 220px;
    @media (max-width: 1325px) {
      margin-top: 150px;
    }
    max-height: 800px;
    height: 600px;
    @media (max-width: 1375px) {
      height: 500px;
    }
    @media (max-width: 1156px) {
      height: 400px;
    }
    @media (max-width: 900px) {
      height: 300px;
    }
    @media (max-width: 680px) {
      height: 200px;
    }
    @media (max-width: 457px) {
      padding: 20px 0;
      height: 150px;
    }
    .title {
      font-size: 6rem;
      @media (max-width: 1681px) {
        font-size: 4.8rem;
      }
      margin: 20px;
    }
    .time {
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url('../assets/images/agenda_time.svg');
      background-position-x: center;
      width: auto;
      height: 100%;
    }
  }
}
// english css
.agenda.en-css {
  .banner {
    // color: red;
  }
}
</style>
