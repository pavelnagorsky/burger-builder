import { put } from 'redux-saga/effects';

import axios from "../../axios-orders";
import * as actions from '../actions/index';

export function* purchaseBurgerSaga (action) {
  yield put(actions.purchaseBurgerStart());
  const response = yield axios.post("/orders.json?auth=" + action.token, action.orderData);
  try {
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga (action) {
  yield put(actions.fetchOrdersStart());
  const queryParams = yield '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
  const response = yield axios.get("/orders.json" + queryParams);
  try {
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch( err ) {
    yield put(actions.fetchOrdersFail(err));
  }
}

export function* deleteOrderSaga (action) {
  yield axios.delete("/orders/" + action.orderId + ".json?auth=" + action.token);
  try {
    yield put(actions.deleteOrderSuccess());
    yield put(actions.fetchOrders(action.token, action.userId));
  } catch ( err ) {
    console.log("err: " + err)
  };
}