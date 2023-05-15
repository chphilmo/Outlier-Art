import UserService from '../services/user.service';

export const user = {
  namespaced: true,
  state: {
    userArray: []
  },
  actions: {
    loadUsers({ commit }) {
      return UserService.loadUser().then(
        data => {
          const obj = data;
          const users = [];
          for (let key in obj) {
            users.push({
              id: obj[key].id,
              username: obj[key].username,
              imageUrl: obj[key].imageUrl
            })
          }
          commit('fetchedUsers', users);
          return Promise.resolve(data);
        },
        error => {
          console.log(error)
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    fetchedUsers(state, payload) {
      state.userArray = payload;
    }
  },
  getters: {
    loadedUsers (state) {
    //return state.loadedMatter.reverse()
      return state.userArray;
    },
    loadedUser (state) {
      return (elementId) => {
        return state.userArray.find((user) => {
          return user.id === elementId
        })
      } 
    }
  }
};