import { Context, MapCollection, VcsAppConfig } from '@vcmap/core';
import RennesApp from './services/RennesApp';
import Vue, { Component } from 'vue';
import router from './router';

declare global {
  interface Window {
    CESIUM_BASE_URL: string;
    mapContext: MapCollection | null,
    rennesApp: RennesApp
  }
}

async function init(App: Component, target: string, config: VcsAppConfig): Promise<void> { 
  const app = new RennesApp();
  const context = new Context(config);

  window.mapContext = null;
  window.CESIUM_BASE_URL = '/node_modules/@vcmap/cesium/Source/';
  window.rennesApp = app;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await app.addContext(context);

  new Vue({
    router,
    render: h => h(App, { props: { app: app }}),
  }).$mount(target);
}  

export default init;