import http from "../http-common";

class CheckoutDataService {
  process(data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/checkout/checkout", data, config);
  }
}

export default new CheckoutDataService();
