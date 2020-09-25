import React from 'react';
import { Form, Field } from 'react-final-form'
import CountrySelector from '../CountrySelector/CountrySelector';
import {FormControl, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {addUser} from './../../services/user.service';
import CitySelector from '../CitySelector/CitySelector';
import {InputField} from '../InputField/InputField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: '0px 0px 15px 0px'
    },
    margin: '16px auto',
    padding: '16px',
    display: 'inline-block',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '60%',
  },
  selector: {
    width: '60%'
  }, 
  container : {
    width: '50%',
    margin: '16px auto',
    border: '1px solid #eee',
    boxShadow: '0 2px 3px #ccc',
    padding: '16px',
    display: 'inline-block',
  },
  button: {
    display:'inline-block'
  }
  }));


export default function Person(props) {
    const classes = useStyles();
    const onSubmit =  async (values) =>{
      const result = await addUser(values);
      console.log(result);
    }

    

    return(
      <div className={classes.container}>
        <h1>Hello, Please fill out this form</h1>
        <Form onSubmit={onSubmit}>
          {({handleSubmit, values}) => (
            <FormControl className={classes.root} noValidate autoComplete="off">
                <Field name="name" component={InputField} className={classes.textField} required label="First name" />
                <Field name="lastName" component={InputField} className={classes.textField} required label="Last Name" />
                <Field name="ssn" component={InputField} className={classes.textField} required label="Social security number" defaultValue="" />
                <Field name="phoneNumber" component={InputField} className={classes.textField} required label="Phone number" defaultValue="" />
                <Field name="country" component={CountrySelector} className ={classes.selector} />
                <Field name="city" component={CitySelector} country={values.country} className ={classes.selector} />      
                <Field name="zipCode" component={InputField} className={classes.textField} label="Zip Code"/>
                <Field name="address" component={InputField} className={classes.textField} label="Address"/>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit}>
                  Send data
                </Button>
            </FormControl>
          )}
        </Form>
        </div>
    ) 
};
