import Button from '@mui/material/Button';
import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Survey from './components/Survey';
import Home from './components/Home';

import './css/App.css';

function App() {

  //Routing traffic to different components

  return (

    <div className="App" style={{ marginTop: 100 }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/survey:surveyId" component={Survey} />
          <Route render={() => <div><h1 style={{ color: 'black' }}>Page not found</h1> 
          <Button variant="contained" style={{ margin: '10px', width: 200, height: 100, fontSize: 30, paddingTop: 20, borderRadius: 10 }} class="btn btn-primary" href="/">Home</Button> </div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
