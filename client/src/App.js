import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
//components
import Chat from './Chat';
import JoinRoom from './components/JoinRoom';
import CreateRoom from './components/CreateRoom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={CreateRoom} />
        <Route exact path='/room/:roomId' component={JoinRoom} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
