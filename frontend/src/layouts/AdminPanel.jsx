import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import Sidebar from "components/Sidebar/Sidebar";

import routes from "routes.js";

import image from "assets/img/sidebar-3.jpg";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open"
    };
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };;
  
  render() {
    const padd={
      padding:"20px",
      margin:"40px"
    }
    return (
      <div style={padd}>
        <Sidebar {...this.props} routes={routes} title={"Store Admin"} image={this.state.image}
        color={this.state.color}
        hasImage={this.state.hasImage}/>
        <div id="main-panel" className="container-fluid">
          <Switch>{this.getRoutes(routes)}</Switch>
        </div>
      </div>
    );
  }
}

export default Admin;
