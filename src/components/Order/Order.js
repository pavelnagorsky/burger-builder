import React from "react";

import cssClasses from "./Order.css";
import Button from "../UI/Button/Button";

const order = ( props ) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  const ingredientOutput = ingredients.map( ig => {
    return <span key={ig.name} className={cssClasses.IgOutput}>{ig.name} ({ig.amount})</span>
  })
  return (
    <div className={cssClasses.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
      <Button btnType="Danger" clicked={() => props.deleteOrder(props.orderId, props.userId, props.token)}>DELETE</Button>
    </div>
  )
}

export default order;