import Vue from 'vue'
import App from './App.vue'
import config from '../map.config.json';
import init from './init';
import VueRouter from 'vue-router';
import VueCompositionAPI from '@vue/composition-api';
import VueTailwind from 'vue-tailwind'
import './assets/css/tailwind.css';
import tailwindSettings from './tailwindSettings'; 


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueTailwind, tailwindSettings)
Vue.use(VueCompositionAPI);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
init(App, '#app', config);
