import React, { useEffect, Suspense } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = (props) => {

  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.authCheckState());
  }, []);

  let routes = (
    <Routes>
      <Route path="/auth" element={<Auth />}/>
      <Route path="/" element={<BurgerBuilder />}/>
      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  );

  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/checkout/*" element={<Checkout />}/>
        <Route path="/orders" element={<Orders />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/"  element={<BurgerBuilder />}/>
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignUp: () => dispatch(actions.authCheckState())
//   }
// }

export default App;

