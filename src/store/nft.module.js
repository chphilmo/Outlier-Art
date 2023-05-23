require('dotenv').config();
const API_URL = process.env.VUE_APP_API_URL_NFA;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

import detectEthereumProvider from '@metamask/detect-provider';

const ecosysToken = require("../../artifacts/contracts/Archetype.sol/Archetype.json");

const ecosysVendor = require("../../artifacts/contracts/Vendor.sol/Vendor.json");  

const ecosysAddress = "0x94b5d68d7D67045AB2e31182823EEDf876172dBc";
const vendorAddress = "0xf83Be9C7c4dd7669D3e460Cb65b072453791EC61";

const ecosysContract = new web3.eth.Contract(ecosysToken.abi, ecosysAddress);

const vendorContract = new web3.eth.Contract(ecosysVendor.abi, vendorAddress);

export const nft = {
  namespaced: true,
  state: {
    walletAddress: '',
    balance: '',
    message: ''
  },
  actions: {    
    async connectWallet({ commit }) {
      if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          commit('connectWallet', addressArray[0]);
        } catch (err) {
          console.log(err.message);
        }
      }
    },
    // get current wallet address if the network is not on Polygon Mumbai Testnet
    // Request user to change network to Polygon Mumbai Testnet
    async getCurrentWallet({ commit }) {
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
        } else {
          try {
            const addressArray = await window.ethereum.request({
              method: "eth_accounts",
            });
            if (addressArray.length > 0) {
              commit('connectWallet', addressArray[0]);
            } else {
              console.log('Please connect to MetaMask.');
            }
          } catch (err) {
            console.log(err.message);
          }
        }
      } else {
        console.log('Please install MetaMask!');
      } 
    },
    async getAccountBalance({ commit }, payload) {

      const wAddress = payload

      const balance = await ecosysContract.methods.balanceOf(wAddress).call();

      commit('setBalance', balance);
    },
  
    async buyEco({ commit }, payload) {

      const amount = payload.amount;
      const wAddress = payload.walletAddress;


      await vendorContract.methods.buyTokens()
      .send({
        'from': wAddress,
        'value': web3.utils.toWei(amount.toString(), "ether"),
        gas: 1000000,
      })
      .on("confirmation", () => {
        commit('setMessage', "Completed")
      })
      .catch(function(error) {
        console.log(error);
        commit('setMessage', error);
      })


    },
    async sellEco({ commit }, payload) {

      const amount = payload.amount;
      const wAddress = payload.walletAddress;


      await vendorContract.methods.sellTokens(web3.utils.toWei(amount.toString(), "ether"))
      .send({
        'from': wAddress,
        gas: 1000000,
      })
      .on("confirmation", () => {
        commit('setMessage', "Completed")
      })
      .catch(function(error) {
        console.log(error);
        commit('setMessage', error);
      })


    
    },
    async withdrawToken({ commit }, payload) {

      const wAddress = payload.address;


      await vendorContract.methods.withdraw()
      .send({
        'from': wAddress,
        gas: 1000000,
      })
      .on("confirmation", () => {
        commit('setMessage', "Completed")
      })
      .catch(function(error) {
        console.log(error);
        commit('setMessage', error);
      })


    },
  },

  

  mutations: {
    connectWallet(state, payload) {
      state.walletAddress = payload;
    },
    setBalance(state, payload) {
      state.balance = payload;
    },
    setMessage(state, payload) {
      state.message = payload;
    }
  },
  getters: {
    loadedWallet (state) {
      return state.walletAddress;
    },
    getMessage (state) {
      return state.message;
    },
    getBalance (state) {
      return state.balance;
    }
  }
};