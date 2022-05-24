<template>
  <div id="container">
    <img id="compass" src="../assets/north.png" alt="compass-indicating-the-north">
    <button
      @click="zoomIn"
      class="
        bg-white
        hover:bg-blue-500
        text-blue-700
        font-semibold
        hover:text-white
        py-2
        px-4
        border border-blue-500
        hover:border-transparent
        rounded
      "
    >
      +
    </button>
    <button
      @click="zoomOut"
      class="
        bg-white
        hover:bg-blue-500
        text-blue-700
        font-semibold
        hover:text-white
        py-2
        px-4
        border border-blue-500
        hover:border-transparent
        rounded
      "
    >
      -
    </button>
  </div>
</template>

<script>
import RennesApp from '@/services/RennesApp';

async function zoom(map, out = false, zoomFactor = 2) {
  const viewpoint = await map.getViewPoint();
  if (out) {
    viewpoint.distance *= zoomFactor;
  } else {
    viewpoint.distance /= zoomFactor;
  }
  viewpoint.animate = true;
  viewpoint.duration = 0.5;
  viewpoint.cameraPosition = null;
  await map.gotoViewPoint(viewpoint);
}

export default {
  name: "MapControls",
  data() {
    return {
      app: window.rennesApp
    }
  },
  methods: {
    zoomIn() {
      zoom(this.app.maps.activeMap);
    },
    zoomOut() {
      zoom(this.app.maps.activeMap, true);
    }
  },
};
</script>

<style scoped lang="scss">
#container {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-top: 0.5rem;
    font-size: 1.2rem;
  }
}

#compass {
  margin-bottom: 2rem;
  width: 4rem;
  cursor: grab;
  & :active {
    cursor: grabbing;
  }
}
</style>