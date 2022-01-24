import { put } from 'redux-saga/effects';

import axios from "../../axios-orders";
import * as actions from '../actions/index';

export function* initIngredientsSaga (action) {
  const response = yield axios.get("/ingredients.json");
  try {
    const ingredients = response.data;
    // sorting that way to salad being on top
    let sortedIngredients = {}
    sortedIngredients["salad"] = ingredients["salad"];
    delete ingredients["salad"];
    for (let key in ingredients) {
      sortedIngredients[key] = ingredients[key];
    };
    yield put(actions.setIngredients(sortedIngredients));
  }
  catch(error) {
    yield put(actions.fetchIngredientsFailed())
  }
}