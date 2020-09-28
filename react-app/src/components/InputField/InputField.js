import {TextField} from '@material-ui/core';
import React from 'react';
export function InputField ({ input, meta, ...props }) {
    const handleChange = (event) => {
      input.onChange(event.target.value)
    }
    return <TextField placeholder={props.placeholder} inputProps={{ pattern: props.pattern}} type = {input.type}{...props}  onChange={handleChange} />
  }