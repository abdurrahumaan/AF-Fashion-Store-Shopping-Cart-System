import http from "../http-common";
class EmailService {
  sendEmail(data) {
    var config = { "Access-Control-Allow-Origin": "*" };
    return http.post("/sendemail/send", data, config);
  }
}

export default new EmailService();
