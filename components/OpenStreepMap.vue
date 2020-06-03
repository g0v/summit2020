<template>
  <l-map
    ref="map"
    :zoom="16"
    :center="centerMarkers"
  >
    <l-marker
      v-for="location in markers"
      :key="location.name"
      :lat-lng="location.coordinates"
    >
      <l-popup :content="`<b>${location.name}</b><br />${location.address}`" />
    </l-marker>
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      :options="{
        maxZoom: 18,
        attribution: `<a href='https://www.openstreetmap.org/'>OSM</a>`,
        tileSize: 512,
        zoomOffset: -1
      }"
    />
    </l-tile-layer>
  </l-map>
  <!-- <div>
    {{ centerMarkers }}
  </div> -->
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import L from 'leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
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
    }
  },
  mounted () {
    this.moveToCenter()
  },
  methods: {
    moveToCenter () {
      if (!this.$refs.map) {
        return
      }
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
    }
  }
}
</script>

<style>

</style>
