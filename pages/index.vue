<template>
  <div>
    <div class="landing flex justify-center items-center bg-near-white">
      <img class="g0v-logo" :src="require('~/assets/images/g0v-logo.svg')">
    </div>
    <div class="content">
      <div class="article">
        <img class="blue-circle" :src="require('~/assets/images/blue-circle.svg')">
        <summit-markdown :content="$t('article/communityIntro')" />
      </div>
      <div class="article">
        <img class="green-circle" :src="require('~/assets/images/green-circle.svg')">
        <summit-markdown :content="$t('article/summitAbout')" />
        <summit-markdown :content="$t('article/summitIntro')" />
        <summit-markdown :content="$t('article/summitContent')" />
      </div>
      <div class="article">
        <img class="blue-circle" :src="require('~/assets/images/blue-circle.svg')">
        <img class="green-circle" :src="require('~/assets/images/green-circle.svg')">
        <summit-markdown :content="$t('article/summitGuidelines')" />
      </div>
    </div>
    <div class="time-container">
      <div class="timebar">
        <div class="circle-container bottom two-point">
          <div class="circle" />
          <div class="circle-line" />
          <a href="https://summit.g0v.tw/2014/">2014 summit</a>
        </div>
        <div class="circle-container top three-point">
          <div class="circle" />
          <div class="circle-line" />
          <a href="https://summit.g0v.tw/2016/">2016 summit</a>
        </div>
        <div class="circle-container bottom four-point">
          <div class="circle" />
          <div class="circle-line" />
          <a href="https://summit.g0v.tw/2018/">2018 summit</a>
        </div>
        <div class="circle-container top five-point">
          <div class="circle" />
          <div class="circle-line" />
          <a href="https://summit.g0v.tw/2020/">2020 summit</a>
        </div>
        <div class="circle-container bottom six-point">
          <div class="circle" />
          <div class="circle-line" />
          <a href="http://">即日起至 6/4 投稿</a>
        </div>
        <div class="circle-container top seven-point">
          <div class="circle" />
          <div class="circle-line" />
          <a href="http://">即日起至 9/1</a>
        </div>
        <div class="circle-container bottom eight-point">
          <div class="circle" />
          <div class="circle-line" />
          <a href="http://">12/03 ~ 12/6</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { friendlyHeader, summaryFromMarkdown } from '~/utils/crawlerFriendly'

export default {
  head: friendlyHeader({
    description () {
      return summaryFromMarkdown(this.$t('article/summitAbout'))
    }
  })
}
</script>
<style lang="scss" scoped>
.time-container {
  background-color: #50bc83;
  padding: 20px;
  text-align: center;
  margin-top: 120px;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  .timebar{
    height: 10px;
    width: 90vw;
    background-color: #555555;
    position: relative;
    @media (max-width: 800px) {
      height: 90vh;
      width: 10px;
    }
    &:before, &:after{
      content:'';
      position: absolute;
      background-color: #555555;
      height: 10px;
      width: 10px;
      border-radius:100%;
      top:0;
    }
    &:before{
      left:-5px;
      @media (max-width: 800px) {
        left:0;
        top:-5px;
      }
    }
    &:after{
      right:-5px;
      @media (max-width: 800px) {
        top:auto;
        right:0;
        bottom:-5px;
      }
    }
    .circle-container{
      position: absolute;
      display: flex;
      align-items: center;
      .circle{
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius:100%;
      }
      .circle-line{
          height: 100px;
          width: 2px;
          background-color: #fff;
      }
      a{
        position: absolute;
        width: 200px;
        color:white;
        text-decoration: none;
        font-size: 1.5rem;
      }
    }
    .circle-container.bottom{
      flex-direction: column;
      top: -150%;
      a{
        bottom: -35px;
        left: -0;
      }
    }
    .circle-container.top{
      flex-direction: column-reverse;
      bottom: -150%;
      a{
        top: -35px;
        left: -0;
      }
    }
    .circle-container.two-point{
      left:15%;
    }
    .circle-container.three-point{
      left:25%;
    }
    .circle-container.four-point{
      left:35%;
    }
    .circle-container.five-point{
      left:45%;
    }
    .circle-container.six-point{
      left:55%;
    }
    .circle-container.seven-point{
      left:65%;
    }
    .circle-container.eight-point{
      left:75%;
    }
  }
}
.landing {
  min-height: 90vh;
  max-height: 922px;
  position: relative;
  background: url("../assets/images/banner.png") center center no-repeat;
  background-size: cover;
  .g0v-logo {
    width: 25vw;
  }
}
.content {
  margin: auto;
  max-width: 800px;
  padding: 50px 10px 0 10px;
  @media (min-width: 800px) {
    width: 100vw;
  }
  /deep/ h1 {
    color: #50bc83;
    font-size: 1.5em;
  }
  /deep/ h2 {
    font-weight: normal;
    color: #50bc83;
    font-size: 1.3em;
  }
  .article {
    margin: 150px 0;
    position: relative;
    &:first-of-type {
      margin-top: 0;
    }
  }
  .blue-circle,
  .green-circle {
    position: absolute;
    width: 15vw;
  }
  .blue-circle {
    left: -20vw;
    top: 5vh;
    transform: rotate(180deg);
  }
  .green-circle {
    right: -20vw;
    bottom: 20vh;
  }
}

@media (max-width: 800px) {
  .landing .g0v-logo{
    width: 70vw;
  }
  .time-container{
    .timebar{
    height: 90vh;
    width: 10px;
    &:before{
      left:0;
      top:-5px;
    }
    &:after{
      top:auto;
      right:0;
      bottom:-5px;
    }
    .circle-container{
      .circle-line{
        height: 2px;
        width: 100px;
      }
      .circle{
        width: 20px;
        height: 20px;
      }
      a{
        font-size: 1rem;
        }
      &.top{
        flex-direction: row;
        bottom: auto;
        left:-5px;
        a{
          left: 20px;
        }
      }
      &.bottom{
        flex-direction: row-reverse;
        bottom: auto;
        left:-105px;
        a{
          right: auto;
          left: -100px;
        }
      }
      &.two-point{
        top:13%;
      }
      &.three-point{
        top:25%;
      }
      &.four-point{
        top:36%;
      }
      &.five-point{
        top:48%;
      }
      &.six-point{
        top:62%;
      }
      &.seven-point{
        top:75%;
      }
      &.eight-point{
        top:85%;
      }
    }
  }
  }
}
</style>
