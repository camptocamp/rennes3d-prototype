<template>
  <div>
  </div>
</template>

<script lang="ts">
import { inject } from '@vue/composition-api';

export default {
  name: 'RennesToolboxManager',
  props: {
    width: {
      type: Number,
      default: 600
    }
  },
  setup() {
    const app = inject('vcsApp');
    const { toolboxManager }: any = app;
    const { state: { groups } } = toolboxManager;
  }
}
</script>

<style>
  .class {
    
  }
</style>