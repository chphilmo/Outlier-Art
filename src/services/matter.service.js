import api from "./api";

class MatterService {
  
  getEthPrice() {
    return api
      .get("/metrics/market-data")
      .then(response => {
        return response.data.data.market_data.price_usd;
      });
  }
  

}

export default new MatterService();