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
        v-for="location in locations"
        :key="location.name"
        type="button"
        :class="{ active: $route.hash.slice(1) === location.name}"
        @click="whereIs(location.name)"
      >
        {{ location.name }}
      </button>
    </div>
    <div class="venue-location">
      <div v-for="(location, index) in locations" :id="location.name" :key="location.name" class="venue-location-detail">
        <OpenStreepMap
          class="small-map"
          style="height: 200px; width: 200px"
          :markers="[locations[index]]"
        />
        <div class="venue-location-detail-data">
          <h2>
            {{ location.name }}
            <a :href="location.shareLink" class="map-link" target="_blank">
              MAP <img :src="require('~/assets/images/external-link-alt-solid.svg')" alt="">
            </a>
          </h2>
          <p>{{ location.address }}</p>
          <details>
            <summary>活動</summary>
            <ul>
              <li v-for="event in location.events" :key="event.id">
                {{ event['日期'] }} {{ event['活動名稱-華語'] }}
              </li>
            </ul>
          </details>
          <details>
            <summary>開車前往</summary>
            <p>(尚無內容)</p>
          </details>
          <details>
            <summary>搭程大眾交通工具</summary>
            <p>(尚無內容)</p>
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
        if (m.has(location['地點名稱-華語'])) {
          const currentLocation = m.get(location['地點名稱-華語'])
          currentLocation.events.push(location)
        } else {
          m.set(location['地點名稱-華語'], {
            name: location['地點名稱-華語'],
            address: location['地址-華語'],
            coordinates: location.coordinates,
            shareLink: location['share-link'],
            events: [location]
          })
        }
        return m
      }, new Map()).values()]
    }
  },
  methods: {
    whereIs (locationName) {
      this.locations.filter(location => location.name === locationName)
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
  background-color: rgba(255,255,255,.6);
  // text-align: center;
  button {
    border-radius: 3px;
    border: solid 1px;
    padding: .35rem .8rem;
    margin-right: .5rem;
    margin-bottom: 1rem;
    box-shadow: 3px 3px 0 0 #ccc;
    &:hover {
      box-shadow: 3px 3px 0 0 #ae3e41;
    }
    &:focus {
      outline: none;
    }
    &.active {
      color: #ae3e41
    }
  }
}

.venue-location {
  &-detail {
    &-data {
      margin-left: 210px;
      details {
        margin: 0.7em 0;
      }
    }
    position: relative;
    padding-top: 160px; // for anchor
    max-width: 600px;
    margin: auto;
    h2 {
      position: relative;
      a {
        color: black;
        text-decoration:none;
        &:hover, &:focus, &:active {
          text-decoration:none;
          color: black;
        }
      }
      .map-link {
        font-size: 1rem;
        position: absolute;
        left: 100%;
        top: 0;
        width: 5.5em;
        border-radius: 900px;
        text-align: center;
        background-color: #ccc;
        padding: 0.35rem 0.8rem;
        img {
          height: 1em;
        }
      }
    }
    .small-map {
      float: left;
      width: 200px;
      margin-right: 10px;
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
      top: 60px;
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
