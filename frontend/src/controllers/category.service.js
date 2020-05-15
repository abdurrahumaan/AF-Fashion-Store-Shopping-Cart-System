import http from "../http-common";

class CategoryDataService {
  create(data) {
    var config = { "Access-Control-Allow-Origin": "*" };

    return http.post("/categories/create", data, config);
  }

  getAll() {
    return http.get("/categories/findAll");
  }

  findActivatedOnly() {
    return http.get("/categories/findActivatedOnly");
  }

  delete(id) {
    return http.get("/categories/delete/" + id);
  }

  deactive(id) {
    return http.get("/categories/deactive/" + id);
  }

  update(id,data) {
    var config = { "Access-Control-Allow-Origin": "*" };

    return http.post("/categories/update/" + id, data, config);
  }
}

export default new CategoryDataService();
