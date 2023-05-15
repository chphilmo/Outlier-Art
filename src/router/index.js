import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';
import Home from '../views/Home.vue';
import Meta from '../views/Meta.vue';
import MintNfa from '../views/MintNfa.vue';
import ManageNfa from '../views/ManageNfa.vue';
import Nfa from '../views/Nfa.vue';
import Contract from '../views/Contract.vue';
import WhitePaper from '../views/WhitePaper.vue';
import Creators from '../views/Creators.vue';

Vue.use(Router);
Vue.use(VueMeta);

export const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/meta',
      name: 'meta',
      component: Meta
    },
    {
      path: '/whitepaper',
      name: 'whitepaper',
      component: WhitePaper
    },
    {
      path: '/mint',
      name: 'mintnfa',
      component: MintNfa,
      meta: { requiresAuth: true }
    },
    {
      path: '/manage/:id',
      name: 'managenfa',
      component: ManageNfa,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/contract',
      name: 'contract',
      component: Contract,
      meta: { requiresAuth: true }
    },
    {
      path: '/nfa',
      name: 'nfa',
      component: Nfa
    },
    {
      path: '/creators',
      name: 'creators',
      component: Creators
    },
  ]
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});


export default router
