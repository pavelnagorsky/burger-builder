import React from "react";
import cssClasses from "./Input.css";

const input = (props) => {
  let inputElement = null;
  const inputCssClasses = [cssClasses.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputCssClasses.push(cssClasses.Invalid);
  }

  switch (props.elementType) {
    case ("input"):
      inputElement = <input 
        className={inputCssClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>
      break;
    case ("textarea"): 
      inputElement = <textarea 
        className={inputCssClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>
      break;
    case ("select"):
      inputElement = (<select 
        className={inputCssClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
      >
        {props.elementConfig.options.map(opt => {
          return (
            <option 
              key={opt.value} 
              value={opt.value}
            >
              {opt.displayValue}
            </option>
          );
        })}
      </select>);
      break;
    default: 
      inputElement = <input 
        className={inputCssClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>
  }
  return(
    <div className={cssClasses.Input}>
      <label className={cssClasses.Label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  )
};

export default input;