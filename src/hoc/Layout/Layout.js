import React, { useState } from "react";
import { connect } from 'react-redux';
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/NavigationItems/SideDrawer/SideDrawer";
import cssClasses from "./Layout.css"

const Layout = props => {
  const [showSideDrawer, setShowDriver] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowDriver(false);
  }

  const sideDrawerToggleHandler = () => {
    setShowDriver(!showSideDrawer);
  }

  return (
    <Aux>
      <Toolbar 
        isAuth={props.isAuthenticated}
        sideDrawerClicked={sideDrawerToggleHandler}
      />
      <SideDrawer 
        isAuth={props.isAuthenticated}
        open={showSideDrawer} 
        closed={sideDrawerClosedHandler}
      />
      <main className={cssClasses.Content}>
        {props.children}
      </main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect( mapStateToProps )( Layout );
