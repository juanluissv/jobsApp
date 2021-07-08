import React, { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ComputerIcon from '@material-ui/icons/Computer';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SweetAlert from 'sweetalert2';
import Sweet from '../Sweet/Sweet';
import getDays from '../JobCard/getDays';
import { getJobDetail } from '../../redux/actions/jobsDetailActions';
import { useStyles } from './styles';

function JobDetail() {
  const { id } = useParams<any>();

  const classes = useStyles();
  const dispatch = useDispatch();

  const job = useSelector(
    (state: RootStateOrAny) => state.jobDetailReducer.jobDetail
  );
  const userInfo = useSelector(
    (state: RootStateOrAny) => state.userUpdateReducer.userInfo
  );

  const jobPending = userInfo.jobs?.find(
    (jobPostulate) => jobPostulate.id === Number(id)
  );

  useEffect(() => {
    dispatch(getJobDetail(id));
  }, []);

  return (
    <Grid className={classes.root}>
      {job ? (
        <Grid container className={classes.container}>
          <Typography className={classes.title} variant="h4">
            {job.name}
          </Typography>

          <Grid xs={12} className={classes.infoContainer}>
            <Grid className={classes.infoDetail}>
              <Grid style={{ display: 'flex', paddingRight: '1vw' }}>
                <LocationOnIcon />
                <Typography>{job.country?.name}</Typography>
              </Grid>
              <Typography>
                {job.start_date && (
                  <i>Publicado hace {Math.abs(getDays(job.start_date))} dias</i>
                )}
              </Typography>
            </Grid>
            <Grid>
              <List style={{ display: 'flex' }}>
                <ListItem
                  disableGutters={true}
                  className={classes.listContainer}
                >
                  <ListItemIcon style={{ minWidth: 'fit-content' }}>
                    <ComputerIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      job.presency === 'remote'
                        ? 'Remoto'
                        : job.presency === 'full_presency'
                        ? 'Presencial'
                        : 'Semi-Presencial'
                    }
                  />
                </ListItem>
                <ListItem
                  disableGutters={true}
                  className={classes.listContainer}
                >
                  <ListItemIcon style={{ minWidth: 'fit-content' }}>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={job.full_time ? 'Full-Time' : 'Part-time'}
                  />
                </ListItem>
                <ListItem
                  disableGutters={true}
                  className={classes.listContainer}
                >
                  <ListItemIcon style={{ minWidth: 'fit-content' }}>
                    <AssignmentIndIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      job.condition === 'contract' ? 'Contrato' : 'Voluntariado'
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.description}>
            <Typography>{job.responsibilities}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} className={classes.generalInfo}>
                <Typography className={classes.label}>Objetivos:</Typography>
                <Typography>{job.objectives}</Typography>
              </Grid>

              <Grid item xs={12} className={classes.generalInfo}>
                <Typography className={classes.label}>
                  Requerimientos:{' '}
                </Typography>
                <Typography>{job.requirements}</Typography>
              </Grid>

              <Grid item xs={12} className={classes.generalInfo}>
                <Typography className={classes.label}>Beneficios:</Typography>
                <Typography>{job.benefits}</Typography>
              </Grid>

              <Grid item xs={4}></Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.dateAndButton}>
            <Typography color="secondary" className={classes.endDate}>
              <i>
                {job.end_date && getDays(job.end_date) > 0
                  ? `La postulación finaliza en ${getDays(job.end_date)} días`
                  : 'Postulación finalizada'}
              </i>
            </Typography>

            <Sweet
              swal={SweetAlert}
              text={jobPending ? 'Actualizar' : 'Postularme'}
              from="jobDetail"
              jobId={job.id}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid className={classes.loadingContainer}>
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
}

export default JobDetail;
