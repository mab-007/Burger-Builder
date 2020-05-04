import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Logout from './Containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asynchComponent from './hoc/asynchComponent/asynchComponent';

const asynchCheckout=asynchComponent(()=>{
  return import('./Containers/Checkout/Checkout');
});

const asynchOrders=asynchComponent(()=>{
  return import('./Containers/Orders/Orders');
});

const asynchAuth=asynchComponent(()=>{
  return import('./Containers/Auth/Auth');
});

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes=(
      <Switch>
        <Route path="/auth" component={asynchAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/Checkout" component={asynchCheckout}/>
          <Route path="/orders" component={asynchOrders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={asynchAuth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!=null
  };
};

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignUp:()=>dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
