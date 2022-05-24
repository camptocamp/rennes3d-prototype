<template>
  <div class="container">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Find a city
      </label>
      <input
        v-model="cityName"
        class="
          shadow
          appearance-none
          border
          rounded
          w-full
          py-2
          px-3
          text-gray-700
          leading-tight
          focus:outline-none focus:shadow-outline
        "
        id="cityName"
        type="text"
        placeholder="City name"
      />
    </div>
    <div class="flex items-center justify-center">
      <button
        @click="search"
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
        type="button"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
import { ViewPoint } from '@vcmap/core';

export default {
  name: "AppSidebar",
  data() {
    return {
      app: window.rennesApp,
      cityName: ""
    }
  },
  methods: {
    async search() {
      const apiKey = "79e9950b29421c3912111222112b75f0";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${apiKey}`)
      const data = await response.json();

      const vp = new ViewPoint({
        cameraPosition: [data.coord.lon, data.coord.lat, 15000]
      });
      await this.app.maps.activeMap.gotoViewPoint(vp);
    }
  }
};
</script>

<style scoped>
.container {
  padding: 1rem;
  height: 100%;
  width: 15%;
  background: #f5f6fe;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>

