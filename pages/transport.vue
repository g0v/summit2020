<template>
  <div class="transport-page">
    <h1>{{ $t('venuelocation') }}</h1>
    <div style="height: 350px;">
      <OpenStreepMap
        style="height: 80%; width: 100%"
        :markers="locations"
      />
    </div>
    <div class="nav-venue-location">
      <button
        v-for="(location, index) in locations"
        :key="index"
        type="button"
        :class="{ active: $route.hash.slice(1) === location[$t('venuelocationName')]}"
        @click="whereIs(location[$t('venuelocationName')])"
      >
        {{ location[$t('venuelocationName')] }}
      </button>
    </div>
    <div class="venue-location">
      <div v-for="(location, index) in locations" :id="location[$t('venuelocationName')]" :key="index" class="venue-location-detail">
        <OpenStreepMap
          class="small-map"
          :markers="[locations[index]]"
        />
        <div class="venue-location-detail-data">
          <h2>
            <a :href="location['share-link']" class="map-link" target="_blank">
              MAP <img :src="require('~/assets/images/external-link-alt-solid.svg')" alt="">
            </a>
            {{ location[$t('venuelocationName')] }}
          </h2>
          <p>{{ location[$t('venuelocationAddress')] }}</p>
          <details>
            <summary>{{ $t('events') }}</summary>
            <ul>
              <li v-for="event in location.events" :key="event.id">
                {{ event['日期'] }} {{ event[$t('venuelocationEventName')] }}
              </li>
            </ul>
          </details>
          <details>
            <summary>{{ $t('driveToVenue') }}</summary>
            <p>({{ $t('noContentYet') }})</p>
          </details>
          <details>
            <summary>{{ $t('publicTransportationToVenue') }}</summary>
            <p>({{ $t('noContentYet') }})</p>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OpenStreepMap from '~/components/OpenStreepMap'
import locations from '~/assets/tables/交通地理位置.json'
import spacer from '~/assets/images/transport_spacer.svg'

export default {
  components: {
    OpenStreepMap
  },
  computed: {
    svgSpacer () {
      return spacer
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
.transport-page {
  max-width: 1200px;
  margin: auto;
}

.nav-venue-location {
  position: sticky;
  top: 4px;
  z-index: 1100;
  padding-left: 4px;
  background-color: rgba(255,255,255,.8);
  // text-align: center;
  button {
    border-radius: 3px;
    border: solid 1px;
    padding: .35rem .8rem;
    margin-right: .5rem;
    margin-bottom: 1rem;
    box-shadow: 3px 3px 0 0 #ccc;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      box-shadow: 3px 3px 0 0 #ae3e41;
    }
    &:focus {
      outline: none;
    }
    &.active {
      color: #ae3e41;
      font-weight: bold;
    }
  }
}

.venue-location {
  &-detail {
    &-data {
      margin-left: 0;
      padding: 0 1rem;
      @media screen and (min-width: 800px) {
        margin-left: 321px + 84px;
      }
      details {
        summary {
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }

        ul {
          padding-left: 1em;
          li {
            list-style: none;
            font-weight: bold;
            font-size: 20px;
          }
        }

        margin: 0.7em 0;
        &:first-of-type {
          margin-top: 3.2em;
          @media screen and (min-width: 800px) {
            margin-top: 10.2em;
          }
        }
      }
    }
    position: relative;
    padding-top: 240px; // for anchor
    padding-bottom: 80px; // for anchor
    max-width: 970px;
    margin: auto;
    h2 {
      margin-top: 0.83em;
      margin-bottom: 1.83em;
      @media screen and (min-width: 800px) {
        margin-top: 0;
        margin-bottom: 3.83em;
      }

      a {
        color: black;
        text-decoration:none;
        &:hover, &:focus, &:active {
          text-decoration:none;
          color: black;
        }
      }
      // position: relative;
      .map-link {
        font-size: 1rem;
        width: 5.5em;
        border-radius: 900px;
        text-align: center;
        background-color: #ccc;
        padding: 0.35rem 0.8rem;
        img {
          height: 1em;
        }

        // position: absolute;
        // top: 100%;
        // left: 0;
        // right: auto;
        float: none;
        transform: scale(.8);
        transform-origin: left;
        @media screen and (min-width: 800px) {
          transform: scale(1);
          float: right;
          // left: auto;
          // right: 0;
          // top: 0;
        }
      }
    }
    .small-map {
      margin-right: 10px;
      float: none;
      width: 100%;
      height: 200px;
      @media screen and (min-width: 800px) {
        float: left;
        width: 321px;
        height: 310px;
      }
    }
    &::after {
      content: '';
      display: block;
      clear: left;
    }
    & + &::before {
      content: '';
      // 分隔線
      display: block;
      position: absolute;
      top: 120px;
      background-image: url('../assets/images/transport_spacer.svg');
      background-size: contain;
      background-repeat: no-repeat;
      width: 80px;
      height: 80px / 318 * 123;
      margin: 1.5rem 0;
    }
  }
}
</style>
