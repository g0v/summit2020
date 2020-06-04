<template>
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
    {{ coords }}
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
              <a :href="gmapLink(location[$t('venuelocationName')]) || location['share-link']" class="map-link" target="_blank">
                <img :src="require('~/assets/images/map-marker.png')" alt="">
              </a>
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
</template>

<script>
import OpenStreepMap from '~/components/OpenStreepMap'
import locations from '~/assets/tables/交通地理位置.json'

export default {
  components: {
    OpenStreepMap
  },
  data () {
    return {
      hereCoords: []
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
    navigator.geolocation && navigator.geolocation.getCurrentPosition(({ coords }) => (this.hereCoords = [coords.latitude, coords.longitude]))
  },
  methods: {
    gmapLink (destination) {
      const origin = this.hereCoords.join()
      return origin && `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&hl=zh-tw`
    },
    whereIs (locationName) {
      this.locations.filter(location => location[this.$t('venuelocationName')] === locationName)
      this.$router.push({ hash: locationName })
    }
  }
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
    top: 62px;
    @media screen and (min-width: 951px) {
      top: 78px;
    }

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
      background-position: left center, right center;
      background-size: contain;
      background-repeat: no-repeat;
      height: 80px;
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

        a {
          display: inline-block;
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
</style>
