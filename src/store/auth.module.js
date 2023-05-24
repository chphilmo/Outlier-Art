import AuthService from '../services/auth.service';
require('dotenv').config();
const API_URL = process.env.VUE_APP_API_URL_WEB3;

//import EventBus from '../common/EventBus';

// Web3 library MetaMask Authentication
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3_al = createAlchemyWeb3(API_URL);

// Retrieve user from local storage
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  // modules are namespaced by default
  namespaced: true,
  // variables state
  state: {
    ...initialState,
    creators: [],
  },
  actions: {
    /*
    @dev: login
    @params: user.username, user.email
    @return: user
    */
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          commit('web3/setMessage', `Logged in: ${user.username}`, { root: true })
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          commit('web3/setMessage', `Login failed`, { root: true })
          return Promise.reject(error);
        }
      );
    },
    /*
    @dev: logout
    */
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
      commit('web3/setMessage', "Logged out", { root: true })
    },
    /*
    @dev: register
    @params: user.username, user.email, user.password
    @return: user
    */
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          commit('web3/setMessage', `Register success`, { root: true })
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          commit('web3/setMessage', `Register failed`, { root: true })
          return Promise.reject(error);
        }
      );
    },
    /*
    @dev: web3Login
    @params: user.address
    @return: user
    */
    async web3Login({ commit }, user) {
      // check if user is registered
      if (!user.address) {
        commit('web3/setMessage', "No web3 provider detected", { root: true })
        return;
      }

      // Call API to check if user is registered
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
      const signature = await web3_al.eth.personal.sign(message, user.address);

      // send signature to server
      return AuthService.web3Login(userData, signature).then(
        user => {
          commit('loginSuccess', user);
          commit('web3/setMessage', `Logged in: ${user.address}`, { root: true })
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          commit('web3/setMessage', "Login Failed", { root: true })
          return Promise.reject(error);
        }
      );
    },
    /*
    @dev: refreshToken
    @params: accessToken
    @return: accessToken
    */
    refreshToken({ commit }, accessToken) {
      commit('refreshToken', accessToken);
    },

    /*
    @dev: editProfile
    @params: payload.id, payload.username, payload.email, payload.imageUrl, payload.bio, payload.website, payload.twitter 
    @return: user
    */
    editProfile({ commit }, payload) {
      return AuthService.editProfile(payload).then(
        data => {
          commit('editProfile', data);
          commit('web3/setMessage', "Profile updated", { root: true })
          return Promise.resolve(data);
        },
        error => {
          console.log(error)
          commit('web3/setMessage', "Error updating Profile", { root: true })
          return Promise.reject(error);
        }
      );
    },
    /*
    @dev: uploadProfileImg
    @params: payload.id, payload.imageUrl
    @return: user
    */
    uploadProfileImg({ commit, dispatch }, payload) {
      return AuthService.upload(payload).then(
        data => {
          commit('uploadProfileImg', data);
          commit('web3/setMessage', "Profile image updated", { root: true })
          return Promise.resolve(data);
        },
        error => {
          if (error.response && error.response.status === 403) {
            dispatch('logout')
          }
          commit('web3/setMessage', "Error updating Profile image", { root: true })
          return Promise.reject(error);
        }
      );
    },
    /*
    @dev: only for admin, delete user by id
    @params: id
    @return: data.message
    */
    deleteUserById({ commit, dispatch }, id) {
      return AuthService.deleteUserById(id).then(
        data => {
          commit('web3/setMessage', data.message, { root: true })
          return Promise.resolve(data);
        },
        error => {
          if (error.response && error.response.status === 403) {
            dispatch('logout')
          }
          commit('web3/setMessage', "Error deleting user", { root: true })
          return Promise.reject(error);
        }
      );
    },
    /*
    @dev: delete user
    @params: none
    @return: data.message
    */
    deleteUser({ commit }) {
      return AuthService.deleteUser().then(
        data => {
          commit('logout');
          commit('web3/setMessage', data.message, { root: true })
          return Promise.resolve(data);
        },
        error => {
          console.log(error)
          commit('web3/setMessage', "Error deleting User", { root: true })
          return Promise.reject(error);
        }
      );
    },
    /*
    @dev: sendVerify
    @params: none
    @return: data.message

    Send a confirmation email to the user
    */
    sendVerify ({ commit, dispatch }) {
      return AuthService.sendVerify().then(
        (data) => {
          // commit('sendVerify', data)
          commit('web3/setMessage', data.message, { root: true });
          return Promise.resolve(data)
        },
        (error) => {
          if (error.response && error.response.status === 403) {
            dispatch('logout')
          }
          commit('web3/setMessage', `Error sending email: ${error}`, { root: true })
          return Promise.reject(error)
        }
      )
    },
    /*
    @dev: fetchCreators -> Community
    @params: none
    @return: creators array
    */
    fetchCreators({ commit }) {
      return AuthService.fetchCreators().then(
        data => {
          commit('setCreators', data);
          return Promise.resolve(data);
        },
        error => {
          commit('web3/setMessage', "Error fetching creators", { root: true })
          return Promise.reject(error);
        }
      );
    },
    /*
    @dev: whitelistAddress
    @params: payload.address
    @return: data.message
    */
    async whitelistAddress({ commit }, payload) {
      const address = payload.address;
   
     // await nftContract.methods.grantCollectionRole(1, address).call();
      AuthService.whitelistAddress(address).then(
        data => {

          commit('web3/setMessage', data.message)
          return Promise.resolve(data);
        },
        error => {
          commit('web3/setMessage', "Whitelist Failed", { root: true })
          return Promise.reject(error);
        }
      );
    },
  },
  // Setters
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
  // Getters
  getters: {
    loadedCreators(state) {
      return state.creators;
    },
  }
};