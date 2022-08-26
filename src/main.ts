/** Vue main script */
import Vue from 'vue';

import router from '@/router';
import store from '@/store';
import vuetify from './plugins/vuetify';
import teleport from 'vue2-teleport';
import HighchartsVue from 'highcharts-vue';

import App from '@/App.vue';

Vue.config.productionTip = false;
Vue.component('Teleport', teleport);
Vue.use(HighchartsVue)

const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
});

app.$mount('#app');
