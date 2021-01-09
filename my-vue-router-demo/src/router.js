import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import TournamentList from './views/TournamentList.vue';
import TournamentLevel from './views/TournamentLevel.vue';
import Categories from './views/Categories.vue';
// import CategoriesHeader from './views/CategoriesHeader.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/tournament',
      children: [
        {
          path: '/level',
          component: TournamentLevel,
        },
        {
          path: '/List',
          component: TournamentList,
        },
      ]
    },
    {
      path: '/categories',
      components: Categories,
    },
  ]
})