import {TextField} from '@material-ui/core';
import React, { useState } from 'react';
export function InputField ({ input, meta, ...props }) {
    const [hasErrorField, setErrorField] = useState(false);
    const handleChange = (event) => {
      input.onChange(event.target.value);
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
      <TextField error={hasErrorField} placeholder={props.placeholder} inputProps={{ pattern: props.pattern}} type = {input.type}{...props} onChange={handleChange} onBlur={onBlurField}/>
    )
    
  }