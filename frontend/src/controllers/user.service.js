import http from "../http-common";

class UserDataService {
  create(data) {
    var config = { "Access-Control-Allow-Origin": "*" };

    return http.post("/user/create", data, config);
  }

  getAll() {
    return http.get("/user/findAll");
  }

  getShopAll() {
    return http.get("/user/findShopUsers");
  }

  update(id,data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/user/update/" + id, data, config);
  }

  login(data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/user/findByUnPw/", data, config);
  }
}

export default new UserDataService();
