import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';

export const AuthUser = (props) => {
  const { userInfo } = useSelector(
    (state: RootStateOrAny) => state.userUpdateReducer
  );

  if (userInfo?.email && userInfo.role?.includes(props.rolePostulant))
    return <Redirect to="/" />;
  if (userInfo?.email && userInfo.role?.includes(props.roleAdmin))
    return <Redirect to="/admin" />;

  if (!userInfo?.email) {
    return <></>;
  }
};
