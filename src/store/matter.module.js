import MatterService from '../services/matter.service';


export const matter = {
  namespaced: true,
  state: {
    ethPrice: ''
  },
  actions: {
    getEthPrice({ commit }) {
      return MatterService.getEthPrice().then(
        data => {
          commit('getEthPrice', data);
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
    
    getEthPrice(state, payload) {

      state.ethPrice = payload;
    },
    
  },
  getters: {
    getEthPrice (state) {
      return state.ethPrice;
    }
}
}