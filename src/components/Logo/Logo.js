import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import cssStyles from "./Logo.css";

const logo = (props) => (
  <div className={cssStyles.Logo} style={{height: props.height}}>
    <img alt="burger logo" src={burgerLogo} />
  </div>
);

export default logo;