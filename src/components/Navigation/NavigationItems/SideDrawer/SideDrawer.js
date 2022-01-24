import React from "react";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import Aux from "../../../../hoc/Auxiliary/Auxiliary"
import cssClasses from "./SideDrawer.css";

const sideDrawer = (props) => {
  let attachedCssClasses = [cssClasses.SideDrawer, cssClasses.Close];
  if (props.open) {attachedCssClasses = [cssClasses.SideDrawer, cssClasses.Open];}
  return(
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedCssClasses.join(" ")}>
        <div className={cssClasses.Logo}>
          <Logo/>
        </div>
        <nav onClick={props.closed}>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;