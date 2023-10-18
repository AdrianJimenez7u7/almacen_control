import React, { Component } from "react";
import "../assets/css/lateralBar.css";
import logoPiscologia from "../assets/images/unnamed.jpg";
import { Item } from "./lateralBar/item.js";
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
class LateralBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      closed: window.innerWidth < 800,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (window.innerWidth < 800) {
      this.setState({ closed: true, locked: false });
    }
  };

  toggleLock = () => {
    this.setState((state) => ({ locked: !state.locked }));
  };

  toggleSidebar = () => {
    this.setState((state) => ({ closed: !state.closed }));
  };

  handleMouseOver = () => {
    if (!this.state.locked) {
      this.setState({ closed: false });
    }
  };

  handleMouseOut = () => {
    if (!this.state.locked) {
      this.setState({ closed: true });
    }
  };

  render() {
    const { locked, closed } = this.state;
    return (
      <nav
        className={`sidebar ${locked ? "locked" : ""} ${closed ? "close" : ""}`}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <div className="logo_items flex">
          <span className="nav_image">
            <img src={logoPiscologia} alt="logo" />
          </span>
          <span className="logo_name">SU CHA</span>
          <i
            className={`bx ${locked ? "bx-lock-alt" : "bx-lock-open-alt"}`}
            id="lock-icon"
            title="Unlock Sidebar"
            onClick={this.toggleLock}
          ></i>
          <i
            className="bx bx-x"
            id="sidebar-close"
            onClick={this.toggleSidebar}
          ></i>
        </div>
        <div className="menu_container">
          <div className="menu_items">
            <ul className="menu_item">
              <div className="menu_title flex">
                <span className="title">Dashboard</span>
                <span className="line"></span>
              </div>
              <li>
                <Item
                  link="https://mi-website.com"
                  textSpan="Mi enlace"
                  iconName="bx bx-home-alt"
                />
              </li>
              <li>
                <Item
                  link="https://mi-website.com"
                  textSpan="Mi enlace"
                  iconName="bx bx-home-alt"
                />
              </li>
            </ul>
            <ul className="menu_item">
              <div className="menu_title flex">
                <span className="title">Editor</span>
                <span className="line"></span>
              </div>
              <li>
                <Item
                  link="/productos"
                  textSpan="Productos"
                  iconName="bx bx-home-alt"
                />
              </li>
              <li>
                <Item
                  link="/categorias"
                  textSpan="Categorias"
                  iconName="bx bx-home-alt"
                />
              </li>
            </ul>
            <ul className="menu_item">
              <div className="menu_title flex">
                <span className="title">Setting</span>
                <span className="line"></span>
              </div>
              <li>
                <Item
                  link="https://mi-website.com"
                  textSpan="Mi enlace"
                  iconName="bx bx-home-alt"
                />
              </li>
            </ul>
          </div>
          <div className="sidebar_profile flex">
            <span className="nav_image">
              <img src="../../img/usuario.jpg" alt="logo_img" />
            </span>
            <div className="data_text">
              <span className="name">Adrian Jimenez</span>
              <br></br>
              <span className="email">isc_mjimenez2021@accitesz.com</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default LateralBar;