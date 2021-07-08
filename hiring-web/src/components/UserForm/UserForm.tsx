import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { TextField, Select, CheckboxWithLabel } from 'formik-material-ui';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import { userUpdate } from '../../redux/actions/userUpdateActions';
import { getUserInfo } from '../../redux/actions/userUpdateActions';

import { useStyles } from './styles';

const UserForm = ({
  validationSchema,
  method,
  validationRequired,
  setRightState,
}) => {
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.userUpdateReducer.userInfo
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const [isExpandedUserForm, setExpandedUserForm] = useState(false);

  const handleExpandClick = () => {
    setExpandedUserForm(!isExpandedUserForm);
    if (setRightState) setRightState();
  };

  return (
    <Formik
      initialValues={{ ...userInfo }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const linkedin = values.linkedin === '' ? null : values.linkedin;
        const techo_experience =
          values.techo_experience === null ? false : values.techo_experience;

        if (method === 'patch') {
          for (let key in values) if (values[key] === '') values[key] = null;
        }

        dispatch(
          userUpdate(
            { ...values, linkedin, techo_experience },
            userInfo.id,
            method
          )
        );
        dispatch(getUserInfo);
      }}
    >
      {({ submitForm, isSubmitting, values }) => (
        <Form className={classes.root}>
          <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12} container spacing={1} className={classes.header}>
              <h1 className={classes.title}>Completa tus datos</h1>

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
              <Grid container spacing={2} alignItems="center">
                <Grid
                  item
                  xs={6}
                  className={`${classes.inputContainer} ${classes.inputContainerFirst}`}
                >
                  <FormControl className={classes.input}>
                    <InputLabel
                      id="demo-simple-select-helper-label"
                      className={classes.idType}
                    >
                      Tipo de documento
                    </InputLabel>

                    <Field
                      required={validationRequired}
                      label="Tipo de documento"
                      variant="outlined"
                      component={Select}
                      name="identity_type"
                    >
                      <MenuItem value={'DNI'}>DNI - Argentina</MenuItem>
                      <MenuItem value={'RUT'}>RUT - Chile</MenuItem>
                      <MenuItem value={'Passport'}>Passport</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={6}
                  className={`${classes.inputContainer} ${classes.inputContainerFirst}`}
                >
                  <Field
                    component={TextField}
                    required={validationRequired}
                    InputLabelProps={{ shrink: values?.identity_number }}
                    name="identity_number"
                    label="Numero de identificacion"
                    variant="outlined"
                    className={classes.input}
                  />
                </Grid>

                <Grid item xs={6} className={classes.inputContainer}>
                  <Field
                    component={TextField}
                    required={validationRequired}
                    InputLabelProps={{ shrink: values?.firstName }}
                    name="firstName"
                    label="Nombre"
                    variant="outlined"
                    className={classes.input}
                  />
                </Grid>

                <Grid item xs={6} className={classes.inputContainer}>
                  <Field
                    component={TextField}
                    required={validationRequired}
                    InputLabelProps={{ shrink: values?.lastName }}
                    name="lastName"
                    label="Apellido"
                    variant="outlined"
                    className={classes.input}
                  />
                </Grid>

                <Grid item xs={6} className={classes.inputContainer}>
                  <Field
                    component={TextField}
                    required={validationRequired}
                    InputLabelProps={{ shrink: values?.phone }}
                    name="phone"
                    label="Teléfono"
                    variant="outlined"
                    className={classes.input}
                  />
                </Grid>

                <Grid item xs={6} className={classes.inputContainer}>
                  <Field
                    component={TextField}
                    required={validationRequired}
                    type="date"
                    name="birthDate"
                    label="Fecha de nacimiento"
                    variant="outlined"
                    className={classes.input}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={6} className={classes.inputContainer}>
                  <Field
                    component={TextField}
                    required={validationRequired}
                    InputLabelProps={{ shrink: values?.residence }}
                    name="residence"
                    label="Lugar de residencia"
                    className={classes.input}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={6} className={classes.inputContainer}>
                  <Field
                    component={TextField}
                    required={validationRequired}
                    InputLabelProps={{ shrink: values?.nationality }}
                    name="nationality"
                    label="Nacionalidad"
                    className={classes.input}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={6} className={classes.inputContainer}>
                  <Field
                    component={TextField}
                    required={validationRequired}
                    InputLabelProps={{ shrink: values?.education }}
                    name="education"
                    label="Estudios"
                    className={classes.input}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={6} className={classes.inputContainer}>
                  <Field
                    component={TextField}
                    InputLabelProps={{ shrink: values?.linkedin }}
                    name="linkedin"
                    label="LinkedIn"
                    className={classes.input}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} className={classes.inputAreaContainer}>
                  <Field
                    component={TextField}
                    name="habilities"
                    label="Habilidades"
                    className={classes.input}
                    variant="outlined"
                    required={validationRequired}
                    InputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </Grid>

                <Grid item xs={12} className={classes.techoContainer}>
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name="techo_experience"
                    className={classes.techo}
                    classes={{ checked: classes.techoCheck }}
                    Label={{ label: 'Tengo experiencia en Techo' }}
                  />
                </Grid>

                <Grid item xs={12} className={classes.buttonContainer}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    onClick={submitForm}
                    variant="contained"
                    className={classes.button}
                  >
                    Actualizar
                  </Button>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
