import http from "../http-common";

class WishListDataService {
  process(data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/wishlist/process", data, config);
  }

  getAll(id) {
    return http.post("/wishlist/findAll/" + id);
  }

  delete(data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/wishlist/deleteOneByOne", data, config);
  }
}

export default new WishListDataService();
