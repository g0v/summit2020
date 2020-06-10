<template>
  <client-only>
    <div class="transport-page">
      <OpenStreepMap
        class="transport-page-map"
        :markers="locations"
      />
      <div class="transport-page-nav">
        <div
          v-for="(location, index) in locations"
          :key="index"
          class="location-link"
          :class="{ active: routeHash === location[$t('venuelocationName')]}"
          @click="whereIs(location[$t('venuelocationName')])"
        >
          <span>{{ location[$t('venuelocationName')] }}</span>
        </div>
      </div>
      <!-- {{ coords }} -->
      <div class="venue-location">
        <div v-for="(location, index) in locations" :id="location[$t('venuelocationName')]" :key="index" class="venue-location-detail">
          <OpenStreepMap
            class="locatipn-photo"
            :markers="[locations[index]]"
          />
          <div class="venue-location-detail-data">
            <h1>
              {{ location[$t('venuelocationName')] }}
            </h1>
            <p>
              <span class="venue-location-detail-data-address">
                {{ location[$t('venuelocationAddress')] }}
                <div class="map-link" target="_blank" @click="gmapLink(location)">
                  <img :src="require('~/assets/images/map-marker.png')" alt="">
                </div>
              </span>
            </p>
            <div class="event-title">
              {{ $t('events') }}
            </div>
            <ul class="venue-location-detail-data-events">
              <li v-for="event in location.events" :key="event.id">
                <span>{{ event['日期'] }} {{ event[$t('venuelocationEventName')] }}  {{ event[$t('venuelocationSubEventName')] }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { friendlyHeader } from '~/utils/crawlerFriendly'
import OpenStreepMap from '~/components/OpenStreepMap'
import locations from '~/assets/tables/交通地理位置.json'

export default {
  components: {
    OpenStreepMap
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
        if (m.has(location[this.$t('venuelocationName')])) {
          const currentLocation = m.get(location[this.$t('venuelocationName')])
          currentLocation.events.push(location)
        } else {
          m.set(location[this.$t('venuelocationName')], {
            events: [location],
            ...location
          })
        }
        return m
      }, new Map()).values()]
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelectorAll('.location-link').forEach((link) => {
        link.addEventListener('click', function (e) {
          e.preventDefault()
          const header = document.querySelector(`#${link.textContent}`)
          scrollTo(header.offsetTop, 550)
        })
      })

      function scrollTo (to, duration) {
        const element = document.querySelector('.pages-container')
        const start = element.scrollTop
        const change = to - start
        let currentTime = 0
        const increment = 20

        const animateScroll = () => {
          currentTime += increment
          const val = parseInt(Math.easeInOutQuad(currentTime, start, change, duration))
          // eslint-disable-next-line no-console
          console.log(val.toFixed(4))
          element.scrollTop = val
          if (currentTime < duration) {
            setTimeout(animateScroll, increment)
            document.documentElement.scrollTop = 0
          }
        }
        animateScroll()
      }

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
    })
  },
  methods: {
    gmapLink (location) {
      if (!process.client) { return }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const origin = [coords.latitude, coords.longitude].join()
          const destination = location[this.$t('venuelocationName')]
          if (origin) {
            window.location.href = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&hl=zh-tw`
          } else {
            window.location.href = location['share-link']
          }
        })
      }
    },
    whereIs (locationName) {
      this.locations.filter(location => location[this.$t('venuelocationName')] === locationName)
      this.$router.push({ hash: locationName })
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
$background-color: #E5F3F4;
$main_green: #50bc83;
$little_color: #4DEAFF;

h1, h2, h3, h4, h5, h6 {
  color: $main_green;
}

.transport-page {
  width: 100%;
  background-color: $background-color * 10%;
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
    top: 0;
    z-index: 1100;
    width: 100%;
    background-color: $little_color;
    color: #555;
    display: flex;
    // justify-content: space-around;
    flex-wrap: nowrap;
    // flex-direction: column;
    overflow: auto;
    flex-direction: row;
    @media screen and (min-width: 800px) {
      overflow: visible;
      flex-wrap: wrap;
      flex-direction: row;
    }

    .location-link {
      flex: 0 0 auto;
      text-align: center;
      flex-basis: 32%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media screen and (min-width: 800px) {
        flex-basis: (100% / 7);
      }
      span {
        display: inline-block;
        padding: .7em;

        cursor: pointer;

        transition: color .3s ease-out;
        color: #555;
        &:hover {
          color: #fff;
        }
        &:focus {
          outline: none;
        }
      }

      &::before {
        content: '';
        display: block;
        height: 0.15em;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #555;
      }

      &::before {
        content: '';
        width: 0;
      }
      &.active {
        // 做底線
        position: relative;
        &::before {
          content: '';
          width: 100%;
          transition: width .3s ease-in-out;
        }
      }
    }
  }
}

.venue-location {
  &-detail {
    color: #555555;
    max-width: 970px;
    margin: auto;

    $photo-desktop-width: 300px;
    .locatipn-photo {
      margin-right: 10px;
      float: none;
      width: 100%;
      height: 200px;
      @media screen and (min-width: 800px) {
        float: left;
        width: 300px;
        height: $photo-desktop-width;
      }
    }
    &::after {
      content: '';
      display: block;
      clear: left;
    }

    // 分隔線的 egg
    padding-top: 180px;
    padding-bottom: 100px;

    position: relative;
    & + &::before {
      content: '';
      display: block;
      position: absolute;
      bottom: 85%;
      left: 0;
      right: 0;
      background-image: url('../assets/images/scene_14.svg'), url('../assets/images/scene_15.svg');
      background-size: contain;
      background-repeat: no-repeat;
      height: 80px;

      background-position: 0% center, 100% center;
    }

    & + &:hover::before {
      background-position: 100% center, 0% center;
    }

    &-data {
      font-size: 20px;
      $photo-data-desktop-spacer: 20px;

      margin-left: 0;
      padding: 0 1em;
      @media screen and (min-width: 800px) {
        margin-left: $photo-desktop-width + $photo-data-desktop-spacer;
        padding: 0;
      }

      h1 {
        line-height: 1;

        @media screen and (min-width: 800px) {
          margin: 0;
        }
      }

      line-height: 1.5;
      &-address {
        margin: .5em 0 1.5em;

        div {
          display: inline-block;
          cursor: pointer;
          &.map-link {
            animation: bounce 3s infinite;
          }
          &.map-link {
            vertical-align: middle;
          }
          &.map-link {
            width: 48px;
            height: 48px;
            img {
              height: 100%;
            }
          }
        }
      }

      .event-title {
        margin: 0;
      }

      ul {
        list-style: none;
        padding-left: 1em;
        margin: 0;
        // line-height: 2.3;

        li {
          margin: .5em 0;
        }
        span {
          background-color: $little_color;
          padding: .1em .3em;
        }
      }
    }
  }
}

@keyframes bounce {
  from,
  20%,
  53%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
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
