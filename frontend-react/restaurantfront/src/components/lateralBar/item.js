import React, { Component } from "react";
import { Link } from "react-router-dom"; // Importando Link de react-router-dom

class Item extends Component {
  render() {
    const {link, textSpan, iconName} = this.props;
    return (
      <div className="item">
        <Link to={link} className="link flex"> {/* Cambiando <a> por <Link> */}
          <i className={iconName}></i>
          <span>{textSpan}</span>
        </Link> {/* Cerrando el componente <Link> */}
      </div>
    );
  }
}

export {Item};
