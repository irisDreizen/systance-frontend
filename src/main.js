import Vue from 'vue'
import App from './App.vue'
import routes from "./routes";
import VueRouter from "vue-router";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMeta from 'vue-meta'
import VueApexCharts from 'vue-apexcharts'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(VueMeta)
Vue.use(VueApexCharts)
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});



axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
);
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
VTooltip.options.defaultHtml = false
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
