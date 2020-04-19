import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import shopPage from './pages/shop/shop.component.jsx';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component.jsx';
function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={shopPage} />
      </Switch>
    </div>

  );
}

export default App;
