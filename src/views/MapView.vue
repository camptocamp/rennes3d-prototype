<template>
  <div id="map">
    <AppHeader />
    <div id="app_main">
      <AppSidebar />
      <MapComponent/>
      <MapControls  />
      <RennesWindowManager />
      <!-- <RennesToolboxManager /> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MapComponent from '@/components/MapComponent.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import MapControls from '@/components/MapControls.vue';
import RennesToolboxManager from '@/components/RennesToolboxManager.vue';
import RennesWindowManager from '@/components/RennesWindowManager.vue';

export default Vue.extend({
  name: 'MapView',
  components: {
    MapComponent,
    AppHeader,
    AppSidebar,
    MapControls,
    RennesWindowManager
    // RennesToolboxManager
  },
});
</script>

<style>
body {
  margin: 0;
}

#map {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#app_main {
  flex: 1;
  display: flex;
}
</style>
