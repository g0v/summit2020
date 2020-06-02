<template>
  <l-map
    :zoom="13"
    :center="centerMarkers"
  >
    <l-marker
      v-for="location in markers"
      :key="location.name"
      :lat-lng="location.coordinates"
    >
      <l-popup :content="`<b>${location[$t('venuelocationName')]}</b><br />${location[$t('venuelocationAddress')]}`" />
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
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: {
    markers: {
      type: Array,
      required: true
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
  }
}
</script>

<style>

</style>
