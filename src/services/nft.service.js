const axios = require("axios");


class NftService {
  loadNft(tokenURI) {
    return axios.get(tokenURI)
      .then(response => {
        return response.data;
      })
  }

}

export default new NftService();