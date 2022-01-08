import { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Movie from './pages/Movie'; 
import { AppContext } from "./lib/contextLib";
import { Auth } from "aws-amplify";


function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [userDetails ,setUserDetails ] = useState({
    isAuthenticated : false ,
    username : ""
  }) ;

  
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      const user = await Auth.currentUserInfo() ; 
      const username = await user.username  ;
      setUserDetails( {isAuthenticated : true , username : username}) ;

    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <div>
        <Switch>
          <AppContext.Provider value={{ userDetails ,setUserDetails}}>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path = "/movie/:id" >
              <Movie/>
            </Route>
          </AppContext.Provider>
        </Switch>
      </div>
    )
  );
}

export default App;
