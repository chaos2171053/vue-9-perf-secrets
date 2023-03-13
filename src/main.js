import './plugins'
import './components'
import Vue from 'vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import fps from 'fps-indicator'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(iView);

Vue.config.productionTip = false

fps({
  position: 'top-right',
  style: `
    font-size: 24px;
    color:red;
  `,
})

new Vue({
  router,
  store,
  ...App,
}).$mount('#app')
