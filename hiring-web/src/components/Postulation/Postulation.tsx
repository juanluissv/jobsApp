import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

import { Grid, Typography, Tooltip } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import UserForm from '../UserForm/UserForm';
import UserExtraForm from '../UserExtraForm/UserExtraForm';
import { useAuth } from '../../services/supabase/auth/Auth';
import { postulationInfo } from '../../redux/actions/postulationActions';
import { getUserInfo } from '../../redux/actions/userUpdateActions';

import { validationSchema } from './validation';
import { useStyles } from './styles';

const Postulation = () => {
  const { jobId } = useParams<any>();
  const classes = useStyles();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [rightOn, setRightOn] = useState(true);
  const [leftOn, setLeftOn] = useState(false);

  const setRightState = () => {
    setRightOn(!rightOn);
  };

  const setLeftState = () => {
    setLeftOn(!leftOn);
  };

  const userInfoValidated = useSelector(
    (state: RootStateOrAny) => state.userUpdateReducer.userInfoValidated
  );

  const userInfo = useSelector(
    (state: RootStateOrAny) => state.userUpdateReducer.userInfo
  );

  useEffect(() => {
    dispatch(postulationInfo(userInfo.id, jobId));

    return () => {
      dispatch(getUserInfo);
    };
  }, []);

  if (!user) return <Redirect to="/" />;

  return (
    <Grid container spacing={2} className={classes.root}>
      <div className={classes.redirectRoot}>
        <Grid item className={classes.redirectContainer}>
          <Typography className={classes.text}>
            No olvide revisar sus datos personales
          </Typography>

          <Tooltip
            title={
              !userInfoValidated
                ? 'Requiere completar datos personales'
                : 'Datos personales completos '
            }
            classes={{
              tooltip: classes.customTooltip,
            }}
            arrow
            placement="top-start"
          >
            <InfoOutlinedIcon
              className={`${classes.iconValidate} ${
                !userInfoValidated && classes.iconNoValidate
              }`}
            />
          </Tooltip>
        </Grid>
      </div>

      <Grid
        item
        md={6}
        xs={12}
        className={`${classes.container} ${classes.leftContainer}`}
        style={{ padding: 0 }}
      >
        <div className={`${classes.filter} ${!leftOn && classes.containerOff}`}>
          <Grid item className={classes.formContainer}>
            <UserForm
              validationSchema={validationSchema}
              method="put"
              validationRequired={true}
              setRightState={setLeftState}
            />
          </Grid>
        </div>
      </Grid>

      <Grid
        item
        md={6}
        xs={12}
        className={`${classes.container} ${classes.rightContainer}`}
        style={{ padding: 0 }}
      >
        <Grid
          className={`${classes.filter} ${!rightOn && classes.containerOff}`}
        >
          <Grid item className={classes.formContainer}>
            <UserExtraForm
              userId={userInfo.id}
              jobId={jobId}
              setLeftState={setRightState}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Postulation;
