<template>
  <div :id="app.id" class="map_container"></div>
</template>

<script>
import { inject } from "@vue/composition-api";
export default {
  name: "MapComponent",
  data() {
    return {
      app: window.rennesApp,
    };
  },
  mounted() {
    window.rennesApp.maps.setTarget(window.rennesApp.id);
  },
  setup() {
    const app = inject("vcsApp");
  },
};
</script>

<style scoped lang="scss">
.map_container {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 8 8'%3E%3Cg fill='%23acacac' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");
  flex: 1;
}

::v-deep {
  .mapElement {
    height: calc(100vh - 5rem);
    flex: 1;
    overflow: hidden; /* Fix for iFrame content */
  }
  .cesium-widget,
  .cesium-widget canvas {
    width: 100%;
    height: 100%;
    touch-action: none;
  }
}
</style>