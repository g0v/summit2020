<template>
  <div class="agenda pa3 ma4 mw10 center" :class="{'en-css': isUseENCSS}">
    <div class="banner-container">
      <div class="banner">
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
      <summit-markdown :content="$t('article/summitAbout')" />
    </div>
    <div class="context-container">
      <summit-markdown :content="$t('article/summitIntro')" />
    </div>
    <div class="agenda-time-container">
      <!-- <p class="title">
        {{ $t('agendaTime') }}
      </p> -->
      <div class="time"></div>
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
    padding-top: 5%;
    /deep/ .summitmd {
      width: 50%;
      @media (max-width: 1325px) {
        width: 100%;
        margin-top: 100px;
      }
    }
    /deep/ h2 {
      margin: 0;
      color: #50BC83;
      font-size: 3rem;
      @media (max-width: 1681px) {
        font-size: 2.4rem;
      }
      @media (max-width: 420px) {
        font-size: 1.92rem;
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
    .text {
      margin-top: 3vw;
      text-align: center;
      @media (max-width: 1325px) {
        text-align: left;
      }
      @media (max-width: 950px) {
        text-align: center;
      }
      p {
        margin: 0;
        text-align: left;
        @media (max-width: 950px) {
          text-align: center;
        }
      }
      p:nth-child(1) {
        font-weight: bold;
        font-size: 9rem;
        @media (max-width: 1681px) {
          font-size: 7rem;
        }
        @media (max-width: 690px) {
          font-size: 5.6rem;
        }
        @media (max-width: 580px) {
          font-size: 4.48rem;
        }
        @media (max-width: 480px) {
          font-size: 3.6rem;
        }
        @media (max-width: 420px) {
          font-size: 2.88rem;
        }
        letter-spacing: 12px;
      }
      p:nth-child(2) {
        font-size: 5.625rem;
        @media (max-width: 1681px) {
          font-size: 4.5rem;
        }
        @media (max-width: 690px) {
          font-size: 3.6rem;
        }
        @media (max-width: 580px) {
          font-size: 2.88rem;
        }
        @media (max-width: 480px) {
          font-size: 2.3rem;
        }
        @media (max-width: 420px) {
          font-size: 1.84rem;
        }
      }
      button {
        margin-top: 60px;
        outline: none;
        width: 290px;
        height: 90px;
        @media (max-width: 480px) {
          width: 232px;
        }
        @media (max-width: 420px) {
          height: 72px;
        }
        // color: #555555;
        border: solid #4DEAFF;
        border-radius: 50px 50px 50px 50px / 30px 30px 30px 30px;
        box-shadow: 10px 14px 0px -1px #50BC83;
        background-color: #4DEAFF;
      }
    }
  }
  .banner::before {
    content: '';
    display: block;
    position: absolute;
    top: -1.5rem;
    left: -7rem;
    z-index: -1;
    background-image: url('../assets/images/scene_14.svg');
    background-size: cover;
    background-repeat: no-repeat;
    width: 254px;
    height: 318px;
    transform: rotate(180deg);
    @media (max-width: 950px) {
      left: -3rem;
    }
    @media (max-width: 690px) {
      width: 200px;
      height: 255px;
    }
    @media (max-width: 580px) {
      width: 160px;
      height: 204px;
    }
    @media (max-width: 480px) {
      width: 128px;
      height: 163px;
    }
    @media (max-width: 420px) {
      width: 102px;
      height: 130px;
    }
  }
  .context-container {
    margin-top: 280px;
    @media (max-width: 1325px) {
      margin-top: 150px;
    }
    position: relative;
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
      @media (max-width: 420px) {
        font-size: 1.92rem;
      }
    }
    /deep/ h2:nth-of-type(2) {
      break-before: column;
      @media (max-width: 1325px) {
        break-before: auto;
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
    @media (max-width: 950px) {
      top: -6rem;
      left: -3rem;
    }
  }
  .context-container::after {
    bottom: -6rem;
    right: -7rem;
    background-image: url('../assets/images/scene_14.svg');
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
