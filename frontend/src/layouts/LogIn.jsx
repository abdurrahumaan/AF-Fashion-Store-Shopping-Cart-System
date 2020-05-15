import React, { Component } from "react";
import { Button, Form, FormGroup } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserDataService from "../controllers/user.service";
import Card from "components/Card/Card";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.doLogin = this.doLogin.bind(this);
    this.state = {
      username: "",
      password: "",
    };
  }

  onUpdateUsername(event) {
    this.setState({ username: event.target.value });
  }

  onUpdatePassword(event) {
    this.setState({ password: event.target.value });
  }

  doLogin(e) {
    e.preventDefault();
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      UserDataService.login({
        email: this.state.username,
        password: this.state.password,
      })
        .then((response) => {
          localStorage.setItem(
            "uid",
            JSON.stringify(response.data["data"]["id"])
          );
          localStorage.setItem(
            "utype",
            JSON.stringify(response.data["data"]["usertype"])
          );
          window.location = "/";
        })
        .catch((e) => {
          alert(e.response.data["message"]);
        });
    } else {
      alert("Username and password cannot be empty");
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <br></br>
          <br></br>
          <Card
            title="User Login"
            category="Welcome to our Store"
            content={
              <Form className="login-form">
                <FormGroup>
                  <label>Email</label>
                  <br />
                  <input
                    className="form-control"
                    onChange={this.onUpdateUsername.bind(this)}
                    type="email"
                    placeholder="Please Enter Your Email"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Password</label>
                  <br />
                  <input
                    className="form-control"
                    onChange={this.onUpdatePassword.bind(this)}
                    type="password"
                    placeholder="password"
                  />
                  <br />
                  <input
                    type="submit"
                    onClick={this.doLogin}
                    value="Log In"
                    className="form-control btn btn-primary btn-fill"
                  />
                </FormGroup>
                <div className="text-center pt-3">
                  Or continue with your social accounts
                </div>
              </Form>
            }
          />
        </div>
      </div>
    );
  }
}

export default LogIn;
