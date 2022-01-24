import React from "react";
import Burger from "../../Burger/Burger";
import cssClasses from "./CheckoutSummary.css";
import Button from "../../UI/Button/Button";


const checkoutSummary = (props) => {
  return (
    <div className={cssClasses.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={cssClasses.Burger}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button 
        btnType="Danger"
        clicked={props.checkoutCanceled}>
        CANCEL
      </Button>
      <Button 
        btnType="Success"
        clicked={props.checkoutContinued}>
        SUCCESS
      </Button>
    </div>
  )
}

export default checkoutSummary;