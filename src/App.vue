<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RennesApp from './services/RennesApp';
import { provide } from '@vue/composition-api';

export default Vue.extend({
  name: 'App',
  props: {
    app: {
      type: RennesApp,
      required: true,
    },
  },
  setup(props) {
    provide('vcsApp', props.app);
  }
});
</script>

<style>
body {
  margin: 0;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f6fe;
}

#app_main {
  flex: 1;
  display: flex;
}
</style>
