/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Component,useState} from 'react';
import classes from './App.css';
import PersonRegistration from '../components/PersonRegistration/PersonRegistration';
import Login from '../components/Login/Login';
import PersonList from '../components/PersonList/PersonList';
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
          <PersonRegistration></PersonRegistration>
          <Login></Login>

          <PersonList></PersonList>
        </Grid>
        
    );
}
