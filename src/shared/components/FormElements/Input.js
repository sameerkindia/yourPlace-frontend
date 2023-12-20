// import React, { useReducer, useEffect } from 'react';

// import { validate } from '../../util/validators';
// import './Input.css';

// const inputReducer = (state, action) => {
//   switch (action.type) {
//     case 'CHANGE':
//       return {
//         ...state,
//         value: action.val,
//         isValid: validate(action.val, action.validators)
//       };
//     case 'TOUCH': {
//       return {
//         ...state,
//         isTouched: true
//       }
//     }
//     default:
//       return state;
//   }
// };

// const Input = props => {
//   const [inputState, dispatch] = useReducer(inputReducer, {
//     value: props.initialValue || '',
//     isTouched: false,
//     isValid: props.initialValid || false
//   });

//   const { id, onInput } = props;
//   const { value, isValid } = inputState;

//   useEffect(() => {
//     onInput(id, value, isValid)
//   }, [id, value, isValid, onInput]);

//   const changeHandler = event => {
//     dispatch({
//       type: 'CHANGE',
//       val: event.target.value,
//       validators: props.validators
//     });
//   };

//   const touchHandler = () => {
//     dispatch({
//       type: 'TOUCH'
//     });
//   };

//   const element =
//     props.element === 'input' ? (
//       <input
//         id={props.id}
//         type={props.type}
//         placeholder={props.placeholder}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//       />
//     ) : (
//       <textarea
//         id={props.id}
//         rows={props.rows || 3}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//       />
//     );

//   return (
//     <div
//       className={`form-control ${!inputState.isValid && inputState.isTouched &&
//         'form-control--invalid'}`}
//     >
//       <label htmlFor={props.id}>{props.label}</label>
//       {element}
//       {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
//     </div>
//   );
// };

// export default Input;

import { useEffect, useReducer } from "react";
import "./Input.css";
import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouch: true,
      };
    default:
      return state;
  }
};

function Input({
  id,
  label,
  rows,
  type,
  InputElement,
  placeholder,
  errorText,
  validators,
  onInput,
  inputValue,
  valid,
}) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: inputValue || "",
    isValid: valid || false,
    isTouch: false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({ type: "CHANGE", value: e.target.value, validators: validators });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    InputElement === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={inputState.value}
        onBlur={touchHandler}
        onChange={changeHandler}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        value={inputState.value}
        onChange={changeHandler}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouch && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && inputState.isTouch && <p>{errorText}</p>}
    </div>
  );
}

export default Input;
