import React, { Component } from "react";
import { Form, FormGroup } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserDataService from "../controllers/user.service";

import Card from "components/Card/Card";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.doRegister = this.doRegister.bind(this);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password1: "",
      password2: "",
    };
  }

  doRegister(e) {
    e.preventDefault();
    if (
      this.state.fname != "" &&
      this.state.email != "" &&
      this.state.password1 != "" &&
      this.state.password2 != ""
    ) {
        if(this.state.password1===this.state.password2){
            UserDataService.create({
                fname: this.state.fname,
                email: this.state.email,
                password: this.state.password1,
              })
                .then((response) => {
                  window.location = "/login";
                })
                .catch((e) => {
                  alert(e.response.data["message"]);
                });
        }else{
            alert("Passwords does not match");
        }
    } else {
      alert("Please fill initial fields");
    }
  }

  onUpdateFnameChange(event) {
    this.setState({ fname: event.target.value });
  }
  onUpdateLnameChange(event) {
    this.setState({ lname: event.target.value });
  }
  onUpdateEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  onUpdatePassword1Change(event) {
    this.setState({ password1: event.target.value });
  }
  onUpdatePassword2Change(event) {
    this.setState({ password2: event.target.value });
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <Card
            title="User Register"
            category="We welcome you new User, Register yourself to become our member"
            content={
              <Form className="login-form">
                <FormGroup>
                  <label>First Name</label>
                  <br />
                  <input
                    className="form-control"
                    type="fname"
                    onChange={this.onUpdateFnameChange.bind(this)}
                    placeholder="First Name"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Last Name</label>
                  <br />
                  <input
                    className="form-control"
                    type="lname"
                    onChange={this.onUpdateLnameChange.bind(this)}
                    placeholder="Last Name"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Email</label>
                  <br />
                  <input
                    className="form-control"
                    type="email"
                    onChange={this.onUpdateEmailChange.bind(this)}
                    placeholder="Email"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Password</label>
                  <br />
                  <input
                    className="form-control"
                    type="password"
                    onChange={this.onUpdatePassword1Change.bind(this)}
                    placeholder="password"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Confirm-Password</label>
                  <br />
                  <input
                    className="form-control"
                    type="password"
                    onChange={this.onUpdatePassword2Change.bind(this)}
                    placeholder="password"
                  />
                </FormGroup>

                <input
                  type="submit"
                  onClick={this.doRegister}
                  value="Sign Up"
                  className="form-control btn btn-success btn-fill"
                />

              </Form>
            }
          />
        </div>
      </div>
    );
  }
}

export default SignUp;
