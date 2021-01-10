import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import('./views/Home.vue');
const Tournament = () => import('./views/Tournament.vue');
const TournamentHeader = () => import('./views/TournamentHeader.vue');
const TournamentList = () => import('./views/TournamentList.vue');
const TournamentLevel = () => import('./views/TournamentLevel.vue');
const Categories = () => import('./views/Categories.vue');

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
          path: 'level/:level',
          components: {
            default: TournamentLevel,
            header: TournamentHeader,
          },
          props: {
            default: true,
            header: false
          },
          name: 'level-number-route'
        },
        {
          path: 'list/:list',
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
      name: 'categories-route',
    },
    {
      path: '*',
      redirect: '/'
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      this.app.$root.$once('triggerScroll', () => {
        let position = {x: 0, y: 100};
        if(savedPosition) {
          position = savedPosition;
        }
        if(to.hash) {
          position = {
            selector: to.hash
          }
        }
        return resolve(position);
      });
    });
  }
})