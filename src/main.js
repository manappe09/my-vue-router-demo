import Vue from 'vue';
import App from './App.vue';
import router from '@/router.js';
import '@/assets/scss/main.scss';
import VAnimateCss from 'animate.css';

Vue.config.productionTip = false

Vue.use(VAnimateCss)

router.beforeEach((to, from, next) => {
  if(to.path == '/guard') {
    next('/');
  }
  next();
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
