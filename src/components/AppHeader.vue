<template>
  <div id="app_header">
    <p>VC Map prototype app Vue2</p>
    <button
      @click="() => toggle3d(is3d ? 'ol3' : 'cesium')"
      class="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
        focus:outline-none focus:shadow-outline
      "
    >
      3d
    </button>
    <ToolboxManager />
  </div>
</template>

<script>
import ToolboxManager from "./toolbox/ToolboxManager.vue";

export default {
  name: "AppHeader",
  components: {
    ToolboxManager,
  },
  data() {
    return {
      is3d: true,
    };
  },
  inject: ["vcsApp"],
  methods: {
    async toggle3d(mapName) {
      this.vcsApp.maps.setActiveMap(mapName);
      this.is3d = !this.is3d;
    },
  },
};
</script>

<style lang="scss">
#app_header {
  height: 5rem;
  background-color: #dd2a3f;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem 0 1rem;

  p {
    color: white;
  }
}
</style>