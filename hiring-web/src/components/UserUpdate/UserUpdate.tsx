import React from 'react';
import { Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';

import { useAuth } from '../../services/supabase/auth/Auth';
import UserForm from '../UserForm/UserForm';

import { validationSchema } from './validation';
import { useStyles } from './styles';

const UserUpdate = () => {
  const classes = useStyles();
  const { user } = useAuth();

  if (!user) return <Redirect to="/" />;

  return (
    <Container
      className={classes.root}
      classes={{ root: classes.rootRoot }}
      maxWidth={false}
      disableGutters={true}
    >
      <Container
        className={classes.container}
        classes={{ root: classes.containerRoot }}
        disableGutters={true}
        maxWidth={false}
      >
        <UserForm
          validationSchema={validationSchema}
          method="patch"
          validationRequired={false}
          setRightState={null}
        />
      </Container>
    </Container>
  );
};

export default UserUpdate;
