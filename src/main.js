import Vue from 'vue'
import App from './App.vue'

import router from './router'

import store from './store'
import Vuex from 'vuex'

import VueMeta from 'vue-meta';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Masonry style library
import VueMasonry from 'vue-masonry-css'

// Import custom styles, Overriding Bootstrap CSS
import './custom.scss'

// Date filer: date | date('DD/MM/YYYY')
import DateFilter from './filters/date.js'

// 1. Intercept API calls
import setupInterceptors from './services/setupInterceptors'

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt)

Vue.config.productionTip = false

// 2. Setup Interceptors
setupInterceptors(store);

// Store
Vue.use(Vuex);

Vue.use(VueMeta);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueMasonry)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.filter('date', DateFilter)



new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // Get current wallet state if user triggered connect wallet
    this.$store.dispatch('web3/getCurrentWallet')
    // Fetch all creators
    this.$store.dispatch('auth/fetchCreators')
    this.$store.dispatch('article/loadArticle')
    this.$store.dispatch('article/loadCategory')
  }
}).$mount('#app')
