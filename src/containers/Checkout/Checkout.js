import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = props => {
  const navigate = useNavigate();

  const checkoutCanceledHandler = () => {
    // навигация назад
    navigate(-1);
  }

  const checkoutContinuedHandler = () => {
    navigate("/checkout/contact-data", { replace: true });
  }

  // при перезагрузке страницы теряются props.ings и Navigate отпраляет пользователя на начальную страницу
  let summary = <Navigate to='/' />;
  if (props.ings) {
    // если заказ отправлен, Navigate отпраляет пользователя на начальную страницу
    const purchasedRedirect = props.purchased ? <Navigate to='/' /> : null;
    // при наличии props.ings рендерим checkoutSummary
    // при нажатии на кнопку success перенапрявляемся на checkout/contact-data
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary 
          ingredients={props.ings} 
          checkoutCanceled={checkoutCanceledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Routes>
          <Route
            path={"/contact-data"} 
            element={<ContactData />}
          />
        </Routes>
      </div>
    )
  }
  return summary
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);