import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/order';
import { updateObject } from "../../../shared/utility";
import { checkValidity } from "../../../shared/validation";
import cssClasses from "./ContactData.css";

const ContactData = props => {

  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      labelName: "Name",
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your email'
      },
      value: '',
      validation: {
        required: true
      },
      labelName: "Email",
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Country'
      },
      value: '',
      validation: {
        required: true
      },
      labelName: "Country",
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Street'
      },
      labelName: "Street",
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your postal code (5 symbols)'
      },
      labelName: "Postal code",
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: "fastest", displayValue: "Fastest"},
          {value: "cheapest", displayValue: "Cheapest"}
        ]
      },
      labelName: "Delivery method",
      value: 'fastest',
      validation: {},
      valid: true
    }
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementKey in orderForm) {
      formData[formElementKey] = orderForm[formElementKey].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    };
    props.onOrderBurger(order, props.token)
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
      touched: true
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  }

  let formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(el => {
        return (
          <div key={el.id}>
            <label
              key={el.config.labelName}
              >{el.config.labelName}
            </label>
            <Input 
              key={el.id} 
              elementType={el.config.elementType} 
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              invalid={!el.config.valid}
              shouldValidate={el.config.validation}
              touched={el.config.touched}
              changed={(event) => inputChangedHandler(event, el.id)}
            />
          </div>
        );
      })}
      <Button 
        btnType="Success" 
        disabled={!formIsValid}
      >
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />
  }
  return (
    <div className={cssClasses.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));