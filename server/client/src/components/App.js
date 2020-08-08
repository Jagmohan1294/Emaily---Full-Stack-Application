import React, {useState, useEffect, Fragment} from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import actionDispatcher from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'


const App = (props) => {
useEffect(()=>{
props.fetchUser()
})
  return (
    <div className="container">
      <BrowserRouter>
        <Fragment>
          <Header/>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/surveys" component={Dashboard}/>
          <Route path="/surveys/new" component={SurveyNew}/>
        </Fragment>
      </BrowserRouter>
    </div>
  )
}

const mapDispatchToProps = {
fetchUser: actionDispatcher.fetchUser
}

export default connect(null,mapDispatchToProps )(App);
