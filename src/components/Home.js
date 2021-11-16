import { Box, FormControl, FormLabel } from '@material-ui/core';
import React from 'react';

import { BrowserRouter, Switch, Link, Route } from "react-router-dom";

import '../css/App.css';

function Home() {

  return (

    <div className="App" style={{ marginTop: 100 }}>

      <Box p={1}>
        <FormControl component="fieldset" margin='dense'>
          <FormLabel
            component="legend">Tabs
          </FormLabel>
          <Link style={{ color: 'white' }} to="/survey"><button style={{ marginTop: '10px', marginBottom: '10px', width: 100 }} class="btn btn-primary">Survey 1</button></Link>
        </FormControl>
      </Box>
    </div>
  );
}

export default Home;
