import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import { connect } from 'react-redux';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up.component/sign-in-and-sign-up.component';
import shopPage from './pages/shop/shop.component';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firbase.utils';
import { setCurrentUser } from './redux/user/user.action';


class App extends React.Component {
  

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser ({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
        
      }
      setCurrentUser ( userAuth );
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();

  }

  render () {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />  
          <Route path='/shop' component={shopPage} />
          <Route exact path='/signin' rende={() => this.props.currentUser ? ( <Redirect to='/' /> ) : ( <SignInAndSignUpPage />)} />
        </Switch>
      </div>
  
    );
  }

}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});
  
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
 