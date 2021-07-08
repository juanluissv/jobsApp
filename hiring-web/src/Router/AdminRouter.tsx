import React from 'react';
import { Route, RouterProps, Switch } from 'react-router-dom';
import JobCreation from '../components/Admin/JobCreation/JobCreation';
import AdminDashboard from '../components/Admin/Dashboard/Dashboard';
import ProtectedRoute from '../components/Admin/ProtectedRouter/ProtectedRoute';
import PostulantsByJobId from '../components/Admin/PostulantsByJobId/PostulantsByJobId';
import { AuthUser } from '../components/AuthUser/AuthUser';
import DrawerNavbar from '../components/Admin/Drawer/Drawer';
import { useSelector, RootStateOrAny } from 'react-redux';

function RouteAdmin(props: RouterProps) {
  const { userInfo } = useSelector(
    (state: RootStateOrAny) => state.userUpdateReducer
  );

  return (
    <>
      {userInfo?.role === 'admin' && <DrawerNavbar />}
      <Switch>
        <ProtectedRoute
          path="/admin"
          homePath="/"
          role="admin"
          render={() => <AdminDashboard />}
          exact
        />
        <Route path="/admin/createJob" component={JobCreation} exact />
        <Route path="/admin/postulants/:jobId" component={PostulantsByJobId} />
      </Switch>
    </>
  );
}

export default RouteAdmin;
