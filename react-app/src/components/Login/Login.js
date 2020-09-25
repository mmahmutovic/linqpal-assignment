import React from 'react';
import { FormControl, Button } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { login } from './../../services/user.service';
import { InputField } from './../InputField/InputField';
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
    container : {
      width: '50%',
      margin: '16px auto',
      border: '1px solid #eee',
      boxShadow: '0 2px 3px #ccc',
      padding: '16px',
      display: 'inline-block',
    }
    }));
export default function Login (props){

    const classes = useStyles();
    const onSubmit =  async (values) =>{
      console.log(values);
      const result = await login(values);
      console.log(result);
    }
    return (
        <div className={classes.container}>
           <Form onSubmit={onSubmit}>
              {({handleSubmit, values}) => (
              <FormControl className={classes.root}>
                  <Field name="username" component={InputField} className={classes.textField} required label="Username" />
                  <Field name="password" component={InputField} className={classes.textField} required label="Password" type="password" />
                  <Button color="primary" onClick={handleSubmit}>Sign in</Button>
              </FormControl>
              )}
              </Form>
        </div>
    )
}