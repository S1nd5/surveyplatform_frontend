import { BrowserRouter, Switch, Route } from "react-router-dom";

import Console from './components/Console';
import Surveys from './components/Surveys';
import Questions from './components/Questions';

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
          <Route render={() => <h1 style={{ color: 'black' }}>Page not found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
