<template>
  <client-only>
    <div class="transport">
      <OpenStreepMap
        id="location-map"
        class="transport-map"
        :markers="locations"
        @click:marker="whereIs"
      />
      <!-- <div class="transport-nav mb0 mb5-l">
        <div
          v-for="(location, index) in locations"
          :id="`location-link-${location.id}`"
          :key="index"
          class="location-link"
          :class="{ active: routeHash === location.id }"
          @click="whereIs(location.id)"
        >
          {{ location[$t('venuelocationNameShort')] }}
        </div>
      </div> -->
      <div class="locations ph2 cf center">
        <h1 class="f2">
          {{ $t('locations') }}
        </h1>
        <div v-for="location in locations" :id="`location-${location.id}`" :key="`location-${location.id}`" class="dib pa3 w-100 w-50-l pa2-l">
          <div class="location">
            <h3 class="f3" @click="whereIs('map')">
              {{ location[$t('venuelocationName')] }}
            </h3>
            <a class="location-address" :href="location['share-link']" target="_blank">
              <img :src="require('../assets/images/icon-map.png')" alt="">
              <span>{{ location[$t('venuelocationAddress')] }}</span>
              <img class="location-address-navigation" :src="require('../assets/images/icno-navigation.png')" alt="">
            </a>
            <!--
            <img class="location-photo" :src="require(`../assets/images/${location.photo}`)" alt="">
            -->
            <div class="location-event-name mt2">
              <span>{{ $t('events') }}</span>
            </div>
            <ul class="location-events">
              <li v-for="event in location.events" :key="event.id">
                <span>{{ event['日期'] | MM_DD }} {{ event[$t('venuelocationEventName')] }} - {{ event[$t('venuelocationSubEventName')] }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="rental-area">
        <div class="rentals ph2 cf center">
          <h2 class="f2">
            <span class="head-text">
              {{ $t('rental') }}
              <img :src="require('../assets/images/img-8.png')" alt="">
            </span>
          </h2>
          <div v-for="(rental, index) in rentals" :key="index" class="dib w-100 w-50-l pa2">
            <div class="rental">
              <a class="icon-name" :href="rental.link" target="_blank">
                <img :src="require(`../assets/images/${rental.icon}`)" alt="">
                <div class="name f2">
                  {{ rental.name }}<br>
                  {{ rental.cht_name }}
                </div>
              </a>
              <div v-if="rental.is_app" class="app-link">
                <a :href="rental.apple_link" target="_blank">
                  <img :src="require(`../assets/images/icon-Apple Store.png`)" alt="">
                </a>
                <a :href="rental.google_link" target="_blank">
                  <img :src="require(`../assets/images/icon-Google Play.png`)" alt="">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import moment from 'moment'
import { friendlyHeader } from '~/utils/crawlerFriendly'
import OpenStreepMap from '~/components/OpenStreepMap'
import locations from '~/assets/tables/交通地理位置.json'

// t = current time
// b = start value
// c = change in value
// d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2
  if (t < 1) { return c / 2 * t * t + b }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

function scrollTo (to, duration) {
  const element = document.querySelector('html')
  const start = element.scrollTop
  const change = to - start
  let currentTime = 0
  const increment = 20

  const animateScroll = () => {
    currentTime += increment
    const val = parseInt(Math.easeInOutQuad(currentTime, start, change, duration))
    element.scrollTop = val
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  }
  animateScroll()
}

export default {
  components: {
    OpenStreepMap
  },
  filters: {
    MM_DD (dateStr) {
      return moment(dateStr).format('MM-DD')
    }
  },
  computed: {
    routeHash () {
      return this.$route.hash.slice(1)
    },
    locations () {
      return [...locations.map(location => ({
        ...location,
        coordinates: location.coordinates.split(',').map(o => +o)
      })).reduce((m, location) => {
        const locationIdentifier = location[this.$t('venuelocationName')]
        if (m.has(locationIdentifier)) {
          const currentLocation = m.get(locationIdentifier)
          currentLocation.events.push(location)
        } else {
          m.set(locationIdentifier, {
            events: [location],
            ...location
          })
        }
        return m
      }, new Map()).values()]
    },
    rentals () {
      return [{
        name: 'iRent',
        cht_name: '自助租車',
        icon: 'img-irentlogo.png',
        is_app: true,
        apple_link: 'https://apps.apple.com/tw/app/irent%E8%87%AA%E5%8A%A9%E7%A7%9F%E8%BB%8A/id860552248',
        google_link: 'https://play.google.com/store/apps/details?id=com.cht.easyrent.irent',
        link: 'https://www.easyrent.com.tw/irent/web/'
      }, {
        name: 'GoShare',
        cht_name: '移動共享服務',
        icon: 'img-gosharelogo.png',
        is_app: true,
        apple_link: 'https://apps.apple.com/tw/app/goshare-%E7%A7%BB%E5%8B%95%E5%85%B1%E4%BA%AB%E6%9C%8D%E5%8B%99/id1441601829',
        google_link: 'https://play.google.com/store/apps/details?id=com.gogoro.goshare',
        link: 'https://www.ridegoshare.com/tw/'
      }, {
        name: 'T-Bike',
        cht_name: '臺南市公共自行車',
        icon: 'img-tbikelogo.png',
        is_app: false,
        link: 'https://tbike.tainan.gov.tw/Portal'
      }]
    }
  },
  mounted () {
    this.$router.push({ hash: null })
  },
  methods: {
    // gmapLink (location) {
    //   if (!process.client) { return }
    //   const destination = location[this.$t('venuelocationAddress')]
    //   return `https://www.google.com/maps/search/?api=1&map_action=map&query=${destination}&hl=zh-tw`
    //   if (window.innerWidth < 768) {
    //     if (navigator.platform.includes('iPhone')) {
    //       // return `https://www.google.com/maps/@?api=1&map_action=map&center=-33.712206,150.311941&zoom=12&basemap=terrain`
    //       return `comgooglemaps://?daddr=${destination}&zoom=14`
    //       // return `https://www.google.com/maps/search/?api=1&map_action=map&query=${destination}&hl=zh-tw`
    //     } else {
    //       // return `https://www.google.com/maps/search/?api=1&map_action=map&query=${destination}&hl=zh-tw`
    //       return `geo:${location.coordinates}`
    //     }
    //   } else {
    //     return `https://www.google.com/maps/search/?api=1&map_action=map&query=${destination}&hl=zh-tw`
    //     // return location['share-link']
    //   }
    // },
    whereIs (locationId) {
      this.$router.push({ hash: locationId })
      const header = document.querySelector(`#location-${locationId}`)
      scrollTo(header.offsetTop - 54, 250) // 54 = Navbar height
    }
  },
  head: friendlyHeader({
    title () {
      return this.$t('transport')
    },
    coverUrl: '/og-transport.jpg'
  })
}
</script>

<style lang="scss" scoped>
.transport {
  width: 100%;
  &-map {
    max-height: 80vh;
    height: 40rem;
    width: 100%;
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
  &-nav {
    position: sticky;
    top: $nav-height;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: auto;
    background-color: $blue;
    color: $gray;
    line-height: 1.25;
    z-index: 1100;
    @media screen and (min-width: 800px) {
      overflow: visible;
    }
    .location-link {
      position: relative;
      flex: 0 0 auto;
      flex-basis: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 0.25rem;
      text-align: center;
      cursor: pointer;
      @media screen and (min-width: 640px) {
        flex-basis: (100% / 7);
      }
      &:active, &:focus {
        outline: none;
      }
      // underline
      &::before {
        content: '';
        display: block;
        height: 0.25rem;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #555;
        transition: width .3s ease-in-out;
      }
      &::before {
        width: 0;
      }
      &.active::before {
        width: 100%;
      }
    }
  }
}

.locations {
  max-width: 960px;
  h1 {
    text-align: center;
    color: #0EAFC9;
    margin-top: 96px;
    margin-bottom: 135px;
    position: relative;
    line-height: 1;
    &::before {
      content: "";
      display: block;
      background-image: url("../assets/images/img-6.svg");
      background-repeat: no-repeat;
      position: absolute;
      max-width: 403px + 59px;
      height: 78px;
      margin: auto;
      top: .5em;
      left: 0;
      right: 0;
    }
  }
}

.location {
  margin-top: 20px;
  margin-bottom: 90px - 20px;
  &-address {
    color: #555555;
    display: inline-block;
    line-height: 3;
    cursor: pointer;
    img, span {
      vertical-align: middle;
    }
    position: relative;
    &-navigation {
      position: absolute;
      left: 100%;
      top: 0;
      bottom: 0;
      margin: auto;
      transform: translate(15.4px);
    }
  }
  &-event-name {
    font-size: 1.1em;
    color: #0EAFC9;
  }
  &-events {
    color: #555555;
    margin-top: 0px;
    margin-bottom: 0px;
    letter-spacing: 0.8px;
    li {
      position: relative;
      list-style: none;
    }
    li::before {
      content: '';
      display: block;
      position: absolute;
      right: 101%;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 20px;
      height: 20px;
      background-image: url('../assets/images/icon-event-item.png');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}

.rental-area {
  margin-top: 265px;
  background-color: #f7f7f7;

  position: relative;
  &::after, &::before {
    content: "";
    display: block;
    position: absolute;
    background-repeat: no-repeat;
    background-position: 75% top, center 80px;
    background-size: auto, cover;
  }
  &::before {
    content: "";
    $spacer: 232px;
    top: $spacer * -1;
    right: 0;
    left: 0;
    width: 100%;
    height: $spacer;
    background-image: url("../assets/images/img-7.png"), url("../assets/images/bk.png");
  }
  h2 {
    text-align: center;
    position: relative;
    margin-bottom: 102px;
    .head-text {
      display: inline-block;
      img {
        position: absolute;
        top: 1em;
        right: 50%;
        width: 321px;
        height: 70px;
      }
    }
  }
}

.rentals {
  max-width: 960px;
  padding-bottom: 148px;
  .rental {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: #fff;
    border-radius: 4px;
    padding: 28px;
    @media screen and (min-width: 30em) {
      padding: 28px 71px;
    }
    height: 250px;
    .icon-name {
      display: inline-block;
      img, .name {
        vertical-align: middle;
        margin-left: 12px;
      }
      .name {
        display: inline-block;
        font-size: 24px;
        color: #F779EE;
      }
    }
    .app-link {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      a {
        display: inline-block;
        flex: 1 1 100%;
        text-align: center;
        @media screen and (min-width: 30em) {
          flex: 1 1 133px;
        }
      }
    }
  }
}

@keyframes bounce {
  from, 20%, 53%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -20px, 0) scaleY(1.1);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -10px, 0) scaleY(1.05);
  }
  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }
  90% {
    transform: translate3d(0, -3px, 0) scaleY(1.02);
  }
}
</style>
