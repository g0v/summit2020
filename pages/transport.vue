
<template>
  <div class="transport-page">
    <OpenStreepMap
      style="height: 280px; width: 100%"
      :markers="locations"
    />
    <div class="transport-page-nav">
      <span
        v-for="(location, index) in locations"
        :key="index"
        type="button"
        :class="{ active: routeHash === location[$t('venuelocationName')]}"
        @click="whereIs(location[$t('venuelocationName')])"
      >
        {{ location[$t('venuelocationName')] }}
      </span>
    </div>
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
              <a :href="location['share-link']" class="map-link" target="_blank">
                <img :src="require('~/assets/images/map-marker.png')" alt="">
              </a>
            </span>
          </p>
          <details>
            <summary>{{ $t('events') }}</summary>
            <ul class="venue-location-detail-data-events">
              <li v-for="event in location.events" :key="event.id">
                <span>{{ event['日期'] }} {{ event[$t('venuelocationEventName')] }}  {{ event[$t('venuelocationSubEventName')] }}</span>
              </li>
            </ul>
          </details>
          <details>
            <summary>{{ $t('driveToVenue') }}</summary>
            <ul>
              <li><span>{{ $t('noContentYet') }}</span></li>
            </ul>
          </details>
          <details>
            <summary>{{ $t('publicTransportationToVenue') }}</summary>
            <ul>
              <li><span>{{ $t('noContentYet') }}</span></li>
            </ul>
          </details>
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
  methods: {
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
  &-nav {
    position: sticky;
    top: 84px;
    z-index: 1100;
    background-color: $main_green;
    display: flex;
    justify-content: space-around;

    span {
      padding: .7em;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
      &:focus {
        outline: none;
      }
      &.active {
        // 做底線
        position: relative;
        &::before {
          content: '';
          display: block;
          height: 0.2em;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #000;
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
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 100%;
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
      @media screen and (min-width: 800px) {
        margin-left: $photo-desktop-width + $photo-data-desktop-spacer;
      }

      h1 {
        margin: 0;;
        line-height: 1;
      }

      line-height: 1.5;
      &-address {
        margin: .5em 0 1.5em;

        position: relative;
        a {
          position: absolute;
          display: inline-block;
          top: 0;
          bottom: 0;
          margin: auto;
          &.map-link {
            width: 48px;
            height: 48px;
            img {
              height: 100%;
              // height: 100%;
              // filter: drop-shadow(2px 2px 3px #555);
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
        li {
          line-height: 2.3;
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
