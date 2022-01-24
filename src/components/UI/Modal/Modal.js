import React from "react";
import cssStyles from "./Modal.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {

  // shouldComponentUpdate(nextProps, nextState){
  //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  // }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      <div 
        className={cssStyles.Modal}
        style={{
          transform: props.show ? 'translateY(-10vh)' : 'translateY(-300vh)',
          opacity: props.show ? "1" : "0",
          // display: props.show ? "" : "none"
        }}
      >
        {props.children}
      </div>
    </Aux>
  )
};

export default React.memo(modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);