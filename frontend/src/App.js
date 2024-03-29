// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import OneSpot from "./components/OneSpot";
import CreateSpot from "./components/CreateSpot";
import Footer from "./components/Footer";
import EditSpot from "./components/EditSpot"
import './index.css'
import UserBookings from "./components/UserBookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Spots />
          </Route>
          <Route exact path="/spots/host">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/:spotId">
            <OneSpot />
          </Route>
          <Route exact path="/spots/:spotId/host">
            <EditSpot />
          </Route>
          <Route exact path="/my-bookings">
            <UserBookings />
          </Route>
          <Route>
            <div style={{display: 'flex', justifyContent: 'center', fontSize: '48px', color: '#ff385c'}}>
            404 RESOURCE NOT FOUND
            </div>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
