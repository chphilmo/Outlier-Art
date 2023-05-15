require('dotenv').config();
const API_URL = process.env.VUE_APP_API_URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const ecosysToken = require("../../artifacts/contracts/Ecosys.sol/Ecosys.json");

const ecosysVendor = require("../../artifacts/contracts/Vendor.sol/Vendor.json");  

const ecosysAddress = "0x8b7da288348D4668B037e07213784692799806b9";
const vendorAddress = "0x924689dA7b74b0D30C827e6B3D3A0469879f1B7c";

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
    async getCurrentWallet({ commit }) {
      if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (addressArray.length > 0) {
            commit('connectWallet', addressArray[0]);
          }
        } catch (err) {
          console.log(err.message);
        }
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
        'value': web3.utils.toWei(amount.toString(), "ether")
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
        'from': wAddress
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
        'from': wAddress
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