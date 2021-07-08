import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../components/Home/Home';
import JobDetail from '../components/JobDetail/JobDetail';
import Postulation from '../components/Postulation/Postulation';
import UserUpdate from '../components/UserUpdate/UserUpdate';
import Navbar from '../components/Navbar/Navbar';

function RouteUser() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/userUpdate" component={UserUpdate} />
        <Route path="/postulation/:jobId" component={Postulation} />
        <Route path="/job/:id" component={JobDetail} />
      </Switch>
    </>
  );
}

export default RouteUser;
