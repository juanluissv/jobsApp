import React, { useEffect, useState } from 'react';
import Flag from 'react-world-flags';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import {
  Grid,
  InputAdornment,
  Typography,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { createJob } from '../../../redux/actions/createJobActions';
import { getCountries } from '../../../redux/actions/countriesActions';
import { getTags } from '../../../redux/actions/tagsActions';
import { validationSchema } from './validation';
import { useStyles } from './styles';
import getDays from '../../JobCard/getDays';

const JobCreation = ({ method }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tagsState, setTagsState] = useState([]);

  const countriesList = useSelector(
    (state: RootStateOrAny) => state.countriesListReducer
  );
  const { countries } = countriesList;

  const tagsList = useSelector(
    (state: RootStateOrAny) => state.tagsReducer.tags
  );

  const handleTagsClick = (id) => {
    const newTag = tagsList.find((tag) => tag.id === Number(id));
    if (!tagsState.includes(newTag)) {
      setTagsState([...tagsState, newTag]);
    }
  };

  const handleDelete = (id) => {
    setTagsState(tagsState.filter((tag) => tag.id !== id));
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getTags());
  }, [dispatch]);

  const job = {
    name: '',
    requirements: '',
    benefits: '',
    objectives: '',
    responsibilities: '',
    presency: '',
    full_time: true,
    start_date: '',
    end_date: '',
    salary_range_low: '',
    salary_range_high: '',
    condition: '',
    countryId: '',
    status: 'open',
  };

  return (
    <Formik
      initialValues={job}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        let tags = tagsState.map((tag) => tag.id);

        if (getDays(values.start_date) > 0) values.status = 'paused';

        dispatch(createJob({ ...values, tags }));
      }}
    >
      {({ submitForm, isSubmitting, values }) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid container className={classes.root}>
            <Form>
              <Grid
                item
                xs={12}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography className={classes.title}>
                  Completa los datos de la postulación
                </Typography>
              </Grid>
              <Grid container className={classes.formContainer} spacing={2}>
                <Grid container className={classes.header} xs={12} spacing={2}>
                  {/* TITULO */}
                  <Grid item xs={12} md={8} style={{ paddingLeft: '1.5rem' }}>
                    <Field
                      component={TextField}
                      InputLabelProps={{ shrink: true }}
                      name="name"
                      disabled={false}
                      label="Titulo"
                      variant="filled"
                      required
                      className={classes.titleJob}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} style={{ paddingLeft: '1.5rem' }}>
                    <FormControl>
                      <InputLabel
                        className={classes.input}
                        shrink={true}
                        htmlFor="tags"
                      >
                        Tags
                      </InputLabel>
                      <Select variant="filled" className={classes.tagsJob}>
                        {tagsList &&
                          tagsList.map(({ code, name, id }) => (
                            <MenuItem
                              key={id}
                              value={id}
                              onClick={() => handleTagsClick(id)}
                            >
                              &nbsp; {name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    {tagsState.length ? (
                      <div style={{ width: '90%' }}>
                        <InputLabel
                          style={{
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          Areas seleccionadas
                        </InputLabel>

                        {tagsState.map((tag) => (
                          <Chip
                            variant="outlined"
                            size="small"
                            id={tag.id}
                            key={tag.id}
                            label={tag.name}
                            clickable
                            onDelete={() => handleDelete(tag.id)}
                          />
                        ))}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>

                <Grid
                  container
                  xs={12}
                  md={6}
                  className={classes.leftContainer}
                >
                  {/* IZQUIERDO */}
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="requirements"
                      disabled={false}
                      label="Requisitos"
                      multiline
                      rows={7}
                      variant="filled"
                      className={classes.textArea}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="objectives"
                      disabled={false}
                      label="Objetivos"
                      variant="filled"
                      multiline
                      rows={7}
                      className={classes.textArea}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="responsibilities"
                      disabled={false}
                      label="Responsabilidades"
                      multiline
                      rows={7}
                      variant="filled"
                      required
                      className={classes.textArea}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  xs={12}
                  md={6}
                  className={classes.rightContainer}
                >
                  {/* DERECHO */}

                  <Grid item xs={4} style={{ maxWidth: 'none' }}>
                    <Field
                      component={TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="benefits"
                      disabled={false}
                      label="Beneficios"
                      variant="filled"
                      multiline
                      rows={7}
                      required
                      className={classes.textArea}
                    />
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    xs={8}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      maxWidth: 'none',
                    }}
                  >
                    <Grid item xs={6} className={classes.responsiveInputs}>
                      <FormControl>
                        <InputLabel
                          style={{ paddingLeft: '1.2rem' }}
                          shrink={true}
                          htmlFor="condition"
                        >
                          Condición
                        </InputLabel>
                        <Field
                          className={classes.input}
                          component={TextField}
                          select={true}
                          name="condition"
                          disabled={false}
                          variant="filled"
                        >
                          <MenuItem value={'contract'}>Contrato</MenuItem>
                          <MenuItem value={'volunteer'}>Voluntario</MenuItem>
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.responsiveInputs}>
                      <Field
                        style={{ padding: '2rem' }}
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="full_time"
                        disabled={false}
                        variant="filled"
                        Label={{ label: 'Full-time' }}
                        required
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.responsiveInputs}>
                      <Field
                        className={classes.input}
                        component={TextField}
                        type="date"
                        name="start_date"
                        disabled={false}
                        label="Comienzo"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.responsiveInputs}>
                      <Field
                        className={classes.input}
                        component={TextField}
                        type="date"
                        name="end_date"
                        disabled={false}
                        label="Cierre"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.responsiveInputs}>
                      <FormControl>
                        <InputLabel
                          style={{ paddingLeft: '1.2rem' }}
                          shrink={true}
                          htmlFor="countryId"
                        >
                          País
                        </InputLabel>
                        <Field
                          className={classes.input}
                          component={TextField}
                          select={true}
                          name="countryId"
                          disabled={false}
                          type="text"
                          variant="filled"
                        >
                          {countries &&
                            countries.map(({ code, name, id }) => (
                              <MenuItem key={id} value={id}>
                                <Flag code={code} height="20" />
                                &nbsp; {name}
                              </MenuItem>
                            ))}
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.responsiveInputs}>
                      <FormControl>
                        <InputLabel
                          style={{ paddingLeft: '1.2rem' }}
                          shrink={true}
                          htmlFor="presency"
                        >
                          Presencialidad
                        </InputLabel>
                        <Field
                          className={classes.input}
                          variant="filled"
                          component={TextField}
                          select={true}
                          type="text"
                          name="presency"
                          disabled={false}
                        >
                          <MenuItem value={'full_presency'}>
                            Presencial
                          </MenuItem>
                          <MenuItem value={'semi_presency'}>
                            Semi-Presencial
                          </MenuItem>
                          <MenuItem value={'remote'}>Remoto</MenuItem>
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.responsiveInputs}>
                      <Field
                        className={classes.input}
                        component={TextField}
                        name="salary_range_low"
                        disabled={false}
                        label="salarial mínimo"
                        variant="filled"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              USD$
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={6} className={classes.responsiveInputs}>
                      <Field
                        className={classes.input}
                        component={TextField}
                        name="salary_range_high"
                        disabled={false}
                        label="salario máximo"
                        variant="filled"
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              USD$
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    onClick={submitForm}
                    disabled={false}
                    variant="contained"
                    className={classes.button}
                  >
                    Crear trabajo
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Grid>
        </div>
      )}
    </Formik>
  );
};

export default JobCreation;
