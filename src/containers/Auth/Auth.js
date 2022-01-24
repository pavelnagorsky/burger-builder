import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import cssClasses from './Auth.css';
import * as actions from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject } from "../../shared/utility";
import { checkValidity } from "../../shared/validation";

const Auth = props => {
  
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    },
  });
  
  const [isSignup, setIsSignup] = useState(true);

  // если бургер не начинали строить, то ссылку редиректа после аутентификации меняем на '/'
  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath();
    }
  }, []);

  // на изменеие поля ввода проводим валидацию
  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], { 
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true
      })
    })
    setControls(updatedControls);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignup
    )
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  }

  let formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input 
      className={cssClasses.Input}
      key={formElement.id}
      elementType={formElement.config.elementType} 
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner /> 
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>
  }

  let authRedirect = null;
  // нужен проп replace, чтобы при отмене заказа 
  // пользователя перенаправляло (navigate(-1)) на burgerBuilder, а не auth
  // так как при authRedirectPath === '/checkout' пользователь не сможет выйти из checkout
  if (props.isAuthenticated) {
    authRedirect = <Navigate to={props.authRedirectPath} replace />
  }

  return (
    <div className={cssClasses.Auth}>
      {authRedirect}
      <div className={cssClasses.Header}>{isSignup ? 'SIGN UP' : 'LOGIN'}</div>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button 
        clicked={switchAuthModeHandler}
        btnType='Danger'
      >
        SWITCH TO {isSignup ? 'LOGIN' : 'SIGNUP'}
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( Auth );