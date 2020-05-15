import http from "../http-common";

class CartDataService {
  process(data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/cart/process", data, config);
  }

  getAll(id) {
    return http.post("/cart/findAllCartItems/"+id);
  }

  delete(data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/cart/deleteOneByOne",data,config);
  }
}

export default new CartDataService();
