import Vue from 'vue'
import Vuex from 'vuex'

import { web3 } from './web3.module';
import { auth } from './auth.module';
import { article } from './article.module';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
  web3,
  auth,
  article
  }
})
