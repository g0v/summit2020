<template>
  <div class="agenda pa3 ma4 mw10 center">
    <div class="banner-container">
      <div class="banner">
        <img src="https://fakeimg.pl/100x150/" alt="img"></img>
        <div class="text">
          <p>
            {{ $t('title') }}
          </p>
          <p>
            {{ $t('subTitle') }}
          </p>
          <button>
            {{ $t('CFPButtonText') }}
          </button>
        </div>
      </div>
      <summit-markdown :content="$t('article/aboutSummit')" />
    </div>
    <div class="context-container">
      <summit-markdown :content="$t('article/summitIntro')" />
    </div>
    <div class="agenda-time-container">
      <p class="title">
        {{ $t('agendaTime') }}
      </p>
      <img src="https://fakeimg.pl/900x500/" alt="img"></img>
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
}
</script>
<style lang="scss" scoped>
.agenda {
  font-family: Noto Sans CJK TC;
  font-size: 2rem;
  @media (max-width: 1681px) {
    font-size: 1.5625rem;
  }
  // color: #555555;
  /deep/ h3,p {
    font-size: 2rem;
    @media (max-width: 1681px) {
      font-size: 1.5625rem;
    }
  }
  /deep/ a {
    color: #000;
    // color: #555555;
    text-decoration: none;
  }
  .banner-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5%;
    /deep/ .summitmd {
      width: 50%;
      @media (max-width: 1325px) {
        width: 100%;
      }
    }
    /deep/ h2 {
      margin: 0;
      color: #50BC83;
      font-size: 3rem;
      @media (max-width: 1681px) {
        font-size: 2.4rem;
      }
    }
  }
  .banner {
    width: 50%;
    @media (max-width: 1325px) {
      width: 100%;
    }
    flex: 0 0 auto;
    position: relative;
    img {
      position: absolute;
      z-index: -1;
    }
    .text {
      text-align: center;
      height: 100%;
      padding-top: 3%;
      p {
        margin: 0;
      }
      p:nth-child(1) {
        font-weight: bold;
        font-size: 9rem;
        @media (max-width: 1681px) {
          font-size: 7rem;
        }
        letter-spacing: 12px;
      }
      p:nth-child(2) {
        font-size: 5.625rem;
        @media (max-width: 1681px) {
          font-size: 4.5rem;
        }
      }
      button {
        margin-top: 60px;
        outline: none;
        border: 0;
        height: 90px;
        width: 290px;
        // color: #555555;
        border-radius: 50px 50px 50px 50px / 30px 30px 30px 30px;
        box-shadow: 10px 14px 0px -1px #50BC83;
        background-color: #4DEAFF;
      }
    }
  }
  .context-container {
    margin-top: 100px;
    /deep/ .summitmd {
      div {
        column-width: 20em;
      }
    }
    /deep/ h2 {
      margin: 0;
      color: #50BC83;
      font-size: 3rem;
      @media (max-width: 1681px) {
        font-size: 2.4rem;
      }
    }
    /deep/ h2:nth-of-type(2) {
      break-before: column;
      @media (max-width: 1325px) {
        break-before: auto;
      }
    }
  }
  .agenda-time-container {
    background-color: #50BC83;
    padding: 20px 40px 30px;
    text-align: center;
    margin-top: 100px;
    .title {
      font-size: 6rem;
      @media (max-width: 1681px) {
        font-size: 4.8rem;
      }
      margin: 20px;
    }
  }

}
</style>
