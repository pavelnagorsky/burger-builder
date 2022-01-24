import React, { useEffect } from "react";
import { connect } from 'react-redux';

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = props => {
  // вызов функции получения всех заказов с сервера через токен 
  useEffect( () => {
    props.onFetchOrders(props.token, props.userId);
  }, []);

  let orders = <Spinner />;
  // после загрузки мэпится массив заказов
  if (!props.loading){
    orders = props.orders.map(order => (
      <Order 
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
        deleteOrder={props.onDeleteOrder}
        orderId={order.id}
        userId={props.userId}
        token={props.token}
      />
    ));
    // на отсутсвие заказов
    if (props.orders.length === 0) {
      orders = <div 
        style={{
          margin: "1em 0 0.5em 0",
          color: "#807c7c",
          fontWeight: "normal",
          fontSize: "25px",
          textAlign: "center",
          lineHeight: "40px",
          fontFamily: "inherit"
        }}
      >
        NO ORDERS YET
      </div>
    }
  }
  return (
    <div>
      {orders}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    onDeleteOrder: (orderId, userId, token) => dispatch(actions.deleteOrder(orderId, userId, token))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler(Orders, axios) );