import React, { useEffect, useState } from 'react';
import { Cities } from '../../assets/Cities';
import { Select, MenuItem, InputLabel, FormControl}  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        margin: '16px auto',
        width: '100%'
      },
    selector: {
      margin: '0px 0px 15px 0px',
      width: '60%'
    }
 }));
export default function CitySelector ({input, ...props}){

    const changeHandler = event => {
        input.onChange(event.target.value)
    }

    const [options, setOptions] = useState([])

    useEffect(() => {
      input.onChange('')
      if (props.country) {
        setOptions(
          Cities[props.country].map(city => { return {
            value: city,
            label: city
          }})
        )
      }
    }, [props.country])

  const classes = useStyles();

    return (
      <div>
        <FormControl className={classes.root}>
            <InputLabel id="country">City</InputLabel>
            <Select className={classes.selector}
                options={options}
                value={input.value}
                onChange={changeHandler.bind()}
            >
                {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
      </div>
    )
}