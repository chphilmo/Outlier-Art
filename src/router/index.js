import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';

import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

import Home from '../views/Home.vue';
import Wallet from '../views/Wallet.vue';
import MintNfa from '../views/MintNfa.vue';
import ManageNfa from '../views/ManageNfa.vue';
import Nfa from '../views/Nfa.vue';
import Contract from '../views/Contract.vue';
import WhitePaper from '../views/WhitePaper.vue';
import Community from '../views/Community.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import EditProfile from '../views/EditProfile.vue';
import Articles from '../views/Articles.vue';
import Article from '../views/Article.vue';
import EditArticle from '../views/EditArticle.vue';
import CreateArticle from '../views/CreateArticle.vue';
import Ecosystem from '../views/Ecosystem.vue';

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
      path: '/wallet',
      name: 'wallet',
      component: Wallet
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
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article,
      props: true
    },
    {
      path: '/editarticle/:id',
      name: 'editarticle',
      component: EditArticle,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/createarticle',
      name: 'createarticle',
      component: CreateArticle,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/editprofile',
      name: 'editprofile',
      component: EditProfile,
      meta: { requiresAuth: true }
    },
    {
      path: '/community',
      name: 'community',
      component: Community
    },
    {
      path: '/ecosystem',
      name: 'ecosystem',
      component: Ecosystem
    },
  ]
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  const loggedIn = localStorage.getItem('user');
  const verifyToken = loggedIn === true ? AuthService.verifyToken() : true;

  if (!verifyToken) {
    EventBus.dispatch('logout');
  }

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn && !verifyToken) {
    next('/login');
  } else {
    next();
  }
});


export default router
