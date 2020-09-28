import React, { useState } from 'react';
import { Form, Field } from 'react-final-form'
import CountrySelector from '../CountrySelector/CountrySelector';
import {FormControl, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {addUser} from '../../services/user.service';
import CitySelector from '../CitySelector/CitySelector';
import {InputField} from '../InputField/InputField';
import Alert from '@material-ui/lab/Alert';

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display:'flex'
  }
  }));


export default function PersonRegistration() {
    const classes = useStyles();
    const [submitted, setSubmit] = useState(false);
    const onSubmit =  async (values) =>{
      await addUser(values);
      setSubmit(true);
    }

    return(
      <div
        className={classes.container}>
        
        {!submitted &&
          <div>
            <h1>Hello, Please fill out this form</h1>
            <Form onSubmit={onSubmit}>
              
            {({handleSubmit, values}) => (
              <FormControl className={classes.root} noValidate autoComplete="off">
                  <Field name="firstName" component={InputField} className={classes.textField} required label="First name" />
                  <Field name="lastName" component={InputField} className={classes.textField} required label="Last Name" />
                  <Field name="ssn" placeholder="555-55-5555" pattern="\d{3}-?\d{2}-?\d{4}" component={InputField} className={classes.textField} required label="Social security number" defaultValue="" />
                  <Field name="phoneNumber"  placeholder="(555) 555-1212" pattern="/^\(?\d{3}\)?[.\s-]?\d{3}[.\s-]\d{4}$/" component={InputField} className={classes.textField} required label="Phone number" defaultValue="" />
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
        }
        {submitted && 
          <Alert severity="success">Thank you for submitting the form!</Alert>
        }
        </div>
    ) 
};
