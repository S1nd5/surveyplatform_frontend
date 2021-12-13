import { BrowserRouter, Switch, Route } from "react-router-dom";
import Button from '@mui/material/Button';

import Console from './components/Console';
import Surveys from './components/Surveys';
import Questions from './components/Questions';
import Statistics from './components/Statistics';

import './css/App.css';
import './css/bootstrap.min.css';

function App() {

  return (

    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Console} />
          <Route path="/surveys" component={Surveys} />
          <Route path="/questions" component={Questions} />
          <Route path="/statistics" component={Statistics} />
          <Route render={() => <div><h1 style={{ color: 'black' }}>Page not found</h1>
            <Button variant="contained" style={{ margin: '10px', width: 200, height: 100, fontSize: 30, paddingTop: 20, borderRadius: 10 }} class="btn btn-primary" href="/">Home</Button> </div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
