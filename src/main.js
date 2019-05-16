/* eslint-disable */
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { Button, Select } from 'element-ui';

Vue.use(Button)
Vue.use(Select)

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
