import http from "../http-common";

class CommentDataService {
  create(id, data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/comments/create/" + id, data, config);
  }

  getAll(id) {
    return http.get("/comments/getAll/" + id);
  }

  update(id, data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/comments/update/" + id, data, config);
  }
}

export default new CommentDataService();
