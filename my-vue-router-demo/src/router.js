import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Tournament from './views/Tournament.vue';
import TournamentHeader from './views/TournamentHeader.vue';
import TournamentList from './views/TournamentList.vue';
import TournamentLevel from './views/TournamentLevel.vue';
import Categories from './views/Categories.vue';

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
      component: Tournament,
      children: [
        {
          path: 'level/:levelNumber',
          components: {
            default: TournamentLevel,
            header: TournamentHeader,
          },
          props: {
            default: true,
            header: false
          }
        },
        {
          path: 'list/:listNumber',
          components: {
            default: TournamentList,
            header: TournamentHeader,
          },
          props: {
            default: true,
            header: false
          },
          name: 'list-number-route'
        }
      ]
    },
    {
      path: '/categories/:category',
      component: Categories,
      props: true,
      name: 'categories-root',
    },
  ]
})