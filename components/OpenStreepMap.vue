<template lang="pug">
  client-only
    l-map(
      ref="map"
      :zoom="16"
      :center="centerMarkers"
      :options="{ scrollWheelZoom: false }"
    )
      l-marker(
        v-for="location in markers"
        :key="location.name"
        :lat-lng="location.coordinates"
        :icon="markerIcon"
        @add="openPopup"
        @mouseover="bringToFront"
      )
        l-popup(
          :options="popupOptions"
        )
          .relative.pointer(@click="$emit('click:marker', location.id)")
            .pr3.mr2 {{location[$t('venuelocationNameShort')]}}
            img.absolute.right-0.top-0(src="~/assets/images/trans-info.png")
      l-tile-layer(
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        :options="{maxZoom: 18,attribution: `<a href='https://www.openstreetmap.org/'>OSM</a>`}"
      )
    // .pa3 {{ centerMarkers }}
</template>

<script>
// Avoid run leaflet on server
// https://github.com/vue-leaflet/Vue2Leaflet/issues/207
let Vue2Leaflet = {}
let L = {}
if (process.client) {
  Vue2Leaflet = require('vue2-leaflet')
  L = require('leaflet')
}

export default {
  components: {
    'l-map': Vue2Leaflet.LMap,
    'l-tile-layer': Vue2Leaflet.LTileLayer,
    'l-marker': Vue2Leaflet.LMarker
  },
  props: {
    markers: {
      type: Array,
      default () {
        return [{
          name: '(預設在)好想工作室',
          address: '701台南市東區北門路二段16號 L2A',
          coordinates: [
            22.999968,
            120.212847
          ]
        }]
      }
    }
  },
  computed: {
    centerMarkers () {
      const x = this.markers.reduce((sum, location) => {
        sum += location.coordinates[0]
        return sum
      }, 0)
      const y = this.markers.reduce((sum, location) => {
        sum += location.coordinates[1]
        return sum
      }, 0)
      return [x / this.markers.length, y / this.markers.length]
    },
    markerIcon () {
      return L.icon({
        iconUrl: 'trans-marker.png',
        iconSize: [56, 56]
      })
    },
    popupOptions () {
      return {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        className: 'event-building-popup',
        offset: L.point(-1, -18)
        // minWidth: 'auto',
        // maxWidth: 'auto'
      }
    }
  },
  mounted () {
    this.$nextTick(() => this.moveToCenter())
  },
  methods: {
    moveToCenter () {
      if (!this.$refs.map) {
        return
      }
      console.warn('to center')
      const map = this.$refs.map.mapObject
      if (this.markers.length > 1) {
        const first2 = this.markers.slice(0, 2)
        const restMarkers = this.markers.slice(2)
        const bounds = L.latLngBounds(
          ...first2.map(marker => marker.coordinates)
        )
        restMarkers.forEach((marker) => {
          bounds.extend(marker.coordinates)
        })
        map.fitBounds(bounds, {
          padding: [60, 60]
        })
      } else {
      }
    },
    openPopup (event) {
      this.$nextTick(() => {
        event.target.openPopup()
      })
    },
    bringToFront (event) {
      event.target.getPopup().bringToFront()
    }
  }
}
</script>
<style lang="scss">
.event-building-popup {
  .leaflet-popup {
    &-content-wrapper {
      border-radius: 9999px;
      padding: 0.5rem 0.75rem;
      border: 1px solid #555;
    }
    &-content {
      margin: 0;
      font-size: 1rem;
    }
    &-tip-container {
      margin-top: -1px;
    }
    &-tip {
      border: 1px solid #555;
    }
  }
}
</style>
