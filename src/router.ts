import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from './views/HomeView.vue';
import MapView from './views/MapView.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { 
    path: '/', 
    name: 'HomeView',
    component: HomeView 
  },
  { 
    path: '/map',
    name: 'MapView',
    component: MapView,
  }
];

export default new VueRouter({ routes });

