import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

const Logout = props => {
  useEffect(() => {
    props.onLogout();
  }, []);

  return <Navigate to='/'/>
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);