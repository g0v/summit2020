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
          :id="`location-link-${location.id}`"
          :key="index"
          class="location-link"
          :class="{ active: routeHash === location.id }"
          @click="whereIs(location.id)"
        >{{ location[$t('venuelocationNameShort')] }}</div>
      </div>
      <!-- {{ coords }} -->
      <div class="venue-location">
        <div v-for="(location, index) in locations" :id="`location-${location.id}`" :key="index" class="venue-location-detail">
          <OpenStreepMap
            class="location-photo"
            :markers="[locations[index]]"
          />
          <div class="venue-location-detail-data">
            <h3>{{ location[$t('venuelocationName')] }}</h3>
            <p>
              <span class="venue-location-detail-data-address">
                {{ location[$t('venuelocationAddress')] }}
                <div class="map-link" target="_blank" @click="gmapLink(location)">
                  <img :src="require('~/assets/images/map-marker.png')">
                </div>
              </span>
            </p>
            <div class="event-title">
              <span>{{ $t('events') }}</span>
            </div>
            <ul class="venue-location-detail-data-events">
              <li v-for="event in location.events" :key="event.id">
                <span>{{ event['日期'] }} - {{ event[$t('venuelocationEventName')] }} - {{ event[$t('venuelocationSubEventName')] }}</span>
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
    }
  },
  mounted () {
    this.$router.push({ hash: null })
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
@import 'assets/scss/color';

.transport-page {
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
    top: 0;
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
      padding: 0.25rem;
      text-align: center;
      cursor: pointer;
      @media screen and (min-width: 640px) {
        flex-basis: (100% / 7);
        padding: 0.5rem 0.25rem;
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

.venue-location {
  &-detail {
    position: relative;
    color: $gray;
    max-width: 960px;
    margin: 2rem auto;
    padding: 1.5rem 0 4.5rem;

    $photo-desktop-width: 300px;
    .location-photo {
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
    & + &::before { // eggs
      content: '';
      display: block;
      position: absolute;
      bottom: 100%;
      left: 0;
      width: 100%;
      height: 80px;
      margin: 0 auto;
      background-image: url('../assets/images/scene_14.svg'), url('../assets/images/scene_15.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 5% center, 95% center;
    }
    & + &:hover::before {
      background-position: 95% center, 5% center;
    }
    &-data {
      $photo-data-desktop-spacer: 20px;
      margin-left: 0;
      padding: 0 1em;
      @media screen and (min-width: 800px) {
        margin-left: $photo-desktop-width + $photo-data-desktop-spacer;
        padding: 0;
      }
      h3 {
        font-size: 1.75rem;
        line-height: 1.25;
        @media screen and (min-width: 800px) {
          margin: 0;
        }
      }
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
            width: 32px;
            height: 32px;
            img {
              height: 100%;
            }
          }
        }
      }
      .event-title {
        font-weight: bold;
        span {
          border-bottom: $gray 2px solid;
        }
      }
      ul {
        list-style: none;
        margin: 0;
        li {
          margin: .5em 0;
        }
        span {
          border-bottom: $blue 2px solid;
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
