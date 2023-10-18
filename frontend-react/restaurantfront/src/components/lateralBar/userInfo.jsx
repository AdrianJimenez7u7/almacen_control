import React, { Component } from "react";

class userInfo extends Component {
  render() {
    const {image, textName, Email} = this.props;
    return (
        <div className="sidebar_profile flex">
        <span className="nav_image">
          <img src={image} alt="user" />
        </span>
        <div className="data_text">
          <span className="name">{textName}</span>
          <span className="email">{Email}</span>
        </div>
      </div>
    );
    }
}
export {userInfo};