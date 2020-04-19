import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import shopPage from './pages/shop/shop.component.jsx';
import HomePage from './pages/homepage/homepage.component';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={shopPage} />
      </Switch>
    </div>

  );
}

export default App;
