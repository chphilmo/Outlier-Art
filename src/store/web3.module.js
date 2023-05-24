require('dotenv').config();

import detectEthereumProvider from '@metamask/detect-provider';
// import EventBus from '../common/EventBus';

const wConnected = localStorage.getItem('walletConnected');

export const web3 = {
  namespaced: true,
  state: {
    walletAddress: '',
    message: '',
    walletConnected: wConnected
  },
  actions: {    
    async connectWallet({ commit }) {
      if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          commit('connectWallet', addressArray[0]);
          // set message
          commit('setMessage', `Connected to ${addressArray[0]}`);
          commit('setWalletConnected', true);
        } catch (err) {
          console.log(err.message);
        }
      }
    },
    // get current wallet address if the network is not on Polygon Mumbai Testnet
    // Request user to change network to Polygon Mumbai Testnet
    async getCurrentWallet({ commit, state }) {
      if (!state.walletConnected) {
        commit('setMessage', 'Please connect to the Polygon Mumbai Testnet');
        return;
      }
      const provider = await detectEthereumProvider();
      if (provider) {
        if (provider !== window.ethereum) {
          console.error('Do you have multiple wallets installed?');
        }
        const chainId = await provider.request({
          method: 'eth_chainId'
        });
        if (chainId !== '0x13881') {
          // Request MetaMask to connect to Polygon Mumbai Testnet
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13881' }],
          });
          console.error('Please connect to the Polygon Mumbai Testnet');
          // set message
          commit('setMessage', 'Please connect to the Polygon Mumbai Testnet');
        } else {
          try {
            const addressArray = await window.ethereum.request({
              method: "eth_accounts",
            });
            if (addressArray.length > 0) {
              commit('connectWallet', addressArray[0]);
              // set message
              commit('setMessage', `Connected to ${addressArray[0]}`);
            } else {
              console.log('Please connect to MetaMask.');
              // set message
              commit('setMessage', 'Please connect to MetaMask.');
            }
          } catch (err) {
            console.log(err.message);
          }
        }
      } else {
        console.log('Please install MetaMask!');
        // set message
        commit('setMessage', 'Please install MetaMask!');
      } 
    },

    // disconnect metamask wallet
    async disconnectWallet({ commit }) {
      if (window.ethereum) {
          localStorage.removeItem("walletConnected");
          commit('connectWallet', '');
          // set message
          commit('setMessage', 'Wallet disconnected');
      }
    },
   
    
  },

  mutations: {
    connectWallet(state, payload) {
      state.walletAddress = payload;
    },
    setMessage(state, payload) {
      state.message = payload;
    },
    setWalletConnected(state, payload) {
      state.walletConnected = payload;
      localStorage.setItem("walletConnected", true);
    }
  },
  getters: {
    loadedWallet (state) {
      return state.walletAddress;
    },
    getMessage (state) {
      return state.message;
    },
    isConnectedWallet (state) {
      return state.walletConnected;
    }
  }
};