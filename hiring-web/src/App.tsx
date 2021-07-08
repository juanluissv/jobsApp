import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RouteAdmin from './Router/AdminRouter';
import RouteUser from './Router/UserRouter';
import { useAuth } from './services/supabase/auth/Auth';
import { getUserInfo } from './redux/actions/userUpdateActions';
import { AuthUser } from './components/AuthUser/AuthUser';

function App() {
  const { user: userCredentials } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userCredentials) dispatch(getUserInfo);
  }, [userCredentials, dispatch]);

  return (
    <Router>
      <Route path="/" component={RouteUser} />
      <Route path="/admin" component={RouteAdmin} />
      <AuthUser path="/auth" rolePostulant="postulant" roleAdmin="admin" />
    </Router>
  );
}

export default App;
