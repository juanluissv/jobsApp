import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import Button from '@material-ui/core/Button';
import { Grid, Tooltip } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import { postulation } from '../../redux/actions/postulationActions';

import { validationSchema } from './validation';
import { useStyles } from './styles';

const UserExtraForm = ({ userId, jobId, setLeftState }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userInfoValidated = useSelector(
    (state: RootStateOrAny) => state.userUpdateReducer.userInfoValidated
  );

  const postulateInfo = useSelector(
    (state: RootStateOrAny) => state.postulationReducer.infoFormPostulation
  );

  const [isExpandedUserForm, setExpandedUserForm] = useState(true);

  const handleExpandClick = () => {
    setExpandedUserForm(!isExpandedUserForm);
    setLeftState();
  };

  return (
    <Formik
      initialValues={
        postulateInfo || { similar_experience: '', expected_salary: '' }
      }
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => {
        let method = 'patch';
        values.expected_salary = Number(values.expected_salary);

        if (!postulateInfo) {
          values = { ...values, status: 'pending' };
          method = 'post';
        }
        dispatch(postulation(values, userId, jobId, method));
      }}
    >
      {({ submitForm }) => (
        <Form className={classes.root}>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid
              item
              xs={12}
              container
              spacing={1}
              className={classes.gridTitleContainer}
            >
              <h1 className={classes.title}>Complete datos adicionales</h1>

              <IconButton
                className={`${classes.expand} ${
                  isExpandedUserForm ? classes.expandOpen : ''
                }`}
                disableRipple
                onClick={handleExpandClick}
                aria-expanded={isExpandedUserForm}
                aria-label="Show more"
              >
                <ExpandMoreIcon className={classes.arrow} />
              </IconButton>
            </Grid>

            <Collapse in={isExpandedUserForm} timeout="auto" unmountOnExit>
              <Grid container spacing={2}>
                <Grid item xs={12} className={classes.inputContainer}>
                  <Field
                    component={TextField}
                    name="similar_experience"
                    label="Experiencia similar"
                    className={classes.textArea}
                    variant="outlined"
                    required
                    InputProps={{
                      multiline: true,
                      rows: 5,
                      shrink: postulateInfo?.similar_experience !== '',
                    }}
                  />
                </Grid>

                <Grid item xs={6} className={classes.inputContainer}>
                  <Field
                    component={TextField}
                    name="expected_salary"
                    label="Salario pretendido"
                    className={classes.textArea}
                    variant="outlined"
                    required
                    inputProps={{
                      maxLength: 9,
                    }}
                    InputProps={{
                      shrink: postulateInfo?.expected_salary !== '',
                      startAdornment: (
                        <InputAdornment position="start">USD$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6} className={classes.inputContainer}>
                  {!userInfoValidated ||
                  (postulateInfo && postulateInfo?.status !== 'pending') ? (
                    <Tooltip
                      title={
                        !userInfoValidated
                          ? 'Complete sus datos personales antes de postularse'
                          : 'No se puede actualizar los datos de la postulación'
                      }
                      classes={{
                        tooltip: classes.customTooltip,
                      }}
                      arrow
                      placement="top"
                    >
                      <span>
                        <Button
                          onClick={submitForm}
                          variant="contained"
                          className={classes.button}
                          disabled
                        >
                          Enviar
                        </Button>
                      </span>
                    </Tooltip>
                  ) : (
                    <Button
                      onClick={submitForm}
                      variant="contained"
                      className={classes.button}
                    >
                      Enviar
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserExtraForm;
