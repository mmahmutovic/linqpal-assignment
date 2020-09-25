/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Component,useState} from 'react';
import classes from './App.css';
import Person from '../components/Person/Person';
import Login from '../components/Login/Login';
import {Grid} from '@material-ui/core';


export default function App() {

  let state = {
    authenticated: false,
  }
    return(
        <Grid container
            direction="row"
            justify="center"
            alignItems="center"      
        >
          <Person></Person>
          <Login></Login>
        </Grid>
        
    );
}
