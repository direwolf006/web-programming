import React from 'react';
import {useSelector} from 'react-redux';
import {Router,Redirect,Switch,Route} from 'react-router-dom';
import Header from './Components/Header';
import History from './history';
import HomePage from './Components/HomePage';
import ViewPosts from './Components/ViewRequests';
import UserProfile from './Components/UserProfile';
import Chat from './Components/Chat';
import LoggedInRoute from './Routes/LoggedInRoute';


/**
 * This component is the parent component for which contains all the routing to the pages with the 
 * path specified.
 */
const App=()=>{
  
  const loggedIn=useSelector((state)=>state.auth.loggedIn);

  return (
    <div className="App" >  
        <Router history={History}>
            <div>
                <Header/>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <LoggedInRoute path='/view-requests' exact component={ViewPosts} loggedIn={loggedIn}/>
                    <Route path='/user/:id' exact component={UserProfile}/>
                    <Route path='/chat/:id' exact component={Chat}/>
                    <Route render={() => <Redirect to={{pathname: "/"}} />} />
                </Switch>
            </div>       
        </Router>
    </div>
  );
};

export default App;
