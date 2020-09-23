
import Vue from 'vue'
import App from './App'
import router from './router'
//import './lib-flexible/flexible';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
