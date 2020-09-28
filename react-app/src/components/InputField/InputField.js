import React, { useState } from 'react';
import {TextField} from '@material-ui/core';
import formatString from "format-string-by-pattern";
const mask = {
  ssn: "555-55-5555",
  phoneNumber: "(555) 555-1212",
  zipCode: "12345-6789",
}
export function InputField ({ input, meta, ...props }) {
    const [hasErrorField, setErrorField] = useState(false);
    const handleChange = (event) => {
      if(mask[input.name]) {
        input.onChange(formatString(mask[input.name], event.target.value));
      } else {
        input.onChange(event.target.value);
      }
      if(input.value === "") {
        setErrorField(true);
      } else {
        setErrorField(false);
      }
    }
    const onBlurField = (event) =>{
      if(!event.target.value){ 
        setErrorField(true);
      } else {
        setErrorField(false);
      }
    }
    return (
      <TextField error={hasErrorField} placeholder={props.placeholder} inputProps={{ pattern: props.pattern}} type = {input.type}{...props} value={input.value} onChange={handleChange} onBlur={onBlurField}/>
    )
    
  }