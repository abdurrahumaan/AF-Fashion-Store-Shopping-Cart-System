import React from "react";
import { Navbar } from "react-bootstrap";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Login from "./LogIn";
import HomeContent from "./HomeContent";
import SignUp from "./SignUp";
import AdminDashboard from "./AdminPanel";
import StoreDashboard from "./StoreUserPanel";
import Cart from "./Cart";
import ContactUs from "./ContactUs";
import Wishlist from "./WishList";
import ProductView from "./ProductView";

function Logged(props) {
  const isLoggedIn = localStorage.getItem("uid") == null;
  if (isLoggedIn) {
    return (
      <NavItem>
        <Link to={"/register"}>Register</Link>
      </NavItem>
    );
  }
  return "";
}

function Logout() {
  localStorage.clear();
  window.location = "/";
}

const Home = (props) => {
  return (
    <Router>
      <div className="container">
        <Navbar>
          <Navbar.Collapse>
            <div>
              <Nav pullLeft>
                <NavItem>
                  <Link to={"/"}>FASHION STORE</Link>
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem>
                  <Link to={"/"}>Home</Link>
                </NavItem>
                {localStorage.getItem("uid") != null ? (
                  <NavItem>
                    <Link to={"/cart"}>Cart</Link>
                  </NavItem>
                ) : (
                  ""
                )}
                {localStorage.getItem("uid") != null ? (
                  <NavItem>
                    <Link to={"/wishlist"}>WishList</Link>
                  </NavItem>
                ) : (
                  ""
                )}

                {localStorage.getItem("uid") != null ? (
                  localStorage.getItem("utype") == 1 ? (
                    <NavItem>
                      <Link to={"/admin/dashboard"}>Admin Panel</Link>
                    </NavItem>
                  ) : localStorage.getItem("utype") == 2 ? (
                    <NavItem>
                      <Link to={"/store/addProduct"}>Store User Panel</Link>
                    </NavItem>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <Logged />
                {localStorage.getItem("uid") == null ? (
                  <NavItem>
                    <Link to={"/login"}>Log In</Link>
                  </NavItem>
                ) : (
                  <NavItem>
                    <Link onClick={Logout}>Logout</Link>
                  </NavItem>
                )}
                <NavItem>
                  <Link to={"/contactus"}>Contact Us</Link>
                </NavItem>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <br />
        <Switch>
          <Route exact path="/" component={HomeContent} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/contactus" component={ContactUs} />
          <Route
            path="/admin"
            component={
              localStorage.getItem("uid") == null
                ? Login
                : localStorage.getItem("utype") == 1
                ? AdminDashboard
                : Login
            }
          />
          <Route
            path="/store"
            component={
              localStorage.getItem("uid") == null
                ? Login
                : localStorage.getItem("utype") == 2
                ? StoreDashboard
                : Login
            }
          />
          <Route path="/cart" component={Cart} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/productView/:id" component={ProductView} />
        </Switch>
      </div>
    </Router>
  );
};

export default Home;
