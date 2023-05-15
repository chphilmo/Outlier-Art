import Vue from 'vue'
import Vuex from 'vuex'

import { nft } from './nft.module';
import { matter } from './matter.module';
import { auth } from './auth.module';
import { nfa } from './nfa.module';

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
  nft,
  matter,
  auth,
  nfa
  }
})
