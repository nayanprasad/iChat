import React from 'react'
import { Alert, Zoom } from '@mui/material';
import './Alert.css';

export const Alerts = (props) => { 

  if(props.alert){
    return (
      <>
       
          <Alert className="alert" severity={props.alert.type}> {props.alert.message}</Alert>
        
      </>
    );
  }
  }



export default Alerts;