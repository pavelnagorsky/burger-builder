import React from "react";
import cssStyles from "./Button.css";

const button = (props) => (
  <button 
    onClick={props.clicked} 
    className={[cssStyles.Button, cssStyles[props.btnType]].join(' ')}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default button;

