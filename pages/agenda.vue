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
      <img class="time" :src="require('~/assets/images/agenda_time.svg')">
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
  overflow: hidden;
  .banner-container {
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    max-width: 800px;
    padding: 50px 10px 0 10px;
    @media (min-width: 800px) {
      max-width: 970px;
    }
    margin: auto;
    /deep/ .summitmd {
      width: 100%;
      @media (min-width: 800px) {
        width: 50%;
      }
      div {
        width: 100%;
        padding: 0 10px;
        max-width: 100%;
        @media (min-width: 800px) {
          max-width: 27em;
        }
      }
    }
  }
  .banner {
    height: 368px;
    width: 100%;
    @media (min-width: 800px) {
      width: 50%;
    }
    flex: 0 0 auto;
    text-align: center;
    .text {
      display: inline-block;
      margin-top: 70px;
      text-align: center;
      font-size: 2em;
      @media (min-width: 800px) {
        font-size: 3em;
      }
      h1 {
        margin: 0;
        font-size: 2em;
      }
      p {
        margin: 0;
        font-size: 1.2em;
      }
      h1,p {
        color: #000;
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
        width: 200px;
        @media (min-width: 800px) {
          width: 230px;
        }
        height: 280px;
        transform: rotate(180deg);
      }
    }
    position: relative;
    button {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      @media (min-width: 800px) {
        left: 36%;
        right: auto;
      }
      width: 250px;
      height: 70px;
      padding: 0 5px;
      font-size: 1.5em;
      font-weight: 300;
      background: #fff;
      border: 2px solid #50BC83;
      border-radius: 9999px;
      color: #555555;
    }
    button:hover {
      background: #50BC83;
      color: #fff;
    }
  }

  .context-container {
    max-width: 800px;
    margin-top: 150px;
    padding: 50px 10px 0 10px;
    @media (min-width: 800px) {
      max-width: 970px;
      margin-top: 220px;
    }
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .item {
      width: 100%;
      padding: 0 10px;
      @media (min-width: 800px) {
        width: 50%;
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
  }
  .context-container::after {
    bottom: -6rem;
    right: -7rem;
    background-image: url('../assets/images/scene_14.svg');
    transform: rotate(180deg);
  }
  .agenda-time-container {
    background-color: #50BC83;
    padding: 20px;
    text-align: center;
    margin-top: 120px;
    .title {
      font-size: 1rem;
      margin: 20px;
    }
    .time {
      display: block;
      width: 100%;
      height: auto;
      max-height: 400px;
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
