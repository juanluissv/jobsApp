import * as React from 'react';
import { Redirect, RouteProps, Route } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';

export interface ProtectedRouteProps extends RouteProps {
  path: string;
  role: string;
  homePath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { userInfo } = useSelector(
    (state: RootStateOrAny) => state.userUpdateReducer
  );

  let redirectPath: string = '/';

  if (userInfo?.email && !userInfo.role?.includes(props.role))
    redirectPath = props.homePath;
  if (userInfo?.email && userInfo.role?.includes(props.role))
    redirectPath = props.path;

  if (redirectPath !== '/admin') {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
