import AuthService from '../services/auth.service';
require('dotenv').config();
const API_URL = process.env.VUE_APP_API_URL;

//import EventBus from '../common/EventBus';

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: {
    ...initialState,
    creators: [],
  },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          commit('nft/setMessage', `Logged in: ${user.username}`, { root: true })
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          commit('nft/setMessage', `Login failed`, { root: true })
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
      commit('nft/setMessage', "Logged out", { root: true })
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          commit('nft/setMessage', `Register success`, { root: true })
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          commit('nft/setMessage', `Register failed`, { root: true })
          return Promise.reject(error);
        }
      );
    },
    async web3Login({ commit }, user) {
      // check if user is registered
      let registered = await AuthService.isWeb3Registered(user).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );

      if (!registered) {
        // register user
        registered = await AuthService.registerWeb3(user).then(
          response => {
            return Promise.resolve(response.data);
          },
          error => {
            return Promise.reject(error);
          }
        );
      }

  
      // get nonce from server
      const userObj = await AuthService.getNonce(user);
      const nonce = userObj.nonce;
      // sign message
      const userData = {
        address: user.address,
        nonce: nonce
      }

      const message = nonce + user.address;
      const signature = await web3.eth.personal.sign(message, user.address);

      // send signature to server
      return AuthService.web3Login(userData, signature).then(
        user => {
          commit('loginSuccess', user);
          commit('nft/setMessage', `Logged in: ${user.address}`, { root: true })
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          commit('nft/setMessage', "Login Failed", { root: true })
          return Promise.reject(error);
        }
      );
    },
    refreshToken({ commit }, accessToken) {
      commit('refreshToken', accessToken);
    },

    editProfile({ commit }, payload) {
      return AuthService.editProfile(payload).then(
        data => {
          commit('editProfile', data);
          commit('nft/setMessage', "Profile updated", { root: true })
          return Promise.resolve(data);
        },
        error => {
          console.log(error)
          commit('nft/setMessage', "Error updating Profile", { root: true })
          return Promise.reject(error);
        }
      );
    },
    uploadProfileImg({ commit, dispatch }, payload) {
      return AuthService.upload(payload).then(
        data => {
          commit('uploadProfileImg', data);
          commit('nft/setMessage', "Profile image updated", { root: true })
          return Promise.resolve(data);
        },
        error => {
          if (error.response && error.response.status === 403) {
            dispatch('logout')
          }
          commit('nft/setMessage', "Error updating Profile image", { root: true })
          return Promise.reject(error);
        }
      );
    },
    deleteUserById({ commit, dispatch }, id) {
      return AuthService.deleteUserById(id).then(
        data => {
          commit('nft/setMessage', data.message, { root: true })
          return Promise.resolve(data);
        },
        error => {
          if (error.response && error.response.status === 403) {
            dispatch('logout')
          }
          commit('nft/setMessage', "Error deleting user", { root: true })
          return Promise.reject(error);
        }
      );
    },
    sendVerify ({ commit, dispatch }) {
      return AuthService.sendVerify().then(
        (data) => {
          // commit('sendVerify', data)
          commit('nft/setMessage', data.message, { root: true });
          return Promise.resolve(data)
        },
        (error) => {
          if (error.response && error.response.status === 403) {
            dispatch('logout')
          }
          commit('nft/setMessage', `Error sending email: ${error}`, { root: true })
          return Promise.reject(error)
        }
      )
    },
    fetchCreators({ commit }) {
      return AuthService.fetchCreators().then(
        data => {
          commit('setCreators', data);
          return Promise.resolve(data);
        },
        error => {
          commit('nft/setMessage', "Error fetching creators", { root: true })
          return Promise.reject(error);
        }
      );
    },
    async whitelistAddress({ commit }, payload) {
      const address = payload.address;
   
     // await nftContract.methods.grantCollectionRole(1, address).call();
      AuthService.whitelistAddress(address).then(
        data => {

          commit('nft/setMessage', data.message)
          return Promise.resolve(data);
        },
        error => {
          commit('nft/setMessage', "Whitelist Failed", { root: true })
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    refreshToken(state, accessToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, accessToken: accessToken };
    },
    uploadProfileImg(state, payload) {
      state.user['imageUrl'] = payload.imageUrl;
    },
    editProfile(state, user) {
      state.user.username = user.username;
      state.user.email = user.email;
      state.user.imageUrl = user.imageUrl;
      state.user.bio = user.bio;
      state.user.website = user.website;
      state.user.twitter = user.twitter;
    },
    setCreators(state, payload) {
      state.creators = payload;
    },
  },
  getters: {
    loadedCreators(state) {
      return state.creators;
    },
  }
};