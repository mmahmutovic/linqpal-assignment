import React, { useState} from 'react';
import style from './CountrySelector.css';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, InputLabel, FormControl}  from '@material-ui/core';
import { UsaStates } from 'usa-states';
import CitySelector from '../CitySelector/CitySelector';

const usaStates = new UsaStates();
const useStyles = makeStyles((theme) => ({
    root: {
        margin: '16px auto',
        width: '100%'
      }
 }));

export default function CountrySelector({ input, meta }){
    const options = usaStates.states.map(state =>{ 
        return {value: state.name, label: state.name}});

    const changeHandler = event => {
        input.onChange(event.target.value);
    }

    const classes = useStyles();
    return (
        <div>
            <FormControl className={classes.root}>
                <InputLabel id="country">Country</InputLabel>
                <Select className={style.selector}
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