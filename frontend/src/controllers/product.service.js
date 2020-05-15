import http from "../http-common";

class ProductDataService {
  create(data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/product/create", data, config);
  }

  getAll() {
    return http.get("/product/findAll");
  }
  
  findAllByUid(data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/product/findallbyuid",data, config);
  }

  getProduct(id) {
    return http.get("/product/getProduct/"+id);
  }

  update(id,data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/product/update/" + id, data, config);
  }

  login(data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/user/findByUnPw/", data, config);
  }
}

export default new ProductDataService();
