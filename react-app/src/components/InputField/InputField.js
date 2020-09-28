import {TextField} from '@material-ui/core';
import React from 'react';
export function InputField ({ input, meta, ...props }) {
    const handleChange = (event) => {
      input.onChange(event.target.value)
    }
    return <TextField type = {input.type} {...props}  onChange={handleChange} />
  }